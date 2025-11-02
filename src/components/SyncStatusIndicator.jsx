import { useState, useEffect, useRef } from 'react';
import useSyncStatus from '../hooks/useSyncStatus';

const SyncStatusIndicator = ({ 
  dataUrl = '/data/team.json',
  onRefresh, 
  lastUpdated, 
  isSaving = false, 
  checkInterval = 1000
}) => {
  const {
    status,
    lastCheck,
    errorDetails,
    refresh
  } = useSyncStatus(dataUrl, lastUpdated, checkInterval);
  
  const [showErrorDetails, setShowErrorDetails] = useState(false);

  // Override status when saving externally
  const currentStatus = isSaving ? 'saving' : status;

  // Status configurations
  const statusConfig = {
    'up-to-date': {
      icon: '✓',
      text: 'Everything up to date',
      color: '#4CAF50',
      bgColor: 'rgba(76, 175, 80, 0.1)',
      borderColor: '#4CAF50'
    },
    'changes-detected': {
      icon: '🔄',
      text: 'Updates available - Click to refresh',
      color: '#FF9800',
      bgColor: 'rgba(255, 152, 0, 0.1)',
      borderColor: '#FF9800'
    },
    'saving': {
      icon: '💾',
      text: 'Saving changes...',
      color: '#9C27B0',
      bgColor: 'rgba(156, 39, 176, 0.1)',
      borderColor: '#9C27B0'
    },
    'error': {
      icon: '⚠',
      text: 'Connection error - Click to retry',
      color: '#F44336',
      bgColor: 'rgba(244, 67, 54, 0.1)',
      borderColor: '#F44336'
    }
  };

  // Handle click
  const handleClick = () => {
    if (currentStatus === 'changes-detected' || currentStatus === 'error') {
      console.log('Sync indicator clicked - refreshing data');
      
      // Show user that refresh is happening
      const originalText = statusConfig[currentStatus].text;
      statusConfig[currentStatus].text = 'Refreshing data...';
      
      if (onRefresh) {
        onRefresh().then(() => {
          console.log('Data refresh completed');
        }).catch(error => {
          console.error('Error during refresh:', error);
          // If refresh fails, offer to reload the page
          if (confirm('Data refresh failed. Would you like to reload the page to ensure you have the latest data?')) {
            window.location.reload();
          }
        });
      }
      refresh();
    }
  };

  const currentConfig = statusConfig[currentStatus];
  const isClickable = currentStatus === 'changes-detected' || currentStatus === 'error';

  const formatLastCheck = (timestamp) => {
    const now = Date.now();
    const diff = now - timestamp;
    
    if (diff < 1000) return 'just now';
    if (diff < 60000) return `${Math.floor(diff / 1000)}s ago`;
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    return `${Math.floor(diff / 3600000)}h ago`;
  };

  const handleInfoClick = (e) => {
    e.stopPropagation();
    setShowErrorDetails(!showErrorDetails);
  };

  return (
    <>
      {showErrorDetails && errorDetails && (
        <div className="error-details-modal" onClick={() => setShowErrorDetails(false)}>
          <div className="error-details-content" onClick={(e) => e.stopPropagation()}>
            <div className="error-details-header">
              <h3>🔍 Error Details</h3>
              <button className="close-btn" onClick={() => setShowErrorDetails(false)}>×</button>
            </div>
            <div className="error-details-body">
              <div className="error-field">
                <strong>Error Type:</strong>
                <span className="error-type">{errorDetails.type}</span>
              </div>
              <div className="error-field">
                <strong>Message:</strong>
                <span>{errorDetails.userMessage || errorDetails.message}</span>
              </div>
              <div className="error-field">
                <strong>Data URL:</strong>
                <code>{errorDetails.url}</code>
              </div>
              <div className="error-field">
                <strong>Timestamp:</strong>
                <span>{new Date(errorDetails.timestamp).toLocaleString()}</span>
              </div>
              {errorDetails.suggestion && (
                <div className="error-suggestion">
                  <strong>💡 Suggestion:</strong>
                  <p>{errorDetails.suggestion}</p>
                </div>
              )}
              <div className="error-technical">
                <strong>Technical Details:</strong>
                <pre>{JSON.stringify(errorDetails, null, 2)}</pre>
              </div>
            </div>
          </div>
        </div>
      )}
    <div 
      className={`sync-status-indicator ${isClickable ? 'clickable' : ''}`}
      onClick={handleClick}
      title={isClickable ? 'Click to refresh' : `Last checked: ${formatLastCheck(lastCheck)}`}
      style={{
        backgroundColor: currentConfig.bgColor,
        borderColor: currentConfig.borderColor,
        color: currentConfig.color
      }}
    >
      <style>{`
        .sync-status-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
          transition: all 0.3s ease;
          border: 1px solid;
          user-select: none;
          min-width: 180px;
          justify-content: center;
        }
        
        .sync-status-indicator.clickable {
          cursor: pointer;
          transform: scale(1);
        }
        
        .sync-status-indicator.clickable:hover {
          transform: scale(1.02);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        .sync-status-indicator.clickable:active {
          transform: scale(0.98);
        }
        
        .status-icon {
          font-size: 1rem;
          animation: ${currentStatus === 'saving' ? 'spin 1s linear infinite' : 'none'};
        }
        
        .status-text {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        
        .error-details-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          animation: fadeIn 0.2s ease;
        }
        
        .error-details-content {
          background: var(--surface, #1e1e1e);
          border-radius: 12px;
          padding: 0;
          max-width: 600px;
          width: 90%;
          max-height: 80vh;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          animation: slideUp 0.3s ease;
        }
        
        .error-details-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(244, 67, 54, 0.1);
        }
        
        .error-details-header h3 {
          margin: 0;
          color: #F44336;
          font-size: 1.25rem;
        }
        
        .close-btn {
          background: none;
          border: none;
          color: var(--text, #fff);
          font-size: 2rem;
          cursor: pointer;
          padding: 0;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          transition: background 0.2s ease;
        }
        
        .close-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        
        .error-details-body {
          padding: 1.5rem;
          overflow-y: auto;
          max-height: calc(80vh - 80px);
        }
        
        .error-field {
          margin-bottom: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        
        .error-field strong {
          color: var(--accent, #cc0000);
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .error-field span,
        .error-field code {
          color: var(--text, #fff);
          font-size: 0.95rem;
        }
        
        .error-field code {
          background: rgba(0, 0, 0, 0.3);
          padding: 0.5rem;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          word-break: break-all;
        }
        
        .error-type {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 4px;
          background: rgba(244, 67, 54, 0.2);
          color: #F44336;
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.8rem;
        }
        
        .error-suggestion {
          margin-top: 1.5rem;
          padding: 1rem;
          background: rgba(76, 175, 80, 0.1);
          border-left: 3px solid #4CAF50;
          border-radius: 4px;
        }
        
        .error-suggestion strong {
          color: #4CAF50;
          display: block;
          margin-bottom: 0.5rem;
        }
        
        .error-suggestion p {
          margin: 0;
          color: var(--text, #fff);
          line-height: 1.5;
        }
        
        .error-technical {
          margin-top: 1.5rem;
          padding: 1rem;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 4px;
        }
        
        .error-technical strong {
          color: var(--subtxt, #999);
          display: block;
          margin-bottom: 0.5rem;
          font-size: 0.85rem;
        }
        
        .error-technical pre {
          margin: 0;
          color: var(--subtxt, #999);
          font-size: 0.8rem;
          overflow-x: auto;
          white-space: pre-wrap;
          word-break: break-word;
        }
        
        .info-btn {
          background: none;
          border: none;
          color: inherit;
          font-size: 1rem;
          cursor: pointer;
          padding: 0 4px;
          margin-left: 4px;
          opacity: 0.7;
          transition: opacity 0.2s ease;
        }
        
        .info-btn:hover {
          opacity: 1;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
      
      <span 
        className="status-icon" 
        style={{ color: currentConfig.color }}
      >
        {currentConfig.icon}
      </span>
      <span 
        className="status-text"
        style={{ color: currentConfig.color }}
      >
        {currentConfig.text}
      </span>
      {currentStatus === 'error' && errorDetails && (
        <button 
          className="info-btn"
          onClick={handleInfoClick}
          title="View error details"
        >
          ℹ️
        </button>
      )}
    </div>
    </>
  );
};

export default SyncStatusIndicator;