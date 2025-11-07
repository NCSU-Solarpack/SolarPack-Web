
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

// Inline styles for NotFound page
const notFoundStyles = `
/* 404 Not Found Page Styles */
.not-found-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 128px);
  padding: 2rem 1rem;
  text-align: center;
}

.not-found-content {
  max-width: 500px;
  width: 100%;
}

.not-found-content h1 {
  font-family: "Bebas Neue", sans-serif;
  font-size: 2.5rem;
  color: var(--text);
  margin-bottom: 1rem;
  letter-spacing: 0.05em;
}

.error-code {
  font-family: "Bebas Neue", sans-serif;
  font-size: 4rem;
  color: var(--accent);
  margin-bottom: 1.5rem;
  letter-spacing: 0.1em;
}

.not-found-content p {
  color: var(--subtxt);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.error-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.home-btn,
.contact-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all var(--speed);
  border: 2px solid;
}

.home-btn {
  background: var(--accent);
  color: white;
  border-color: var(--accent);
}

.home-btn:hover {
  background: #c41820;
  border-color: #c41820;
}

.contact-btn {
  background: transparent;
  color: var(--text);
  border-color: var(--text);
}

.contact-btn:hover {
  background: var(--text);
  color: var(--bg);
}

/* Responsive Design */
@media (max-width: 768px) {
  .not-found-content h1 {
    font-size: 2rem;
  }

  .error-code {
    font-size: 3rem;
  }

  .error-actions {
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }

  .home-btn,
  .contact-btn {
    width: 100%;
    max-width: 200px;
  }
}
`;

const NotFound = () => {
  useEffect(() => {
    document.title = 'Page Not Found - SolarPack'
  }, [])

  return (
    <>
      <style>{notFoundStyles}</style>
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
    </>
  )
}

export default NotFound