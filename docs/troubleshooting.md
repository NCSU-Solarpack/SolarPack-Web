# Troubleshooting

Start here when something's broken. Organised by where the problem shows up.

**First three questions, always:**

1. **What does the browser console say?** `F12` → Console. Red errors usually name the file.
2. **Is it local only, production only, or both?** Local-only → your `.env` or `node_modules`.
   Production-only → GitHub Actions secrets or the deploy. Both → the code or Supabase.
3. **Did it ever work?** `git log --oneline -20` and, if you know a good commit,
   `git diff <good-commit> HEAD -- src/`.

---

## Setup and local development

### `npm install` fails

| Error | Fix |
|---|---|
| `EACCES` / permission denied | Node was installed with sudo. Reinstall from nodejs.org |
| `ERESOLVE` peer dependency conflict | `npm install --legacy-peer-deps`, or check you're on Node 18+ |
| Network/proxy errors on NC State wifi | Try a different network or a phone hotspot |
| Anything weird after a `git pull` | `rm -rf node_modules package-lock.json && npm install` |

### `npm run dev` won't start

**`Port 5173 is in use`** — another dev server is running. Kill it, or Vite will offer the next
port; either is fine.

**Blank white page, console full of module errors** — stale build cache:

```sh
rm -rf node_modules/.vite
npm run dev
```

**`command not found: npm`** — Node isn't installed or isn't on your PATH.
`node --version` should print `v18` or higher.

### The site loads but no data appears

Nine times out of ten this is `.env`. Symptoms: Home's progress tracker stuck at 0%, Team/Sponsors
showing errors, `Supabase not configured` in the console.

Check, in order:

