# Supabase Setup & Operation

Supabase is the entire backend: Postgres database, user authentication, file storage, and
realtime change streams. This doc covers signing in, finding your way around, what the project
contains, and how to stand a new one up from scratch.

- Signing in → [Credentials](credentials.md)
- Table-by-table column reference → [Database Reference](database-reference.md)
- How roles and approvals work → [Authentication](authentication.md)

---

## Signing in to the dashboard

1. Go to **https://supabase.com/dashboard** and sign in with the shared SolarPack account.
   The email and password are recorded in **[docs/credentials.md](credentials.md)** — that is
   the only file in this repo that holds secrets.
2. You'll land on the organization page. Open the **SolarPack** project.
3. If a 2FA / email verification code is requested, it goes to the same
   `solarpacknc@ncsu.edu` inbox (NC State Google Workspace, sign in at mail.google.com).

> **Prefer your own account.** Rather than everyone sharing one login, a director can invite
> individual members: **Project Settings → Team → Invite member**, role `Developer` for people
> who need to read data, `Owner` only for directors. Shared logins can't be audited and can't be
> revoked individually. The shared account should be treated as the break-glass fallback.

### The five screens you'll actually use

| Left sidebar | What it's for |
|---|---|
| **Table Editor** | Spreadsheet view of every table. Fastest way to eyeball or hand-fix a row. |
| **SQL Editor** | Run arbitrary SQL. This is where you run the files in [schemas/](../schemas/). |
| **Authentication → Users** | The real list of accounts (`auth.users`). Delete/reset users here. |
| **Storage** | The file buckets. Browse, upload, delete, check bucket public/private settings. |
| **Logs → Postgres / API** | Where you go when a query "silently does nothing" — usually an RLS denial. |

---

## Getting your project keys

You need these for your local `.env` and for the GitHub Actions secrets.

1. In the project, click the gear → **Project Settings**.
2. Open **API** (older UI) or **API Keys** / **Data API** (newer UI).
3. Copy:
   - **Project URL** → `VITE_SUPABASE_URL` (looks like `https://abcdefgh.supabase.co`)
   - **`anon` / `public` key** → `VITE_SUPABASE_ANON_KEY` (a long JWT starting `eyJ...`)

