import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from './Header'
import { LINKS, FOOTER } from '../content/site'
import '../styles/site.css'

gsap.registerPlugin(ScrollTrigger)

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Decided once per page load, outside React, so StrictMode's double render cannot flip it
const SHOW_LIGHTS = (() => {
  try {
    if (reduceMotion() || sessionStorage.getItem('sp-lights')) return false
    sessionStorage.setItem('sp-lights', '1')
    return true
  } catch { return false }
})()

// Smooth scroll, kept in step with GSAP's ScrollTrigger
const useSmoothScroll = () => {
  useEffect(() => {
    if (reduceMotion()) return
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    window.__lenis = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      window.__lenis = null
    }
  }, [])
}

// Reveal [data-reveal] / [data-clip] once as they enter. Re-scans when content arrives.
const useReveal = (pathname) => {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in')
          io.unobserve(e.target)
        }
      })
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 })
    const AUTO = '.site .strip img, .site .sec-head, .site .semester li, .site .where-list li, .site .logos li, .site .privacy section'
    const scan = () => {
      document.querySelectorAll(AUTO).forEach((el) => { if (!el.hasAttribute('data-reveal')) el.setAttribute('data-reveal', '') })
      document.querySelectorAll('.site [data-reveal]:not(.is-in), .site [data-clip]:not(.is-in)').forEach((el) => io.observe(el))
    }
    scan()
    const mo = new MutationObserver(scan)
    const root = document.querySelector('.site')
    if (root) mo.observe(root, { childList: true, subtree: true })
    return () => { io.disconnect(); mo.disconnect() }
  }, [pathname])
}

// F1 start lights: five reds come on one by one, then lights out and the site opens.
// Once per browser session; skipped for reduced motion.
const StartLights = ({ onDone }) => {
  const [lit, setLit] = useState(0)
  const [out, setOut] = useState(false)
  useEffect(() => {
    const timers = []
    for (let i = 1; i <= 5; i++) timers.push(setTimeout(() => setLit(i), 180 + i * 260))
    const hold = 180 + 5 * 260 + 420 + Math.random() * 300
    timers.push(setTimeout(() => { setLit(0); setOut(true); onDone() }, hold))
    return () => timers.forEach(clearTimeout)
  }, [onDone])
  return (
    <div className={`lights ${out ? 'out' : ''}`} aria-hidden="true">
      <div className="gantry">
        <div className="row">
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className={`pod ${lit >= n ? 'on' : ''}`}><span className="bulb" /><span className="bulb" /></div>
          ))}
        </div>
        <span className="cap">{out ? 'Lights out' : 'SolarPack · Car 99'}</span>
      </div>
    </div>
  )
}

const Footer = () => {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    const io = new IntersectionObserver(([e]) => el.classList.toggle('on', e.isIntersecting), { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <footer ref={ref} className="site-footer">
      <div className="lights-out" aria-hidden="true"><i /><i /><i /><i /><i /></div>
      <p className="big display" data-reveal><span>Go</span><span className="red">SolarPack</span></p>
      <div className="row">
        <div className="cta">
          <p className="lead">{FOOTER.invite.join(' ')}. Engineers, designers, drivers and business minds: the garage is open.</p>
          <a className="btn" href={FOOTER.action.href}>{FOOTER.action.label} <span className="arrow" aria-hidden="true">↗</span></a>
        </div>
        <div className="cols">
          <div>
            <h3>Team</h3>
            <ul>
              <li><Link to="/team">Crew</Link></li>
              <li><Link to="/alumni">Alumni</Link></li>
              <li><Link to="/blogs">Blog</Link></li>
              <li><Link to="/app">App</Link></li>
            </ul>
          </div>
          <div>
            <h3>Support</h3>
            <ul>
              <li><Link to="/sponsors">Sponsor</Link></li>
              <li><Link to="/donate">Donate</Link></li>
              <li><Link to="/telemetry">Telemetry</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3>Follow</h3>
            <ul>
              <li><a href={LINKS.instagram} target="_blank" rel="noopener">Instagram</a></li>
              <li><a href={LINKS.linkedin} target="_blank" rel="noopener">LinkedIn</a></li>
              <li><a href={LINKS.facebook} target="_blank" rel="noopener">Facebook</a></li>
              <li><a href={`mailto:${LINKS.email}`}>Email</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="legal">
        <span>© {new Date().getFullYear()} NC State SolarPack · 501(c)(3) · EIN 81-4817863</span>
        <span><Link to="/privacy-policy">Privacy</Link> · Raleigh, NC · Car 99</span>
      </div>
    </footer>
  )
}

const Layout = ({ children }) => {
  const location = useLocation()
  const siteRef = useRef(null)
  const wipeRef = useRef(null)
  const prevPath = useRef(location.pathname)
  const showLights = SHOW_LIGHTS
  const [ready, setReady] = useState(!showLights)
  const onLightsOut = useCallback(() => setReady(true), [])

  useSmoothScroll()
  useReveal(location.pathname)

  // Route change: jump to top, red wipe passes over, then refresh scroll triggers
  useEffect(() => {
    window.__lenis ? window.__lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0)
    if (prevPath.current === location.pathname) return
    prevPath.current = location.pathname
    const w = wipeRef.current
    if (!w || reduceMotion()) return
    siteRef.current?.classList.remove('is-ready')
    w.className = 'wipe'
    w.style.transition = 'none'
    w.style.transform = 'none'
    void w.offsetWidth
    requestAnimationFrame(() => {
      w.style.transition = ''
      w.style.transform = ''
      w.className = 'wipe out'
      siteRef.current?.classList.add('is-ready')
      setTimeout(() => ScrollTrigger.refresh(), 600)
    })
  }, [location.pathname])

  return (
    <div ref={siteRef} className={`site ${ready ? 'is-ready' : ''}`}>
      {showLights && <StartLights onDone={onLightsOut} />}
      <div ref={wipeRef} className="wipe" aria-hidden="true" />
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
