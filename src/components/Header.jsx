import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { authService } from '../utils/auth'
import './Header.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  // Check authentication status on mount and route changes
  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated())
  }, [location])

  // Check authentication status when component mounts
  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated())
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.auth-dropdown')) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const handleAuthClick = () => {
    if (isAuthenticated) {
      // If already authenticated, toggle dropdown or go to admin
      setIsDropdownOpen(!isDropdownOpen)
    } else {
      // If not authenticated, open login modal
      openLoginModal()
    }
  }

  const goToDashboard = () => {
    setIsDropdownOpen(false)
    navigate('/admin')
  }

  const handleLogout = () => {
    authService.logout()
    setIsAuthenticated(false)
    setIsDropdownOpen(false)
    navigate('/')
  }

  const openLoginModal = () => {
    setIsLoginModalOpen(true)
    setPassword('')
    setLoginError('')
  }

  const closeLoginModal = () => {
    setIsLoginModalOpen(false)
    setPassword('')
    setLoginError('')
  }

  const handleLogin = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setLoginError('')

    // Simulate a small delay for better UX
    setTimeout(() => {
      if (authService.authenticate(password)) {
        setIsAuthenticated(true)
        closeLoginModal()
        navigate('/admin')
      } else {
        setLoginError('Invalid password. Please try again.')
      }
      setIsLoading(false)
    }, 500)
  }

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  // Close menu on window resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 767 && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isMenuOpen])

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true
    if (path !== '/' && location.pathname.startsWith(path)) return true
    return false
  }

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/app', label: 'App' },
    { path: '/team', label: 'Team' },
    { path: '/alumni', label: 'Alumni' },
    { path: '/sponsors', label: 'Sponsors' },
    { path: '/donate', label: 'Donate' },
    { path: '/blogs', label: 'Blogs' },
    { path: '/contact', label: 'Contact' }
  ]

  return (
    <>
      <header className="header">
        <Link to="/" className="logo">
          <img src="/solarpack_logo.png" alt="SolarPack logo" />
          SolarPack
        </Link>

        <nav className="nav">
          {navItems.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={isActive(path) ? 'active' : ''}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="auth-section">
          {isAuthenticated ? (
            <div className="auth-dropdown">
              <button className="account-btn authenticated" onClick={handleAuthClick}>
                <i className="fas fa-user-check" aria-hidden="true"></i>
                <span className="auth-text">Account</span>
                <i className="fas fa-chevron-down dropdown-arrow" aria-hidden="true"></i>
              </button>
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <button onClick={goToDashboard} className="dropdown-item">
                    <i className="fas fa-tachometer-alt" aria-hidden="true"></i>
                    Dashboard
                  </button>
                  <button onClick={handleLogout} className="dropdown-item logout">
                    <i className="fas fa-sign-out-alt" aria-hidden="true"></i>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="account-btn" onClick={handleAuthClick}>
              <i className="fas fa-user" aria-hidden="true"></i>
              <span className="auth-text">Sign In</span>
            </button>
          )}
        </div>

        <button 
          className="burger" 
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`} aria-hidden="true"></i>
        </button>
      </header>

      <div className={`mobile-panel ${isMenuOpen ? 'open' : ''}`} onClick={closeMenu}>
        <nav className="m-nav" onClick={(e) => e.stopPropagation()}>
          {navItems.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={isActive(path) ? 'active' : ''}
              onClick={closeMenu}
            >
              {label}
            </Link>
          ))}
          
          {/* Mobile auth section */}
          <div className="mobile-auth">
            {isAuthenticated ? (
              <>
                <button className="mobile-auth-btn authenticated" onClick={goToDashboard}>
                  <i className="fas fa-tachometer-alt" aria-hidden="true"></i>
                  Dashboard
                </button>
                <button className="mobile-auth-btn logout" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt" aria-hidden="true"></i>
                  Logout
                </button>
              </>
            ) : (
              <button className="mobile-auth-btn" onClick={openLoginModal}>
                <i className="fas fa-user" aria-hidden="true"></i>
                Sign In
              </button>
            )}
          </div>
        </nav>
      </div>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="modal-overlay" onClick={closeLoginModal}>
          <div className="login-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Dashboard Sign In</h2>
              <button className="close-btn" onClick={closeLoginModal}>
                <i className="fas fa-times" aria-hidden="true"></i>
              </button>
            </div>
            
            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter dashboard password"
                  disabled={isLoading}
                  autoFocus
                />
              </div>
              
              {loginError && (
                <div className="error-message">
                  <i className="fas fa-exclamation-triangle" aria-hidden="true"></i>
                  {loginError}
                </div>
              )}
              
              <button 
                type="submit" 
                className={`submit-btn ${isLoading ? 'loading' : ''}`}
                disabled={isLoading || !password.trim()}
              >
                {isLoading ? (
                  <>
                    <i className="fas fa-spinner fa-spin" aria-hidden="true"></i>
                    Signing In...
                  </>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt" aria-hidden="true"></i>
                    Sign In
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default Header