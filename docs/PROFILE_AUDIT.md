# GitHub Profile Audit — `pwojczyn`

- **Audit date:** 2026-11-02
- **Account:** [github.com/pwojczyn](https://github.com/pwojczyn)
- **Profile repository:** [github.com/pwojczyn/pwojczyn](https://github.com/pwojczyn/pwojczyn)
- **Primary project:** [nieboguard.pl](https://nieboguard.pl/)
- **Community repository:** [pwojczyn/NieboGuard-Community](https://github.com/pwojczyn/NieboGuard-Community)

## 1. Method and scope

The audit used the authenticated GitHub CLI (`gh`), the GitHub REST and GraphQL
APIs, the public website, and the local clone of `NieboGuard-Community`. Private
repositories were **not** inspected or named. No repository visibility was
changed.

Commands and checks included:

```bash
gh auth status
gh api user
gh repo view pwojczyn/pwojczyn
gh repo list pwojczyn --limit 100
gh api graphql -f query='{user(login:"pwojczyn"){pinnedItems(first:10){...}}}'
gh api repos/pwojczyn/NieboGuard-Community
gh api repos/pwojczyn/NieboGuard-Community/contents?ref=main
curl -sS -L https://nieboguard.pl/
```

## 2. Account snapshot

| Field | Observed value |
| :--- | :--- |
| Login | `pwojczyn` |
| Display name | `pwojczyn` (account handle; public preference) |
| Public bio | `Javascript, NodeJS, Java, Spring, Hibernate, MySQL, HTML, CSS, PHP, Linux, Apache, Nginx, Vert.x, MongoDB` |
| Website field | `https://nullexa.eu/` |
| Company / social links | none |
| Public repositories (before this work) | 29 |
| Forks among public repositories | 3 (`interactive-tutorials`, `skills-matt-pocock`, `supertonic`) |
| Non-fork public repositories | 26 |
| Stars / followers | 0 / 0 (GitHub API) |
| Account created | 2017-04-20 |
| Pinned repositories | `HostStatsDesktop`, `HostStats`, `NieboGuard-Community` |

### Profile repository status

| Check | Result |
| :--- | :--- |
| `pwojczyn/pwojczyn` existed | **No** — API returned `Could not resolve to a Repository` |
| Public profile README | **No** |
| Profile repository Actions | **No** |
| Created during this task | **Yes** — public, verified as account `pwojczyn` |

The repository was created only after the authenticated login and the Git author
identity were confirmed as `pwojczyn`.

## 3. Public repository inventory

The list below covers the 29 repositories that were public **before** the profile
repository was created. Descriptions are reproduced from GitHub, not invented.

| Repository | Language | Last push | Description / note |
| :--- | :--- | :--- | :--- |
| `NieboGuard-Community` | Python | 2026-11-02 | Community sensor hub, protocol lab, SDKs and docs |
| `supertonic` | Swift | 2026-05-22 | Fork — on-device TTS via ONNX |
| `skills-matt-pocock` | Shell | 2026-05-13 | Fork — Claude skills collection |
| `task-manager` | JavaScript | 2023-02-01 | Small Replit demo |
| `ownautomation` | HTML | 2022-12-11 | No description |
| `ownAutomat` | JavaScript | 2022-12-11 | No description |
| `web-server-nodejs` | JavaScript | 2022-12-10 | Weather demo; Heroku link now returns HTTP 404 |
| `weatherApp` | JavaScript | 2022-12-10 | No description |
| `-squid-proxy-installer` | — | 2022-07-21 | No description |
| `notes-app` | JavaScript | 2021-11-03 | No description |
| `PhaserDemo` | JavaScript | 2019-04-06 | No description |
| `node-todo-api` | JavaScript | 2018-12-18 | No description |
| `node-web-server` | JavaScript | 2018-11-30 | Description is only `Demo:` |
| `weather-app` | JavaScript | 2018-11-30 | No description |
| `notes-nodejs` | JavaScript | 2018-11-26 | No description |
| `interactive-tutorials` | Python | 2017-11-18 | Fork — Apache-2.0 tutorials |
| `JUnit` | Java | 2017-11-18 | No description |
| `HostStats` | HTML | 2017-11-16 | Spring Boot, MySQL, REST, Nginx; has a screenshot |
| `pwojczyn.com` | CSS | 2017-11-16 | Portfolio page; has a screenshot |
| `HostStatsDesktop` | Java | 2017-11-16 | JavaFX client; no README |
| `HostStatsAgent` | Java | 2017-11-16 | No description |
| `reservationApp` | HTML | 2017-11-16 | Spring Boot |
| `firstSpring` | HTML | 2017-11-16 | Spring Boot |
| `ContactBook` | Java | 2017-11-16 | JavaFX |
| `loanCheck` | Shell | 2017-10-07 | No description |
| `NewJavaFXProject` | Java | 2017-09-23 | No description |
| `lambda` | Java | 2017-09-10 | No description |
| `Parking` | Java | 2017-07-28 | No description |
| `start-java-projects` | Java | 2017-04-20 | No description |

**Private repositories:** explicitly excluded from this document. Their names,
descriptions, code, infrastructure details and activity are not published.

### Repository quality observations

- Many older repositories have no description, no topics and no README.
- Several are learning/demo projects from 2017–2023 and are not strong portfolio
  material.
- Three public repositories are forks and are therefore not presented as
  original work.
- `HostStats` and `pwojczyn.com` have short READMEs with screenshots, but no
  topics and no recent activity.
- The only current, actively developed public project is
  `NieboGuard-Community`.

## 4. NieboGuard Community repository

| Check | Result |
| :--- | :--- |
| Visibility | Public |
| Description | “NieboGuard Community — open-source Sensor Hub, ASTERIX/ADS-B simulator & protocol knowledge base. All data synthetic (simulated=true), educational only.” |
| Homepage | `https://nieboguard.pl/` |
| Default branch | `main` (during the initial audit it was `community/bootstrap`; the repository was updated externally during this task) |
| Other branches | `community/bootstrap`, `docs/knowledge-hub` |
| README | Present on both branches, but different documents |
| License | MIT |
| Issues | Enabled; 0 open issues at audit time |
| Wiki | Enabled |
| Releases | 1 (test APK) |
| GitHub Pages | Not configured |
| Community files | `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `THIRD_PARTY_NOTICES.md`, issue/PR templates |
| Workflows | `ci.yml`, `build-release.yml` — both use `contents: read` |

### Documentation findings

> **Concurrent update:** while this profile work was in progress, `main` advanced
> and became the default branch. The points below describe the initial audit and
> their current status. No user work was overwritten.

1. **Default branch mismatch — resolved externally.** The default is now `main`.
   `community/bootstrap` remains available but is no longer the landing branch.
2. **Stage count inconsistency — partially resolved.** The current `README.md`
   refers to stages 1–12, but `CONTRIBUTING.md` still says “stages 1-11” while
   listing 12.
3. **License filename — resolved.** The current README points to `LICENSE`.
4. **Docker quick start — still needs care.** The current README shows
   `docker-compose up -d` without a root compose file; the compose file and
   Dockerfile are under `node/`. Run the command from that directory or add a
   root compose file.
5. **Public/experimental boundary is good.** The README explicitly states that
   production code, secrets, VPS configuration and user data are not published.
   This must be preserved.
6. **Topics are now aligned.** Current topics include `adsb`, `asterix`,
   `aviation`, `community`, `educational`, `geospatial`, `go`, `open-source`,
   `polish-english`, `protocol-lab`, `real-time`, `sensor-hub`, `simulator` and
   `situational-awareness`. `cloudflare` is **not** supported by the repository
   content and was not added.

## 5. Website audit — `nieboguard.pl`

| Check | Result |
| :--- | :--- |
| HTTP status | 200 |
| Final URL | `https://nieboguard.pl/` |
| Title | `NieboGuard — Mapa Nieba, Informacje Lotnicze i Obserwacje` |
| Meta description | Present |
| Open Graph image | `https://nieboguard.pl/assets/share-panel-v3.jpg` |
| Brand mark | `https://nieboguard.pl/assets/brand-mark.svg` — original SVG, blue gradient shield with a radar/crosshair motif |
| Languages | PL / EN / UA |
| Safety notice | Prominent: independent information platform, not an official warning system, does not replace RCB alerts or emergency services |

### Website observations

- The website presents an interactive map, airspace zones, community reports,
  alerts, aviation layers, an AI question panel and “NieboGuard Compute”.
- The public positioning already matches the requested profile narrative:
  situational awareness, geospatial data and open community tools.
- **The site links to `https://github.com/cukierrro/Straznik`, not to
  `pwojczyn/NieboGuard-Community`.** This is a missed path from the product to
  the public community repository.
- No evidence of an official government or military affiliation is presented,
  and the profile must not imply one.

## 6. Visual identity

Elements worth preserving:

- Deep blue / graphite palette.
- The blue gradient shield mark with a radar/crosshair motif.
- Aviation and geospatial cues (radar sweep, orbit lines, aircraft silhouette).
- A clear, non-alarmist tone.

No third-party stock art was found or used. The banner and project artwork in
this repository are original SVGs. The NieboGuard brand mark is reused locally
as the project's own mark, with its source recorded in
[`DESIGN.md`](DESIGN.md).

## 7. Profile-level gaps and risks

| Priority | Gap | Impact |
| :--- | :--- | :--- |
| P0 | No profile README | The profile has no narrative or entry point |
| P0 | Bio and website are outdated | At audit time visitors saw a generic technology list and `nullexa.eu`; the bio was later changed externally, the website still needs attention |
| P1 | Pinned repositories are old 2017 projects | The most relevant work is not the first thing visitors see |
| P1 | No automated, trustworthy statistics | Any manual numbers would drift or be invented |
| P2 | Many public repos lack descriptions/topics | Repository tab looks unfinished |
| P2 | Dead legacy demo link (`web-server-nodejs` → Heroku 404) | Minor credibility issue |
| P2 | No link from nieboguard.pl to the Community repository | Lost community discovery path |

## 8. Permissions and constraints

Authenticated token scopes observed: `repo`, `read:org`, `gist`,
`admin:public_key`.

- **Can** create and push the profile repository, edit repository metadata and
  topics, and run Actions in owned repositories.
- **Cannot** update the user profile (`PATCH /user` requires the `user` scope).
  Display name, bio, website and social links therefore require a manual update.
- **Cannot** set pinned repositories through a supported REST/GraphQL API.
  Pinning is a web-UI setting and requires manual action.

No token, credential or private repository detail is recorded in this document.

## 9. Decisions taken

1. Create the profile repository as public, without touching any existing
   repository visibility.
2. Build an original dark aerospace/radar visual system, with a readable
   professional layout.
3. Feature NieboGuard first and NieboGuard Community second.
4. Do not feature forks or unrelated demo repositories.
5. Generate statistics locally and via GitHub Actions from **public** data only.
6. Keep all profile claims verifiable and mark experimental work as
   experimental.
7. Leave account-level fields (display name, bio, website, pinned repos) as
   documented manual steps because the token cannot change them safely.

## 10. Follow-up actions

See [`TODO.md`](TODO.md) for the current status and
[`MAINTENANCE.md`](MAINTENANCE.md) for the update procedure.
