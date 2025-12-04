import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../utils/auth';
import { useAlert } from '../contexts/AlertContext';
import './Login.css';

/**
 * ResetPassword Component
 * Handles setting a new password after clicking reset link
 */
const ResetPassword = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Check if we have a valid session (user clicked the reset link)
    // Supabase automatically handles the token from the URL
    const checkAuth = async () => {
      const user = authService.getUser();
      if (!user) {
        showAlert('Invalid or expired reset link', 'error');
        navigate('/admin');
      }
    };
    checkAuth();
  }, [navigate, showAlert]);

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
    
    if (!formData.password || !formData.confirmPassword) {
      showAlert('Please fill in all fields', 'error');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      showAlert('Passwords do not match', 'error');
      return;
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      showAlert(passwordError, 'error');
      return;
    }

    setLoading(true);

    try {
      await authService.updatePassword(formData.password);
      showAlert('Password updated successfully! You can now sign in.', 'success');
      navigate('/admin', { replace: true });
    } catch (error) {
      console.error('Password update error:', error);
      showAlert(error.message || 'Failed to update password. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Set New Password</h2>
          <p className="login-subtitle">
            Choose a strong password for your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter new password"
                required
                disabled={loading}
                autoFocus
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            <small className="form-hint">
              At least 8 characters with uppercase, lowercase, and numbers
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              required
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>

        <div className="login-footer">
          <p>
            <strong>Password Requirements:</strong>
          </p>
          <ul style={{ textAlign: 'left', fontSize: '0.9em', color: '#666' }}>
            <li>Minimum 8 characters</li>
            <li>At least one uppercase letter</li>
            <li>At least one lowercase letter</li>
            <li>At least one number</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
