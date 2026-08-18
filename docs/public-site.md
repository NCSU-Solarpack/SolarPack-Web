# Public Site

The pages anyone can visit at **www.solarpacknc.com** — what's on each, where the content comes
from, and who edits it.

Routes are declared in [src/App.jsx](../src/App.jsx). Public pages render inside
[Layout.jsx](../src/components/Layout.jsx) (header + footer); `/clipboard` and the auth routes sit
outside it.

---

## Route map

| Route | Page | Content from | Edited in |
|---|---|---|---|
| `/` | [Home.jsx](../src/pages/Home.jsx) | hard-coded copy + live `schedule_projects` | code + [Schedules](schedule.md) |
| `/app` | [pages/App.jsx](../src/pages/App.jsx) | hard-coded | code |
| `/team` | [Team.jsx](../src/pages/Team.jsx) | `team_members` | [Team tab](content-managers.md#team-members) |
| `/alumni` | [Alumni.jsx](../src/pages/Alumni.jsx) | `alumni` | [Alumni tab](content-managers.md#alumni) |
| `/sponsors` | [Sponsors.jsx](../src/pages/Sponsors.jsx) | `sponsors` | [Sponsors tab](content-managers.md#sponsors) |
| `/blogs` | [Blogs.jsx](../src/pages/Blogs.jsx) | `blogs` where `published = true` | [Blogs tab](blogs.md) |
| `/donate` | [Donate.jsx](../src/pages/Donate.jsx) | hard-coded + PayPal | code |
| `/contact` | [Contact.jsx](../src/pages/Contact.jsx) | hard-coded | code |
| `/privacy-policy` | [PrivacyPolicy.jsx](../src/pages/PrivacyPolicy.jsx) | hard-coded | code |
| `/telemetry` | [RacePitTelemetry.jsx](../src/pages/RacePitTelemetry.jsx) | relay + telemetry tables | [Race Telemetry](race-telemetry.md) |
| `/clipboard` | [Clipboard.jsx](../src/pages/Clipboard.jsx) | `clipboard_items` | [Clipboard](clipboard.md) |
| anything else | [NotFound.jsx](../src/pages/NotFound.jsx) | — | — |

**Navigation** ([Header.jsx](../src/components/Header.jsx#L126-L134)) lists: Home · App · Team ·
Alumni · Sponsors · Telemetry · Donate · Blogs · Contact.

Deliberately **not** in the nav: `/privacy-policy` (footer only) and `/clipboard` (URL only).

---

## Home

The landing page, and the only public page with live data.

- **Hero** — animated logo (`/solarpack_logo.gif`), tagline, PayPal donate button.
- **Progress tracker** — `completed projects ÷ total projects`, rounded, from
  `getScheduleData()`. Rendered by [ProgressTracker.jsx](../src/components/ProgressTracker.jsx).
- **Upcoming projects carousel** — the next **3** projects that aren't completed and aren't past
  due, soonest first. Swipeable on touch.

Two things follow from this:

1. **Project titles are public.** Anything typed into a project in the Schedules tab can appear on
   the home page and is readable through the public API regardless. Don't put anything sensitive in
   a project title.
2. **The progress bar counts *all* projects ever created**, including cancelled ones, in the
   denominator. Old abandoned projects drag it down permanently. Deleting or completing stale
   projects is what moves it.

If the tracker sits at 0% and the carousel is empty, the Supabase fetch failed — usually a missing
`.env` (locally) or missing GitHub Actions secrets (in production).

---

## App

A static showcase of the SolarPack iPad app: six feature blocks (Real-Time Data, Solar Monitoring,
Battery Management, System Health, Analytics, Motor Control) and a screenshot grid from
`public/images/ipad-app/`.

Entirely hard-coded. Updating it means editing the `features` and `screenshots` arrays in
[src/pages/App.jsx](../src/pages/App.jsx) and dropping new PNGs into `public/images/ipad-app/`.

> Don't confuse [src/pages/App.jsx](../src/pages/App.jsx) (this page) with
> [src/App.jsx](../src/App.jsx) (the router). Same filename, different files.

---

## Team, Alumni, Sponsors, Blogs

Straight reads of their tables, with loading and error states. All four are edited through the
admin dashboard — see [Content Managers](content-managers.md) and [Blogs](blogs.md).

| Page | Ordering |
|---|---|
| `/team` | by `"order"`, drag-set in the admin; clicking a card opens a bio modal |
| `/alumni` | newest semester first, two columns |
| `/sponsors` | grouped by tier, then by `"order"` within each tier |
| `/blogs` | newest first, published only; cards open into a modal |

**Changes are live immediately.** None of these have a draft state except blogs. Save it in the
admin and it's on the public site on the next page load.

---

## Donate

Preset amounts plus a custom field, validated before the PayPal button appears. Everything routes
to the NC State SolarPack PayPal fundraiser:

```
https://www.paypal.com/fundraiser/charity/3728956
```

That URL is hard-coded in [Donate.jsx](../src/pages/Donate.jsx#L33) and again in the Home hero
button. **If the fundraiser is ever recreated, both need updating.** No payment data touches this
site — PayPal handles all of it.

---

## Contact & Privacy Policy

Both fully hard-coded.

`/contact` has team email and social links. `/privacy-policy` is an accordion with an effective
date at the top.

**Update the privacy policy when data handling changes** — new analytics, a new form, a new
third-party service. Change the effective date at the same time. It's a legal page representing NC
State; if you're unsure, ask a director before editing.

---

## Chrome shared by every page

**Header** ([Header.jsx](../src/components/Header.jsx)) — responsive nav that collapses to a
hamburger on mobile. It's auth-aware: signed-in users get an account button through to `/admin`;
everyone else gets sign-in.

**Footer** (inside [Layout.jsx](../src/components/Layout.jsx)) — copyright, social links, privacy
policy.

**Theme** — dark, from the CSS variables in [index.html](../index.html):

```css
--bg: #0a0a0a;  --surface: #1a1a1a;  --text: #ffffff;
--subtxt: #a0a0a0;  --accent: #e31b23;  --radius: 12px;  --speed: 240ms;
```

`--accent` is NC State red. **Use the variables** rather than hard-coding colours.

**Fonts** — Bebas Neue for headings, Inter for body, both from Google Fonts. Icons come from both
Font Awesome 6 (CDN, `<i className="fa-solid ..."/>`) and lucide-react (imported components); both
idioms are live.

---

## Editing a static page

1. Open the page in `src/pages/`.
2. Edit the JSX. Most pages carry their styles in an inline `<style>{`…`}</style>` block right
   there in the file.
3. `npm run dev` and check it at http://localhost:5173.
4. **Check mobile** — devtools device toolbar, or narrow the window. The nav and most grids have
   breakpoints at 768px.
5. Commit, push, and the [deploy workflow](deployment.md) ships it in a few minutes.

Adding a whole new page:

```jsx
// 1. src/pages/Awards.jsx  — write the component
// 2. src/App.jsx           — import it, then inside the <Layout> block:
<Route path="/awards" element={<Awards />} />
// 3. src/components/Header.jsx — add { path: '/awards', label: 'Awards' } to navLinks
```

Full walkthrough in [Making Changes](making-changes.md#recipe-add-a-new-public-page).

---

## Images

Live in `public/images/` and are referenced by **absolute path**, not import:

```jsx
<img src="/images/hero_shot.jpg" alt="The car at FSGP" />
```

| Folder | Contents |
|---|---|
| `public/images/` | logos, hero shot, stickers |
| `public/images/ipad-app/` | app screenshots for `/app` |
| `public/images/race2025/` | race photos |

Everything in `public/` ships as-is, uncompressed and unbundled — **compress before committing**.
A 5 MB hero image is 5 MB every visitor downloads. Aim for under 300 KB for photos; use WebP where
you can.

Note the duplication: `public/race2025/` and `public/images/race2025/` both exist with the same
nine files, as do `solarpack_logo.png/gif` at both levels. Historical; check which path a page
actually references before deleting either copy.

---

## SEO and metadata

All in [index.html](../index.html): `<title>SolarPack</title>`, theme colour, favicons, and
[public/site.webmanifest](../public/site.webmanifest).

Because this is a single-page app, **every route serves the same title and meta tags**. Individual
pages set `document.title` at runtime (`useEffect`), which browsers honour but crawlers and
link-preview bots often don't. Per-page Open Graph previews would need pre-rendering or a
different host — worth knowing before promising anyone rich link previews.

---

## Related docs

- [Content Managers](content-managers.md) — editing team, sponsors, alumni
- [Blogs](blogs.md) — writing posts
- [Race Telemetry](race-telemetry.md) — the `/telemetry` dashboard
- [Making Changes](making-changes.md) — editing safely
- [Deployment](deployment.md) — getting it live
