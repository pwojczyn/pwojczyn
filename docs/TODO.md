# TODO

## Completed

- [x] Audit the existing profile, public repositories, pinned items and website.
- [x] Confirm the profile repository did not exist and create it as public.
- [x] Create original SVG banner and PNG fallback.
- [x] Create the NieboGuard capability map and local icons/badges.
- [x] Document the visual decision and content rules in `docs/DESIGN.md`.
- [x] Write the complete English profile README.
- [x] Write the complete Polish profile README with a working language switch.
- [x] Feature NieboGuard as the main project with implemented/preview/experimental
      status labels.
- [x] Add a dedicated NieboGuard Community section and contribution paths.
- [x] Present the confirmed stack and separate experimental areas under
      “Exploring”.
- [x] Add an honest statistics block generated from public GitHub data.
- [x] Add a weekly/manual GitHub Actions workflow with least privilege, pinned
      actions, timeouts, retries, concurrency control and idempotent commits.
- [x] Verify relative links, external links, SVG validity, PNG output, script
      idempotency, workflow YAML and absence of obvious secrets.
- [x] Document maintenance, account-level manual steps and rollback.
- [x] Write this TODO list and the implementation log.

## In Progress

- [ ] Final visual verification at desktop, tablet and mobile widths.
- [ ] Publish commits and verify the public profile.

## Pending

- [ ] Run the `Update profile statistics` workflow manually after publication.
- [ ] Confirm the scheduled workflow is enabled and the first run succeeds.
- [ ] Verify the profile README is rendered at
      <https://github.com/pwojczyn/pwojczyn>.
- [ ] Verify both language versions from the public profile.
- [ ] Record screenshots or a static-validation note in `docs/RENDERING.md`.

## Manual configuration (requires the `user` scope or web UI)

- [ ] Set display name to `Piotr Wojczyński`.
- [ ] Set bio to
      `Building NieboGuard | Real-Time Systems, Geospatial Data, Cloud & AI | Open Source`.
- [ ] Set website to `https://nieboguard.pl/`.
- [ ] Review public social links; add only confirmed, public profiles.
- [ ] Pin `pwojczyn/pwojczyn` and `pwojczyn/NieboGuard-Community`.
- [ ] Unpin repositories that no longer represent current work.
- [ ] Apply the recommended topics/description to `NieboGuard-Community`
      through the API or UI; keep the “synthetic data / educational” caveat.
- [ ] Do **not** add `cloudflare` as a topic to the community repository unless
      Cloudflare configuration is actually added there.

## Optional enhancements

- [ ] Fix the community `CONTRIBUTING.md` stage count (says 11, lists 12).
- [ ] Fix the Docker quick-start command in the community README (no root
      compose file; the compose file and Dockerfile are under `node/`).
- [ ] Add a link from `nieboguard.pl` to the community repository.
- [ ] Add concise descriptions and topics to older public repositories, or
      archive repositories that are no longer maintained.
- [ ] Replace the dead Heroku demo link in `web-server-nodejs`.
- [ ] Consider larger, high-DPI screenshots for the README if the project page
      gains a stable public demo URL.
- [ ] Revisit stars/followers in the statistics block if they become meaningful.

## Observed external changes (not made by this task)

- The `NieboGuard-Community` default branch changed from `community/bootstrap`
  to `main`, and a new `main` README was pushed while this profile work was in
  progress. No user work was overwritten and no force push was used.
- The community description and topics were updated through the API in this
  task; visibility, default branch and repository content were not changed.
