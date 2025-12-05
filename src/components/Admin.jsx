import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../utils/auth';
import Login from './Login';
import AdminDashboard from './AdminDashboard';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    
    // Check if user is already authenticated after auth is initialized
    const checkAuth = async () => {
      // Wait for auth service to fully initialize (restore session from localStorage)
      await authService.waitForInit();
      
      if (mounted) {
        const user = authService.getUser();
        
        // Check if user is pending or rejected and redirect
        if (user && authService.isPending()) {
          console.log('User is pending approval, redirecting to pending page');
          navigate('/pending-approval');
          return;
        }
        
        if (user && authService.isRejected()) {
          console.log('User is rejected, redirecting to pending page');
          navigate('/pending-approval');
          return;
        }
        
        const authenticated = authService.isAuthenticated();
        console.log('Admin auth check after init:', authenticated, user?.email);
        setIsAuthenticated(authenticated);
        setIsLoading(false);
      }
    };

    checkAuth();

    // Subscribe to auth state changes to handle session restoration and sign outs
    const unsubscribe = authService.onAuthStateChange((authenticated, user) => {
      if (mounted) {
        console.log('Admin received auth state change:', authenticated, user?.email);
        
        // Check approval status on auth state change
        if (user && authService.isPending()) {
          navigate('/pending-approval');
          return;
        }
        
        if (user && authService.isRejected()) {
          navigate('/pending-approval');
          return;
        }
        
        setIsAuthenticated(authenticated);
      }
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, [navigate]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    try {
      await authService.signOut();
      setIsAuthenticated(false);
      navigate('/'); // Redirect to home page after logout
    } catch (error) {
      console.error('Logout error:', error);
      // Still log out locally even if API call fails
      setIsAuthenticated(false);
      navigate('/');
    }
  };

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        color: '#888'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <div className="admin-app">
      {isAuthenticated ? (
        <AdminDashboard onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default Admin;