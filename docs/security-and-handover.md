# Security & Handover

Two things in one place, because they're the same conversation: **what's currently weak** and
**what has to happen when the people who built this leave**.

Read this before you're the only person left who knows how the site works.

---

## The security model in one paragraph

There is no backend. The browser holds the Supabase **anon key** and talks to Postgres directly.
Everything `authService.hasPermission()` does is decide which buttons render — it is **not**
security, because anyone can open devtools and call `supabaseService` themselves. The only real
enforcement is **Row Level Security** inside Postgres. So: any rule you care about must exist as an
RLS policy, and the UI check is a convenience on top of it.

---

## Known gaps

Ordered by how much they'd matter if exploited. None of these are theoretical — each is a specific
line of SQL or code you can go look at.

### 1. RLS is coarser than the UI

Most tables' write policies say "any `authenticated` user". A member's JWT is an `authenticated`
JWT, so **any approved member can write to `blogs`, `schedule_projects` and `schedule_tasks`** with
a hand-crafted request, regardless of the disabled buttons they see.

`user_roles` and the telemetry tables are the exceptions — they use `is_approved_admin()` and
`is_pit_crew()`, which check the actual role.

**Fix** — the helper already exists, so it's one policy per table:

```sql
-- example: lock team_members down to leaders and directors
alter table team_members enable row level security;

create policy "public read team" on team_members
  for select using (true);

create policy "admins write team" on team_members
  for all to authenticated
  using (is_approved_admin()) with check (is_approved_admin());
```

Do the same for `sponsors`, `alumni`, `blogs` (writes only — keep the public read of published
posts), and the schedule tables. `orders` needs more care: members should be able to insert their
own and read all, but only directors should touch the approval columns.

**Test every change with a real member account before trusting it.**

### 2. A user can promote themselves

The `Users can update own row` policy on `user_roles` allows updating *any* column of your own row,
including `level` and `approval_status`. One API call from the browser console makes an approved
member a director.

**Fix** — pin the sensitive columns:

```sql
drop policy "Users can update own row" on user_roles;

create policy "Users can update own profile fields" on user_roles
  for update to authenticated
  using (auth.uid() = user_id)
  with check (
    auth.uid() = user_id
    and level = (select level from user_roles where user_id = auth.uid())
    and approval_status = (select approval_status from user_roles where user_id = auth.uid())
  );
```

Verify the Settings tab still saves afterwards.

### 3. Tables with no RLS policies at all

`team_members`, `sponsors`, `alumni` and `orders` have **no policies in their schema files**.
Whatever is live was configured by hand in the dashboard, and nobody wrote it down.

**Check this first** — Supabase → Table Editor → each table → **RLS** toggle and policy list. If
RLS is off, that table is world-writable through the anon key by anyone who reads the JS bundle.
`orders` in particular contains supplier contacts and purchase amounts.

### 4. `order-receipts` is a public bucket with predictable filenames

Receipts are stored as `<orderId>.pdf` in a public bucket. Order IDs are sequential integers, so
anyone can walk `1.pdf`, `2.pdf`, `3.pdf` and collect every receipt — purchase amounts, suppliers,
sometimes PO or card details.

**Fix** — two parts, both required:

1. Supabase → Storage → `order-receipts` → Settings → make it **private**.
2. In [src/utils/supabase.js](../src/utils/supabase.js), replace `getPublicUrl` with
   `createSignedUrl` on the receipt paths (`uploadOrderReceipt`, `uploadPurchaseGroupReceipt`, and
   the download/export helpers). Signed URLs expire, so generate them at view time.

Test the Orders export afterwards — it downloads every receipt in a range.

### 5. Blog HTML is rendered unsanitised

`body` is injected with `dangerouslySetInnerHTML` so the rich-text editor works. Combined with gap
#1 (any authenticated user can write blogs), that's stored XSS on the public site.

**Fix** — `npm install dompurify` and sanitise on render in
[src/pages/Blogs.jsx](../src/pages/Blogs.jsx):

```jsx
import DOMPurify from 'dompurify'
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.body) }} />
```

[Clipboard.jsx](../src/pages/Clipboard.jsx) already does this properly with a hand-rolled
allow-list sanitiser — worth reading as a reference for what "good" looks like here.

### 6. Secrets in git history

The old `README.md` committed a Resend password and three "development auth passwords". The dev
passwords are dead (that auth system no longer exists), but **git history keeps everything
forever** — deleting the file doesn't remove it.

The current [docs/credentials.md](credentials.md) holds the shared team account by explicit
decision, with the repo kept private. If the repo ever goes public, or is forked outside the org,
rotate everything immediately.

### 7. Anyone can sign up

Signup is open and email confirmation is disabled — nothing verifies an address is real or NC State
affiliated. The director approving the account is the *only* check.

**Mitigation**: approve only people you recognise. **Hardening**: restrict signup to
`@ncsu.edu` addresses in `Login.jsx` and again in a `user_roles` insert policy, so it's enforced in
the database and not just the form.

### 8. The clipboard is only as strong as its code

`/clipboard` has no login. A hand-typed code like `SOLARPACK` is trivially guessable and gives full
read/write to that space. The generated codes (48 bits of randomness) are fine; the 6-character
minimum is not meaningful protection. There's also no expiry, no rate limiting, and no encryption
at rest.

Treat it as convenient, not confidential. See [Clipboard](clipboard.md).

---

## The two kinds of Supabase key

The single most important thing to get right.

