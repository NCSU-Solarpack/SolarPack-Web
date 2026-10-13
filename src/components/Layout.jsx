import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Header from './Header'
import useFitText from '../hooks/useFitText'
import { LINKS, FOOTER } from '../content/site'
import '../styles/site.css'

// Reveal every [data-reveal] once as it scrolls into view. Re-scans on route change.
const useReveal = () => {
  const location = useLocation()
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in')
          io.unobserve(e.target)
        }
      })
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 })

    const scan = () => document.querySelectorAll('.site [data-reveal]:not(.is-in)').forEach((el) => io.observe(el))
    scan()
    // Supabase content arrives after first paint; pick it up too.
    const mo = new MutationObserver(scan)
    const root = document.querySelector('.site')
    if (root) mo.observe(root, { childList: true, subtree: true })
    return () => { io.disconnect(); mo.disconnect() }
  }, [location.pathname])
}

const Layout = ({ children }) => {
  const location = useLocation()
  useReveal()
  const fitName = useFitText()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="site">
      <Header />
      <main id="main">{children}</main>
      <footer className="site-footer">
        <div className="top">
          <div className="invite">
            <p>{FOOTER.invite[0]}<br />{FOOTER.invite[1]}</p>
            <a className="btn red" href={FOOTER.action.href}>{FOOTER.action.label}</a>
          </div>
          <div className="contact">
            <a href={`mailto:${LINKS.email}`}>{LINKS.email}</a>
            <a href={LINKS.instagram} target="_blank" rel="noopener">Instagram</a>
            <a href={LINKS.linkedin} target="_blank" rel="noopener">LinkedIn</a>
            <a href={LINKS.facebook} target="_blank" rel="noopener">Facebook</a>
          </div>
        </div>
        <div />
        <div className="legal">
          <span>© {new Date().getFullYear()} NC State SolarPack · 501(c)(3), EIN 81-4817863</span>
          <nav aria-label="Footer">
            <Link to="/alumni">Alumni</Link>
            <Link to="/app">App</Link>
            <Link to="/donate">Donate</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/privacy-policy">Privacy</Link>
          </nav>
        </div>
        <div ref={fitName} className="name" aria-hidden="true">SolarPack</div>
      </footer>
    </div>
  )
}

export default Layout
