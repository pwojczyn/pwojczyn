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
  to `3d3c42e5aac5ba805825da76410c181273ba90b1` (v7.0.1); concurrency group;
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
- **Commit:** `d8135f4` — `docs: add maintenance guide and implementation log`

## Stage 7 — Automated verification

- **Date:** 2026-11-02
- **Scope:** XML/SVG, Markdown, relative links, HTTP links, secrets, workflow
  YAML, visual rendering.
- **Files:** `docs/RENDERING.md`, `docs/screenshots/`
- **Tooling:** Playwright 1.64.1 + Chromium against the real public pages;
  `actionlint` v1.7.7; ImageMagick/Chromium for raster artwork.
- **Results:**
  - 9 / 9 images loaded at all tested widths (1920, 1440, 768, 390, 360).
  - No page-level horizontal scroll and no README/table overflow.
  - Light and dark themes both render.
  - English and Polish pages both render and link to each other.
  - No failed requests for GitHub assets or `nieboguard.pl`.
  - `actionlint` passes; secret scan and private-data scan clean.
- **Commit:** `440d00a` — `test: validate GitHub profile rendering`
- **Follow-up:** screenshots and the banner were refreshed after the handle
  change; the final re-check is recorded in `docs/RENDERING.md`.

## Stage 8 — Publication and public verification

- **Date:** 2026-11-02
- **Scope:** push commits, run the workflow, verify the public profile and the
  language switch.
- **Publication:** `main` pushed to
  <https://github.com/pwojczyn/pwojczyn>; no force push.
- **Workflow runs:**
  - `41431466828` — success (initial checkout pin)
  - `41431584450` — success (checkout v7.0.1)
  - `41431652598` — success (pinned `ubuntu-24.04`)
- **Public verification:** the profile renders the new README, the banner and
  project card load, the language switch works, and the statistics table is
  visible in both languages.
- **Status:** published and verified.

## Stage 9 — Concurrent edit integration and identity handle

- **Date:** 2026-11-02
- **Scope:** preserve a concurrent README edit without publishing unsafe or
  unverified data; replace the public surname on the banner with `pwojczyn`.
- **Concurrent commit:** `ee08d4a` added an “Explore NieboGuard” table and a
  social-media table that marked Telegram, Facebook and Instagram as verified.
  The public `data/social-links.json` in `NieboGuard-Community` explicitly marks
  those profiles as **NOT_VERIFIED** and says not to invent URLs.
- **Resolution:** `f6fb869` keeps the useful Explore links as a mobile-friendly
  list, restores the featured project card, status labels and safety
  disclaimer, and removes the unverified social table. No history was rewritten.
- **Banner/identity:** `1b47bfb` changes the banner and alternative text from the
  public surname to the `pwojczyn` handle, and updates the public docs and the
  profile repository description. The existing Git commit author metadata is
  unchanged; rewriting history is out of scope and forbidden by the brief.
- **Account note:** the public bio was changed externally during the task to a
  technology-stack summary. This work did not modify account settings. The
  website field still points to `https://nullexa.eu/` and needs manual attention.

## Stage 10 — Avatar and account settings proposal

- **Date:** 2026-11-02
- **Scope:** prepare a personal avatar and a concrete bio/website/pins proposal
  without changing account security settings.
- **Files:** `assets/avatar.svg`, `assets/avatar.png`,
  `docs/PROFILE_SETTINGS.md`, `docs/DESIGN.md`, `docs/MAINTENANCE.md`,
  `docs/TODO.md`
- **Avatar:** 460 × 460 PNG rendered from SVG; personal `p` monogram inside a
  radar/orbit field; verified legible at 96 px.
- **Applied automatically:** no. The token lacks the `user` scope and GitHub has
  no public API for avatar upload. Bio, website, avatar and pins remain manual.
- **Why:** the account token can write repository contents but cannot update the
  authenticated user; changing scope or uploading an avatar requires the account
  owner.
- **Commit:** recorded in Git history.

## Commit map

| Commit | Purpose |
| :--- | :--- |
| `6c14a19` | Initial profile audit |
| `e20ea11` | Banner, capability map, icons, badges, design document |
| `23fc457` | English profile README |
| `07fe2d7` | Polish profile README |
| `fdeadfb` | Statistics script and GitHub Actions workflow |
| `a857110` | Align Community status with its current README |
| `d8135f4` | Maintenance guide, implementation log, TODO |
| `5c9de82` | Alerts status in the featured project |
| `715c0ec` | Readable native subtitle below the hero |
| `cc946ae` | Mobile-friendly feature status list |
| `3e02de4` | Checkout action updated and pinned to v7.0.1 |
| `d08c052` | Ubuntu runner pinned to `ubuntu-24.04` |
| `440d00a` | Rendering verification report and screenshots |
| `ee08d4a` | Concurrent external edit (preserved in history) |
| `f6fb869` | Restore featured project; remove unverified social links |
| `1b47bfb` | Use `pwojczyn` handle on the banner |
| `b24c0c2` | Final status notes and banner cache-busting query |
| `9e94ddf` | Refreshed screenshots for the `pwojczyn` banner |

## Open issues

- Account-level fields (bio, website, pinned repositories) cannot be changed
  with the current token scopes; manual steps are documented in
  `MAINTENANCE.md`. The display name is already `pwojczyn`.
- The public bio was edited externally during the task; the website field still
  points to `https://nullexa.eu/`, not `https://nieboguard.pl/`.
- `NieboGuard-Community` is now on `main`; the old `community/bootstrap` branch
  remains. The change happened externally during the task and was not performed
  by this work.
- The website links to a third-party `Straznik` repository rather than the
  community repository. This is outside the profile repository scope; recorded
  as a follow-up.
- Existing Git commit author metadata still contains the full name. Changing it
  would require rewriting history, which this task does not do.
