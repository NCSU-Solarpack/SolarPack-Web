
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../utils/auth';
import { supabaseService } from '../utils/supabase';
import './PendingApproval.css';

const PendingApproval = () => {
  const [user, setUser] = useState(null);
  const [approvalStatus, setApprovalStatus] = useState('pending');
  const [isChecking, setIsChecking] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = authService.getUser();
    setUser(currentUser);
    checkApprovalStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkApprovalStatus = async () => {
    setIsChecking(true);
    try {
      const profile = await supabaseService.getUserProfile();
      if (profile?.role?.approval_status) {
        const status = profile.role.approval_status;
        setApprovalStatus(status);

        if (status === 'approved') {
          // Refresh local auth user data and navigate to admin/dashboard.
          try {
            if (authService.loadUserData) {
              await authService.loadUserData();
            }
          } catch (e) {
            console.warn('Failed to reload auth user after approval:', e);
          }
          // Navigate to admin dashboard instead of full reload to avoid loops
          navigate('/admin');
          return;
        }
      }
    } catch (error) {
      console.error('Error checking approval status:', error);
    } finally {
      setIsChecking(false);
    }
  };

  const handleSignOut = async () => {
    await authService.signOut();
    window.location.href = '/';
  };

  return (
    <div className="login-container pending-approval-page">
      <div className="login-card pending-approval-card">
        <div className="login-header">
          <div className="login-logo">
            <img src="/solarpack_logo.png" alt="SolarPack logo" />
            <h1 className="login-title">SolarPack</h1>
          </div>
          <p className="login-subtitle">
            {approvalStatus === 'pending' ? 'Account Pending Approval' : 'Account Request Rejected'}
          </p>
        </div>

        {approvalStatus === 'pending' && (
          <>
            <div className="pending-status-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#e31b23" strokeWidth="2" />
                <path d="M12 7v5l3 2" stroke="#e31b23" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <p className="pending-approval-message">
              Thank you for signing up! Your request to join NC State SolarPack is <span className="pending-highlight">pending approval</span>.<br />
            </p>
            <div className="pending-approval-info">
              <h2>What happens next?</h2>
              <ul>
                <li>A team leader or director will review your request</li>
                <li>Check back here or refresh to see your status</li>
                <li>Contact us if you need urgent access</li>
              </ul>
            </div>
            <div className="pending-approval-contact">
              <span className="contact-label">Need help? </span>
              <span className="contact-email"><a href="mailto:solarpack@ncsu.edu">solarpack@ncsu.edu</a></span>
            </div>
            <div className="pending-approval-actions">
              <button 
                className="login-button btn-refresh" 
                onClick={checkApprovalStatus}
                disabled={isChecking}
              >
                {isChecking ? (
                  <>
                    <div className="loading-spinner"></div>
                    Checking...
                  </>
                ) : (
                  'Refresh Status'
                )}
              </button>
              <button className="login-button btn-signout" onClick={handleSignOut}>
                Sign Out
              </button>
            </div>
          </>
        )}

        {approvalStatus === 'rejected' && (
          <>
            <div className="pending-status-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2" />
                <path d="M8 8l8 8M16 8l-8 8" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <p className="pending-approval-message rejected">
              Sorry, your account request was <span className="pending-highlight">not approved</span>.<br />
              If you believe this is an error, please contact us.
            </p>
            <div className="pending-approval-contact">
              <span className="contact-label">Contact:</span>
              <span className="contact-email"><a href="mailto:solarpack@ncsu.edu">solarpack@ncsu.edu</a></span>
            </div>
            <div className="pending-approval-actions">
              <button className="login-button btn-signout" onClick={handleSignOut}>
                Sign Out
              </button>
            </div>
          </>
        )}

        {user && (
          <div className="pending-approval-user-info">
            <small>Signed in as: <span className="pending-user-email">{user.email}</span></small>
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingApproval;
