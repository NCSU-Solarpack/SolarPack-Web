# SolarPack-Web

The official website and internal admin portal for the **NC State SolarPack** solar vehicle team.

🌐 **[www.solarpacknc.com](https://www.solarpacknc.com)**

A React + Vite single-page app hosted on GitHub Pages, backed by Supabase for the database,
authentication and file storage. Public pages for the team, sponsors, alumni, blogs and live race
telemetry; a nine-tab admin dashboard for schedules, purchasing, files, users and content.

> **📚 Detailed documentation lives in [docs/](docs/README.md).** This page is the overview and the
> map. Every feature has its own guide.

---

## Documentation

### Start here

| I want to… | Read |
|---|---|
| **Set up my laptop and run this** | [Getting Started](docs/getting-started.md) |
| **Understand how it all works** | [Architecture](docs/architecture.md) |
| **Update the roster / sponsors / blog** | [Admin Dashboard](docs/admin-dashboard.md) |
| **Fix something that's broken** | [Troubleshooting](docs/troubleshooting.md) |
| **Take over maintaining this** | [Security & Handover](docs/security-and-handover.md) |

### All docs

**Setup & development**
[Getting Started](docs/getting-started.md) ·
[Architecture](docs/architecture.md) ·
[Making Changes](docs/making-changes.md) ·
[Deployment](docs/deployment.md) ·
[Troubleshooting](docs/troubleshooting.md)

**Backend**
[Supabase Setup](docs/supabase.md) ·
[Database Reference](docs/database-reference.md) ·
[Authentication](docs/authentication.md) ·
[Credentials](docs/credentials.md)

**Admin features**
[Admin Dashboard](docs/admin-dashboard.md) ·
[Members & Users](docs/members-and-users.md) ·
[Orders](docs/orders.md) ·
[Schedules](docs/schedule.md) ·
[Team / Sponsors / Alumni](docs/content-managers.md) ·
[Blogs](docs/blogs.md) ·
[Files](docs/files.md)

**Public site & extras**
[Public Site](docs/public-site.md) ·
[Race Telemetry](docs/race-telemetry.md) ·
[Clipboard](docs/clipboard.md)

**Operations**
[Security & Handover](docs/security-and-handover.md)

---

## Quick start

```sh
git clone https://github.com/NCSU-Solarpack/SolarPack-Web.git
cd SolarPack-Web
npm install
```

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

*(Get these from the Supabase dashboard — see [Supabase Setup](docs/supabase.md#getting-your-project-keys). `.env` is gitignored and never committed.)*

```sh
npm run dev        # http://localhost:5173
```

Step-by-step, including VS Code setup and getting an admin account:
**[Getting Started](docs/getting-started.md)**.

### Scripts

| Command | Does |
|---|---|
| `npm run dev` | Dev server with hot reload at :5173 |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the real build at :4173 — the honest pre-push check |
| `npm run lint` | **Broken** — no ESLint config file exists in the repo, so it errors out. CI doesn't run it either |
| ~~`npm run deploy`~~ | Legacy `gh-pages` path — **don't use it**, see [Deployment](docs/deployment.md#the-other-deploy-path-avoid-it) |
| ~~`npm run migrate:schedule`~~ | **Broken** — points at a file that doesn't exist |

---

## What's in it

### Public site

| Route | Page | Content from |
|---|---|---|
| `/` | Home — hero, live project progress, upcoming projects | code + `schedule_projects` |
| `/app` | iPad app showcase | code |
| `/team` | Team roster with bios | `team_members` |
| `/alumni` | Past members by semester | `alumni` |
| `/sponsors` | Sponsors by tier | `sponsors` |
| `/blogs` | Published posts | `blogs` |
| `/telemetry` | **Live race dashboard** — map, gauges, lap timing, history | relay + telemetry tables |
| `/donate` | PayPal donations | code |
| `/contact`, `/privacy-policy` | Static | code |
| `/clipboard` | Code-gated shared scratchpad (not in the nav) | `clipboard_items` |

### Admin dashboard (`/admin`)

| Tab | Does | Guide |
|---|---|---|
| **Overview** | Stat cards, quick actions, upcoming deadlines | [admin-dashboard](docs/admin-dashboard.md) |
| **Schedules** | Projects + tasks across nine subteams, calendar, realtime editing | [schedule](docs/schedule.md) |
| **Orders** | Two-stage procurement approval, receipts, PDF/ZIP export | [orders](docs/orders.md) |
| **Files** | Shared file browser on Supabase Storage | [files](docs/files.md) |
| **Blogs** | Section-based post editor, publish/unpublish | [blogs](docs/blogs.md) |
| **Sponsors** | Sponsors and tiers, logo uploads | [content-managers](docs/content-managers.md) |
| **Team** | Public roster + user account management | [content-managers](docs/content-managers.md), [members-and-users](docs/members-and-users.md) |
| **Alumni** | Graduating classes by semester | [content-managers](docs/content-managers.md) |
| **Settings** | Your own profile | [admin-dashboard](docs/admin-dashboard.md) |

### Roles

| Level | Can |
|---|---|
| **Member** | View everything in the dashboard, read-only |
| **Leader** | Edit schedules, team, sponsors, alumni, blogs; submit orders; run pit telemetry |
| **Director** | Everything, plus approve orders and manage users |

New sign-ups start **pending** and need a director's approval before they can see anything.
Full detail: [Authentication](docs/authentication.md).

---

## How it fits together

```
   Browser (React SPA on GitHub Pages)
        │
        │  supabase-js + anon key, direct over HTTPS
        ▼
   SUPABASE ── Postgres (13 tables, RLS on everything)
            ── Auth (JWT sessions)
            ── Storage (5 buckets)
            ── Realtime (schedule + telemetry)

   Car ─BLE─▶ iPad app ─HTTP─▶ Relay (Render) ─service role─▶ Supabase
                                    ▲
                        /telemetry polls GET /packet
```

**There is no backend of our own.** The browser queries Postgres directly, so *all* authorization
is Row Level Security. Permission checks in the React code decide which buttons render — they are
not security. Read [Architecture](docs/architecture.md) and
[Security & Handover](docs/security-and-handover.md) before changing anything about access.

### Stack

React 18 · Vite 4 · React Router 6 · Supabase JS 2 · Recharts · Leaflet · lucide-react ·
jsPDF · JSZip · pdfjs-dist

### Layout

```
src/
├── App.jsx              # every URL → component
├── pages/               # one file per public page
├── components/
│   ├── admin/           # one manager per dashboard tab
│   └── telemetry/       # /telemetry views and hooks
├── utils/
│   ├── supabase.js      # ★ every database + storage call
│   └── auth.js          # ★ sign-in, roles, permissions
├── hooks/               # data-sync hooks
└── contexts/            # AlertContext (app-wide modals)

schemas/                 # SQL for every table, policy and bucket
public/                  # copied verbatim into the build
docs/                    # ★ the full documentation set
```

---

## Deploying

**Push to `main`.** GitHub Actions builds and publishes to GitHub Pages in 2–4 minutes.

```sh
git checkout -b my-change
# ...edit...
git commit -m "Describe what changed and why"
git push -u origin my-change
# open a PR, get a review, merge
```

**Content changes need no deploy** — team members, sponsors, alumni, blogs, orders and schedules
all come from Supabase at runtime and are live the moment you save them in the admin dashboard.

Details, secrets and rollback: [Deployment](docs/deployment.md).

---

## Contributing

1. Branch off `main`; don't commit to it directly.
2. Match the surrounding code style — this repo mixes inline `<style>` blocks with imported CSS, and
   Font Awesome with lucide icons. Follow whatever the file already does.
3. Run `npm run build` before pushing — it's exactly what CI runs, and it catches import errors
   that `npm run dev` tolerates.
4. Test as a **member**, not just as a director — permission-gated UI breaks differently per role.
5. Open a PR and describe what changed and why.
6. **Update the docs in the same PR.** Not later.

More: [Making Changes](docs/making-changes.md).

---

## Things to know before you dig in

Documented in full at [Architecture → Known rough edges](docs/architecture.md#known-rough-edges)
and [Security & Handover](docs/security-and-handover.md):

- `dist/` is committed to git alongside a CI job that also builds it.
- `src/config/dataSource.js` and `src/components/ConfirmEmail.jsx` are dead code.
- Some RLS policies are looser than the UI implies — any approved member can write to several
  tables with a direct API call.
- `order-receipts` is a public bucket with predictable filenames.
- There are no automated tests, and `npm run lint` is broken (no ESLint config). Every check is
  manual.

None of these will bite you on day one, but all of them are worth knowing by week two.

---

**NC State SolarPack** · [solarpacknc.com](https://www.solarpacknc.com) ·
[Documentation](docs/README.md)
