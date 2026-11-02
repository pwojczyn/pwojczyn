# Design Decision — GitHub Profile Visual System

- **Date:** 2026-11-02
- **Scope:** profile README hero, banner, project card, icons, badges, stats
- **Decision:** **Variant B — Aerospace / Radar Technology Portfolio**, executed with
  the information discipline of Variant A.

## 1. Goals

The profile must read as the work of an independent engineer building real
systems, not as a badge collection. The visual language should:

- make NieboGuard the first thing a visitor understands,
- feel technical and aviation-related without looking military or official,
- remain readable in GitHub light and dark themes,
- work on a 360 px mobile viewport,
- avoid third-party images, fonts, trackers and animated widgets,
- degrade gracefully if images are blocked.

## 2. Variants considered

### A — Professional Developer Portfolio

- Light, typographic, near-monochrome.
- Strengths: maximum readability, neutral, fast.
- Weaknesses: generic; does not communicate aviation, geospatial data or the
  character of NieboGuard.

### B — Aerospace / Radar Technology Portfolio

- Deep navy and graphite field, restrained radar geometry, orbit lines, a
  civilian aircraft silhouette, signal points and map contours.
- Strengths: distinctive, directly connected to the product domain, works well
  as a dark hero on both GitHub themes.
- Weaknesses: risk of visual noise and small text at mobile widths if
  over-designed.

### Comparison

| Criterion | A | B |
| :--- | :--- | :--- |
| Readability | Excellent | Good, if text is kept large and sparse |
| Product identity | Weak | Strong |
| Aviation / geospatial cue | None | Direct but non-literal |
| Mobile behaviour | Excellent | Good with a wide, simple hero |
| Risk of looking militaristic | Low | Manageable: civilian aircraft, blue palette, no insignia |
| Maintenance cost | Low | Low (static SVG) |

## 3. Chosen direction

**Variant B, constrained by Variant A's hierarchy.**

The banner carries the atmosphere. The README carries the information. No
important claim depends on text inside an image: every image has descriptive
alternative text, and the same facts appear as Markdown below the hero. This
keeps the page readable when images are unavailable and on narrow screens.

## 4. Information hierarchy

1. Identity — name, discipline, current focus.
2. What is being built — NieboGuard.
3. Public open-source work — NieboGuard Community.
4. Capability map — data sources → processing → visualization → community.
5. Technology stack, split into confirmed and exploring.
6. Selected public work / history.
7. Trustworthy statistics.
8. Collaboration and contact.
9. Safety disclaimer.

## 5. Palette

| Token | Value | Use |
| :--- | :--- | :--- |
| `bg.deep` | `#060A14` | Banner base |
| `bg.navy` | `#0A1426` | Cards, badge fill |
| `bg.navy-2` | `#0B1A33` | Gradient end |
| `line` | `#1E3152` | Dividers |
| `line.strong` | `#2B4066` | Card and badge strokes |
| `text.primary` | `#F2F7FF` | Names and headings |
| `text.body` | `#C7D6EE` | Body copy in artwork |
| `text.muted` | `#8FA3C2` | Secondary copy |
| `accent.blue` | `#6F9CFF` | Primary accent |
| `accent.violet` | `#8B7CF6` | Secondary accent |
| `accent.cyan` | `#59D7E8` | Signal / live accent |

The palette is close to the public NieboGuard brand mark (blue gradient shield
with a radar motif) without copying the site layout.

## 6. Typography

- System UI stack only:
  `system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`.
- No web fonts, no font CDN, no JavaScript.
- Banner hierarchy: 62 px name, 26 px discipline lines, 18 px project line,
  10 px metadata (in a 1000 × 420 viewBox).
- README hierarchy: one `h1` (hero), `h2` for sections, `h3` for projects.
- Body copy stays in native Markdown so GitHub controls theme colours and
  accessibility.

## 7. Assets

| Asset | Purpose |
| :--- | :--- |
| `assets/banner.svg` | Primary hero; local, static, scalable |
| `assets/banner.png` | Raster fallback rendered from the SVG at 2000 × 840 |
| `assets/project-nieboguard.svg` | Public capability map; intentionally generic |
| `assets/icons/*.svg` | Four 24 px line icons for capability areas |
| `assets/badges/*.svg` | Local link badges; no shields.io dependency |
| `docs/screenshots/` | Local verification artefacts (see `RENDERING.md`) |

All artwork is original and stored in the repository. No external image host is
required for the README to render.

### Brand mark provenance

The small shield/radar mark in the banner is derived from the public NieboGuard
brand mark published at `https://nieboguard.pl/assets/brand-mark.svg`. It is the
project's own mark and is used here to represent the project. It is embedded
locally; the profile does not hotlink the website. No third-party stock imagery
is used.

## 8. Theme behaviour

- The banner and project card are intentionally dark in both GitHub themes.
  They are self-contained images, not transparent overlays, so light mode
  cannot wash out the text.
- All body text, links, tables and code blocks use native Markdown, so GitHub
  supplies accessible theme colours.
- No `#gh-dark-mode-only` / `#gh-light-mode-only` duplication is needed.

## 9. Responsive behaviour

- Artwork uses `viewBox` and is displayed at `width="100%"`.
- The banner is 1000 × 420 (2.38:1); at 360 px it scales to roughly 360 × 151
  without cropping or horizontal overflow.
- The capability map is 640 × 480; at 360 px it scales to 360 × 270.
- Critical facts are repeated in Markdown, so small artwork text is never the
  only source of information.
- Tables are short and use wrapping-friendly cells.

## 10. Statistics approach

Third-party card services (`github-readme-stats`, profile summary cards) were
rejected as a hard dependency: they add an external point of failure, can be
rate-limited and can render stale or unavailable images.

Instead, `scripts/update-profile.mjs` reads the public GitHub API and writes a
small native Markdown table between markers in both language versions. The
table is generated by GitHub Actions on a weekly schedule and on manual
dispatch. Native text is theme-aware, accessible, stable and works without
JavaScript.

Displayed metrics are deliberately limited to values that are public and
meaningful:

- public repository count,
- non-fork public project count,
- year the account became public,
- top languages by public repository language bytes,
- last refresh date.

Stars and followers are not displayed while they are zero; showing empty
vanity metrics adds no information.

## 11. Content rules

- No invented employers, degrees, certifications or awards.
- No military service, private location or personal contact data.
- No private repository names, infrastructure addresses or credentials.
- Implemented, experimental and planned capabilities are labelled separately.
- NieboGuard is always described as an independent information platform, not an
  official warning system or air traffic control service.
- Forks are not presented as original work.
