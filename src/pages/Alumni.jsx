import { useEffect, useState } from 'react'

const Alumni = () => {
  const [alumniData, setAlumniData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'SolarPack · Alumni'

    const load = async () => {
      try {
        const cacheBuster = `?_t=${Date.now()}&_cb=${Math.random()}`;
        const url = `/data/alumni.json${cacheBuster}`;
        
        const res = await fetch(url, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        });
        
        if (res.status === 304) {
          const cached = sessionStorage.getItem('json:/data/alumni.json');
          if (cached) {
            const data = JSON.parse(cached);
            setAlumniData(data.alumniData || []);
            return;
          }
          throw new Error('HTTP 304 with no cached copy');
        }
        
        if (res.ok) {
          const data = await res.json();
          sessionStorage.setItem('json:/data/alumni.json', JSON.stringify(data));
          setAlumniData(data.alumniData || []);
        } else {
          setAlumniData([]);
        }
      } catch (e) {
        console.error('Error loading alumni.json', e);
        const cached = sessionStorage.getItem('json:/data/alumni.json');
        if (cached) {
          const data = JSON.parse(cached);
          setAlumniData(data.alumniData || []);
        } else {
          setAlumniData([]);
        }
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [])

  // Split alumni data into two columns
  const firstColumn = alumniData.slice(0, Math.ceil(alumniData.length / 2))
  const secondColumn = alumniData.slice(Math.ceil(alumniData.length / 2))

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
        
        .alumni-grid { 
          display: grid; 
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); 
          gap: 2rem; 
          max-width: 900px; 
          margin: 2.5rem auto 0; 
        }
        
        .alumni-card { 
          background: var(--card); 
          border-radius: var(--radius); 
          box-shadow: 0 1px 6px #0003; 
          padding: 2rem 1.2rem 1.2rem; 
          text-align: center; 
        }
        
        .alumni-img { 
          width: 90px; 
          height: 90px; 
          border-radius: 50%; 
          background: #222; 
          object-fit: cover; 
          margin-bottom: 1rem; 
        }
        
        .alumni-name { 
          font-family: "Bebas Neue", sans-serif; 
          font-size: 1.5rem; 
          color: var(--accent); 
          margin-bottom: 0.2rem; 
        }
        
        .alumni-role { 
          color: var(--subtxt); 
          font-size: 1.1rem; 
          margin-bottom: 0.7rem; 
        }
        
        .alumni-socials a { 
          color: var(--accent); 
          margin: 0 0.4rem; 
          font-size: 1.2rem; 
        }
        
        .alumni-socials a:hover { 
          color: #fff; 
        }
        
        .alumni-by-year {
          max-width: 900px;
          margin: 2.5rem auto 0;
        }
        
        .alumni-columns {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
        }
        
        /* Responsive alumni layout: 1 column if screen < 850px */
        @media (max-width: 850px) {
          .alumni-columns {
            grid-template-columns: 1fr;
            justify-items: center;
            gap: 1.5rem;
          }
          .alumni-by-year {
            padding: 0 1rem;
          }
        }
        
        .footer { 
          text-align: center; 
          color: #888; 
          font-size: 1rem; 
          margin: 3.5rem 0 1.5rem; 
        }

        .alumni-section {
          margin-bottom: 2.5rem;
        }

        .alumni-section h2 {
          color: var(--accent);
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2rem;
          margin-bottom: 0.7rem;
        }

        .alumni-section ul {
          color: var(--subtxt);
          font-size: 1.13rem;
          line-height: 1.7;
          list-style: none;
          padding: 0;
        }

        .alumni-section li {
          margin-bottom: 0.3rem;
        }

        .alumni-section b {
          color: var(--text);
        }
      `}</style>

      <h1>Alumni</h1>
      <div className="alumni-grid">
        {/* Optional grid for featured alumni if data includes images in the future */}
      </div>
      
      {/* Alumni by Year */}
      <div className="alumni-by-year">
        <div className="alumni-columns">
          <div>
            {firstColumn.map((semester, index) => (
              <section key={index} className="alumni-section">
                <h2>{semester.semester}</h2>
                <ul>
                  {semester.leadership?.map((member, memberIndex) => (
                    <li key={memberIndex}>
                      <b>{member.role}:</b> {member.name}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
          <div>
            {secondColumn.map((semester, index) => (
              <section key={index} className="alumni-section">
                <h2>{semester.semester}</h2>
                <ul>
                  {semester.leadership?.map((member, memberIndex) => (
                    <li key={memberIndex}>
                      <b>{member.role}:</b> {member.name}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>
      
    </>
  )
}

export default Alumni