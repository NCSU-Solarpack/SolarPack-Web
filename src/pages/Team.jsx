import { useEffect, useState } from 'react'
import { supabaseService } from '../utils/supabase'

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const BIO_CHAR_LIMIT = 150;

  useEffect(() => {
    document.title = 'SolarPack · Team'
    loadTeamData();
  }, [])

  const loadTeamData = async () => {
    try {
      const data = await supabaseService.getTeamMembers();
      const sorted = (data.teamMembers || []).sort((a, b) => (a.order || 0) - (b.order || 0));
      setTeamMembers(sorted);
      console.log('✓ Loaded team data from Supabase:', sorted.length, 'members');
    } catch (err) {
      console.error('Error loading team data from Supabase:', err);
      setError(err.message);
      setTeamMembers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const openMemberModal = (member) => {
    setSelectedMember(member);
    document.body.style.overflow = 'hidden';
  };

  const closeMemberModal = () => {
    setSelectedMember(null);
    document.body.style.overflow = '';
  };

  const truncateBio = (bio) => {
    if (!bio || bio.length <= BIO_CHAR_LIMIT) return bio;
    return bio.substring(0, BIO_CHAR_LIMIT) + '...';
  };

  const needsReadMore = (bio) => {
    return bio && bio.length > BIO_CHAR_LIMIT;
  };

  if (isLoading) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '4rem', 
        color: 'var(--subtxt)' 
      }}>
        Loading team data...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '4rem', 
        color: '#dc3545' 
      }}>
        Error loading team data: {error}
      </div>
    );
  }

  return (
    <>
      <style>{`
        /* Page-specific styles */
        h1 { 
          font-family: "Bebas Neue", sans-serif; 
          font-size: clamp(2.5rem, 7vw, 4.5rem); 
          letter-spacing: 0.04em; 
          margin: 2.5rem 0 0.5rem; 
          text-align: center; 
        }
        
        .team-grid { 
          display: grid; 
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); 
          gap: 2rem; 
          max-width: 900px; 
          margin: 2.5rem auto 0; 
        }
        
        .member-card { 
          background: var(--surface); 
          border-radius: var(--radius); 
          box-shadow: 0 4px 24px #0006; 
          padding: 2rem 1.2rem 1.2rem; 
          text-align: center; 
        }
        
        .member-img { 
          width: 90px; 
          height: 90px; 
          border-radius: 50%; 
          background: #222; 
          object-fit: cover; 
          margin-bottom: 1rem; 
        }
        
        .member-name { 
          font-family: "Bebas Neue", sans-serif; 
          font-size: 1.5rem; 
          color: var(--accent); 
          margin-bottom: 0.2rem; 
        }
        
        .member-role { 
          color: var(--subtxt); 
          font-size: 1.1rem; 
          margin-bottom: 0.7rem; 
        }
        
        .member-socials a { 
          color: var(--accent); 
          margin: 0 0.4rem; 
          font-size: 1.2rem; 
        }
        
        .member-socials a:hover { 
          color: #fff; 
        }
        
        .footer { 
          text-align: center; 
          color: #888; 
          font-size: 1rem; 
          margin: 3.5rem 0 1.5rem; 
        }

        .member-bio {
          color: var(--subtxt);
          font-size: 0.98rem;
          margin-bottom: 0.7rem;
          line-height: 1.5;
        }

        .read-more-btn {
          background: none;
          border: none;
          color: var(--accent);
          font-size: 0.9rem;
          cursor: pointer;
          padding: 0.3rem 0;
          margin-top: 0.3rem;
          text-decoration: underline;
          transition: color 0.3s ease;
        }

        .read-more-btn:hover {
          color: #fff;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.85);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 2rem;
        }

        .modal-content {
          background: var(--surface);
          border-radius: var(--radius);
          max-width: 600px;
          width: 100%;
          max-height: 80vh;
          overflow-y: auto;
          position: relative;
          padding: 2.5rem;
          box-shadow: 0 8px 32px rgba(0,0,0,0.5);
        }

        .modal-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .modal-img {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: #222;
          object-fit: cover;
          margin-bottom: 1rem;
        }

        .modal-name {
          font-family: "Bebas Neue", sans-serif;
          font-size: 2rem;
          color: var(--accent);
          margin-bottom: 0.3rem;
        }

        .modal-role {
          color: var(--subtxt);
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
        }

        .modal-bio {
          color: var(--text);
          font-size: 1rem;
          line-height: 1.7;
          margin-bottom: 1rem;
        }

        .close-modal-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          color: var(--text);
          font-size: 2rem;
          cursor: pointer;
          transition: color 0.3s ease;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .close-modal-btn:hover {
          color: var(--accent);
        }

        @media (max-width: 768px) {
          .modal-overlay {
            padding: 1rem;
          }

          .modal-content {
            padding: 2rem 1.5rem;
          }

          .modal-name {
            font-size: 1.7rem;
          }
        }
      `}</style>

      <h1>Meet the Team</h1>
      {teamMembers.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '4rem', 
          color: 'var(--subtxt)' 
        }}>
          <p>No team members found.</p>
          <p style={{ fontSize: '0.9rem', marginTop: '1rem' }}>
            Check the browser console for more details.
          </p>
        </div>
      ) : (
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="member-card">
              <img src={member.image} alt={member.name} className="member-img" />
              <div className="member-name">{member.name}</div>
              <div className="member-role">{member.role}</div>
              <p className="member-bio">{truncateBio(member.bio)}</p>
              {needsReadMore(member.bio) && (
                <button 
                  className="read-more-btn" 
                  onClick={() => openMemberModal(member)}
                >
                  Read More
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Member Bio Modal */}
      {selectedMember && (
        <div className="modal-overlay" onClick={closeMemberModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={closeMemberModal}>
              ×
            </button>
            <div className="modal-header">
              <img src={selectedMember.image} alt={selectedMember.name} className="modal-img" />
              <div className="modal-name">{selectedMember.name}</div>
              <div className="modal-role">{selectedMember.role}</div>
            </div>
            <p className="modal-bio">{selectedMember.bio}</p>
          </div>
        </div>
      )}
    </>
  )
}

export default Team