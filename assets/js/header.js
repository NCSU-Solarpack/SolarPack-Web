/* ──────────────────────────────────────────────────────────────
   SolarPack Header  •  v3
   Fully‑responsive navigation bar (desktop ⇄ mobile)
   Drop this file in assets/js/header.js and reference it in <head>
   Requires Font Awesome 6 for the bars / times icons.
──────────────────────────────────────────────────────────────── */

const headerCSS = /* css */ `
:root{
  --bg:       #0e0e0e;
  --surface:  #181818;
  --text:     #ffffff;
  --muted:    #c9c9c9;
  --accent:   #e53935;
  --radius:   10px;
  --speed:    220ms;
}

*{box-sizing:border-box;margin:0;padding:0}

body{
  font-family:"DM Sans",system-ui,sans-serif;
  background:var(--bg);
  color:var(--text);
}

/* ─── Header Bar ─────────────────────────────────────────── */
.header{
  position:sticky;top:0;left:0;width:100%;z-index:999;
  display:flex;align-items:center;
  padding:.9rem 1.2rem;
  background:var(--surface);
  box-shadow:0 1px 6px #0008;
}

/* logo */
.logo{
  display:flex;align-items:center;gap:.55rem;
  color:var(--accent);text-decoration:none;
  font-family:"Bebas Neue",sans-serif;font-size:2rem;letter-spacing:.04em;
}
.logo img{height:42px;width:42px;object-fit:contain}

/* desktop / tablet nav */
.nav{
  margin-left:auto;
  display:flex;align-items:center;gap:1.1rem;
}
.nav a{
  position:relative;
  padding:.45rem .9rem;
  font-weight:600;
  color:var(--text);text-decoration:none;
  border-radius:var(--radius);
  transition:background var(--speed),color var(--speed);
}
.nav a:hover,.nav a.active{background:var(--accent);color:#fff}

/* ─── Hamburger ───────────────────────────────────────────── */
.burger{
  display:none;           /* hidden by default */
  margin-left:auto;
  border:none;background:none;padding:.25rem;
  font-size:1.9rem;line-height:1;
  color:var(--text);
  cursor:pointer;
  transition:transform var(--speed);
}

/* remove default focus outline + custom focus ring */
.burger:focus{outline:none}
.burger:focus-visible{
  outline:2px solid var(--accent);outline-offset:2px;
}

/* ─── Mobile slide‑down panel ─────────────────────────────── */
.mobile-panel{
  position:fixed;top:0;left:0;width:100%;
  height:0;overflow:hidden;
  background:var(--surface);
  transition:height var(--speed) ease;
}
.mobile-panel.open{height:100vh}

.m-nav{
  display:flex;flex-direction:column;
  padding:4.5rem 1.2rem 2rem;
  gap:.2rem;
}
.m-nav a{
  padding:1rem;border-radius:var(--radius);
  font-weight:600;text-decoration:none;color:var(--text);
}
.m-nav a:hover,.m-nav a.active{background:var(--accent);color:#fff}

/* ─── Breakpoints ─────────────────────────────────────────── */
@media (max-width:767px){        /* mobile */
  .nav{display:none}
  .burger{display:block}
}

@media (min-width:768px) and (max-width:1023px){ /* tablet */
  .header{padding:.9rem 1.6rem}
  .nav{gap:.9rem}
}

@media (min-width:1024px){       /* desktop */
  .header{padding:.9rem 2rem}
}
`;

const headerHTML = /* html */ `
<header class="header">
  <a href="index.html" class="logo">
    <img src="assets/images/solarpack_logo.png" alt="SolarPack Logo">
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
  /* inject styles + markup */
  document.head.insertAdjacentHTML('beforeend', `<style>${headerCSS}</style>`);
  document.body.insertAdjacentHTML('afterbegin', headerHTML);

  highlightActive();

  const burger = document.getElementById('burger');
  const panel  = document.getElementById('mobile-panel');

  burger.addEventListener('click', e=>{
    e.stopPropagation();
    const open = panel.classList.toggle('open');
    burger.querySelector('i').className = open ? 'fas fa-times' : 'fas fa-bars';
    document.body.style.overflow = open ? 'hidden' : '';  // lock scroll
  });

  /* close panel on outside click */
  document.addEventListener('click', e=>{
    if(!panel.contains(e.target) && !burger.contains(e.target) && panel.classList.contains('open')){
      panel.classList.remove('open');
      burger.querySelector('i').className = 'fas fa-bars';
      document.body.style.overflow='';
    }
  });

  /* close on resize up to desktop */
  window.addEventListener('resize', ()=>{
    if(window.innerWidth>767 && panel.classList.contains('open')){
      panel.classList.remove('open');
      burger.querySelector('i').className = 'fas fa-bars';
      document.body.style.overflow='';
    }
  });
}

/* mark current page */
function highlightActive(){
  const page = (location.pathname.split('/').pop() || 'index.html').replace('.html','');
  document.querySelectorAll('[data-page]').forEach(a=>{
    if(a.dataset.page===page) a.classList.add('active');
  });
}

document.addEventListener('DOMContentLoaded', initHeader);
window.SolarPackHeader = { init:initHeader, setActive:highlightActive };
