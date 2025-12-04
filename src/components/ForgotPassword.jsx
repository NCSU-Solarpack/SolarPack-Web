import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../utils/auth';
import { useAlert } from '../contexts/AlertContext';
import './Login.css';

/**
 * ForgotPassword Component
 * Handles password reset requests
 */
const ForgotPassword = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      showAlert('Please enter your email address', 'error');
      return;
    }

    setLoading(true);

    try {
      await authService.requestPasswordReset(email);
      setEmailSent(true);
      showAlert('Password reset email sent! Check your inbox.', 'success');
    } catch (error) {
      console.error('Password reset error:', error);
      
      // Even if there's an error, we show success for security
      // (don't reveal if email exists in system)
      setEmailSent(true);
      showAlert('If an account exists with this email, you will receive a password reset link.', 'info');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/admin');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Reset Password</h2>
          <p className="login-subtitle">
            {emailSent 
              ? 'Check your email for a password reset link'
              : 'Enter your email to receive a password reset link'
            }
          </p>
        </div>

        {!emailSent ? (
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                required
                disabled={loading}
                autoFocus
              />
            </div>

            <button 
              type="submit" 
              className="login-button"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>

            <div className="login-links">
              <button
                type="button"
                onClick={handleBackToLogin}
                className="link-button"
                disabled={loading}
              >
                Back to login
              </button>
            </div>
          </form>
        ) : (
          <div className="success-message">
            <p>
              We've sent a password reset link to <strong>{email}</strong>.
            </p>
            <p>
              Click the link in the email to reset your password. 
              The link will expire in 1 hour.
            </p>
            <p className="text-muted">
              Didn't receive the email? Check your spam folder.
            </p>
            
            <button 
              onClick={handleBackToLogin}
              className="login-button"
              style={{ marginTop: '20px' }}
            >
              Back to Login
            </button>
          </div>
        )}

        <div className="login-footer">
          <p>
            <strong>Note:</strong> For security reasons, we'll send a reset link 
            regardless of whether the email exists in our system.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
