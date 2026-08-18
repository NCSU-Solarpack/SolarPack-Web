# Getting Started

Everything you need to go from "I have a laptop" to "the SolarPack site is running on my
machine and I can sign in to the admin dashboard."

Follow this top to bottom the first time. Later sections assume you finished the earlier ones.

---

## 1. What you're installing

| Tool | Why | Where |
|---|---|---|
| **Git** | Download the code and push changes | https://git-scm.com/downloads |
| **Node.js 18 or newer** | Runs the dev server and the build | https://nodejs.org (pick the **LTS** version) |
| **Visual Studio Code** | The editor the team uses | https://code.visualstudio.com |
| **A GitHub account** | Push changes, must be added to the `NCSU-Solarpack` org | https://github.com |

> Node 18+ matters. The GitHub Actions build pins Node 18, so anything that works locally on
> 18 will work in CI. Node 16 will *mostly* work but Vite 4 warns and some dependencies
> (`pdfjs-dist`, `jspdf`) misbehave.

Check what you already have — open Terminal (macOS) or PowerShell (Windows):

```sh
git --version     # any recent version is fine
node --version    # must print v18.x.x or higher
npm --version     # comes with Node
```

---

## 2. Install Visual Studio Code and the extensions

1. Download VS Code from https://code.visualstudio.com and install it.
2. Open VS Code, press `Cmd+Shift+X` (macOS) / `Ctrl+Shift+X` (Windows) to open Extensions.
3. Install these three:
   - **ESLint** (`dbaeumer.vscode-eslint`) — shows lint errors inline so CI doesn't surprise you
   - **ES7+ React/Redux/React-Native snippets** (`dsznajder.es7-react-js-snippets`) — optional, fast component scaffolding
   - **Prettier** (`esbenp.prettier-vscode`) — optional. This repo has **no** Prettier config, so if you enable format-on-save it will reformat whole files and make your diffs huge. Either leave format-on-save off, or only format the lines you touched.

---

## 3. Get the code onto your machine

### Option A — VS Code's built-in clone (easiest)

1. Open VS Code with no folder open (`File → New Window`).
2. On the Welcome screen click **Clone Git Repository...** (or press `Cmd/Ctrl+Shift+P` → type `Git: Clone`).
3. Paste the repo URL:
   ```
   https://github.com/NCSU-Solarpack/SolarPack-Web.git
   ```
4. Pick a folder to put it in — e.g. `Documents/GitHub`. VS Code creates `SolarPack-Web` inside it.
5. When it asks **"Would you like to open the cloned repository?"** click **Open**.
6. If VS Code asks you to sign in to GitHub, do it — that's how you'll push later.

### Option B — Terminal

```sh
cd ~/Documents/GitHub          # or wherever you keep projects
git clone https://github.com/NCSU-Solarpack/SolarPack-Web.git
cd SolarPack-Web
code .                         # opens the folder in VS Code
```

> `code .` only works if you ran **"Shell Command: Install 'code' command in PATH"** from the
> VS Code command palette once. Otherwise just use `File → Open Folder`.

---

## 4. Install the project's dependencies

In VS Code open the integrated terminal: `` Ctrl+` `` (backtick). It opens already `cd`'d into
the project folder. Then:

```sh
npm install
```

This reads [package.json](../package.json) and downloads ~450 packages into `node_modules/`
(a few hundred MB, takes 1–3 minutes). `node_modules/` is gitignored — never commit it.

If you see `npm ERR! code EACCES` on macOS, you installed Node with sudo at some point.
Reinstall Node from nodejs.org rather than fighting permissions.

---

## 5. Create your `.env` file

The app reads its Supabase connection from environment variables at build time. Without them
the site loads but every page shows a loading spinner forever and the console logs
`Supabase not configured`.

1. In VS Code's Explorer, right-click the project root (the `SOLARPACK-WEB` heading) → **New File**.
2. Name it exactly `.env` (leading dot, no extension).
3. Paste this and fill in the real values:

```env
VITE_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....

# Optional — only needed if you're pointing at a different telemetry relay.
# Defaults to the production relay if omitted.
# VITE_TELEMETRY_RELAY_URL=https://solarpack-app-server-alyv.onrender.com
```

**Where do those two values come from?** From the Supabase dashboard —
see [Supabase Setup → Getting your project keys](supabase.md#getting-your-project-keys).
Ask a current director for dashboard access; the anon key is safe to share within the team
(it is a public key protected by Row Level Security) but it is *not* committed to the repo.

`.env` is listed in [.gitignore](../.gitignore) — it will never be committed, which is correct.
Every developer keeps their own copy.

> **Only `VITE_`-prefixed variables reach the browser.** That's a Vite rule. Never put a
> Supabase **service role** key in a `VITE_` variable — it would be shipped in the JS bundle
> and bypass all Row Level Security. See [Security & Handover](security-and-handover.md).

---

## 6. Run it

```sh
npm run dev
```

Vite prints something like:

```
  VITE v4.5.0  ready in 412 ms
  ➜  Local:   http://localhost:5173/
