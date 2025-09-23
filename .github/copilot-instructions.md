# Easypanel Compose AI Guide
## What lives here
- Maintains sanitized docker-compose bundles for Appwrite, Dify, Plane, Supabase, Twenty under `<service>/code`.
- Each bundle is generated from upstream repositories via Node scripts; do not hand-edit `code/**`.
- Legacy shell helpers exist, but the `update.js` scripts in each service directory are the source of truth.

## Layout essentials
- Root `update.js` glob-selects every `*/update.js` and runs them sequentially.
- `utils.js` centralizes cloning, copying, YAML edits (`yaml.parseDocument`), and search-replace helpers.
- `.gitignore` drops the transient `repo/` clones and `node_modules/` from version control.

## Running updates
- Run `npm install` once, then `npm run update` (or `node update.js`) to refresh all services.
- Use commands like `node supabase/update.js` for isolated testing while refining transformations.
- Updates overwrite `<service>/code` through `cp -r`; stash local experiments elsewhere before running.
- Inspect `git status` after updates; large directories may hide meaningful diffs.

## Transformation rules
- Always call `removeContainerNames` and `removePorts` on the main compose file (`docker-compose.yml` or `.yaml`) so Easypanel can assign names and ports.
- Keep service adaptations scripted (e.g., `twenty/update.js` calls `searchReplace` to force Redis and URL defaults).
- Extend `utils.js` instead of mixing ad-hoc shell commands to preserve YAML structure and comments.
- Validate generated compose files with `docker compose config` when changing transformation logic.

## Service notes
- `supabase/update.js` clones `supabase/supabase` and copies `repo/docker/` into `supabase/code/`.
- `dify/update.js` targets `docker-compose.yaml`; double-check paths when adding helpers for `.yaml` files.
- `plane/update.js` tracks the `preview` branch and renames `variables.env` to `.env.example` before cleanup.
- `twenty/update.js` clones via SSH (`git@...`) and enforces `SERVER_URL=https://$(PRIMARY_DOMAIN)` plus Redis/APP_SECRET defaults.
- `appwrite/update.js` curls published compose/env templates and then strips ports and container names.

## Gotchas
- `cloneOrPullRepo` uses `--depth 1`; bump `depth` only if upstream history is required for a change.
- `copyDir` shells out to `rm -rf` before copying; verify destination paths to avoid accidental wipes.
- Keep new scripts ESM-friendly (`type: "module"`, top-level await) to match the rest of the toolchain.
- When adding services, remember to update root `package.json` scripts only if new orchestration is required.
