import { useEffect } from 'react'

const Contact = () => {
  useEffect(() => {
    document.title = 'SolarPack · Contact'
  }, [])

  return (
    <>
      <style>{`
        /* Page-specific styles */
        h1 { 
          font-family: "Bebas Neue", sans-serif; 
          font-size: clamp(2.5rem, 7vw, 4.5rem); 
          letter-spacing: 0.04em; 
          margin: 2.5rem 0 0.5rem; 
          text-align: center; 
        }
        
        .contact-section { 
          background: var(--card); 
          border-radius: var(--radius); 
          box-shadow: 0 1px 6px #0003; 
          padding: 2.5rem 1.5rem; 
          max-width: 600px; 
          margin: 2.5rem auto 0; 
          text-align: center; 
        }
        
        .contact-info { 
          color: var(--subtxt); 
          font-size: 1.1rem; 
          margin-bottom: 1.5rem; 
        }
        
        .contact-socials a { 
          color: var(--accent); 
          margin: 0 0.5rem; 
          font-size: 1.5rem; 
        }
        
        .contact-socials a:hover { 
          color: #fff; 
        }
        
        .footer { 
          text-align: center; 
          color: #888; 
          font-size: 1rem; 
          margin: 3.5rem 0 1.5rem; 
        }
        
        .contact-info a[href^="mailto"] { 
          color: var(--accent); 
          text-decoration: underline; 
        }
        
        .contact-info a[href^="mailto"]:hover { 
          color: #fff; 
        }
      `}</style>

      <h1>Contact Us</h1>
      <div className="contact-section">
        <div className="contact-info">
          <p>Email us at <a href="mailto:solarpacknc@ncsu.edu">solarpacknc@ncsu.edu</a></p>
          <p>Or reach out on our socials below!</p>
        </div>
        <div className="contact-socials">
          <a href="https://www.instagram.com/solarpacknc/" title="Instagram" target="_blank" rel="noopener">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.linkedin.com/company/solarpack-nc-state/" title="LinkedIn" target="_blank" rel="noopener">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://www.facebook.com/SolarPackNC/" title="Facebook" target="_blank" rel="noopener">
            <i className="fab fa-facebook"></i>
          </a>
        </div>
      </div>
    </>
  )
}

export default Contact