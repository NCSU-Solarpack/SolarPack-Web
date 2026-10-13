import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { authService } from '../utils/auth'
import { LINKS } from '../content/site'

const NAV = [
  { path: '/team', label: 'Team' },
  { path: '/sponsors', label: 'Sponsors' },
  { path: '/telemetry', label: 'Telemetry' },
  { path: '/blogs', label: 'Blog' },
]

const MENU = [
  { path: '/', label: 'Home' },
  ...NAV,
  { path: '/alumni', label: 'Alumni' },
  { path: '/app', label: 'App' },
  { path: '/donate', label: 'Donate' },
  { path: '/contact', label: 'Contact' },
]

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  // Initialize auth state and subscribe to changes
  useEffect(() => {
    let mounted = true
    const init = async () => {
      await authService.waitForInit()
      if (!mounted) return
      setIsAuthenticated(authService.isAuthenticated())
    }
    init()
    const unsubscribe = authService.onAuthStateChange((authenticated) => {
      if (mounted) setIsAuthenticated(authenticated)
    })
    return () => {
      mounted = false
      unsubscribe()
    }
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.account')) setIsDropdownOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isDropdownOpen])

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  // Close the menu with Escape, and on resize to desktop
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setIsMenuOpen(false) }
    const onResize = () => { if (window.innerWidth > 900) setIsMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMenuOpen])

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)

  const goToDashboard = () => {
    setIsDropdownOpen(false)
    setIsMenuOpen(false)
    navigate('/admin')
  }

  const handleLogout = async () => {
    try {
      await authService.logout()
    } catch (err) {
      console.error('Logout failed:', err)
    } finally {
      setIsAuthenticated(false)
      setIsDropdownOpen(false)
      setIsMenuOpen(false)
      navigate('/')
    }
  }

  return (
    <>
      <header className="site-header">
        <Link to="/" className="wordmark" aria-label="SolarPack home">SolarPack</Link>

        <nav aria-label="Main">
          {NAV.map(({ path, label }) => (
            <Link key={path} to={path} aria-current={isActive(path) ? 'page' : undefined}>{label}</Link>
          ))}
          {isAuthenticated ? (
            <div className="account">
              <button className="plain" onClick={() => setIsDropdownOpen(!isDropdownOpen)} aria-expanded={isDropdownOpen}>
                Account
              </button>
              {isDropdownOpen && (
                <div className="account-menu">
                  <button onClick={goToDashboard}>Dashboard</button>
                  <button onClick={handleLogout}>Log out</button>
                </div>
              )}
            </div>
          ) : (
            <button className="plain account" onClick={() => navigate('/login')}>Sign in</button>
          )}
          <a className="btn inverse donate" href={LINKS.donate} target="_blank" rel="noopener">Donate</a>
        </nav>

        <button className="plain menu-btn" onClick={() => setIsMenuOpen(true)} aria-expanded={isMenuOpen} aria-controls="site-menu">
          Menu
        </button>
      </header>

      <div id="site-menu" className={`site-menu ${isMenuOpen ? 'open' : ''}`} aria-hidden={!isMenuOpen}>
        <div className="top">
          <Link to="/" className="wordmark" style={{ font: '700 17px/1 var(--font-display)', textTransform: 'uppercase', textDecoration: 'none' }}>SolarPack</Link>
          <button className="plain" style={{ color: 'inherit', background: 'none', border: 0, font: '500 16px/1 var(--font-text)', padding: 6, cursor: 'pointer' }} onClick={() => setIsMenuOpen(false)}>
            Close
          </button>
        </div>
        <ul>
          {MENU.map(({ path, label }) => (
            <li key={path}>
              <Link to={path} aria-current={isActive(path) ? 'page' : undefined} tabIndex={isMenuOpen ? 0 : -1}>{label}</Link>
            </li>
          ))}
        </ul>
        <div className="bottom">
          {isAuthenticated ? (
            <>
              <button className="btn inverse" onClick={goToDashboard} tabIndex={isMenuOpen ? 0 : -1}>Dashboard</button>
              <button className="btn" style={{ background: 'var(--ink-2)' }} onClick={handleLogout} tabIndex={isMenuOpen ? 0 : -1}>Log out</button>
            </>
          ) : (
            <button className="btn inverse" onClick={() => navigate('/login')} tabIndex={isMenuOpen ? 0 : -1}>Sign in</button>
          )}
        </div>
      </div>
    </>
  )
}

export default Header
