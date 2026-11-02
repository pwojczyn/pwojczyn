#!/usr/bin/env node
/**
 * Refresh public GitHub statistics in the profile README files.
 *
 * Design constraints:
 * - public data only (repositories with `private: false`),
 * - no third-party services,
 * - retry/backoff for transient API failures,
 * - per-request timeout,
 * - idempotent: files are only rewritten when their content changes,
 * - no secrets or private repository names are logged.
 */

import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const USER = "pwojczyn";
const API = "https://api.github.com";
const TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || "";
const REQUEST_TIMEOUT_MS = 15_000;
const MAX_ATTEMPTS = 4;
const MAX_PAGES = 10;

const headers = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": `${USER}-profile-stats`,
  ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
};

const sleep = (ms) => new Promise((resolveSleep) => setTimeout(resolveSleep, ms));

function isRetryableStatus(status) {
  return status === 403 || status === 429 || status >= 500;
}

function retryDelayMs(response, attempt) {
  const retryAfter = Number(response.headers.get("retry-after"));
  if (Number.isFinite(retryAfter) && retryAfter > 0) {
    return Math.min(retryAfter * 1000, 60_000);
  }

  const remaining = response.headers.get("x-ratelimit-remaining");
  const reset = Number(response.headers.get("x-ratelimit-reset"));
  if (remaining === "0" && Number.isFinite(reset)) {
    const untilReset = reset * 1000 - Date.now();
    return Math.min(Math.max(untilReset, 1_000), 60_000);
  }

  return Math.min(1_000 * 2 ** attempt, 30_000);
}

async function api(path, attempt = 0) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${API}${path}`, {
      headers,
      signal: controller.signal,
    });

    if (isRetryableStatus(response.status) && attempt < MAX_ATTEMPTS - 1) {
      const delay = retryDelayMs(response, attempt);
      await sleep(delay);
      return api(path, attempt + 1);
    }

    if (!response.ok) {
      throw new Error(`GitHub API returned ${response.status} for ${path}`);
    }

    return await response.json();
  } catch (error) {
    const retryable =
      error?.name === "AbortError" ||
      error?.code === "ECONNRESET" ||
      error?.code === "ETIMEDOUT" ||
      error instanceof TypeError;

    if (retryable && attempt < MAX_ATTEMPTS - 1) {
      await sleep(Math.min(1_000 * 2 ** attempt, 15_000));
      return api(path, attempt + 1);
    }

    throw error;
  } finally {
    clearTimeout(timer);
  }
}

async function getPublicRepos() {
  const repos = [];

  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const batch = await api(
      `/users/${USER}/repos?type=owner&per_page=100&page=${page}&sort=updated`,
    );

    if (!Array.isArray(batch)) {
      throw new Error("Unexpected repository response");
    }

    repos.push(...batch.filter((repo) => repo.private === false));

    if (batch.length < 100) break;
  }

  return repos;
}

async function getLanguages(repos) {
  const totals = new Map();

  for (const repo of repos) {
    if (repo.fork) continue;

    const languages = await api(`/repos/${USER}/${repo.name}/languages`);
    if (!languages || typeof languages !== "object") continue;

    for (const [language, bytes] of Object.entries(languages)) {
      if (typeof bytes !== "number" || !Number.isFinite(bytes) || bytes <= 0) {
        continue;
      }
      totals.set(language, (totals.get(language) || 0) + bytes);
    }
  }

  return [...totals.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([language]) => language);
}

function safeCell(value) {
  return String(value).replace(/[|\r\n]/g, " ").trim();
}

function buildTable({ publicRepos, sourceProjects, since, languages, date }, locale) {
  const langList = safeCell(languages.join(" · "));

  if (locale === "pl") {
    return [
      "| Metryka | Wartość |",
      "| :--- | :--- |",
      `| Publiczne repozytoria | **${publicRepos}** |`,
      `| Publiczne projekty źródłowe | **${sourceProjects}** |`,
      `| Na GitHubie od | **${since}** |`,
      `| Najczęstsze języki* | **${langList}** |`,
      `| Ostatnia aktualizacja | **${date}** |`,
      "",
      "<sub>* Według bajtów języka w publicznych repozytoriach niebędących forkami.</sub>",
    ].join("\n");
  }

  return [
    "| Metric | Value |",
    "| :--- | :--- |",
    `| Public repositories | **${publicRepos}** |`,
    `| Public source projects | **${sourceProjects}** |`,
    `| GitHub since | **${since}** |`,
    `| Top languages* | **${langList}** |`,
    `| Last refreshed | **${date}** |`,
    "",
    "<sub>* By language bytes across public non-fork repositories.</sub>",
  ].join("\n");
}

function replaceBlock(content, table, file) {
  const pattern = /<!-- STATS:START -->[\s\S]*?<!-- STATS:END -->/;
  if (!pattern.test(content)) {
    throw new Error(`Missing STATS markers in ${file}`);
  }
  return content.replace(pattern, `<!-- STATS:START -->\n${table}\n<!-- STATS:END -->`);
}

async function writeIfChanged(file, content) {
  const absolute = resolve(file);
  let current = "";
  try {
    current = await readFile(absolute, "utf8");
  } catch {
    throw new Error(`Cannot read ${file}`);
  }

  if (current === content) {
    return false;
  }

  await writeFile(absolute, content, "utf8");
  return true;
}

async function main() {
  const user = await api(`/users/${USER}`);
  if (user?.login !== USER) {
    throw new Error("Authenticated API returned an unexpected account");
  }

  const repos = await getPublicRepos();
  if (repos.length === 0) {
    throw new Error("Refusing to publish an empty public repository count");
  }

  const sourceRepos = repos.filter((repo) => repo.fork === false);
  const languages = await getLanguages(sourceRepos);
  if (languages.length === 0) {
    throw new Error("Refusing to publish an empty language list");
  }

  const createdAt = new Date(user.created_at);
  if (Number.isNaN(createdAt.valueOf())) {
    throw new Error("Invalid account creation date");
  }

  const stats = {
    publicRepos: repos.length,
    sourceProjects: sourceRepos.length,
    since: createdAt.getUTCFullYear(),
    languages,
    date: new Date().toISOString().slice(0, 10),
  };

  const files = [
    { path: "README.md", locale: "en" },
    { path: "docs/README.pl.md", locale: "pl" },
  ];

  const changed = [];
  for (const file of files) {
    const current = await readFile(resolve(file.path), "utf8");
    const table = buildTable(stats, file.locale);
    const next = replaceBlock(current, table, file.path);
    if (await writeIfChanged(file.path, next)) {
      changed.push(file.path);
    }
  }

  console.log(
    `Public repos: ${stats.publicRepos}; source projects: ${stats.sourceProjects}; ` +
      `languages: ${stats.languages.join(", ")}; updated: ${stats.date}`,
  );
  console.log(changed.length ? `Updated: ${changed.join(", ")}` : "No content changes.");
}

main().catch((error) => {
  console.error(`update-profile failed: ${error.message}`);
  process.exitCode = 1;
});