```env
VITE_SUPABASE_URL=https://YOUR-REF.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### anon key vs service_role key — read this

| Key | Respects RLS? | Safe in the browser? | Used by |
|---|---|---|---|
| `anon` (public) | **Yes** | **Yes** — it's designed for it | This website |
| `service_role` | **No — bypasses everything** | **Never** | The telemetry relay server only |

The anon key being public is fine *by design*: it only gets you as far as your Row Level
Security policies allow. The `service_role` key is a master key. It must only ever be set as a
server-side environment variable (on Render, for the relay). If it ever appears in a `VITE_`
variable, in `src/`, or in a commit, it is compromised — rotate it immediately from
**Project Settings → API → JWT Settings**, which invalidates every existing token.

---

## What's in the project

### 13 tables

| Table | Holds | Schema file |
|---|---|---|
| `user_roles` | Role + approval status for every account | [supabase-user-roles-schema.sql](../schemas/supabase-user-roles-schema.sql) |
| `team_members` | Public roster | [supabase-team-schema.sql](../schemas/supabase-team-schema.sql) |
| `alumni` | Past members, grouped by semester (JSONB) | [supabase-alumni-schema.sql](../schemas/supabase-alumni-schema.sql) |
| `sponsors` | Sponsors and their tier | [supabase-sponsors-schema.sql](../schemas/supabase-sponsors-schema.sql) |
| `blogs` | Blog posts, `published` flag | [supabase-blogs-schema.sql](../schemas/supabase-blogs-schema.sql) |
| `orders` | Procurement records (~70 columns) | [supabase-orders-schema.sql](../schemas/supabase-orders-schema.sql) |
| `schedule_teams` | The 9 subteams | [supabase-schedule-schema.sql](../schemas/supabase-schedule-schema.sql) |
| `schedule_projects` | Projects per subteam | ↑ same file |
| `schedule_tasks` | Tasks under projects | ↑ same file |
| `clipboard_spaces` / `clipboard_items` | Code-gated shared scratchpad | [supabase-clipboard-schema.sql](../schemas/supabase-clipboard-schema.sql) |
| `race_tracks` / `race_sessions` / `live_telemetry` / `race_telemetry` / `race_laps` | Race telemetry | [supabase-race-telemetry-schema.sql](../schemas/supabase-race-telemetry-schema.sql) |

`auth.users` also exists but is managed by Supabase — you never write to it directly.
`user_roles.user_id` is a foreign key onto it with `on delete cascade`.

### 5 storage buckets

| Bucket | Public? | Contents | Created by |
|---|---|---|---|
| `team-images` | public | Member headshots | manually |
| `sponsor-logos` | public | Sponsor logos | manually |
| `blog-images` | public | Blog hero + inline images | [supabase-blogs-schema.sql](../schemas/supabase-blogs-schema.sql) |
| `order-receipts` | public *(should be private — see below)* | Receipt PDFs | manually |
| `file-storage` | public, 50 MB cap, MIME allow-list | General team file share | [supabase-file-storage-schema.sql](../schemas/supabase-file-storage-schema.sql) |

> **`order-receipts` is a public bucket.** Anyone who can guess or is given the URL
> (`.../order-receipts/1234.pdf` — receipts are named after the order ID, so they're trivially
> enumerable) can download a receipt containing purchase amounts and possibly card/PO details.
> `FilesManager` also deliberately hides these buckets behind a read-only "Website Data" folder,
> which is UI-level protection only, not access control. Making it private is a two-part change:
> flip the bucket to private in **Storage → order-receipts → Settings**, then change
> `getPublicUrl` to `createSignedUrl` in the receipt paths of
> [src/utils/supabase.js](../src/utils/supabase.js). Flagged in
> [Security & Handover](security-and-handover.md).

### Database functions

| Function | Returns | Used by |
|---|---|---|
| `is_approved_admin()` | true for approved leader/director | `user_roles` RLS policies |
| `is_approved_director()` | true for approved director | `user_roles` delete policy |
| `is_pit_crew()` | true for approved leader/director | `race_tracks` / `race_sessions` RLS |
| `get_clipboard_items(hash)` | Clipboard rows for a hash | `/clipboard` page |
| `save_clipboard_item(...)` | Upserted clipboard row | `/clipboard` page |
| `delete_clipboard_item(hash, id)` | boolean | `/clipboard` page |
| `update_updated_at_column()` / `update_blogs_updated_at()` / `update_clipboard_updated_at()` / `update_user_role_timestamp()` | trigger | Auto-bump `updated_at` |

The three permission helpers are `SECURITY DEFINER` **on purpose**: a policy on `user_roles` that
queries `user_roles` would recurse infinitely. `SECURITY DEFINER` runs the lookup as the function
owner, bypassing RLS inside the function body only. Don't "fix" that.

The clipboard functions are also `SECURITY DEFINER`, because `anon` and `authenticated` have
`REVOKE ALL` on the clipboard tables — the *only* way in is through these three functions, each
of which requires a ≥32-character access hash. That's the whole security model for `/clipboard`.

---

## Standing up a brand-new project

You'd do this to build a staging environment, or if the production project were ever lost.

### 1. Create the project

supabase.com/dashboard → **New project**. Pick a strong database password and **save it in the
team password manager immediately** — Supabase shows it once and you need it for direct `psql`
access and backups. Choose the region closest to Raleigh (`us-east-1`).

### 2. Enable the extension the schemas need

SQL Editor → **New query**:

```sql
create extension if not exists "pgcrypto";
```

Without it, every `gen_random_uuid()` default fails.

### 3. Run the schema files, in this order

Order matters — `team_members` references `user_roles`, and the schedule tables reference each
other. Open each file, copy its contents into the SQL Editor, run it, confirm success, move on.

```
1. schemas/supabase-user-roles-schema.sql        # first: others FK to it
2. schemas/supabase-team-schema.sql
3. schemas/supabase-sponsors-schema.sql
4. schemas/supabase-alumni-schema.sql
5. schemas/supabase-blogs-schema.sql
6. schemas/supabase-schedule-schema.sql          # also seeds the 9 subteams
7. schemas/supabase-orders-schema.sql
8. schemas/supabase-clipboard-schema.sql
9. schemas/supabase-file-storage-schema.sql      # creates the file-storage bucket
10. schemas/supabase-race-telemetry-schema.sql
```

**Gaps you have to fill in by hand** — these schema files are incomplete in known ways:

- `supabase-user-roles-schema.sql` calls a trigger function `update_user_role_timestamp()` that
  it never defines. Create it first:
  ```sql
  create or replace function update_user_role_timestamp()
  returns trigger as $$
  begin new.updated_at = now(); return new; end;
  $$ language plpgsql;
  ```
- `supabase-team-schema.sql`, `supabase-sponsors-schema.sql`, `supabase-alumni-schema.sql` and
  `supabase-orders-schema.sql` are **table definitions only — no RLS policies.** With RLS left
  disabled they're world-writable through the anon key; with RLS enabled and no policies they're
  unreadable. See [RLS](#row-level-security) below for the policies to add.
- `supabase-orders-schema.sql` references `update_updated_at_column()`, which is defined in
  `supabase-schedule-schema.sql` — hence running schedule before orders.

### 4. Create the storage buckets the schemas don't

Storage → **New bucket**:

| Name | Public | Notes |
|---|---|---|
| `team-images` | ✅ | |
| `sponsor-logos` | ✅ | |
| `order-receipts` | ❌ recommended | If you make it private you must also switch the code to signed URLs |

Then add read/write policies per bucket (Storage → the bucket → **Policies**): public `SELECT`,
and `INSERT`/`UPDATE`/`DELETE` for `authenticated`. Copy the pattern from
[supabase-blogs-schema.sql](../schemas/supabase-blogs-schema.sql) lines 83–109.

### 5. Configure Auth

**Authentication → Providers → Email**: enabled, and **"Confirm email" turned OFF**. The app's
approval flow replaces email confirmation — `Login.jsx` signs the user straight in after signup
and sends them to `/pending-approval`. If you turn confirmation on, signup appears to hang.

**Authentication → URL Configuration**:
- Site URL: `https://www.solarpacknc.com`
- Additional redirect URLs: `http://localhost:5173/reset-password`,
  `https://www.solarpacknc.com/reset-password`

