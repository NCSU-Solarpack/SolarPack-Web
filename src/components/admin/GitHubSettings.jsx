import { useState, useEffect } from 'react';
import { githubService } from '../../utils/github';
import { CheckCircle, XCircle, AlertCircle, RefreshCw, Eye, EyeOff } from 'lucide-react';

const GitHubSettings = () => {
  const [token, setToken] = useState('');
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const [tokenSource, setTokenSource] = useState('none');

  useEffect(() => {
    checkTokenSource();
    // Automatically test connection on load
    testConnection();
  }, []);

  const checkTokenSource = () => {
    const loadedToken = githubService.loadToken();
    
    if (loadedToken) {
      // Check if it's from environment variable
      if (import.meta.env.VITE_GITHUB_TOKEN) {
        setTokenSource('environment');
        setToken('[Environment Variable]');
      }
      // Otherwise it's from localStorage
      else {
        setTokenSource('localstorage');
        setToken('*'.repeat(20));
      }
    } else {
      setTokenSource('none');
      setToken('');
    }
  };

  const handleSaveToken = () => {
    if (!token || token.startsWith('*') || token.startsWith('[')) {
      alert('Please enter a valid GitHub token');
      return;
    }

    githubService.setToken(token);
    checkTokenSource();
    testConnection();
  };

  const handleClearToken = () => {
    githubService.clearToken();
    checkTokenSource();
    setConnectionStatus(null);
  };

  const testConnection = async () => {
    setIsTestingConnection(true);
    setConnectionStatus(null);

    try {
      const result = await githubService.testConnection();
      setConnectionStatus(result);
    } catch (error) {
      setConnectionStatus({
        success: false,
        error: error.message
      });
    } finally {
      setIsTestingConnection(false);
    }
  };

  return (
    <div className="github-settings">
      <style>{`
        .github-settings {
          background: var(--surface);
          padding: 2rem;
          border-radius: var(--radius);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          max-width: 600px;
          margin: 0 auto;
        }

        .settings-title {
          font-family: "Bebas Neue", sans-serif;
          font-size: 1.5rem;
          color: var(--text);
          margin: 0 0 1.5rem 0;
        }

        .settings-description {
          color: var(--subtxt);
          margin-bottom: 2rem;
          line-height: 1.5;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-label {
          display: block;
          color: var(--text);
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        .token-input-group {
          display: flex;
          gap: 0.5rem;
        }

        .form-input {
          flex: 1;
          padding: 0.75rem;
          border: 2px solid #333;
          border-radius: 6px;
          background: #1a1a1a;
          color: var(--text);
          font-size: 0.9rem;
          font-family: monospace;
        }

        .form-input:focus {
          outline: none;
          border-color: var(--accent);
        }

        .toggle-btn {
          background: #666;
          color: white;
          border: none;
          padding: 0.75rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.8rem;
          white-space: nowrap;
        }

        .toggle-btn:hover {
          background: #777;
        }

        .action-buttons {
          display: flex;
          gap: 0.75rem;
          margin-top: 1rem;
        }

        .save-btn, .test-btn, .clear-btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .save-btn {
          background: var(--accent);
          color: white;
        }

        .save-btn:hover {
          background: #c71821;
          transform: translateY(-1px);
        }

        .test-btn {
          background: #0066cc;
          color: white;
        }

        .test-btn:hover:not(:disabled) {
          background: #0052a3;
          transform: translateY(-1px);
        }

        .test-btn:disabled {
          background: #666;
          cursor: not-allowed;
        }

        .clear-btn {
          background: #666;
          color: white;
        }

        .clear-btn:hover {
          background: #777;
        }

        /* New Token Status Styles */
        .token-status {
          background: rgba(0, 123, 255, 0.1);
          border: 1px solid rgba(0, 123, 255, 0.3);
          border-radius: 8px;
          padding: 1.5rem;
          margin-bottom: 2rem;
        }

        .status-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .status-header h4 {
          margin: 0;
          color: var(--text);
          font-size: 1.1rem;
        }

        .test-btn-small {
          background: #0066cc;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .test-btn-small:hover:not(:disabled) {
          background: #0052a3;
        }

        .test-btn-small:disabled {
          background: #666;
          cursor: not-allowed;
        }

        .spinning {
          animation: spin 1s linear infinite;
        }

        .token-info {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .token-source, .token-display {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .status-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .status-success {
          background: rgba(40, 167, 69, 0.2);
          color: #28a745;
          border: 1px solid rgba(40, 167, 69, 0.3);
        }

        .status-warning {
          background: rgba(255, 193, 7, 0.2);
          color: #ffc107;
          border: 1px solid rgba(255, 193, 7, 0.3);
        }

        .status-error {
          background: rgba(220, 53, 69, 0.2);
          color: #dc3545;
          border: 1px solid rgba(220, 53, 69, 0.3);
        }

        .token-value {
          background: rgba(255, 255, 255, 0.1);
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-family: monospace;
          font-size: 0.85rem;
        }

        .manual-token-section {
          border-top: 1px solid #333;
          padding-top: 2rem;
          margin-top: 2rem;
        }

        .manual-token-section h4 {
          margin: 0 0 0.5rem 0;
          color: var(--text);
          font-size: 1.1rem;
        }

        .section-description {
          color: var(--subtxt);
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
        }
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .save-btn {
          background: var(--accent);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
        }

        .save-btn:hover {
          background: #c71821;
          transform: translateY(-1px);
        }

        .test-btn {
          background: #28a745;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .test-btn:hover {
          background: #218838;
        }

        .test-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .clear-btn {
          background: #dc3545;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
        }

        .clear-btn:hover {
          background: #c82333;
        }

        .status-card {
          padding: 1rem;
          border-radius: 6px;
          margin-bottom: 1rem;
        }

        .status-success {
          background: rgba(40, 167, 69, 0.2);
          border: 1px solid #28a745;
          color: #28a745;
        }

        .status-error {
          background: rgba(220, 53, 69, 0.2);
          border: 1px solid #dc3545;
          color: #dc3545;
        }

        .status-title {
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .status-details {
          font-size: 0.9rem;
          color: var(--subtxt);
        }

        .permissions {
          display: flex;
          gap: 1rem;
          margin-top: 0.5rem;
        }

        .permission {
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .permission-granted {
          background: #28a745;
          color: white;
        }

        .permission-denied {
          background: #dc3545;
          color: white;
        }

        .help-section {
          background: rgba(0, 123, 255, 0.1);
          padding: 1.5rem;
          border-radius: 6px;
          margin-top: 2rem;
        }

        .help-title {
          color: var(--accent);
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .help-steps {
          color: var(--text);
          line-height: 1.6;
        }

        .help-steps ol {
          margin: 0.5rem 0;
          padding-left: 1.5rem;
        }

        .help-steps li {
          margin-bottom: 0.5rem;
        }

        .help-steps code {
          background: rgba(255, 255, 255, 0.1);
          padding: 0.2rem 0.4rem;
          border-radius: 3px;
          font-family: monospace;
        }

        .loading-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid transparent;
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <h3 className="settings-title">GitHub Integration Settings</h3>
      
      <p className="settings-description">
        GitHub integration allows the admin interface to automatically update content files 
        in your repository. Current token status is shown below.
      </p>

      {/* Token Status Section */}
      <div className="token-status">
        <div className="status-header">
          <h4>Token Status</h4>
          <button 
            className="test-btn-small" 
            onClick={testConnection}
            disabled={isTestingConnection}
          >
            {isTestingConnection ? (
              <>
                <RefreshCw size={14} className="spinning" />
                Testing...
              </>
            ) : (
              <>
                <RefreshCw size={14} />
                Test Connection
              </>
            )}
          </button>
        </div>
        
        <div className="token-info">
          <div className="token-source">
            <strong>Source:</strong> 
            {tokenSource === 'environment' && (
              <span className="status-badge status-success">
                <CheckCircle size={16} />
                Environment Variable
              </span>
            )}
            {tokenSource === 'localstorage' && (
              <span className="status-badge status-warning">
                <AlertCircle size={16} />
                User Input (Local)
              </span>
            )}
            {tokenSource === 'none' && (
              <span className="status-badge status-error">
                <XCircle size={16} />
                No Token Available
              </span>
            )}
          </div>
          
          <div className="token-display">
            <strong>Token:</strong> 
            <code className="token-value">{token || 'Not configured'}</code>
          </div>
        </div>
      </div>

      {/* Connection Status */}
      {connectionStatus && (
        <div className={`status-card ${connectionStatus.success ? 'status-success' : 'status-error'}`}>
          <div className="status-title">
            {connectionStatus.success ? (
              <>
                <CheckCircle size={20} />
                Connection Successful
              </>
            ) : (
              <>
                <XCircle size={20} />
                Connection Failed
              </>
            )}
          </div>
          {connectionStatus.success ? (
            <div className="status-details">
              <p><strong>Repository:</strong> {connectionStatus.owner}/{connectionStatus.repo}</p>
              <p><strong>Branch:</strong> {connectionStatus.branch || 'main'}</p>
              <div className="permissions">
                <span className={`permission ${connectionStatus.permissions.push ? 'permission-granted' : 'permission-denied'}`}>
                  {connectionStatus.permissions.push ? <CheckCircle size={14} /> : <XCircle size={14} />}
                  Push Access
                </span>
                <span className={`permission ${connectionStatus.permissions.admin ? 'permission-granted' : 'permission-denied'}`}>
                  {connectionStatus.permissions.admin ? <CheckCircle size={14} /> : <XCircle size={14} />}
                  Admin Access
                </span>
              </div>
            </div>
          ) : (
            <div className="status-details">
              <p><strong>Error:</strong> {connectionStatus.error}</p>
            </div>
          )}
        </div>
      )}

      {/* Manual Token Entry */}
      <div className="manual-token-section">
          <h4>Manual Token Entry</h4>
          <p className="section-description">
            Enter a GitHub Personal Access Token if you want to override the current configuration.
          </p>
          
          <div className="form-group">
            <label className="form-label">GitHub Personal Access Token</label>
            <div className="token-input-group">
              <input
                type={showToken ? 'text' : 'password'}
                className="form-input"
                value={tokenSource === 'none' ? token : ''}
                onChange={(e) => setToken(e.target.value)}
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              />
              <button 
                className="toggle-btn"
                onClick={() => setShowToken(!showToken)}
              >
                {showToken ? <EyeOff size={16} /> : <Eye size={16} />}
                {showToken ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div className="action-buttons">
            <button className="save-btn" onClick={handleSaveToken}>
              Save Token
            </button>
            {tokenSource === 'localstorage' && (
              <button className="clear-btn" onClick={handleClearToken}>
                Clear Token
              </button>
            )}
          </div>
        </div>

      <div className="help-section">
        <div className="help-title">How to Create a GitHub Personal Access Token:</div>
        <div className="help-steps">
          <ol>
            <li>Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)</li>
            <li>Click "Generate new token" → "Generate new token (classic)"</li>
            <li>Set expiration and select these scopes:
              <ul>
                <li><code>repo</code> - Full control of private repositories</li>
                <li><code>workflow</code> - Update GitHub Action workflows (optional)</li>
              </ul>
            </li>
            <li>Click "Generate token" and copy the token</li>
            <li>Paste the token above and click "Save Token"</li>
          </ol>
          <p><strong>Note:</strong> Store this token securely. It provides access to your repository.</p>
        </div>
      </div>
    </div>
  );
};

export default GitHubSettings;