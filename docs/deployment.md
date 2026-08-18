# Deployment

How code on your laptop becomes www.solarpacknc.com.

---

## The short version

**Push to `main`. That's it.** GitHub Actions builds the site and publishes it to GitHub Pages,
usually within 2–4 minutes.

```
git add .
git commit -m "Add spring 2026 alumni"
git push origin main
```

Watch it at **https://github.com/NCSU-Solarpack/SolarPack-Web/actions**.

**Content changes need no deploy at all.** Team members, sponsors, alumni, blogs, orders and
schedules all come from Supabase at runtime — editing them in the admin dashboard is live
immediately. You only deploy when you've changed *code*.

---

## The pipeline

[.github/workflows/deploy.yml](../.github/workflows/deploy.yml):

```
push to main ──▶ checkout ──▶ Node 18 + npm ci ──▶ npm run build ──▶ upload dist/ ──▶ deploy to Pages
                                                        ▲
                                        VITE_SUPABASE_URL / _ANON_KEY
                                        injected from GitHub Actions secrets
```

- **Concurrency group `pages`, `cancel-in-progress: false`** — deploys queue rather than cancel
  each other, so two quick pushes both complete in order.
- **Environment `github-pages`** with `pages: write` and `id-token: write` permissions.

### It doesn't run on every push

The workflow has a `paths` filter. It only triggers when one of these changes:

```
src/**  ·  package.json  ·  vite.config.js  ·  index.html  ·  public/**   (excluding public/data/**)
```

So a commit touching only `docs/`, `schemas/`, `README.md`, or `.github/` **will not deploy** —
which is usually what you want, but is surprising the first time. Force one with
**Actions → Deploy to GitHub Pages → Run workflow** (`workflow_dispatch` is enabled), or via the
`repository_dispatch` event type `rebuild`.

---

## Environment variables in production

The build needs Supabase credentials, and `.env` is gitignored, so they come from repository
secrets.

**Settings → Secrets and variables → Actions → Repository secrets:**

| Secret | Value |
|---|---|
| `VITE_SUPABASE_URL` | `https://YOUR-REF.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | the long `eyJ...` anon key |

These are read at **build time** and baked into the JavaScript bundle. Two consequences:

1. **Changing a secret does nothing until you re-run the build.** Update the secret, then
   Actions → Run workflow.
2. **Whatever you put in a `VITE_` variable is public.** It ships to every visitor's browser and
   is readable in devtools. The anon key is designed for that; a `service_role` key never is. See
   [Credentials](credentials.md#never-put-these-in-the-repo-or-in-a-browser-variable).

If the deployed site loads but shows no data while localhost works, these secrets are missing or
stale — that's the single most common production failure.

---

## The custom domain

`www.solarpacknc.com`, configured in three places that must agree:

1. **[CNAME](../CNAME)** at the repo root — contains `www.solarpacknc.com`.
2. **[public/CNAME](../public/CNAME)** — the copy Vite ships into `dist/`. **This is the one that
   matters**, because GitHub Pages reads the file from the published artifact. If the domain
   resets to `*.github.io` after a deploy, this file is missing from the build.
3. **DNS at the registrar** — a `CNAME` record for `www` pointing at
   `ncsu-solarpack.github.io`.

[vite.config.js](../vite.config.js) sets `base: '/'` — correct for a custom domain. If the site
were ever served from `username.github.io/SolarPack-Web/` instead, that would need to become
`base: '/SolarPack-Web/'` or every asset would 404.

**HTTPS**: GitHub provisions a certificate automatically. Settings → Pages → *Enforce HTTPS*
should be ticked. After a DNS change it can take up to 24 hours to reissue.

### Client-side routing on Pages

GitHub Pages has no server-side rewrite, so `/team` on a hard refresh would 404. The
[spa-github-pages](https://github.com/rafgraph/spa-github-pages) trick handles it:
[public/404.html](../public/404.html) catches the miss and encodes the path into a query string,
and an inline script at the top of [index.html](../index.html) decodes it back with
`history.replaceState` before React boots.

**Don't delete either half.** If deep links start 404ing, check that `404.html` made it into
`dist/`.

---

## The other deploy path (avoid it)

`package.json` also has:

```json
"deploy": "npm run build && gh-pages -d dist"
```

This pushes `dist/` to a `gh-pages` branch — the *older* way of publishing, from before the
Actions workflow existed.

**Don't use it.** The two mechanisms are mutually exclusive: Settings → Pages has a single
*Source* setting, either **GitHub Actions** or **Deploy from a branch**. This repo is on GitHub
Actions, so `npm run deploy` pushes a branch nothing reads — and if someone flips the source to the
branch to "fix" it, the Actions workflow silently stops taking effect instead. Pick one; the
workflow is the better one.

---

## Why `dist/` is committed

40 build-output files are tracked in git. That is unusual and confusing, and it's a leftover from
the `gh-pages` era.

Practical effects:

- Every build produces content-hashed filenames, so `dist/` shows up as churn in unrelated diffs.
- The committed `dist/` can be **stale**, and nothing warns you — the deployed site comes from the
  freshly-built artifact, not from what's in git.
- Reviewers see noise that obscures the real change.

**Nothing depends on it while GitHub Actions is the Pages source.** The tidy-up:

```sh
echo "dist" >> .gitignore
git rm -r --cached dist
git commit -m "Stop tracking build output"
```

Do this on its own branch, deploy once, and confirm the site is fine before merging. Don't bundle
it with a feature change.

---

## Verifying a deploy

1. **Actions tab** — the run is green.
2. **Open the site** and hard-refresh (`Cmd/Ctrl+Shift+R`). Service-worker-free static sites still
   cache aggressively.
3. **Check data loads** — Home's progress tracker filling in proves Supabase is reachable with the
   deployed keys.
4. **Check a deep link** — go straight to `https://www.solarpacknc.com/team` in a new tab to
   confirm the 404 redirect still works.
