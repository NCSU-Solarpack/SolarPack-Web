/* ─── SolarPack Header Component – v2 ───────────────────────────────────── *\
   Injects responsive header with mobile‑first slide‑down nav
\* ───────────────────────────────────────────────────────────────────────── */

const headerCSS = /* css */ `
:root {
  --bg:       #0e0e0e;
  --surface:  #181818;
  --text:     #ffffff;
  --muted:    #c9c9c9;
  --accent:   #e53935;
  --radius:   10px;
  --speed:    240ms;
}

*{box-sizing:border-box;margin:0;padding:0}
body{font-family:"DM Sans",system-ui,sans-serif;background:var(--bg);color:var(--text)}

.header{
  position:sticky;top:0;z-index:1000;
  display:flex;align-items:center;gap:1.2rem;
  padding:1rem 1.6rem;
  background:var(--surface);
  box-shadow:0 1px 6px #0009;
}

.logo{
  display:flex;align-items:center;gap:.6rem;
  text-decoration:none;color:var(--accent);
  font-family:"Bebas Neue",sans-serif;font-size:2rem;letter-spacing:.05em;
}

.logo img{height:42px;width:42px;object-fit:contain}

.nav{
  display:flex;gap:1rem;margin-left:auto
}
.nav a{
  text-decoration:none;color:var(--text);font-weight:600;
  padding:.5rem .9rem;border-radius:var(--radius);
  transition:background var(--speed) ease;
}
.nav a:hover,.nav a.active{background:var(--accent);color:#fff}

/* ── Hamburger ───────────────────── */
.burger{
  display:none;margin-left:auto;background:none;border:none;
  font-size:1.9rem;color:var(--text);cursor:pointer;
  transition:transform var(--speed) ease;
}

/* ── Slide‑down mobile menu ───────── */
.mobile-panel{
  position:fixed;top:0;left:0;width:100%;height:0;
  overflow:hidden;
  background:var(--surface);
  transition:height var(--speed) ease;
}
.mobile-panel.open{height:100vh}
.m-nav{display:flex;flex-direction:column;padding:4.5rem 1.2rem;gap:.3rem}
.m-nav a{
  text-decoration:none;color:var(--text);font-weight:600;
  padding:1rem;border-radius:var(--radius);
}
.m-nav a:hover,.m-nav a.active{background:var(--accent);color:#fff}

/* ── Breakpoints ──────────────────── */
@media (max-width:767px){        /* phones */
  .nav{display:none}
  .burger{display:block}
}
@media (min-width:768px) and (max-width:1023px){  /* tablets */
  .header{flex-wrap:wrap;row-gap:.8rem}
  .nav{flex:1 1 100%;justify-content:center}
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
    <a href="blog.html"     data-page="blog">Blog</a>
    <a href="contact.html"  data-page="contact">Contact</a>
  </nav>

  <button class="burger" id="burger" aria-label="Toggle navigation">
    <i class="fas fa-bars"></i>
  </button>
</header>

<!-- mobile slide‑down -->
<div class="mobile-panel" id="mobile-panel">
  <nav class="m-nav">
    <a href="index.html"    data-page="index">Home</a>
    <a href="app.html"      data-page="app">App</a>
    <a href="team.html"     data-page="team">Team</a>
    <a href="alumni.html"   data-page="alumni">Alumni</a>
    <a href="sponsors.html" data-page="sponsors">Sponsors</a>
    <a href="donate.html"   data-page="donate">Donate</a>
    <a href="blog.html"     data-page="blog">Blog</a>
    <a href="contact.html"  data-page="contact">Contact</a>
  </nav>
</div>
`;

function initHeader(){
  /* inject */
  document.head.insertAdjacentHTML('beforeend', `<style>${headerCSS}</style>`);
  document.body.insertAdjacentHTML('afterbegin', headerHTML);

  setActiveLink();

  const burger = document.getElementById('burger');
  const panel  = document.getElementById('mobile-panel');

  burger.addEventListener('click', e=>{
    e.stopPropagation();
    const open = panel.classList.toggle('open');
    burger.firstElementChild.className = open ? 'fas fa-times' : 'fas fa-bars';
  });

  /* close panel on outside tap */
  document.addEventListener('click', e=>{
    if(!panel.contains(e.target) && !burger.contains(e.target)){
      panel.classList.remove('open');
      burger.firstElementChild.className = 'fas fa-bars';
    }
  });

  /* close on resize to desktop */
  window.addEventListener('resize', ()=>{
    if(window.innerWidth>767){
      panel.classList.remove('open');
      burger.firstElementChild.className = 'fas fa-bars';
    }
  });
}

/* highlight current page */
function setActiveLink(){
  const page = (location.pathname.split('/').pop() || 'index.html').replace('.html','');
  document.querySelectorAll('[data-page]').forEach(a=>{
    if(a.dataset.page===page)a.classList.add('active');
  });
}

document.addEventListener('DOMContentLoaded', initHeader);
window.SolarPackHeader = { init:initHeader, setActive:setActiveLink };
