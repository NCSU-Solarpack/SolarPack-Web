import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../utils/auth';
import { useAlert } from '../contexts/AlertContext';
import './Login.css';

/**
 * ConfirmEmail Component
 * Handles email verification with OTP code
 */
const ConfirmEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showAlert } = useAlert();
  
  // Get email from navigation state (passed from signup)
  const email = location.state?.email || '';
  
  const [formData, setFormData] = useState({
    email: email,
    code: ''
  });
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.code) {
      showAlert('Please enter your email and verification code', 'error');
      return;
    }

    setLoading(true);

    try {
      await authService.verifyEmail(formData.email, formData.code);
      showAlert('Email verified successfully! You can now sign in.', 'success');
      navigate('/admin', { replace: true });
    } catch (error) {
      console.error('Email verification error:', error);
      
      let errorMessage = 'Failed to verify email. ';
      if (error.message.includes('Invalid token')) {
        errorMessage += 'The verification code is incorrect or has expired.';
      } else if (error.message.includes('Token has expired')) {
        errorMessage += 'The verification code has expired. Please request a new one.';
      } else {
        errorMessage += error.message || 'Please try again.';
      }
      
      showAlert(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!formData.email) {
      showAlert('Please enter your email address', 'error');
      return;
    }

    setResending(true);

    try {
      await authService.resendConfirmation(formData.email);
      showAlert('Verification code sent! Check your email.', 'success');
    } catch (error) {
      console.error('Resend confirmation error:', error);
      showAlert(error.message || 'Failed to resend verification code', 'error');
    } finally {
      setResending(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/admin');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Verify Your Email</h2>
          <p className="login-subtitle">
            Enter the 6-digit verification code sent to your email
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              required
              disabled={loading || resending}
            />
          </div>

          <div className="form-group">
            <label htmlFor="code">Verification Code</label>
            <input
              type="text"
              id="code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="123456"
              maxLength="6"
              pattern="[0-9]{6}"
              required
              disabled={loading || resending}
              autoComplete="off"
            />
            <small className="form-hint">
              Enter the 6-digit code from your email
            </small>
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={loading || resending}
          >
            {loading ? 'Verifying...' : 'Verify Email'}
          </button>

          <div className="login-links">
            <button
              type="button"
              onClick={handleResendCode}
              className="link-button"
              disabled={loading || resending}
            >
              {resending ? 'Sending...' : 'Resend verification code'}
            </button>
            
            <button
              type="button"
              onClick={handleBackToLogin}
              className="link-button"
              disabled={loading || resending}
            >
              Back to login
            </button>
          </div>
        </form>

        <div className="login-footer">
          <p>
            <strong>Note:</strong> Verification codes expire after 1 hour. 
            If your code has expired, request a new one.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmail;
