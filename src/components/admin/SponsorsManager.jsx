import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { authService } from '../../utils/auth';
import { supabaseService } from '../../utils/supabase';
import { useSupabaseSyncStatus } from '../../hooks/useSupabaseSyncStatus';
import SyncStatusBadge from '../SyncStatusBadge';
import { useAlert } from '../../contexts/AlertContext';
import { Plus, Edit2, Trash2, Upload, X } from 'lucide-react';

const SponsorsManager = forwardRef((props, ref) => {
  const [sponsorData, setSponsorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingSponsor, setEditingSponsor] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);

  // Custom alert hook from context
  const { showError, showConfirm } = useAlert();

  // Real-time sync status
  const { status, lastSync, connectionError, startSaving, finishSaving, acknowledgeNewData, setDisplayedData, forceReconnect } = useSupabaseSyncStatus(
    () => supabaseService.getSponsors(),
    2000 // Check every 2 seconds
  );

  useEffect(() => {
    loadSponsorData();
  }, []);

  // Handle visibility change to refresh data when tab becomes visible
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (!document.hidden && !loading) {
        console.log('📱 Tab visible - refreshing sponsors');
        await new Promise(resolve => setTimeout(resolve, 300));
        loadSponsorData();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [loading]);

  // Manual refresh handler for SyncStatusBadge
  const handleRefreshData = async () => {
    if (status === 'error') {
      await forceReconnect();
    }
    await loadSponsorData();
    acknowledgeNewData(); // Reset status to 'synced'
  };

  // Expose methods to parent component via ref
  useImperativeHandle(ref, () => ({
    handleAddSponsor: () => {
      handleAddSponsor();
    }
  }));

  const loadSponsorData = async () => {
    console.log('Loading sponsor data from Supabase...');
    setLoading(true);
    try {
      const data = await supabaseService.getSponsors();
      console.log('Loaded sponsor data:', data);
      
      if (!data || !data.sponsorTiers) {
        console.error('Invalid data structure received:', data);
        throw new Error('Invalid sponsor data structure');
      }
      
      console.log(`✓ Successfully loaded ${data.sponsorTiers.length} sponsor tiers from Supabase`);
      setSponsorData(data.sponsorTiers);
      // Tell the sync hook what data we're displaying
      setDisplayedData(data);
    } catch (error) {
      console.error('Error loading sponsor data:', error);
      await showError(`Failed to load sponsor data: ${error.message}`, 'Load Error');
      setSponsorData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSponsor = (sponsor, tier) => {
    setEditingSponsor({ ...sponsor, tier });
    setLogoFile(null);
    setLogoPreview(sponsor.logo || null);
    setIsEditing(true);
  };

  const handleAddSponsor = (tier = 'Platinum Sponsors') => {
    setEditingSponsor({
      id: Date.now(),
      name: '',
      tier: tier,
      logo: '',
      website: '',
      order: 0
    });
    setLogoFile(null);
    setLogoPreview(null);
    setIsEditing(true);
  };

  const handleLogoSelect = async (file) => {
    if (!file) return;
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      await showError('Please upload a JPEG, PNG, WebP, SVG, or GIF image.', 'Invalid File Type');
      return;
    }
    
    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      await showError('Maximum file size is 5MB. Please choose a smaller image.', 'File Too Large');
      return;
    }
    
    setLogoFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleLogoDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleLogoSelect(file);
    }
  };

  const handleLogoDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleRemoveLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
    setEditingSponsor({...editingSponsor, logo: ''});
  };

  const handleSaveSponsor = async () => {
    // Validate required fields
    if (!editingSponsor.name || !editingSponsor.tier) {
      await showError('Please fill in the Name and Tier fields.', 'Missing Required Fields');
      return;
    }

    // Check if logo is provided (either existing or newly uploaded)
    if (!logoPreview && !editingSponsor.logo) {
      await showError('Please upload a logo for this sponsor.', 'Logo Required');
      return;
    }

    setIsEditing(false);
    const sponsorToSave = { ...editingSponsor };
    setEditingSponsor(null);
    
    startSaving(); // Update status to 'saving'

    try {
      // Upload logo if a new file was selected
      if (logoFile) {
        setIsUploadingLogo(true);
        try {
          const logoUrl = await supabaseService.uploadSponsorLogo(logoFile, sponsorToSave.id);
          sponsorToSave.logo = logoUrl;
          console.log('✓ Logo uploaded successfully:', logoUrl);
        } catch (error) {
          console.error('Error uploading logo:', error);
          await showError(`Failed to upload logo: ${error.message}`, 'Upload Error');
          throw error; // Stop the save process if logo upload fails
        } finally {
          setIsUploadingLogo(false);
        }
      }
      
      // Save to Supabase
      await supabaseService.saveSponsor(sponsorToSave);
      
      // Reload data from Supabase
      await loadSponsorData();
      
      // Reset logo states
      setLogoFile(null);
      setLogoPreview(null);
      
      console.log('✓ Sponsor saved successfully');
    } catch (error) {
      console.error('Error saving sponsor:', error);
      await showError(`Failed to save: ${error.message}`, 'Save Error');
    } finally {
      finishSaving(); // Update status back to 'synced'
    }
  };

  const handleDeleteSponsor = async (sponsorId) => {
    const confirmed = await showConfirm(
      'This action cannot be undone. The sponsor and their associated logo will be permanently deleted.',
      'Delete Sponsor?',
      'Delete',
      'Cancel'
    );
    
    if (!confirmed) {
      return;
    }

    startSaving(); // Update status to 'saving'
    
    try {
      // Delete from Supabase
      await supabaseService.deleteSponsor(sponsorId);
      
      // Reload data from Supabase
      await loadSponsorData();
      
      console.log('✓ Sponsor deleted successfully');
    } catch (error) {
      console.error('Error deleting sponsor:', error);
      await showError(`Failed to delete: ${error.message}`, 'Delete Error');
    } finally {
      finishSaving(); // Update status back to 'synced'
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingSponsor(null);
    setLogoFile(null);
    setLogoPreview(null);
  };

  // Handle refresh when new data is detected
  // (Removed duplicate handleRefreshData function to fix redeclaration error)

  const getTierIcon = (tierName) => {
    const tier = tierName.toLowerCase();
    if (tier.includes('platinum')) return '🏆';
    if (tier.includes('gold')) return '🥇';
    if (tier.includes('silver')) return '🥈';
    if (tier.includes('bronze')) return '🥉';
    return '⭐';
  };

  const canEdit = authService.hasPermission('edit_sponsors');

  if (loading) {
    return <div className="loading">Loading sponsor data...</div>;
  }

  // Get all unique tiers (ensure default tiers are present)
  const allTiers = ['Platinum Sponsors', 'Gold Sponsors', 'Silver Sponsors', 'Bronze Sponsors'];
  
  return (
    <div className="sponsors-manager">
      <style>{`
        .sponsors-manager {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .sponsors-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .sponsors-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2rem;
          color: var(--text);
          margin: 0;
        }

        .header-buttons {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .add-sponsor-btn {
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

        .add-sponsor-btn:hover {
          background: #c71821;
          transform: translateY(-1px);
        }

        .tier-section {
          margin-bottom: 3rem;
        }

        .tier-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          padding-bottom: 0.75rem;
          border-bottom: 2px solid var(--accent);
        }

        .tier-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.75rem;
          color: var(--text);
          margin: 0;
        }

        .sponsors-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .sponsor-card {
          background: var(--surface);
          border-radius: var(--radius);
          padding: 1.5rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          transition: transform 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .sponsor-card:hover {
          transform: translateY(-2px);
        }

        .sponsor-logo-container {
          width: 100%;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 6px;
          padding: 1rem;
        }

        .sponsor-logo {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .sponsor-name {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text);
          margin: 0;
        }

        .sponsor-actions {
          display: flex;
          gap: 0.5rem;
          margin-top: auto;
          width: 100%;
          justify-content: center;
        }

        .action-btn {
          padding: 0.5rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
        }

        .action-btn svg {
          width: 18px;
          height: 18px;
        }

        .edit-btn {
          background: var(--accent);
          color: white;
        }

        .edit-btn:hover {
          background: #c71821;
          transform: translateY(-2px);
        }

        .delete-btn {
          background: #dc2626;
          color: white;
        }

        .delete-btn:hover {
          background: #b91c1c;
          transform: translateY(-2px);
        }

        .no-sponsors {
          text-align: center;
          padding: 3rem 1rem;
          background: var(--surface);
          border-radius: var(--radius);
          border: 2px dashed rgba(255, 255, 255, 0.2);
          color: var(--subtxt);
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal-content {
          background: var(--surface);
          padding: 2rem;
          border-radius: var(--radius);
          max-width: 500px;
          width: 90%;
          max-height: 80vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .modal-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.5rem;
          color: var(--text);
          margin: 0;
        }

        .close-btn {
          background: none;
          border: none;
          color: var(--subtxt);
          cursor: pointer;
          font-size: 1.5rem;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-label {
          display: block;
          color: var(--text);
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        .form-input, .form-select {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid #333;
          border-radius: 6px;
          background: #1a1a1a;
          color: var(--text);
          font-size: 0.9rem;
          font-family: inherit;
        }

        .form-input:focus, .form-select:focus {
          outline: none;
          border-color: var(--accent);
        }

        .logo-upload-area {
          width: 100%;
          min-height: 200px;
          border: 2px dashed #333;
          border-radius: 8px;
          background: #1a1a1a;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .logo-upload-area:hover {
          border-color: var(--accent);
          background: #222;
        }

        .logo-upload-area.has-logo {
          min-height: 250px;
          border-style: solid;
        }

        .upload-placeholder {
          text-align: center;
          padding: 2rem;
          color: var(--subtxt);
        }

        .upload-placeholder svg {
          width: 48px;
          height: 48px;
          margin: 0 auto 1rem;
          opacity: 0.6;
        }

        .upload-placeholder p {
          margin: 0.5rem 0;
        }

        .upload-hint {
          font-size: 0.75rem;
          opacity: 0.7;
        }

        .logo-preview-container {
          width: 100%;
          height: 100%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .logo-preview {
          max-width: 100%;
          max-height: 300px;
          border-radius: 6px;
          object-fit: contain;
        }

        .remove-logo-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(220, 38, 38, 0.9);
          color: white;
          border: none;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .remove-logo-btn:hover {
          background: #dc2626;
          transform: scale(1.1);
        }

        .remove-logo-btn svg {
          width: 16px;
          height: 16px;
        }

        .upload-status {
          color: var(--accent);
          font-size: 0.85rem;
          margin-top: 0.5rem;
          text-align: center;
        }

        .modal-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          margin-top: 2rem;
        }

        .save-btn {
          background: var(--accent);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .save-btn:hover {
          background: #c71821;
          transform: translateY(-1px);
        }

        .cancel-btn {
          background: transparent;
          color: var(--text);
          border: 1px solid var(--subtxt);
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .cancel-btn:hover {
          background: var(--surface);
          border-color: var(--text);
        }

        .loading {
          text-align: center;
          color: var(--subtxt);
          padding: 2rem;
        }

        @media (max-width: 768px) {
          .sponsors-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          }
        }
      `}</style>

      <div className="sponsors-header">
        <h2 className="sponsors-title">Sponsors Management</h2>
        <div className="header-buttons">
          <SyncStatusBadge 
            status={status} 
            lastSync={lastSync}
            onRefresh={handleRefreshData}
            connectionError={connectionError}
          />
          {canEdit && (
            <button className="add-sponsor-btn" onClick={() => handleAddSponsor()}>
              <Plus size={18} />
              Add Sponsor
            </button>
          )}
        </div>
      </div>

      {allTiers.map(tier => {
        const tierSponsors = sponsorData.find(t => t.tier === tier)?.sponsors || [];
        
        return (
          <div key={tier} className="tier-section">
            <div className="tier-header">
              <span style={{ fontSize: '1.5rem' }}>{getTierIcon(tier)}</span>
              <h3 className="tier-title">{tier}</h3>
            </div>

            {tierSponsors.length === 0 ? (
              <div className="no-sponsors">
                <p>No {tier.toLowerCase()} yet</p>
              </div>
            ) : (
              <div className="sponsors-grid">
                {tierSponsors.map(sponsor => (
                  <div key={sponsor.id} className="sponsor-card">
                    <div className="sponsor-logo-container">
                      <img 
                        src={sponsor.logo} 
                        alt={sponsor.name}
                        className="sponsor-logo"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', marginBottom: '0.5rem' }}>
                      <div className="sponsor-name">{sponsor.name}</div>
                      {sponsor.website && (
                        <a 
                          href={sponsor.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          title={sponsor.website}
                          style={{ 
                            color: 'var(--accent)', 
                            display: 'flex', 
                            alignItems: 'center',
                            transition: 'transform 0.2s ease'
                          }}
                          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                          </svg>
                        </a>
                      )}
                    </div>
                    {canEdit && (
                      <div className="sponsor-actions">
                        <button 
                          className="action-btn edit-btn" 
                          onClick={() => handleEditSponsor(sponsor, tier)}
                          title="Edit sponsor"
                        >
                          <Edit2 />
                        </button>
                        <button 
                          className="action-btn delete-btn" 
                          onClick={() => handleDeleteSponsor(sponsor.id)}
                          title="Delete sponsor"
                        >
                          <Trash2 />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {isEditing && editingSponsor && (
        <div className="modal-overlay" onClick={handleCancelEdit}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">
                {editingSponsor.id && sponsorData.some(t => t.sponsors.some(s => s.id === editingSponsor.id)) ? 'Edit' : 'Add'} Sponsor
              </h3>
              <button className="close-btn" onClick={handleCancelEdit}>×</button>
            </div>

            <div className="form-group">
              <label className="form-label">Sponsor Name *</label>
              <input
                type="text"
                className="form-input"
                value={editingSponsor.name}
                onChange={(e) => setEditingSponsor({...editingSponsor, name: e.target.value})}
                placeholder="Company or organization name"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Tier *</label>
              <select
                className="form-select"
                value={editingSponsor.tier}
                onChange={(e) => setEditingSponsor({...editingSponsor, tier: e.target.value})}
              >
                {allTiers.map(tier => (
                  <option key={tier} value={tier}>{tier}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Logo *</label>
              <div 
                className={`logo-upload-area ${logoPreview ? 'has-logo' : ''}`}
                onDrop={handleLogoDrop}
                onDragOver={handleLogoDragOver}
                onClick={() => document.getElementById('logo-file-input').click()}
              >
                {logoPreview ? (
                  <div className="logo-preview-container">
                    <img src={logoPreview} alt="Preview" className="logo-preview" />
                    <button 
                      className="remove-logo-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveLogo();
                      }}
                      title="Remove logo"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="upload-placeholder">
                    <Upload size={48} style={{ margin: '0 auto 1rem', opacity: 0.6 }} />
                    <p>Drop logo here or click to upload</p>
                    <p className="upload-hint">JPG, PNG, WebP, SVG, or GIF • Max 5MB</p>
                  </div>
                )}
                <input
                  id="logo-file-input"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp,image/gif,image/svg+xml"
                  onChange={(e) => handleLogoSelect(e.target.files[0])}
                  style={{ display: 'none' }}
                />
              </div>
              {isUploadingLogo && (
                <p className="upload-status">Uploading logo...</p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Website (Optional)</label>
              <input
                type="text"
                className="form-input"
                value={editingSponsor.website || ''}
                onChange={(e) => setEditingSponsor({...editingSponsor, website: e.target.value})}
                placeholder="https://example.com"
              />
            </div>

            <div className="modal-actions">
              <button className="cancel-btn" onClick={handleCancelEdit}>
                Cancel
              </button>
              <button className="save-btn" onClick={handleSaveSponsor}>
                Save Sponsor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

SponsorsManager.displayName = 'SponsorsManager';

export default SponsorsManager;
