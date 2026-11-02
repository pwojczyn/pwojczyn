# Rendering Verification

- **Date:** 2026-11-02
- **Public profile:** <https://github.com/pwojczyn/pwojczyn>
- **Polish page:** <https://github.com/pwojczyn/pwojczyn/blob/main/docs/README.pl.md>
- **Method:** Playwright 1.64.1 with Chromium, anonymous browser context, real
  `github.com` pages (not a local Markdown preview).
- **Theme:** GitHub light and dark (`prefers-color-scheme: dark`).

## Viewports

| Viewport | Page | Page scroll width | README width | Images loaded | Tables fit |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1920 × 1080 | English | 1920 | 846 / 846 | 9 / 9 | 431 / 431 |
| 1440 × 900 | English | 1440 | 846 / 846 | 9 / 9 | 431 / 431 |
| 768 × 1024 | English | 768 | 398 / 398 | 9 / 9 | 398 / 398 |
| 390 × 844 | English | 390 | 308 / 308 | 9 / 9 | 308 / 308 |
| 360 × 800 | English | 360 | 278 / 278 | 9 / 9 | 278 / 278 |
| 1440 × 900 | English, dark | 1440 | 846 / 846 | 9 / 9 | 431 / 431 |
| 390 × 844 | English, dark | 390 | 308 / 308 | 9 / 9 | 308 / 308 |
| 1440 × 900 | Polish | 1440 | 1012 / 1012 | 9 / 9 | 526 / 526 |
| 390 × 844 | Polish | 390 | 324 / 324 | 9 / 9 | 324 / 324 |

`clientWidth / scrollWidth` values are shown for the README container and the
generated statistics table. Page-level horizontal scroll was absent in every
case.

## Checks performed

- Banner loaded at every viewport (natural size 1000 × 420) and shows the
  `pwojczyn` handle.
- Project capability map loaded (natural size 640 × 480).
- Badges and icons loaded; no broken image and no failed request for
  `github.com/pwojczyn`, `camo.githubusercontent.com`,
  `raw.githubusercontent.com` or `nieboguard.pl`.
- Language switch: English → `docs/README.pl.md`; Polish → root `README.md`.
- Key links resolved: website, community repository, contributing guide, code of
  conduct, security policy, issues and contact page.
- Statistics section present in both languages and contains the current public
  repository count.
- No page-level horizontal scroll at 1920, 1440, 768, 390 or 360 px.
- No table overflow after the featured-project status table was converted to a
  list (the 3-column table was 51 px too wide at 360 px).
- Light and dark modes both render; the artwork is self-contained and does not
  depend on theme colours.
- The final README was re-verified after integrating a concurrent edit and
  restoring the featured-project section: all checks passed again.

## Observations

- The banner's fine print is intentionally small at 360–390 px. A native Markdown
  subtitle directly below the image repeats the key message at normal body size,
  and the full description is in the README text.
- GitHub renders the README inside a container narrower than the viewport on
  tablet and mobile because of the profile sidebar; the artwork scales to that
  container without cropping.
- No JavaScript is required by the README content.

## Screenshots

Public pages only; no session, token or private account data is visible.

| File | State |
| :--- | :--- |
| `docs/screenshots/desktop-1440-light.png` | English, 1440 × 900, light |
| `docs/screenshots/desktop-1440-dark.png` | English, 1440 × 900, dark |
| `docs/screenshots/tablet-768-light.png` | English, 768 × 1024, light |
| `docs/screenshots/mobile-390-light.png` | English, 390 × 844, light, README hero |
| `docs/screenshots/mobile-360-light.png` | English, 360 × 800, light, README hero |
| `docs/screenshots/mobile-390-stats.png` | English, 390 × 844, statistics table |
| `docs/screenshots/mobile-390-polish.png` | Polish, 390 × 844, light, hero |

## Workflow verification

| Run | Change | Result |
| :--- | :--- | :--- |
| [41431466828](https://github.com/pwojczyn/pwojczyn/actions/runs/41431466828) | Initial workflow, checkout v4.2.2 | Success; no commit because content was unchanged |
| [41431584450](https://github.com/pwojczyn/pwojczyn/actions/runs/41431584450) | Checkout v7.0.1 | Success; no commit because content was unchanged |
| [41431652598](https://github.com/pwojczyn/pwojczyn/actions/runs/41431652598) | Pinned `ubuntu-24.04` | Success; no commit because content was unchanged |

Each run used `workflow_dispatch`, the built-in `GITHUB_TOKEN`, and the
`contents: write` permission only.

## Limitations

- The verification used the anonymous public view. Account settings, private
  repository pages and logged-in navigation were not tested.
- GitHub can change its layout or Markdown CSS; re-run the visual check after
  substantial README changes.
- The Playwright harness is a local test artifact and is not committed as a
  project dependency. The repository itself has no Node.js runtime dependency.