1. `.env` exists **in the project root** — not in `src/`.
2. Variables are named exactly `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. Only `VITE_`
   prefixed variables reach the browser.
3. No quotes around the values, no trailing spaces.
4. **Restart `npm run dev`.** Vite reads `.env` at startup — editing it while the server runs
   changes nothing.

Then verify the key works:

```js
// paste in the browser console
console.log(import.meta.env.VITE_SUPABASE_URL)
```

`undefined` means the variable never got in. Full setup in
[Getting Started](getting-started.md#5-create-your-env-file).

---

## Signing in

| Symptom | Cause | Fix |
|---|---|---|
| Stuck on `/pending-approval` | `approval_status` isn't `'approved'` | A director approves you in Team → Pending. Bootstrapping the first one needs [SQL](getting-started.md#7-get-an-admin-account) |
| Signup hangs | "Confirm email" got enabled in Supabase | Authentication → Providers → Email → turn it **off** |
| Login flashes then bounces back | Auth state read before `waitForInit()` | `await authService.waitForInit()` before reading auth state |
| Password reset email never arrives | Supabase's built-in mailer is rate-limited and often lands in spam | Check spam; for real volume, configure custom SMTP |
| Reset link opens but fails | Redirect URL not allow-listed | Add `/reset-password` for localhost *and* prod in Auth → URL Configuration |
| Signed out after leaving a tab open | Refresh token expired while throttled | Expected. Sign back in |
| A director can't see Pending Approvals | Their own row isn't `level='director'` **and** `approval_status='approved'` | `is_approved_admin()` requires both — check with SQL |

More in [Authentication](authentication.md#troubleshooting).

---

## The admin dashboard

### A tab is missing

Your role lacks its permission. Check the matrix in
[Admin Dashboard](admin-dashboard.md#the-tabs) and ask a director.

### Buttons are visible but saving fails

The UI permission check and the RLS policy disagree. `hasPermission()` runs in the browser and
only decides what renders; Postgres decides what's allowed.

Supabase → **Logs → Postgres**, filter to the time of the failure. An RLS denial typically returns
**zero rows and no error**, so "nothing happened" is the signature.

### "New data available" won't go away

Someone else is editing the same table. Click it to pull their changes in. This is
`useSupabaseSyncStatus` doing its job — it warns instead of overwriting.

### A stat card is stuck on `...`

That manager failed to load. The console will say why — usually a failed query or an RLS denial.

### Changes disappear after saving

The optimistic update succeeded but the write failed and the refetch reverted it. Look for an error
dialog and check the console. Reload before trusting the screen.

### A field I added doesn't save

Missing from the `transformXToDB` half of the pair — it fails **silently**, no error. See
[Making Changes](making-changes.md#recipe-add-a-field-to-an-existing-feature).

---

## Data and Supabase

### A query returns nothing, with no error

The signature of an RLS denial.

1. Run the same query in the Supabase **SQL Editor** — it runs as `service_role` with RLS off. If
   it works there but not in the app, RLS is the cause.
2. Check the table has a `select` policy covering your role.
3. Sign in as a real member in a private window and reproduce.
4. Local-only last resort: `alter table x disable row level security;`, confirm the theory,
   **immediately re-enable it**.

### `column ... does not exist`

The database and the code disagree. Someone added a column in one place only. Compare the live
schema against `schemas/`:

```sh
npx supabase login
npx supabase link --project-ref YOUR-REF
npx supabase db dump -f live-schema.sql
```

Then diff it against the files in `schemas/`. They have drifted before.

### `syntax error at or near "order"`

`order` is a SQL reserved word. Quote it:

```sql
select * from team_members order by "order" asc;
```

### `duplicate key value violates unique constraint`

A sequence is behind the data — common after restoring a dump:

```sql
select setval('orders_id_seq', (select coalesce(max(id), 0) from orders));
```

Repeat per table.

### Realtime updates stop arriving

- The table isn't in the publication:
  ```sql
  alter publication supabase_realtime add table public.schedule_projects;
  ```
  A subscription to an unpublished table fails **silently**.
- Or the websocket died in a background tab — refocusing re-subscribes.

### Image uploads fail

| Cause | Check |
|---|---|
| Over 5 MB | Client-side limit in the manager |
| MIME type not allowed | `file-storage` has an allow-list — see [Files](files.md#limits) |
| Bucket doesn't exist | Supabase → Storage |
| Storage quota full | Supabase → Settings → Usage. **This breaks uploads site-wide**, including headshots and receipts |

---

## Build and deploy

### `npm run build` fails but `npm run dev` works

Dev mode is more forgiving. Usually:

- an import path with wrong casing — fine on macOS/Windows, fatal on Linux CI,
- an unused import of a file that no longer exists,
- a syntax error inside a code path dev never executed.

Read the error; it names the file and line.

### `npm run lint` errors with "couldn't find a configuration file"

Expected — the repo has **no ESLint config file**, so the script can't run. CI doesn't run it
either (the workflow is `npm ci` + `npm run build` only), so this blocks nothing. If you want
linting, add an `.eslintrc.cjs` and an `.eslintignore` containing `dist`.

### Pushed but nothing deployed

The workflow's `paths` filter didn't match. Changes only to `docs/`, `schemas/`, or `README.md`
don't trigger a deploy. Force one: **Actions → Deploy to GitHub Pages → Run workflow**.

### Deployed site shows no data (localhost is fine)

Missing or stale GitHub Actions secrets. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in
Settings → Secrets and variables → Actions, **then re-run the workflow** — secrets are baked in at
build time, so changing one does nothing until you rebuild.

### Custom domain reverted to `github.io`

[public/CNAME](../public/CNAME) is missing from the build. It must be in `public/` so Vite copies
it into `dist/`.

### Deep links 404

`404.html` didn't make it into `dist/`. Confirm it's in `public/`. See
[Deployment](deployment.md#client-side-routing-on-pages).

More in [Deployment](deployment.md#troubleshooting).

---

## Race telemetry

| Symptom | Cause | Fix |
|---|---|---|
| "Waiting for car" forever | Relay unreachable or nothing publishing | Open `<RELAY_URL>/packet` directly in a browser |
| Live gauges work, no laps | No start/finish line set, or no running session | Pit Controls → set the line, create and start a session |
| Pit Controls not visible | Needs `control_telemetry` (leader/director) | Sign in with the right role |
| Laps recorded at the wrong place | Geofence radius too large/small | Adjust lap radius (default 15 m) and min lap time (default 20 s) |
| History empty for a session | The relay writes history — no service-role key, no history | Check `SUPABASE_SERVICE_ROLE_KEY` on Render |

See [Race Telemetry](race-telemetry.md).

---

## Diagnostic commands

```sh
# Environment
node --version && npm --version

# What changed recently
git log --oneline -20
git diff HEAD~1

# Full reinstall
rm -rf node_modules package-lock.json && npm install

# Clear Vite's cache
rm -rf node_modules/.vite

# Exactly what CI runs
npm run build

# Serve the real bundle
npm run preview

# Snapshot the live database schema
npx supabase db dump -f live-schema.sql
```

In the browser console:

```js
import.meta.env.VITE_SUPABASE_URL     // is the env var present?
localStorage                          // supabase auth tokens live here
```

---

## Still stuck

1. Read the console error properly — it usually names the file and line.
2. Search the codebase for the error text (`Cmd/Ctrl+Shift+F`).
3. Check whether it's a known rough edge:
   [Architecture → Known rough edges](architecture.md#known-rough-edges).
4. Supabase → **Logs** (Postgres for RLS/queries, API for requests, Auth for sign-in).
5. Reproduce in a private window with a fresh sign-in — rules out stale local state.
6. `git stash` your changes and confirm whether `main` has the same problem.

---

## Related docs

- [Getting Started](getting-started.md) · [Architecture](architecture.md) ·
  [Supabase Setup](supabase.md) · [Authentication](authentication.md) ·
  [Deployment](deployment.md) · [Making Changes](making-changes.md)