5. **Console clean** — no red errors.

---

## Rolling back

Revert the commit and push. That's the fastest reliable path:

```sh
git revert HEAD          # or the specific bad commit
git push origin main
```

The workflow rebuilds from the reverted tree. Re-running an *older* successful workflow from the
Actions UI also works, but reverting keeps `main` honest about what's deployed.

For an urgent content problem (a blog post that shouldn't have gone out, a wrong sponsor logo),
**fix it in the admin dashboard instead** — that takes effect immediately and needs no deploy.

---

## Local production check

Before pushing anything non-trivial:

```sh
npm run build     # exactly what CI runs — catches import errors dev mode tolerates
npm run preview   # serves dist/ at :4173 — the honest test
```

`npm run dev` is more forgiving than the real bundle. `npm run preview` is what your users get.

> **There is no lint step, locally or in CI.** `npm run lint` is defined in `package.json` but the
> repo has no ESLint config file, so it errors out immediately. The workflow only runs `npm ci` and
> `npm run build`. Nothing is checking code style or catching unused variables — worth fixing, but
> don't be surprised when a lint-clean-looking PR merges without any linting having happened.

---

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Pushed, nothing deployed | The `paths` filter didn't match (docs/schemas-only change) | Actions → Run workflow manually |
| Build fails on `npm ci` | `package-lock.json` out of sync with `package.json` | Run `npm install` locally, commit the updated lockfile |
| Site deploys but shows no data | Missing/stale `VITE_*` secrets | Set them, then re-run the workflow |
| Domain reverted to `github.io` | `public/CNAME` missing from the build | Confirm the file exists in `public/` |
| Deep links 404 | `404.html` missing from `dist/` | Confirm it's in `public/` |
| Assets 404, blank page | `base` in vite.config.js doesn't match the URL | `'/'` for the custom domain |
| Old version still showing | Browser cache | Hard-refresh; check the Actions run really finished |
| Two deploys raced | Concurrency queues, doesn't cancel | Wait; the later one wins |

---

## Related docs

- [Getting Started](getting-started.md) — local setup
- [Supabase Setup](supabase.md) — where the keys come from
- [Making Changes](making-changes.md) — the git workflow
- [Security & Handover](security-and-handover.md) — key rotation and re-deploying
