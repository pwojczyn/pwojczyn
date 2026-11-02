# Maintenance Guide

This repository is the public GitHub profile README for
[`pwojczyn`](https://github.com/pwojczyn). It contains no application code and
no private data.

## Repository layout

```text
.
├── README.md                     # English profile (GitHub renders this)
├── assets/
│   ├── banner.svg                # hero artwork
│   ├── banner.png                # raster fallback, 2000 × 840
│   ├── project-nieboguard.svg    # public capability map
│   ├── badges/                   # local link badges
│   └── icons/                    # 24 px capability icons
├── docs/
│   ├── README.pl.md              # full Polish version
│   ├── PROFILE_AUDIT.md          # initial audit
│   ├── DESIGN.md                 # visual and content decisions
│   ├── IMPLEMENTATION_LOG.md     # work log
│   ├── MAINTENANCE.md            # this file
│   ├── RENDERING.md              # verification report
│   └── TODO.md                   # remaining work
├── scripts/
│   └── update-profile.mjs        # public statistics generator
└── .github/
    └── workflows/
        └── update-profile.yml    # weekly + manual refresh
```

## Updating the statistics

The table between `<!-- STATS:START -->` and `<!-- STATS:END -->` is generated in
both `README.md` and `docs/README.pl.md`.

### Automatic

The workflow runs every Monday at 04:17 UTC and can be started manually:

1. Open **Actions → Update profile statistics → Run workflow**.
2. Select the `main` branch.
3. Confirm. The workflow uses the built-in `GITHUB_TOKEN`; no repository secret
   is required.

The job:

- reads only public account and repository data,
- retries transient failures with backoff,
- times out each request and the whole job,
- writes files only when their content changes,
- commits only when `git diff` is non-empty,
- never prints the token.

### Local

```bash
GITHUB_TOKEN="$(gh auth token)" node scripts/update-profile.mjs
git diff -- README.md docs/README.pl.md
```

Running it twice on the same day should produce **no second change** (idempotent
behaviour). The only value that changes on a new day is `Last refreshed` /
`Ostatnia aktualizacja`.

### What is counted

- **Public repositories:** all repositories with `private: false`.
- **Public source projects:** the same set, excluding forks.
- **Top languages:** the five largest language totals by bytes across public
  non-fork repositories, using the GitHub Languages API.
- **GitHub since:** the public account creation year.

Stars and followers are intentionally omitted while they are zero. If they become
meaningful, add them to both language variants and to the script output; do not
hard-code them.

## Updating text or artwork

1. Edit the English `README.md` first.
2. Mirror the change in `docs/README.pl.md`; keep section order, links and status
   labels aligned.
3. If an image is added, commit it under `assets/` and give it a descriptive
   `alt` text. Do not hotlink external images.
4. If the banner changes, edit `assets/banner.svg`, then regenerate the PNG:

   ```bash
   magick -background none assets/banner.svg \
     -resize 2000x840 -depth 8 -strip assets/banner.png
   ```

5. Verify the rendered result before pushing (see below).

## Verification checklist

Run before every meaningful change:

```bash
# SVG/XML validity
python3 - <<'PY'
import glob, xml.etree.ElementTree as ET
for f in glob.glob('assets/**/*.svg', recursive=True):
    ET.parse(f)
    print('OK', f)
PY

# Script idempotency
GITHUB_TOKEN="$(gh auth token)" node scripts/update-profile.mjs
GITHUB_TOKEN="$(gh auth token)" node scripts/update-profile.mjs

# Markdown/relative-link check
# (see docs/RENDERING.md for the command used during implementation)

# Secret and private-data scan
grep -RInE 'gho_[A-Za-z0-9]{20,}|github_pat_|BEGIN .*PRIVATE KEY' \
  --exclude-dir=.git . || true

# Workflow YAML parse
python3 -c "import yaml; yaml.safe_load(open('.github/workflows/update-profile.yml'))"

git diff --check
git status --short
```

For a visual check, open the public profile after pushing:

- <https://github.com/pwojczyn/pwojczyn>
- <https://github.com/pwojczyn/pwojczyn/blob/main/docs/README.pl.md>

Check at 1920 × 1080, 1440 × 900, 768 × 1024, 390 × 844 and 360 × 800. Confirm
that the banner and capability map load, that the language switch works, and that
there is no page-level horizontal scroll.

## Workflow security

`update-profile.yml` follows these rules:

- `permissions: contents: write` only;
- no repository secrets;
- `concurrency` prevents overlapping runs;
- `timeout-minutes: 10`;
- `actions/checkout` pinned to the verified v7.0.1 commit SHA;
- no third-party actions;
- no private repository data in API calls or logs;
- commit only when content changed.

When updating the checkout action:

1. Verify the release tag and commit SHA from the official
   `actions/checkout` repository.
2. Replace the SHA and keep the version in a comment.
3. Run the workflow manually and confirm success before relying on the schedule.

## Account-level settings (manual)

The current token has `repo`, `read:org`, `gist` and `admin:public_key` scopes.
It cannot update the user profile or pinned repositories. Do these in the GitHub
web UI:

1. **Settings → Public profile**
   - Name: `pwojczyn`
   - Bio: `Building NieboGuard | Real-Time Systems, Geospatial Data, Cloud & AI | Open Source`
   - Website: `https://nieboguard.pl/`
2. **Profile → Customize your pins**
   - Pin `pwojczyn/pwojczyn`
   - Pin `pwojczyn/NieboGuard-Community`
   - Optionally keep `HostStats` as earlier full-stack work.
   - Unpin repositories that are no longer representative.
3. **NieboGuard-Community → About**
   - Description: use a concise, accurate sentence; keep the “synthetic data /
     educational” caveat.
   - Add topics: `aviation`, `open-source`, `geospatial`, `real-time`,
     `situational-awareness` (the API update in this task already applied the
     supported set).
   - Do not add `cloudflare` unless the repository actually contains Cloudflare
     configuration.

## Restoring a previous version

History is never rewritten. To restore an earlier README or asset:

```bash
git log --oneline -- README.md
git revert <commit>
```

Do not use `git push --force` on this repository.

## Privacy and safety rules

- Never add private repository names, code, infrastructure addresses, API keys,
  `.env` files or user data.
- Do not present NieboGuard as an official warning system or air traffic control.
- Do not add military affiliation, service history or personal data.
- Do not copy third-party artwork without a compatible licence.
- Keep all simulation data labelled as synthetic.
