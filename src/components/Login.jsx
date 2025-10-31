import { useState } from 'react';
import { authService } from '../utils/auth';

const Login = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate a small delay for better UX
    setTimeout(() => {
      if (authService.authenticate(password)) {
        onLogin();
        setPassword('');
      } else {
        setError('Invalid password. Please try again.');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="login-container">
      <style>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: var(--bg);
          padding: 2rem 1rem;
        }

        .login-card {
          background: var(--surface);
          padding: 3rem 2.5rem;
          border-radius: var(--radius);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
          max-width: 420px;
          width: 100%;
          border: 1px solid #333;
        }

        .login-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .login-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .login-logo img {
          height: 40px;
          width: auto;
        }

        .login-title {
          font-family: "Bebas Neue", sans-serif;
          font-size: 2rem;
          color: var(--accent);
          margin: 0;
        }

        .login-subtitle {
          color: var(--subtxt);
          margin-top: 0.5rem;
          font-size: 1rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-label {
          display: block;
          color: var(--text);
          margin-bottom: 0.75rem;
          font-weight: 500;
          font-size: 0.95rem;
        }

        .form-input {
          width: 100%;
          padding: 1rem;
          border: 2px solid #333;
          border-radius: 8px;
          background: var(--bg);
          color: var(--text);
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: var(--accent);
          background: var(--card);
        }

        .form-input::placeholder {
          color: var(--muted);
        }

        .login-button {
          width: 100%;
          padding: 1rem;
          background: var(--accent);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .login-button:hover {
          background: #c41820;
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(227, 27, 35, 0.3);
        }

        .login-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .error-message {
          color: #ff6b6b;
          text-align: center;
          margin-top: 1rem;
          font-size: 0.9rem;
          padding: 0.75rem;
          background: rgba(255, 107, 107, 0.1);
          border-radius: 6px;
          border: 1px solid rgba(255, 107, 107, 0.2);
        }

        .loading-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid transparent;
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 480px) {
          .login-card {
            padding: 2rem 1.5rem;
          }
          
          .login-title {
            font-size: 1.75rem;
          }
        }
      `}</style>

      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <img src="/solarpack_logo.png" alt="SolarPack logo" />
            <h1 className="login-title">SolarPack</h1>
          </div>
          <p className="login-subtitle">Admin Dashboard Access</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your dashboard password"
              disabled={isLoading}
              autoFocus
            />
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading || !password.trim()}
          >
            {isLoading ? (
              <>
                <div className="loading-spinner"></div>
                Signing In...
              </>
            ) : (
              'Access Dashboard'
            )}
          </button>

          {error && <div className="error-message">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Login;