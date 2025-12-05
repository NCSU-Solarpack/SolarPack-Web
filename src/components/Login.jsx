import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../utils/auth';
import { useAlert } from '../contexts/AlertContext';
import './Login.css';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validatePassword = (password) => {
    // Minimum 6 characters, at least one uppercase, one lowercase, one digit, and one symbol
    if (password.length < 6) {
      return 'Password must be at least 6 characters long';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/[0-9]/.test(password)) {
      return 'Password must contain at least one number';
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      return 'Password must contain at least one symbol';
    }
    return null;
  };

  // Derived checks for dynamic UI
  const password = formData.password || '';
  const checks = {
    length: password.length >= 6,
    lower: /[a-z]/.test(password),
    upper: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    symbol: /[^A-Za-z0-9]/.test(password)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === 'signup') {
        // Sign up flow
        if (!formData.email || !formData.password || !formData.confirmPassword || !formData.firstName || !formData.lastName) {
          showAlert('Please fill in all fields', 'error');
          setIsLoading(false);
          return;
        }

        if (formData.password !== formData.confirmPassword) {
          showAlert('Passwords do not match', 'error');
          setIsLoading(false);
          return;
        }

        const passwordError = validatePassword(formData.password);
        if (passwordError) {
          showAlert(passwordError, 'error');
          setIsLoading(false);
          return;
        }

        await authService.signUp(
          formData.email,
          formData.password,
          formData.firstName,
          formData.lastName
        );

        // After signup, redirect to pending approval page
        showAlert('Account created! Awaiting approval from team leaders.', 'success');
        navigate('/pending-approval');
      } else {
        // Login flow
        if (!formData.email || !formData.password) {
          showAlert('Please enter your email and password', 'error');
          setIsLoading(false);
          return;
        }

        await authService.signIn(formData.email, formData.password);
        
        // Check approval status after sign in
        if (authService.isPending()) {
          showAlert('Your account is pending approval', 'info');
          navigate('/pending-approval');
          return;
        }
        
        if (authService.isRejected()) {
          showAlert('Your account request was not approved', 'error');
          navigate('/pending-approval');
          return;
        }
        
        showAlert('Welcome back!', 'success');
        onLogin();
      }
      } catch (error) {
      console.error('Auth error:', error);
      
      let errorMessage = 'An error occurred. Please try again.';
      
      if (error.message.includes('Invalid login credentials')) {
        errorMessage = 'Invalid email or password';
      } else if (error.message.includes('User already registered')) {
        errorMessage = 'An account with this email already exists';
      } else if (error.message.includes('Invalid email')) {
        errorMessage = 'Please enter a valid email address';
      } else {
        errorMessage = error.message || errorMessage;
      }
      
      showAlert(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setFormData({ email: '', password: '', confirmPassword: '', firstName: '', lastName: '' });
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <img src="/solarpack_logo.png" alt="SolarPack logo" />
            <h1 className="login-title">SolarPack</h1>
          </div>
          <p className="login-subtitle">
            {mode === 'login' ? 'Admin Dashboard Access' : 'Create Your Account'}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@ncsu.edu"
              disabled={isLoading}
              autoFocus
              autoComplete="email"
              required
            />
          </div>

          {mode === 'signup' && (
            <div className="form-row">
              <div className="form-group half">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="form-input"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  disabled={isLoading}
                  required
                  autoComplete="given-name"
                />
              </div>

              <div className="form-group half">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="form-input"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  disabled={isLoading}
                  required
                  autoComplete="family-name"
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className="form-input"
                value={formData.password}
                onChange={handleChange}
                placeholder={mode === 'signup' ? 'Create a strong password' : 'Enter your password'}
                disabled={isLoading}
                required
                autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                aria-pressed={showPassword}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C7 20 2.73 16.11 1 12c.47-1 .99-1.95 1.57-2.82" />
                    <path d="M3 3l18 18" />
                    <path d="M9.88 9.88A3 3 0 0 0 14.12 14.12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {mode === 'signup' && (
              <div>
                <small className="form-hint">
                  Password requirements
                </small>
                <ul className="password-checklist" aria-live="polite">
                  <li className={checks.length ? 'met' : 'unmet'}>
                    <span className="check-icon" aria-hidden>{checks.length ? '✓' : '✕'}</span>
                    <span>Minimum 6 characters</span>
                  </li>
                  <li className={checks.lower ? 'met' : 'unmet'}>
                    <span className="check-icon" aria-hidden>{checks.lower ? '✓' : '✕'}</span>
                    <span>At least one lowercase letter</span>
                  </li>
                  <li className={checks.upper ? 'met' : 'unmet'}>
                    <span className="check-icon" aria-hidden>{checks.upper ? '✓' : '✕'}</span>
                    <span>At least one uppercase letter</span>
                  </li>
                  <li className={checks.number ? 'met' : 'unmet'}>
                    <span className="check-icon" aria-hidden>{checks.number ? '✓' : '✕'}</span>
                    <span>At least one number</span>
                  </li>
                  <li className={checks.symbol ? 'met' : 'unmet'}>
                    <span className="check-icon" aria-hidden>{checks.symbol ? '✓' : '✕'}</span>
                    <span>At least one symbol (e.g. !@#$%)</span>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {mode === 'signup' && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                className="form-input"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                disabled={isLoading}
                  required
                  autoComplete="new-password"
              />
            </div>
          )}

          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="loading-spinner"></div>
                {mode === 'login' ? 'Signing In...' : 'Creating Account...'}
              </>
            ) : (
              mode === 'login' ? 'Sign In' : 'Create Account'
            )}
          </button>

          <div className="login-links">
            {mode === 'login' && (
              <button
                type="button"
                onClick={handleForgotPassword}
                className="link-button"
                disabled={isLoading}
              >
                Forgot password?
              </button>
            )}
            
            <button
              type="button"
              onClick={toggleMode}
              className="link-button"
              disabled={isLoading}
            >
              {mode === 'login' 
                ? "Don't have an account? Sign up" 
                : 'Already have an account? Sign in'
              }
            </button>
          </div>
        </form>

        {mode === 'signup' && (
          <div className="login-footer">
            <p className="text-muted">
              Your account will require approval from a team leader or director before you can access the dashboard.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;