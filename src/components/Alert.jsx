import { useState, useEffect } from 'react';

/**
 * Custom Alert Component
 * A styled replacement for browser's alert() and confirm() dialogs
 */
const Alert = ({ isOpen, onClose, onConfirm, title, message, type = 'info', confirmText = 'OK', cancelText = 'Cancel' }) => {
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when alert is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const isConfirm = type === 'confirm';

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    } else {
      onClose();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  // Get icon based on type
  const getIcon = () => {
    switch (type) {
      case 'error':
        return (
          <svg className="alert-icon error" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        );
      case 'warning':
        return (
          <svg className="alert-icon warning" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        );
      case 'success':
        return (
          <svg className="alert-icon success" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        );
      case 'confirm':
        return (
          <svg className="alert-icon confirm" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="9" y1="9" x2="15" y2="15"></line>
            <line x1="15" y1="9" x2="9" y2="15"></line>
          </svg>
        );
      default: // info
        return (
          <svg className="alert-icon info" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        );
    }
  };

  return (
    <>
      <style>{`
        .alert-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.75);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10000;
          animation: fadeIn 0.2s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .alert-box {
          background: var(--surface);
          border-radius: 12px;
          padding: 2rem;
          max-width: 450px;
          width: 90%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          animation: slideIn 0.3s ease-out;
        }

        .alert-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .alert-icon {
          width: 48px;
          height: 48px;
          flex-shrink: 0;
        }

        .alert-icon.error {
          color: #ef4444;
        }

        .alert-icon.warning {
          color: #f59e0b;
        }

        .alert-icon.success {
          color: #10b981;
        }

        .alert-icon.info {
          color: #3b82f6;
        }

        .alert-icon.confirm {
          color: #dc2626;
        }

        .alert-title {
          font-family: "Bebas Neue", sans-serif;
          font-size: 1.5rem;
          color: var(--text);
          margin: 0;
          flex: 1;
        }

        .alert-message {
          color: var(--subtxt);
          line-height: 1.6;
          margin-bottom: 2rem;
          font-size: 0.95rem;
        }

        .alert-message-section {
          margin-bottom: 1.25rem;
        }

        .alert-message-section:last-child {
          margin-bottom: 0;
        }

        .alert-message-main {
          font-size: 1rem;
          color: var(--text);
          font-weight: 500;
          margin-bottom: 0.75rem;
        }

        .alert-message-details {
          font-size: 0.9rem;
          color: var(--subtxt);
          margin-bottom: 0.5rem;
        }

        .alert-message-note {
          display: flex;
          gap: 0.75rem;
          padding: 1rem;
          background: rgba(220, 38, 38, 0.1);
          border-left: 3px solid #dc2626;
          border-radius: 6px;
          margin-top: 1rem;
        }

        .alert-message-note-icon {
          width: 20px;
          height: 20px;
          color: #dc2626;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .alert-message-note-content {
          flex: 1;
        }

        .alert-message-note-title {
          font-weight: 600;
          color: #dc2626;
          margin-bottom: 0.25rem;
          font-size: 0.9rem;
        }

        .alert-message-note-text {
          font-size: 0.85rem;
          color: var(--subtxt);
          line-height: 1.5;
        }

        .alert-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
        }

        .alert-btn {
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 600;
          transition: all 0.2s ease;
          font-family: inherit;
        }

        .alert-btn-primary {
          background: var(--accent);
          color: white;
        }

        .alert-btn-primary:hover {
          background: #c71821;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(227, 28, 35, 0.4);
        }

        .alert-btn-secondary {
          background: transparent;
          color: var(--text);
          border: 1px solid var(--subtxt);
        }

        .alert-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: var(--text);
        }

        .alert-btn-danger {
          background: #dc2626;
          color: white;
        }

        .alert-btn-danger:hover {
          background: #b91c1c;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(220, 38, 38, 0.4);
        }
      `}</style>

      <div className="alert-overlay" onClick={handleCancel}>
        <div className="alert-box" onClick={(e) => e.stopPropagation()}>
          <div className="alert-header">
            {getIcon()}
            <h3 className="alert-title">{title}</h3>
          </div>
          
          <div className="alert-message">
            {typeof message === 'string' ? <p>{message}</p> : message}
          </div>
          
          <div className="alert-actions">
            {isConfirm && (
              <button 
                className="alert-btn alert-btn-secondary"
                onClick={handleCancel}
              >
                {cancelText}
              </button>
            )}
            <button 
              className={`alert-btn ${type === 'confirm' ? 'alert-btn-danger' : 'alert-btn-primary'}`}
              onClick={handleConfirm}
              autoFocus
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Alert;
