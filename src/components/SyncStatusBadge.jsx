import { useEffect, useState } from 'react';

/**
 * Clean sync status indicator for Supabase real-time updates
 * Shows current sync state with minimal UI
 */
const SyncStatusBadge = ({ status, lastSync, onRefresh, connectionError }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const statusConfig = {
    synced: {
      icon: '✓',
      text: 'Up to date',
      color: '#4CAF50',
      bgColor: 'rgba(76, 175, 80, 0.1)',
      pulse: false
    },
    saving: {
      icon: '💾',
      text: 'Saving...',
      color: '#FF9800',
      bgColor: 'rgba(255, 152, 0, 0.1)',
      pulse: true
    },
    'new-data': {
      icon: '🔄',
      text: 'Click to update',
      color: '#E31820',
      bgColor: 'rgba(227, 24, 32, 0.1)',
      pulse: true,
      clickable: true
    },
    reconnecting: {
      icon: '🔌',
      text: 'Reconnecting...',
      color: '#FF9800',
      bgColor: 'rgba(255, 152, 0, 0.1)',
      pulse: true
    },
    error: {
      icon: '⚠️',
      text: 'Connection lost',
      color: '#f44336',
      bgColor: 'rgba(244, 67, 54, 0.1)',
      pulse: true,
      clickable: true
    }
  };

  const config = statusConfig[status] || statusConfig.synced;

  const formatLastSync = () => {
    if (!lastSync) return '';
    const now = Date.now();
    const diff = now - lastSync.getTime();
    
    if (diff < 3000) return 'just now';
    if (diff < 60000) return `${Math.floor(diff / 1000)}s ago`;
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    return lastSync.toLocaleTimeString();
  };

  const handleClick = () => {
    if (config.clickable && onRefresh) {
      onRefresh();
    }
  };

  return (
    <div 
      className="sync-status-badge"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={handleClick}
      style={{ cursor: config.clickable ? 'pointer' : 'default' }}
    >
      <style>{`
        .sync-status-badge {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.75rem;
          border-radius: 20px;
          background: ${config.bgColor};
          border: 1px solid ${config.color}40;
          transition: all 0.3s ease;
          user-select: none;
        }

        .sync-status-badge:hover {
          background: ${config.bgColor}cc;
          transform: translateY(-1px);
        }

        .sync-icon {
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: ${config.pulse ? 'pulse 2s ease-in-out infinite' : 'none'};
        }

        .sync-text {
          font-size: 0.85rem;
          color: ${config.color};
          font-weight: 500;
          white-space: nowrap;
        }

        .sync-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: ${config.color};
          animation: ${config.pulse ? 'pulse 2s ease-in-out infinite' : 'none'};
        }

        .sync-tooltip {
          position: absolute;
          bottom: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
          background: #2a2a2a;
          color: #fff;
          padding: 0.5rem 0.75rem;
          border-radius: 6px;
          font-size: 0.75rem;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.2s ease;
          z-index: 1000;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }

        .sync-tooltip::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 6px solid transparent;
          border-top-color: #2a2a2a;
        }

        .sync-tooltip.visible {
          opacity: 1;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.1);
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .sync-icon.checking {
          animation: spin 1s linear infinite;
        }
      `}</style>

      <span className={`sync-icon ${status === 'checking' ? 'checking' : ''}`}>
        {config.icon}
      </span>
      
      <span className="sync-text">{config.text}</span>
      
      {status === 'synced' && <div className="sync-dot" />}

      {showTooltip && (
        <div className={`sync-tooltip ${showTooltip ? 'visible' : ''}`}>
          {status === 'new-data' 
            ? 'Click to refresh and see updates' 
            : status === 'error'
              ? connectionError || 'Connection lost - click to retry'
              : status === 'reconnecting'
                ? 'Attempting to restore connection...'
                : lastSync 
                  ? `Last checked: ${formatLastSync()}` 
                  : 'Real-time sync active'}
        </div>
      )}
    </div>
  );
};

export default SyncStatusBadge;