Password-reset links land on `/reset-password`; if the URL isn't allow-listed, Supabase refuses
to redirect and the reset silently fails.

### 6. Point the app at it

Local: put the new URL + anon key in `.env`.
Production: **GitHub repo → Settings → Secrets and variables → Actions** →
`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. See [Deployment](deployment.md).

### 7. Create the first director

Sign up through the site, then in SQL Editor:

```sql
update user_roles
set level = 'director', approval_status = 'approved', approved_at = now()
where email = 'you@ncsu.edu';
```

Every subsequent account can be approved through the UI.

---

## Row Level Security

RLS is the *only* thing protecting the database, because the browser holds the anon key and
queries Postgres directly. There is no server to add checks in.

### The mental model

- RLS **off** on a table + anon key in the browser = anyone on the internet can read and write it.
- RLS **on** with no policies = nobody can do anything (except `service_role`).
- A policy is a boolean SQL expression evaluated per row, per operation.
- `auth.uid()` is the signed-in user's UUID inside a policy; it's `null` for anonymous visitors.
- `to authenticated` restricts a policy to signed-in users; `using (true)` allows everyone.

### Current posture, by table

| Table | Read | Write |
|---|---|---|
| `blogs` | Public sees `published = true`; authenticated sees all | any authenticated user |
| `schedule_teams` / `_projects` / `_tasks` | public | any authenticated user |
| `user_roles` | own row; leaders/directors see all | own row; leaders/directors update all; directors delete |
| `race_tracks` / `race_sessions` | public | `is_pit_crew()` — approved leader/director |
| `live_telemetry` / `race_telemetry` / `race_laps` | public | **no policy** — only the relay's service-role key |
| `clipboard_*` | no direct access; `SECURITY DEFINER` functions only | same |
| `team_members`, `sponsors`, `alumni`, `orders` | **not defined in the schema files — verify in the dashboard** | ↑ |

**"any authenticated user" is coarser than the UI implies.** The dashboard hides the Add/Edit
buttons from members via `authService.hasPermission()`, but a member's JWT is still an
`authenticated` JWT. Anyone who can sign in can write to blogs and schedules with a hand-crafted
request. The role system is genuinely enforced only where a policy calls
`is_approved_admin()` / `is_pit_crew()`. See
[Security & Handover](security-and-handover.md#1-rls-is-coarser-than-the-ui).

### Tightening a table to leader/director

The helper already exists, so it's one policy per operation. For `team_members`:

```sql
alter table team_members enable row level security;

