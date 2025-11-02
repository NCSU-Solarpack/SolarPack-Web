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
    refresh
  } = useSyncStatus(dataUrl, lastUpdated, checkInterval);

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

  return (
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
    </div>
  );
};

export default SyncStatusIndicator;