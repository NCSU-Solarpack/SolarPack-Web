import { useState, useEffect } from 'react';
import { githubService } from '../../utils/github';

const GitHubSettings = () => {
  const [token, setToken] = useState('');
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [showToken, setShowToken] = useState(false);

  useEffect(() => {
    const savedToken = githubService.loadToken();
    if (savedToken) {
      // Check if token is from environment variable
      const isFromEnv = import.meta.env.VITE_GITHUB_TOKEN;
      setToken(isFromEnv ? '[Environment Variable]' : '*'.repeat(20)); // Mask the saved token
      testConnection();
    }
  }, []);

  const handleSaveToken = () => {
    if (!token || token.startsWith('*')) {
      alert('Please enter a valid GitHub token');
      return;
    }

    githubService.setToken(token);
    testConnection();
  };

  const handleClearToken = () => {
    githubService.clearToken();
    setToken('');
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
        Configure GitHub integration to allow the admin interface to automatically update content files 
        in your repository. This enables seamless content management without manual file editing.
      </p>

      <div className="form-group">
        <label className="form-label">GitHub Personal Access Token</label>
        <div className="token-input-group">
          <input
            type={showToken ? 'text' : 'password'}
            className="form-input"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
          />
          <button 
            className="toggle-btn"
            onClick={() => setShowToken(!showToken)}
          >
            {showToken ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>

      <div className="action-buttons">
        <button className="save-btn" onClick={handleSaveToken}>
          Save Token
        </button>
        <button 
          className="test-btn" 
          onClick={testConnection}
          disabled={isTestingConnection || !githubService.hasToken()}
        >
          {isTestingConnection ? (
            <>
              <div className="loading-spinner"></div>
              Testing...
            </>
          ) : (
            'Test Connection'
          )}
        </button>
        {githubService.hasToken() && (
          <button className="clear-btn" onClick={handleClearToken}>
            Clear Token
          </button>
        )}
      </div>

      {connectionStatus && (
        <div className={`status-card ${connectionStatus.success ? 'status-success' : 'status-error'}`}>
          <div className="status-title">
            {connectionStatus.success ? '✅ Connection Successful' : '❌ Connection Failed'}
          </div>
          {connectionStatus.success ? (
            <div className="status-details">
              Connected to repository: <strong>{connectionStatus.owner}/{connectionStatus.repo}</strong>
              <div className="permissions">
                <span className={`permission ${connectionStatus.permissions.push ? 'permission-granted' : 'permission-denied'}`}>
                  Push: {connectionStatus.permissions.push ? 'Granted' : 'Denied'}
                </span>
                <span className={`permission ${connectionStatus.permissions.admin ? 'permission-granted' : 'permission-denied'}`}>
                  Admin: {connectionStatus.permissions.admin ? 'Granted' : 'Denied'}
                </span>
              </div>
            </div>
          ) : (
            <div className="status-details">
              Error: {connectionStatus.error}
            </div>
          )}
        </div>
      )}

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