import { useState, useEffect } from 'react';
import { authService } from '../../utils/auth';
import { githubService } from '../../utils/github';
import { Plus, Edit2, Trash2, Save, X, Upload, Star } from 'lucide-react';

const SponsorsManager = () => {
  const [sponsorData, setSponsorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTierIndex, setEditingTierIndex] = useState(null);
  const [editingSponsorIndex, setEditingSponsorIndex] = useState(null);
  const [newTier, setNewTier] = useState({ tier: '', sponsors: [] });
  const [showAddTier, setShowAddTier] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultTiers = [
    { tier: "Platinum Sponsors", sponsors: [] },
    { tier: "Gold Sponsors", sponsors: [] },
    { tier: "Silver Sponsors", sponsors: [] },
    { tier: "Bronze Sponsors", sponsors: [] }
  ];

  useEffect(() => {
    loadSponsorData();
  }, []);

  const loadSponsorData = async () => {
    try {
      setLoading(true);
      // Try to load from existing file first
      try {
        const response = await fetch('/data/sponsors.json');
        if (response.ok) {
          const data = await response.json();
          setSponsorData(data.sponsorTiers || defaultTiers);
        } else {
          // If file doesn't exist, use default structure
          setSponsorData(defaultTiers);
        }
      } catch (error) {
        // If file doesn't exist, start with default tiers
        setSponsorData(defaultTiers);
      }
    } catch (error) {
      console.error('Error loading sponsor data:', error);
      setSponsorData(defaultTiers);
    } finally {
      setLoading(false);
    }
  };

  const saveSponsorData = async () => {
    if (!authService.hasPermission('edit_content')) {
      alert('You do not have permission to edit sponsor data');
      return;
    }

    try {
      setIsSubmitting(true);
      const dataToSave = { sponsorTiers: sponsorData };
  // Save to public/data/sponsors.json in the repo
  await githubService.updateFile('public/data/sponsors.json', dataToSave, 'Update sponsors data via admin interface');
      alert('Sponsor data saved successfully!');
    } catch (error) {
      console.error('Error saving sponsor data:', error);
      alert('Error saving sponsor data: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addTier = () => {
    if (!newTier.tier.trim()) {
      alert('Please enter a tier name');
      return;
    }

    const updatedData = [...sponsorData, { ...newTier, sponsors: newTier.sponsors || [] }];
    setSponsorData(updatedData);
    setNewTier({ tier: '', sponsors: [] });
    setShowAddTier(false);
  };

  const deleteTier = (index) => {
    if (confirm('Are you sure you want to delete this tier?')) {
      const updatedData = sponsorData.filter((_, i) => i !== index);
      setSponsorData(updatedData);
    }
  };

  const updateTier = (index, field, value) => {
    const updatedData = [...sponsorData];
    updatedData[index][field] = value;
    setSponsorData(updatedData);
  };

  const addSponsor = (tierIndex) => {
    const updatedData = [...sponsorData];
    updatedData[tierIndex].sponsors.push({ name: '', image: '' });
    setSponsorData(updatedData);
  };

  const updateSponsor = (tierIndex, sponsorIndex, field, value) => {
    const updatedData = [...sponsorData];
    updatedData[tierIndex].sponsors[sponsorIndex][field] = value;
    setSponsorData(updatedData);
  };

  const deleteSponsor = (tierIndex, sponsorIndex) => {
    const updatedData = [...sponsorData];
    updatedData[tierIndex].sponsors.splice(sponsorIndex, 1);
    setSponsorData(updatedData);
  };

  const getTierIcon = (tierName) => {
    const tier = tierName.toLowerCase();
    if (tier.includes('platinum')) return '🏆';
    if (tier.includes('gold')) return '🥇';
    if (tier.includes('silver')) return '🥈';
    if (tier.includes('bronze')) return '🥉';
    return '⭐';
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading sponsor data...</p>
      </div>
    );
  }

  return (
    <div className="sponsors-manager">
      <style>{`
        .sponsors-manager {
          max-width: 1200px;
          margin: 0 auto;
        }

        .sponsors-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .sponsors-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2rem;
          color: var(--accent);
          margin: 0;
        }

        .action-buttons {
          display: flex;
          gap: 1rem;
        }

        .btn {
          background: var(--accent);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .btn:hover {
          background: #c71821;
          transform: translateY(-1px);
        }

        .btn:disabled {
          background: #666;
          cursor: not-allowed;
          transform: none;
        }

        .btn-secondary {
          background: #666;
        }

        .btn-secondary:hover {
          background: #777;
        }

        .tier-card {
          background: var(--surface);
          padding: 1.5rem;
          border-radius: var(--radius);
          margin-bottom: 1.5rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .tier-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .tier-title {
          font-size: 1.5rem;
          font-weight: bold;
          color: var(--text);
          margin: 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .tier-actions {
          display: flex;
          gap: 0.5rem;
        }

        .btn-small {
          padding: 0.5rem;
          font-size: 0.8rem;
          min-width: auto;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          color: var(--text);
          font-weight: 500;
        }

        .form-input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #333;
          border-radius: 6px;
          background: var(--bg);
          color: var(--text);
          font-size: 0.9rem;
        }

        .form-input:focus {
          outline: none;
          border-color: var(--accent);
          box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.2);
        }

        .sponsors-list {
          margin-top: 1rem;
        }

        .sponsor-item {
          display: grid;
          grid-template-columns: 1fr 1fr auto;
          gap: 1rem;
          align-items: start;
          padding: 1rem;
          background: var(--bg);
          border-radius: 6px;
          margin-bottom: 0.5rem;
        }

        .sponsor-item-readonly {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: var(--bg);
          border-radius: 6px;
          margin-bottom: 0.5rem;
        }

        .sponsor-info {
          flex: 1;
        }

        .sponsor-name {
          font-weight: bold;
          color: var(--text);
          font-size: 1rem;
          margin-bottom: 0.25rem;
        }

        .sponsor-image-path {
          color: var(--subtxt);
          font-size: 0.9rem;
          font-family: monospace;
        }

        .sponsor-logo-preview {
          width: 60px;
          height: 40px;
          object-fit: contain;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.1);
        }

        .sponsor-preview {
          grid-column: 1 / -1;
          margin-top: 0.5rem;
          padding: 0.5rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 6px;
          text-align: center;
        }

        .sponsor-preview img {
          max-width: 200px;
          max-height: 100px;
          object-fit: contain;
          border-radius: 4px;
        }

        .sponsor-preview-text {
          color: var(--subtxt);
          font-size: 0.9rem;
          margin-top: 0.5rem;
        }

        .add-tier-form {
          background: var(--surface);
          padding: 1.5rem;
          border-radius: var(--radius);
          margin-bottom: 1.5rem;
          border: 2px dashed #333;
        }

        .loading-container {
          text-align: center;
          padding: 2rem;
          color: var(--text);
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid #333;
          border-top: 3px solid var(--accent);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .empty-sponsors {
          text-align: center;
          padding: 2rem;
          color: var(--subtxt);
          background: rgba(255, 255, 255, 0.05);
          border-radius: 6px;
          margin-top: 1rem;
        }

        .file-input-wrapper {
          position: relative;
          display: inline-block;
          width: 100%;
        }

        .file-input {
          position: absolute;
          left: -9999px;
        }

        .file-input-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem;
          border: 1px solid #333;
          border-radius: 6px;
          background: var(--bg);
          color: var(--text);
          cursor: pointer;
          transition: border-color 0.3s ease;
        }

        .file-input-label:hover {
          border-color: var(--accent);
        }

        @media (max-width: 768px) {
          .sponsors-header {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
          }

          .action-buttons {
            justify-content: center;
          }

          .sponsor-item {
            grid-template-columns: 1fr;
          }

          .sponsor-item-readonly {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .sponsor-logo-preview {
            align-self: center;
          }
        }
      `}</style>

      <div className="sponsors-header">
        <h2 className="sponsors-title">Sponsors Management</h2>
        <div className="action-buttons">
          <button 
            className="btn" 
            onClick={() => setShowAddTier(!showAddTier)}
          >
            <Plus size={18} />
            Add Tier
          </button>
          <button 
            className="btn" 
            onClick={saveSponsorData}
            disabled={isSubmitting}
          >
            <Save size={18} />
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {showAddTier && (
        <div className="add-tier-form">
          <div className="form-group">
            <label className="form-label">Tier Name</label>
            <input
              type="text"
              className="form-input"
              value={newTier.tier}
              onChange={(e) => setNewTier({ ...newTier, tier: e.target.value })}
              placeholder="e.g., Diamond Sponsors"
            />
          </div>
          <div className="action-buttons">
            <button className="btn" onClick={addTier}>
              <Plus size={18} />
              Add Tier
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={() => {
                setShowAddTier(false);
                setNewTier({ tier: '', sponsors: [] });
              }}
            >
              <X size={18} />
              Cancel
            </button>
          </div>
        </div>
      )}

      {sponsorData.map((tier, tierIndex) => (
        <div key={tierIndex} className="tier-card">
          <div className="tier-header">
            {editingTierIndex === tierIndex ? (
              <input
                type="text"
                className="form-input"
                value={tier.tier}
                onChange={(e) => updateTier(tierIndex, 'tier', e.target.value)}
                style={{ maxWidth: '300px' }}
              />
            ) : (
              <h3 className="tier-title">
                <span>{getTierIcon(tier.tier)}</span>
                {tier.tier}
              </h3>
            )}
            <div className="tier-actions">
              {editingTierIndex === tierIndex ? (
                <button 
                  className="btn btn-small"
                  onClick={() => setEditingTierIndex(null)}
                >
                  <Save size={16} />
                </button>
              ) : (
                <button 
                  className="btn btn-small"
                  onClick={() => setEditingTierIndex(tierIndex)}
                >
                  <Edit2 size={16} />
                </button>
              )}
              <button 
                className="btn btn-small btn-secondary"
                onClick={() => deleteTier(tierIndex)}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          <div className="sponsors-list">
            <h4 style={{ color: 'var(--text)', marginBottom: '1rem' }}>Sponsors</h4>
            {tier.sponsors?.length === 0 ? (
              <div className="empty-sponsors">
                <p>No sponsors in this tier yet.</p>
              </div>
            ) : editingTierIndex === tierIndex ? (
              // Edit mode - show editable inputs
              <>
                {tier.sponsors?.map((sponsor, sponsorIndex) => (
                  <div key={sponsorIndex} className="sponsor-item">
                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label">Sponsor Name</label>
                      <input
                        type="text"
                        className="form-input"
                        value={sponsor.name}
                        onChange={(e) => updateSponsor(tierIndex, sponsorIndex, 'name', e.target.value)}
                        placeholder="Sponsor name"
                      />
                    </div>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label">Image Path</label>
                      <input
                        type="text"
                        className="form-input"
                        value={sponsor.image}
                        onChange={(e) => updateSponsor(tierIndex, sponsorIndex, 'image', e.target.value)}
                        placeholder="/images/sponsors/logo.png"
                      />
                    </div>
                    <button 
                      className="btn btn-small btn-secondary"
                      onClick={() => deleteSponsor(tierIndex, sponsorIndex)}
                      style={{ alignSelf: 'end' }}
                    >
                      <Trash2 size={16} />
                    </button>
                    {sponsor.image && (
                      <div className="sponsor-preview">
                        <img 
                          src={sponsor.image} 
                          alt={sponsor.name}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'block';
                          }}
                        />
                        <div className="sponsor-preview-text" style={{ display: 'none' }}>
                          Image not found: {sponsor.image}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </>
            ) : (
              // Read-only mode - show static content
              tier.sponsors?.map((sponsor, sponsorIndex) => (
                <div key={sponsorIndex} className="sponsor-item-readonly">
                  <div className="sponsor-info">
                    <div className="sponsor-name">{sponsor.name}</div>
                    <div className="sponsor-image-path">{sponsor.image}</div>
                  </div>
                  {sponsor.image && (
                    <img 
                      src={sponsor.image} 
                      alt={sponsor.name}
                      className="sponsor-logo-preview"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  )}
                </div>
              ))
            )}
            {editingTierIndex === tierIndex && (
              <button 
                className="btn btn-small"
                onClick={() => addSponsor(tierIndex)}
              >
                <Plus size={16} />
                Add Sponsor
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SponsorsManager;