| | `anon` (public) | `service_role` |
|---|---|---|
| Respects RLS | **Yes** | **No — bypasses everything** |
| Safe in the browser | **Yes**, by design | **Never** |
| Where it belongs | `.env`, GitHub Actions secrets, the JS bundle | Server environment variables only (the Render relay) |

Anything named `VITE_*` is compiled into the bundle and shipped to every visitor. If a
`service_role` key ever lands in a `VITE_` variable, in `src/`, or in a commit, it is compromised —
rotate the JWT secret immediately (Supabase → Project Settings → API → JWT Settings), which
invalidates every token.

---

## Handover checklist

Work through this when the person who built or maintained the site leaves. Don't skip the boring
parts — the failure mode is a team locked out of its own database in the middle of a race season.

### Access — before they go

- [ ] **At least two current people hold `director`** on the website (`user_roles.level`).
- [ ] At least two people can sign in to the **Supabase dashboard** — ideally with their own
      accounts, not just the shared one.
- [ ] At least two people are **owners of the GitHub org** `NCSU-Solarpack`.
- [ ] Someone knows who controls **DNS for solarpacknc.com** (the registrar account). Find this out
      *before* you need it.
- [ ] Someone has access to the **Render** account hosting the telemetry relay.
- [ ] Someone can sign in to **`solarpacknc@ncsu.edu`** — password resets for everything land there.
- [ ] The **Supabase database password** is recorded somewhere (needed for `pg_dump`). If nobody
      has it: Supabase → Project Settings → Database → Reset.
- [ ] The **PayPal fundraiser** account is accessible.

### Rotate

- [ ] Change the shared account password and update [credentials.md](credentials.md).
- [ ] Rotate the **Supabase JWT secret**, then update: local `.env` files, the
      `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` GitHub Actions secrets,
      `SUPABASE_SERVICE_ROLE_KEY` on Render — **and re-run the deploy workflow**, because keys are
      baked in at build time.
- [ ] Reset the Supabase database password.
- [ ] Rotate the Resend API key if Resend is in use.

### Revoke

- [ ] Remove departing members from the GitHub org.
- [ ] Remove them from the Supabase project team.
- [ ] Set their `user_roles.approval_status` to `'rejected'` (keeps history, removes access).
- [ ] Demote graduating leaders who are staying involved to `member`.

### Verify it still works without them

- [ ] Someone else clones the repo fresh, follows [Getting Started](getting-started.md), and gets
      it running locally. **This is the real test of the docs.**
- [ ] Someone else makes a trivial change, opens a PR, merges it, and confirms the deploy lands.
- [ ] Someone else approves a test user, publishes and unpublishes a test blog post, and submits a
      test order.
- [ ] Take a **backup** — `pg_dump` plus a download of the `order-receipts` and `file-storage`
      buckets, which are *not* included in a database dump.

### Write down what isn't in the code

- [ ] Where DNS is managed, and by whom.
- [ ] Any verbal agreements with sponsors about tier placement or logo usage.
- [ ] Who the NC State staff contact is for the domain and the PayPal fundraiser.
- [ ] Anything about the telemetry relay or the iPad app not documented in `SolarPack-App`.

---

## If you're picking this up cold

A sane first two weeks:

1. **Get it running locally.** [Getting Started](getting-started.md). If the docs are wrong,
   fix them as you go — that's the highest-value contribution you can make right now.
2. **Read [Architecture](architecture.md)** end to end, with the code open beside it.
3. **Audit the RLS policies** in the Supabase dashboard against
   [Database Reference](database-reference.md). Gap #3 above is the one to check first, because
   nobody wrote down what's actually live.
4. **Take a backup**, and set a reminder to take one every month.
5. **Make one small change** and deploy it, so you know the pipeline works before you need it in a
   hurry.
6. **Then** consider the fixes above, cheapest first: #4 (receipts bucket) and #5 (blog
   sanitisation) are each an afternoon. #1 and #2 need testing with multiple accounts.

---

## Recommended improvements, beyond security

Not urgent, but they'd make the next handover easier:

| Change | Why |
|---|---|
| Stop committing `dist/` | Build output in git alongside a CI job that builds; easy to ship stale, and it pollutes every diff. See [Deployment](deployment.md#why-dist-is-committed) |
| Delete `src/config/dataSource.js` | Dead code, wrong env-var prefix |
| Delete `src/components/ConfirmEmail.jsx` | No route renders it |
| Remove the `migrate:schedule` npm script | Points at `migrate-schedule-data.js`, which doesn't exist |
| Remove the `deploy` npm script | Conflicts with the Actions workflow |
| Normalise legacy order statuses with a one-time `UPDATE` | Lets `migrateOrderStructure()` shrink substantially |
| Add RLS policies to the schema files | They exist in the dashboard but aren't captured anywhere |
| Add `dompurify` | Closes gap #5 |
| Fix `npm run lint` | The script exists but there's no ESLint config file, so it errors out — and CI never runs it. Add an `.eslintrc.cjs` plus an `.eslintignore` containing `dist`, then wire a lint step into the workflow |
| Any automated tests at all | There are currently none; every check is manual |

---

## Related docs

- [Credentials](credentials.md) — the shared account, and rotation
- [Supabase Setup](supabase.md) — RLS, buckets, backups
- [Authentication](authentication.md) — roles and permissions
- [Database Reference](database-reference.md) — what's actually enforced, table by table
- [Architecture](architecture.md#known-rough-edges) — the full list of rough edges
