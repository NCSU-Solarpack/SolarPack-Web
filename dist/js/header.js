/* ──────────────────────────────────────────────────────────────
   SolarPack Header  •  v4
   Responsive navigation (desktop ⇄ mobile) in telemetry style
   Drop this file in assets/js/header.js and reference it in <head>
   Requires Font Awesome 6 for the bars / times icons.
──────────────────────────────────────────────────────────────── */

const headerCSS = /* css */ `
:root{
  --bg:#0c0c0c;           /* site background (telemetry)   */
  --surface:#161616;      /* cards / mobile panel          */
  --text:#f5f5f5;
  --muted:#9e9e9e;
  --accent:#e31b23;       /* SolarPack red                 */
  --radius:12px;
  --speed:240ms;
}

*{box-sizing:border-box;margin:0;padding:0}

body{
  font-family:"DM Sans",Arial,Helvetica,sans-serif;
  background:var(--bg);
  color:var(--text);
  padding-top:64px;                 /* keep content below fixed nav */
}

/* ─── Fixed Header Bar ─────────────────────────────────────── */
.header{
  position:fixed;inset:0 0 auto 0;height:64px;
  background:#000;
  display:flex;align-items:center;gap:2rem;
  padding:0 2rem;
  box-shadow:0 1px 6px #0008;
  z-index:1000;
}

/* logo */
.logo{
  display:flex;align-items:center;gap:.55rem;
  color:var(--accent);text-decoration:none;
  font-family:"Bebas Neue",sans-serif;
  font-size:2rem;letter-spacing:.04em;
}
.logo img{height:36px;width:auto;}

/* desktop / tablet nav */
.nav{
  margin-left:auto;
  display:flex;gap:1.5rem;
}
.nav a{
  font-family:"Bebas Neue",sans-serif;
  font-size:1.25rem;
  text-decoration:none;color:var(--text);
  position:relative;padding:.25rem 0;
  transition:color var(--speed);
}
.nav a.active,
.nav a:hover{color:var(--accent);}
.nav a.active::after,
.nav a:hover::after{
  content:"";
  position:absolute;left:0;right:0;bottom:-6px;
  height:3px;border-radius:3px;background:var(--accent);
}

/* ─── Hamburger ────────────────────────────────────────────── */
.burger{
  display:none;                       /* hidden on ≥768 px */
  flex-direction:column;justify-content:center;align-items:center;
  width:40px;height:40px;
  cursor:pointer;margin-left:auto;
  background:none;border:none;
  font-size:1.9rem;color:var(--text);

  position:relative;z-index:1201;      /* stay above the slide panel */
}
.burger:focus{outline:none;}
.burger:focus-visible{outline:2px solid var(--accent);outline-offset:2px;}

/* ─── Mobile slide‑down panel ─────────────────────────────── */
.mobile-panel{
  position:fixed;top:64px;left:0;width:100vw;      /* sits under header */
  height:0;overflow:hidden;
  background:var(--surface);
  box-shadow:0 2px 12px #000;
  transition:height var(--speed) ease;
  z-index:1100;
  display:flex;flex-direction:column;align-items:center;
}
.mobile-panel.open{height:calc(100vh - 64px);}

.m-nav{
  display:flex;flex-direction:column;
  padding:4rem 1.5rem 2rem;
  gap:.2rem;width:90%;max-width:500px;
}
.m-nav a{
  font-size:1.1rem;text-decoration:none;
  color:var(--text);background:transparent;
  padding:1rem 2rem;border-radius:16px;
  border-bottom:1px solid #222;
  transition:background var(--speed),color var(--speed);
  text-align:left;font-weight:600;
}
.m-nav a:hover,
.m-nav a.active{
  background:var(--accent);color:#fff;
}

/* ─── Breakpoints ─────────────────────────────────────────── */
@media(max-width:767px){
  .nav{display:none;}
  .burger{display:flex;}
  .header{padding:0 1.2rem;}
}
@media(min-width:768px) and (max-width:1023px){
  .header{padding:0 1.6rem;}
  .nav{gap:1rem;}
}
@media(min-width:1024px){
  .header{padding:0 2rem;}
}
`;

const headerHTML = /* html */ `
<header class="header">
  <a href="index.html" class="logo">
    <img src="assets/images/solarpack_logo.png" alt="SolarPack logo">
    SolarPack
  </a>

  <nav class="nav">
    <a href="index.html"    data-page="index">Home</a>
    <a href="app.html"      data-page="app">App</a>
    <a href="team.html"     data-page="team">Team</a>
    <a href="alumni.html"   data-page="alumni">Alumni</a>
    <a href="sponsors.html" data-page="sponsors">Sponsors</a>
    <a href="donate.html"   data-page="donate">Donate</a>
    <a href="contact.html"  data-page="contact">Contact</a>
  </nav>

  <button class="burger" id="burger" aria-label="Toggle navigation">
    <i class="fas fa-bars" aria-hidden="true"></i>
  </button>
</header>

<div class="mobile-panel" id="mobile-panel">
  <nav class="m-nav">
    <a href="index.html"    data-page="index">Home</a>
    <a href="app.html"      data-page="app">App</a>
    <a href="team.html"     data-page="team">Team</a>
    <a href="alumni.html"   data-page="alumni">Alumni</a>
    <a href="sponsors.html" data-page="sponsors">Sponsors</a>
    <a href="donate.html"   data-page="donate">Donate</a>
    <a href="contact.html"  data-page="contact">Contact</a>
  </nav>
</div>
`;

function initHeader(){
  /* Inject styles + markup */
  document.head.insertAdjacentHTML("beforeend", `<style>${headerCSS}</style>`);
  document.body.insertAdjacentHTML("afterbegin", headerHTML);

  highlightActive();

  const burger = document.getElementById("burger");
  const panel  = document.getElementById("mobile-panel");

  /* Toggle panel */
  burger.addEventListener("click", e=>{
    e.stopPropagation();
    togglePanel();
  });
  /* Close on outside click */
  document.addEventListener("click", e=>{
    if (!panel.contains(e.target) && !burger.contains(e.target) && panel.classList.contains("open")){
      togglePanel(false);
    }
  });
  /* Close on viewport ≥768 px */
  window.addEventListener("resize", ()=>{
    if (window.innerWidth > 767 && panel.classList.contains("open")){
      togglePanel(false);
    }
  });

  /* helper */
  function togglePanel(forceOpen){
    const willOpen = forceOpen ?? !panel.classList.contains("open");
    panel.classList.toggle("open", willOpen);
    burger.querySelector("i").className = willOpen ? "fas fa-times" : "fas fa-bars";
    document.body.style.overflow = willOpen ? "hidden" : "";
  }
}

/* Highlight current page in both navs */
function highlightActive(){
  const page = (location.pathname.split("/").pop() || "index.html").replace(".html","");
  document.querySelectorAll("[data-page]").forEach(a=>{
    if (a.dataset.page === page) a.classList.add("active");
  });
}

document.addEventListener("DOMContentLoaded", initHeader);
window.SolarPackHeader = { init:initHeader, setActive:highlightActive };
