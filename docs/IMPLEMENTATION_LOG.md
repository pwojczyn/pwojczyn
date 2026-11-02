# Implementation Log

- **Task:** modernise the public GitHub profile `pwojczyn`
- **Start date:** 2026-11-02
- **Working branch:** `main`
- **Repository:** <https://github.com/pwojczyn/pwojczyn>
- **Publication status:** local implementation; publication and public-profile
  verification recorded below when completed.

## Stage 1 — Audit

- **Date:** 2026-11-02
- **Scope:** inspect the account, public repositories, pinned items, profile
  settings, the community repository and `nieboguard.pl`.
- **Result:** profile repository did not exist. It was created as a public
  repository after verifying the authenticated account (`pwojczyn`) and Git
  author identity.
- **Files:** `docs/PROFILE_AUDIT.md`
- **Checks:** GitHub REST/GraphQL queries, default-branch comparison, link
  checks, website HTTP/title/meta inspection.
- **Problems found:** outdated bio/website; no profile README; pinned 2017
  projects; community repository default branch differs from `main`; a few
  documentation inconsistencies in the community repository; dead legacy Heroku
  demo.
- **Commit:** `6c14a19` — `docs: audit existing GitHub profile`

## Stage 2 — Visual system

- **Date:** 2026-11-02
- **Scope:** choose a visual direction, create the banner, capability map, icons
  and local badges.
- **Decision:** Variant B (aerospace/radar) with Variant A's information
  discipline.
- **Files:** `assets/banner.svg`, `assets/banner.png`,
  `assets/project-nieboguard.svg`, `assets/icons/*.svg`,
  `assets/badges/*.svg`, `docs/DESIGN.md`
- **Checks:** all SVGs parsed with `xml.etree.ElementTree`; PNG rendered with
  ImageMagick at 2000 × 840, 8-bit, stripped.
- **Problems:** initial banner had overlapping brand metadata; fixed by moving
  “OPEN AVIATION TOOLS”.
- **Commit:** `e20ea11` — `design: create professional GitHub profile branding`

## Stage 3 — English README

- **Date:** 2026-11-02
- **Scope:** complete English profile with hero, about, NieboGuard, Community,
  capability map, stack, earlier work, statistics, collaboration and disclaimer.
- **Files:** `README.md`
- **Checks:** relative image/document paths resolved; external links returned
  HTTP 200.
- **Commit:** `23fc457` — `docs: add English profile README`

## Stage 4 — Polish README

- **Date:** 2026-11-02
- **Scope:** full Polish translation with working English/Polish switch.
- **Files:** `docs/README.pl.md`
- **Checks:** relative paths from `docs/` resolve to `../assets/...` and
  `../README.md`; external links returned HTTP 200.
- **Commit:** `07fe2d7` — `docs: add Polish profile presentation`

## Stage 5 — Statistics automation

- **Date:** 2026-11-02
- **Scope:** dependency-free Node.js generator and weekly/manual GitHub Actions
  workflow.
- **Files:** `scripts/update-profile.mjs`,
  `.github/workflows/update-profile.yml`, both README statistics blocks.
- **Security:** public API only; `contents: write`; no secrets; checkout pinned
  to `11bd71901bbe5b1630ceea73d27597364c9af683` (v4.2.2); concurrency group;
  10-minute timeout; retry/backoff; 15-second request timeout; commit only on
  content change.
- **Checks:** local run succeeded (`30` public repos, `27` source projects,
  languages `JavaScript, HTML, CSS, Java, Go`); second run produced “No content
  changes”; YAML parsed; secret/private-data scan clean.
- **Note:** the GitHub Languages API recalculated `NieboGuard-Community` during
  the task, so `Go` replaced `Python` in the top five. The table reflects the
  current public data, not an invented list.
- **Commit:** `fdeadfb` — `ci: automate safe GitHub profile updates`

## Stage 5b — Community repository metadata

- **Date:** 2026-11-02
- **Scope:** update the public description and topics of
  `pwojczyn/NieboGuard-Community` only.
- **Result:**
  - description: `Open-source aviation data toolkit — ADS-B/ASTERIX sensor hub, protocol lab, SDKs and tutorials. Synthetic data only; educational, not an official warning system.`
  - topics: `adsb`, `asterix`, `aviation`, `community`, `educational`,
    `geospatial`, `go`, `open-source`, `polish-english`, `protocol-lab`,
    `real-time`, `sensor-hub`, `simulator`, `situational-awareness`.
- **Not changed:** visibility, content, license, default branch, security
  settings.
- **Concurrent change:** during the task the repository’s `main` branch advanced
  and became the default branch (external update). The profile links to `main`
  explicitly and no user work was overwritten.

## Stage 6 — Documentation

- **Date:** 2026-11-02
- **Scope:** maintenance guide, this log, TODO list.
- **Files:** `docs/MAINTENANCE.md`, `docs/IMPLEMENTATION_LOG.md`,
  `docs/TODO.md`
- **Checks:** command examples executed during the task; no private repository
  names included.
- **Commit:** recorded after the documentation commit.

## Stage 7 — Automated verification

- **Date:** 2026-11-02
- **Scope:** XML/SVG, Markdown, relative links, HTTP links, secrets, workflow
  YAML, visual rendering.
- **Files:** `docs/RENDERING.md`, `docs/screenshots/` (local evidence).
- **Status:** pending final execution.

## Stage 8 — Publication and public verification

- **Date:** 2026-11-02
- **Scope:** push commits, run the workflow, verify the public profile and the
  language switch.
- **Status:** pending.

## Open issues

- Account-level fields (display name, bio, website, pinned repositories) cannot
  be changed with the current token scopes; manual steps are documented in
  `MAINTENANCE.md`.
- `NieboGuard-Community` is now on `main`; the old `community/bootstrap` branch
  remains. The change happened externally during the task and was not performed
  by this work.
- The website links to a third-party `Straznik` repository rather than the
  community repository. This is outside the profile repository scope; recorded
  as a follow-up.
