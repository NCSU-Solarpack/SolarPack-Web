import { useEffect, useState } from 'react'

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = 'SolarPack · Team'
    loadTeamData();
  }, [])

  const loadTeamData = async () => {
    try {
      const response = await fetch('/data/team.json');
      if (!response.ok) {
        throw new Error('Failed to load team data');
      }
      const data = await response.json();
      // Sort by order field
      const sortedMembers = data.teamMembers.sort((a, b) => (a.order || 0) - (b.order || 0));
      setTeamMembers(sortedMembers);
    } catch (err) {
      console.error('Error loading team data:', err);
      setError(err.message);
      // Fallback to empty array if data fails to load
      setTeamMembers([]);
    } finally {
      setIsLoading(false);
    }
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
        }
      `}</style>

      <h1>Meet the Team</h1>
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div key={index} className="member-card">
            <img src={member.image} alt={member.name} className="member-img" />
            <div className="member-name">{member.name}</div>
            <div className="member-role">{member.role}</div>
            <p className="member-bio">{member.bio}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default Team