create policy "public read team" on team_members
  for select using (true);

create policy "admins write team" on team_members
  for all to authenticated
  using (is_approved_admin()) with check (is_approved_admin());
```

Do the same for `sponsors` and `alumni`. `orders` needs more thought — members must insert their
own orders and read them, but only directors should change approval columns. Test every change
against a real member account before you trust it.

### Debugging "the query returns nothing and no error"

That's the signature of an RLS denial: Postgres returns zero rows rather than an error.

1. **Logs → Postgres** in the dashboard, filter around the request time.
2. Reproduce in the SQL Editor. It runs as `service_role` (RLS off), so if it works there but not
   in the app, RLS is your problem.
3. Impersonate a real user — SQL Editor has a **role switcher**; set it to `authenticated` and
   supply a user's JWT sub. Or just sign in as a test member in a private window.
4. As a last-resort *local-only* check, `alter table x disable row level security;` — confirm the
   theory, then immediately re-enable it. Never leave it off on production.

---

## Backups

Supabase's free tier has limited automatic backups. Before anything destructive, and on a
schedule you actually keep:

- **Dashboard → Database → Backups** for point-in-time restore where the plan offers it.
- Manual dump, using the database password you saved in step 1:
  ```sh
  pg_dump "postgresql://postgres:PASSWORD@db.YOUR-REF.supabase.co:5432/postgres" \
    --no-owner --no-acl -f solarpack-backup-2026-08-17.sql
  ```
- Storage buckets are **not** in a `pg_dump`. Download important buckets (`order-receipts`,
  `file-storage`) separately through the dashboard or the CLI.
- Cheap insurance before a risky migration: `create table orders_backup_20260817 as select * from orders;`

Restoring a dump into a fresh project can leave `bigserial` sequences behind the data, so the
next insert collides on the primary key. Fix with:

```sql
select setval('orders_id_seq', (select coalesce(max(id), 0) from orders));
```

Repeat for `team_members_id_seq`, `sponsors_id_seq`, `alumni_id_seq`,
`schedule_projects_id_seq`, `schedule_tasks_id_seq`, `race_telemetry_id_seq`, `race_laps_id_seq`.

---

## Common tasks, as SQL

```sql
-- Who has access, and at what level?
select email, level, approval_status, first_name, last_name, created_at
from user_roles order by created_at desc;

-- Approve someone the UI is being difficult about
update user_roles
set approval_status = 'approved', level = 'member', approved_at = now()
where email = 'new@ncsu.edu';

-- Promote to director
update user_roles set level = 'director' where email = 'someone@ncsu.edu';

-- Revoke access without deleting history
update user_roles set approval_status = 'rejected' where email = 'gone@ncsu.edu';

-- Orders still waiting on a director
select id, material_name, submitter_name, total_cost, status
from orders
where status in ('pending_technical_approval', 'pending_project_approval')
order by submission_timestamp;

-- Spend this semester
select subteam, sum(coalesce(actual_cost, total_cost)) as spent
from orders
where purchased = true and purchase_date > '2026-01-01'
group by subteam order by spent desc;

-- Overdue work (the schema ships views for this)
select * from schedule_overdue_projects;
select * from schedule_overdue_tasks;

-- Unpublish a blog post fast
update blogs set published = false where title ilike '%whatever%';

-- Clean up an abandoned telemetry session
delete from race_sessions where status = 'idle' and created_at < now() - interval '30 days';
```

---

## The Supabase CLI (optional)

`supabase` is already a devDependency, so `npx supabase` works with no global install.

```sh
npx supabase login
npx supabase link --project-ref YOUR-REF
npx supabase db dump -f schema-snapshot.sql       # capture the live schema
```

Useful for taking an accurate snapshot when the dashboard and `schemas/` have drifted apart —
which they have. **Do not run `supabase db reset` against production; it drops everything.**

---

## Related docs

- [Credentials](credentials.md) — the shared login
- [Database Reference](database-reference.md) — every column, constraint and policy
- [Authentication](authentication.md) — roles, approvals, sessions
- [Security & Handover](security-and-handover.md) — known gaps and the rotation checklist
- [Troubleshooting](troubleshooting.md) — when queries misbehave
