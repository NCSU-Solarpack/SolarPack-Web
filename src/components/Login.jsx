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
    confirmPassword: ''
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
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
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
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === 'signup') {
        // Sign up flow
        if (!formData.email || !formData.password || !formData.confirmPassword) {
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

        const result = await authService.signUp(formData.email, formData.password);
        
        if (result.needsEmailConfirmation) {
          showAlert('Account created! Please check your email for a verification code.', 'success');
          navigate('/confirm-email', { state: { email: formData.email } });
        } else {
          showAlert('Account created successfully!', 'success');
          onLogin();
        }
      } else {
        // Login flow
        if (!formData.email || !formData.password) {
          showAlert('Please enter your email and password', 'error');
          setIsLoading(false);
          return;
        }

        await authService.signIn(formData.email, formData.password);
        showAlert('Welcome back!', 'success');
        onLogin();
      }
    } catch (error) {
      console.error('Auth error:', error);
      
      let errorMessage = 'An error occurred. Please try again.';
      
      if (error.message.includes('Invalid login credentials')) {
        errorMessage = 'Invalid email or password';
      } else if (error.message.includes('Email not confirmed')) {
        errorMessage = 'Please verify your email before signing in';
        showAlert(errorMessage, 'error');
        navigate('/confirm-email', { state: { email: formData.email } });
        setIsLoading(false);
        return;
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
    setFormData({ email: '', password: '', confirmPassword: '' });
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
              required
            />
          </div>

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
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                tabIndex="-1"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {mode === 'signup' && (
              <small className="form-hint">
                At least 8 characters with uppercase, lowercase, and numbers
              </small>
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
              New accounts start as <strong>Members</strong>. 
              Contact a director to upgrade your permissions.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;