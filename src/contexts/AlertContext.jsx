import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import Alert from '../components/Alert';

const AlertContext = createContext(null);

export const AlertProvider = ({ children }) => {
  const [alertQueue, setAlertQueue] = useState([]);
  const [currentAlert, setCurrentAlert] = useState(null);

  const showAlert = useCallback((config) => {
    return new Promise((resolve) => {
      const alert = {
        id: Date.now() + Math.random(),
        ...config,
        resolve
      };
      
      if (!currentAlert) {
        setCurrentAlert(alert);
      } else {
        setAlertQueue(prev => [...prev, alert]);
      }
    });
  }, [currentAlert]);

  const closeAlert = useCallback(() => {
    if (currentAlert?.resolve) {
      // Resolve with appropriate value
      if (currentAlert.type === 'confirm' && !currentAlert.confirmed) {
        currentAlert.resolve(false);
      } else {
        currentAlert.resolve(currentAlert.confirmed || true);
      }
    }
    
    // Show next alert in queue
    setAlertQueue(prev => {
      const [next, ...rest] = prev;
      if (next) {
        setCurrentAlert(next);
      } else {
        setCurrentAlert(null);
      }
      return rest;
    });
  }, [currentAlert]);

  const handleConfirm = useCallback(() => {
    if (currentAlert) {
      setCurrentAlert(prev => ({ ...prev, confirmed: true }));
    }
    closeAlert();
  }, [currentAlert, closeAlert]);

  const showError = useCallback((message, title = 'Error') => {
    return showAlert({ title, message, type: 'error' });
  }, [showAlert]);

  const showWarning = useCallback((message, title = 'Warning') => {
    return showAlert({ title, message, type: 'warning' });
  }, [showAlert]);

  const showSuccess = useCallback((message, title = 'Success') => {
    return showAlert({ title, message, type: 'success' });
  }, [showAlert]);

  const showConfirm = useCallback((message, title = 'Confirm Action', confirmText = 'Confirm', cancelText = 'Cancel') => {
    return showAlert({ title, message, type: 'confirm', confirmText, cancelText });
  }, [showAlert]);

  const value = useMemo(() => ({
    showAlert,
    showError,
    showWarning,
    showSuccess,
    showConfirm
  }), [showAlert, showError, showWarning, showSuccess, showConfirm]);

  return (
    <AlertContext.Provider value={value}>
      {children}
      {currentAlert && (
        <Alert
          key={currentAlert.id}
          isOpen={true}
          onClose={closeAlert}
          onConfirm={handleConfirm}
          title={currentAlert.title || 'Alert'}
          message={currentAlert.message || ''}
          type={currentAlert.type || 'info'}
          confirmText={currentAlert.confirmText || 'OK'}
          cancelText={currentAlert.cancelText || 'Cancel'}
        />
      )}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};
