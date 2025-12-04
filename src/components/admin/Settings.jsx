import { useEffect, useState } from 'react';
import { authService } from '../../utils/auth';
import { supabaseService } from '../../utils/supabase';
import { useAlert } from '../../contexts/AlertContext';

const Settings = () => {
  const [profile, setProfile] = useState({ first_name: '', last_name: '', phone_number: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const alert = useAlert();

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        await authService.waitForInit();
        const user = authService.getUser();
        if (!user) {
          setProfile({ first_name: '', last_name: '', phone_number: '' });
          setLoading(false);
          return;
        }

        const initial = {
          first_name: user.first_name || '',
          last_name: user.last_name || '',
          phone_number: user.phone_number || ''
        };

        if (!initial.first_name && !initial.last_name && !initial.phone_number) {
          const combined = await supabaseService.getUserProfile();
          const role = combined?.role;
          if (role) {
            initial.first_name = role.first_name || '';
            initial.last_name = role.last_name || '';
            initial.phone_number = role.phone_number || '';
          }
        }

        if (mounted) setProfile(initial);
      } catch (err) {
        console.error('Failed to load profile:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => { mounted = false; };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await supabaseService.updateUserProfile(profile);
      await authService.loadUserData();
      try { await alert.showSuccess('Profile saved.'); } catch (e) { /* ignore */ }
    } catch (err) {
      console.error('Save failed:', err);
      const text = err?.message || 'Failed to save profile.';
      try { await alert.showError(text); } catch (e) { /* ignore */ }
    } finally {
      setSaving(false);
    }
  };

  const currentUser = authService.getUser();

  return (
    <>
      <style>{`
        .settings-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2rem;
          color: var(--text);
          margin: 0;
          text-align: center;
        }

        .settings-page {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 1.5rem;
          padding-bottom: 3rem;
          background: transparent;
        }

        .settings-card {
          width: 100%;
          max-width: 920px;
          background: var(--surface);
          padding: 24px;
          border-radius: var(--radius);
          box-shadow: 0 10px 30px rgba(0,0,0,0.12);
          color: var(--text);
          border: 1px solid rgba(0,0,0,0.06);
        }

        .settings-card-header {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 16px;
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(0,0,0,0.06);
        }

        .avatar {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 28px;
          color: white;
          background: linear-gradient(135deg,var(--accent), #9b000b);
          box-shadow: 0 6px 18px rgba(0,0,0,0.18);
          flex-shrink: 0;
        }

        .profile-meta { display:flex; flex-direction:column; gap:4px; }
        .profile-email { font-size: 1.05rem; font-weight:700; color: var(--text); }
        .profile-attrs { display:flex; gap:10px; align-items:center; flex-wrap:wrap; font-size:0.86rem; color:var(--subtxt); }
        .profile-attrs .level { padding:4px 8px; border-radius:6px; border:1px solid rgba(0,0,0,0.06); background: transparent; font-weight:700; color:var(--text); }
        .profile-attrs .joined, .profile-attrs .specific-role { color:var(--subtxt); }

        .settings-row { display:flex; gap:1rem; margin:14px 0; align-items:center; }
        .settings-row label { min-width:140px; color:var(--subtxt); font-size:0.9rem; }
        .settings-input { flex:1; padding:0.7rem 0.9rem; border-radius:8px; border:1px solid rgba(0,0,0,0.08); background:var(--bg); color:var(--text); font-size:0.95rem; }
        .settings-input::placeholder { color: rgba(115,115,115,0.6); }
        .settings-input:focus { outline: none; box-shadow: 0 0 0 4px rgba(0,0,0,0.05); border-color: rgba(0,0,0,0.12); }

        .actions-row { display:flex; justify-content:flex-end; margin-top: 6px; }
        .actions-left { display:flex; gap:12px; align-items:center; }
        .btn { background:var(--accent); color:white; padding:0.6rem 1rem; border-radius:8px; border:none; cursor:pointer; font-weight:700; }
        .btn[disabled]{ opacity:0.65; cursor:not-allowed; }

        .footer-meta { margin-top: 14px; display:flex; gap:18px; flex-wrap:wrap; color:var(--subtxt); }
        .footer-meta .meta-item { font-size:0.9rem; display:flex; gap:6px; align-items:center; }

        @media (max-width: 720px) {
          .settings-card { padding: 16px; }
          .settings-row { flex-direction: column; align-items:stretch; }
          .settings-row label { min-width: auto; }
          .actions-row { justify-content: center; }
          .avatar { width: 60px; height: 60px; font-size:22px; }
        }
      `}</style>

      <h1 className="settings-title">Account Settings</h1>

      <div className="settings-page">
        <div className="settings-card" role="region" aria-label="Account settings">
          <div className="settings-card-header">
            <div className="avatar" aria-hidden>
              {currentUser?.first_name || currentUser?.email ? (
                <span>{(currentUser?.first_name || currentUser?.email || 'U').charAt(0).toUpperCase()}</span>
              ) : (
                <span>U</span>
              )}
            </div>

            <div className="profile-meta">
              <div className="profile-email">{currentUser?.email || 'No email'}</div>
              <div className="profile-attrs">
                <span className="level">{(currentUser?.level || 'member').toUpperCase()}</span>
                <span className="joined">Joined: {currentUser?.joined_at ? new Date(currentUser.joined_at).toLocaleDateString() : '—'}</span>
                {currentUser?.specific_role && (
                  <span className="specific-role">{currentUser.specific_role}</span>
                )}
              </div>
            </div>
          </div>

          {loading ? (
            <div className="settings-meta">Loading...</div>
          ) : (
            <>
              <div className="settings-row">
                <label htmlFor="first_name">First Name</label>
                <input id="first_name" className="settings-input" name="first_name" value={profile.first_name} onChange={handleChange} placeholder="First name" />
              </div>

              <div className="settings-row">
                <label htmlFor="last_name">Last Name</label>
                <input id="last_name" className="settings-input" name="last_name" value={profile.last_name} onChange={handleChange} placeholder="Last name" />
              </div>

              <div className="settings-row">
                <label htmlFor="phone_number">Phone</label>
                <input id="phone_number" className="settings-input" name="phone_number" value={profile.phone_number} onChange={handleChange} placeholder="(555) 555-5555" />
              </div>

              <div className="actions-row">
                <div className="actions-left">
                  <button className="btn" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Settings;
