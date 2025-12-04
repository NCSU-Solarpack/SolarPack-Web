import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { authService } from '../utils/auth'
import './Header.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  // Initialize auth state and subscribe to changes
  useEffect(() => {
    let mounted = true;

    const init = async () => {
      await authService.waitForInit();
      if (!mounted) return;
      setIsAuthenticated(authService.isAuthenticated());
    };

    init();

    const unsubscribe = authService.onAuthStateChange((authenticated) => {
      if (mounted) setIsAuthenticated(authenticated);
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
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
      // If already authenticated, toggle dropdown
      setIsDropdownOpen(!isDropdownOpen)
    } else {
      // Navigate to the new login page for proper Supabase auth
      navigate('/login')
    }
  }

  const goToDashboard = () => {
    setIsDropdownOpen(false)
    navigate('/admin')
  }

  const handleLogout = () => {
    const doLogout = async () => {
      try {
        await authService.logout();
      } catch (err) {
        console.error('Logout failed:', err);
      } finally {
        setIsAuthenticated(false);
        setIsDropdownOpen(false);
        navigate('/');
      }
    };

    doLogout();
  }

  const openLoginOrNavigate = () => {
    // On small screens navigate to the standalone login page
    closeMenu()
    navigate('/login')
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
        <button className="logo" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }} onClick={() => { navigate('/'); }}>
          <img src="/solarpack_logo.png" alt="SolarPack logo" />
          SolarPack
        </button>

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
              <button className="mobile-auth-btn" onClick={openLoginOrNavigate}>
                <i className="fas fa-user" aria-hidden="true"></i>
                Sign In
              </button>
            )}
          </div>
        </nav>
      </div>

      
    </>
  )
}

export default Header