```

`Cmd/Ctrl+click` the URL to open it. The site hot-reloads: save a file and the browser
updates within a second without losing your place.

Stop the server with `Ctrl+C` in the terminal.

### Quick smoke test

| Check | Expected |
|---|---|
| http://localhost:5173/ | Home page with the hero shot and a progress tracker that fills in after a moment |
| http://localhost:5173/team | Team member cards load from Supabase |
| http://localhost:5173/login | Sign-in card renders |
| Browser console (F12) | No red `Supabase not configured` warning |

If the Home page progress tracker stays at 0% and Team shows an error, your `.env` is
wrong or missing — see [Troubleshooting](troubleshooting.md#the-site-loads-but-no-data-appears).

---

## 7. Get an admin account

The site has no seeded accounts. You sign up like anyone else, then a **director** approves you.

1. Go to http://localhost:5173/login.
2. Click **Sign Up**, enter your name, email and a password.
3. You'll be redirected to `/pending-approval`. That's expected — new accounts start with
   `approval_status = 'pending'` and cannot see anything.
4. Ask a current **director** to open the admin dashboard → **Team** tab → **Pending Approvals**
   and approve you, assigning a level (`member`, `leader`, or `director`).
5. Reload `/pending-approval` — it re-checks your status and forwards you to `/admin`.

**Bootstrapping the very first director** (fresh Supabase project, nobody can approve anyone):
run this once in the Supabase SQL editor after signing up.

```sql
update user_roles
set level = 'director', approval_status = 'approved', approved_at = now()
where email = 'your@ncsu.edu';
```

Full details in [Authentication](authentication.md) and [Members & Users](members-and-users.md).

---

## 8. Build like production does

Before you push anything:

```sh
npm run build     # writes the optimized site into dist/  ← this is what CI runs
npm run preview   # serves dist/ at http://localhost:4173 so you can click through it
```

`npm run preview` is the honest test. `npm run dev` uses on-the-fly transforms and is more
forgiving than the real bundle.

> **`npm run lint` is currently broken.** The script exists in `package.json` but the repo has
> **no ESLint config file**, so it exits with
> `ESLint couldn't find a configuration file`. It also tries to lint `dist/`. CI does not run it —
> the [deploy workflow](deployment.md) only runs `npm ci` and `npm run build` — so nothing is
> failing because of this today, but there is also no linting happening at all. Fixing it means
> adding an `.eslintrc.cjs` and an `.eslintignore` for `dist/`; see
> [Security & Handover](security-and-handover.md#recommended-improvements-beyond-security).

---

## 9. Where things live

```
SolarPack-Web/
├── index.html                 # HTML shell: fonts, favicons, CSS variables, SPA redirect script
├── vite.config.js             # build config (base '/', output to dist/)
├── package.json               # dependencies + the npm scripts you just ran
├── CNAME                      # custom domain: www.solarpacknc.com
├── .env                       # YOUR local secrets (gitignored, you created this)
│
├── src/
│   ├── main.jsx               # React entry point, mounts <BrowserRouter>
│   ├── App.jsx                # every URL → component mapping
│   ├── pages/                 # one file per public page
│   ├── components/            # shared UI + the admin shell
│   │   ├── admin/             # one manager per admin dashboard tab
│   │   └── telemetry/         # the /telemetry dashboard's views and hooks
│   ├── utils/
│   │   ├── supabase.js        # ★ every database and storage call in the app
│   │   └── auth.js            # ★ sign-in, roles, permissions
│   ├── hooks/                 # reusable data-sync hooks
│   ├── contexts/              # AlertContext (app-wide modal dialogs)
│   ├── config/                # legacy data-source config (mostly dead)
│   └── styles/index.css       # global styles
│
├── schemas/                   # ★ SQL to (re)create every Supabase table + policy
├── public/                    # files copied verbatim into the build (images, 404.html, CNAME)
├── docs/                      # you are here
└── dist/                      # build output (committed — see Deployment doc)
```

The two starred files are where you'll spend most of your time.
[Architecture](architecture.md) explains how they fit together.

---

## Next steps

- **Understand the codebase** → [Architecture](architecture.md)
- **Set up your own Supabase project** → [Supabase Setup](supabase.md)
- **Make your first change** → [Making Changes](making-changes.md)
- **Something's broken** → [Troubleshooting](troubleshooting.md)
