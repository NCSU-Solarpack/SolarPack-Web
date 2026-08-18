# Credentials

> ### ⚠️ This is the only file in the repository that contains a password.
>
> **The repository must stay private.** If it is ever made public, or forked outside the
> `NCSU-Solarpack` organization, treat everything below as compromised and follow
> [Rotating everything](#rotating-everything) immediately. Deleting the file later is not
> enough — git history keeps it forever.
>
> Everything else in `docs/` is safe to share. Only this page is sensitive.

---

## Shared SolarPack team account

One NC State account backs the Supabase dashboard, the team inbox, and the services that send
mail to it.

```
Email     solarpacknc@ncsu.edu
Password  Solarpacknc13579$
```

**This one login gets you:**

| Service | URL | Notes |
|---|---|---|
| **Supabase dashboard** | https://supabase.com/dashboard | The database, auth, storage. See [Supabase Setup](supabase.md). |
| **Team email** | https://mail.google.com | NC State Google Workspace. Verification codes and password resets arrive here. |
| **Resend** (transactional email) | https://resend.com | Only if/when outbound email is wired up. Password may differ — see [Stale credentials](#stale-credentials). |

If a service asks for a 2FA or verification code, it will be waiting in the
`solarpacknc@ncsu.edu` inbox.

### Not covered by this login

| Thing | Where access comes from |
|---|---|
| **GitHub** (`NCSU-Solarpack/SolarPack-Web`) | Your own GitHub account, added to the org by a director. Never share a personal GitHub password. |
| **Supabase database password** | Set when the project was created, shown once. Needed for `pg_dump` / `psql`. If nobody has it, reset it: Supabase → Project Settings → Database → **Reset database password**. |
| **Supabase `service_role` key** | Supabase → Project Settings → API. Server-side only — see the warning below. |
| **Render** (telemetry relay) | Separate account. Ask whoever maintains `SolarPack-App`. |
| **PayPal** (donations) | Separate; the button on `/donate` points at a hosted PayPal flow. |
| **Domain registrar** for `solarpacknc.com` | Separate; needed to change DNS. Find out who holds it *before* you need it. |

---

## Prefer individual accounts over this one

A shared login can't be audited (every action looks like "solarpacknc") and can't be revoked for
one person without locking out everyone. Use the shared account as a break-glass fallback and
give people their own access instead:

- **Supabase** — Project Settings → **Team** → *Invite member*. `Developer` for members who need
  to inspect data; `Owner` only for directors.
- **GitHub** — org owners add individuals to the `NCSU-Solarpack` organization.
- **The website itself** — everyone signs up at `/login` with their own NC State email and gets
  approved by a director. Nobody should ever share a website account. See
  [Members & Users](members-and-users.md).

---

## Never put these in the repo or in a browser variable

| Secret | Why it's different |
|---|---|
| Supabase **`service_role`** key | Bypasses **all** Row Level Security. A master key to the whole database. Belongs only in the relay server's environment variables on Render. |
| Supabase **database password** | Direct Postgres superuser-equivalent access. |
| **Resend API key** | Lets anyone send mail as SolarPack. |

Anything named `VITE_*` is compiled into the JavaScript bundle and shipped to every visitor's
browser. `VITE_SUPABASE_ANON_KEY` is fine there — it's a public key constrained by RLS. Nothing
else in the table above ever is. See
[Security & Handover](security-and-handover.md#the-two-kinds-of-supabase-key).

---

## Stale credentials

The old `README.md` committed a Resend password of `FunintheSun!` for this same address, plus
three "development auth passwords" (`director@pack`, `solarteamlead!`, `solarpack@ncsu`) for a
client-side password system that **no longer exists** — `src/utils/auth.js` is now entirely
Supabase Auth and there are no hard-coded passwords anywhere in `src/`.

Those strings have been in the repository's git history for a long time. Even in a private repo,
assume anyone who has ever cloned it has them:

- **`FunintheSun!`** — if it's still valid on Resend or anywhere else, change it.
- The three dev passwords are dead — nothing accepts them. No action needed.

---

## Rotating everything

Run this list when someone with access leaves the team, at the start of each academic year, and
immediately if the repo's privacy setting ever changes.

1. **Change the shared account password** at NC State (https://mypack.ncsu.edu) and update this
   file in the same commit.
2. **Rotate the Supabase JWT secret** — Project Settings → API → *JWT Settings*. This invalidates
   the anon key and the service_role key, and signs every user out. Then:
   - update `.env` locally,
   - update the `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` GitHub Actions secrets,
   - update `SUPABASE_SERVICE_ROLE_KEY` on Render,
   - re-run the deploy workflow.
3. **Reset the Supabase database password** — Project Settings → Database.
4. **Rotate the Resend API key**, if Resend is in use.
5. **Remove departed members** — Supabase Team, the GitHub org, and set their
   `user_roles.approval_status` to `'rejected'` (see [Members & Users](members-and-users.md)).
6. **Confirm at least two current directors** hold every credential above. A single point of
   failure here has locked teams out of their own database before.

---

## If you want this out of the repo

The cleanest end state is that no password lives in git at all:

1. Put everything above into a shared vault — NC State-approved password manager, Bitwarden, or
   1Password — owned by the director role, not a person.
2. Replace this file's contents with a pointer to the vault.
3. Rotate the passwords, since the old ones remain in git history regardless.

Until that happens, keeping the repository private is the control that matters.

---

Back to [Supabase Setup](supabase.md) · [Security & Handover](security-and-handover.md)
