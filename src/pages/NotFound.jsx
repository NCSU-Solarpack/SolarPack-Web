import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './NotFound.css'

const NotFound = () => {
  useEffect(() => {
    document.title = 'Page Not Found - SolarPack'
  }, [])

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>Page Not Found</h1>
        <div className="error-code">404</div>
        <p>The page you're looking for doesn't exist or may have been moved.</p>

        <div className="error-actions">
          <Link to="/" className="home-btn">Back to Home</Link>
          <Link to="/contact" className="contact-btn">Contact Us</Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound