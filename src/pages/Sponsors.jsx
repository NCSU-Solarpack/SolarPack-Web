import { useEffect, useState } from 'react'
import { supabaseService } from '../utils/supabase'

const Sponsors = () => {
  const [sponsorTiers, setSponsorTiers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'SolarPack · Sponsors'

    const load = async () => {
      try {
        // Load from Supabase
        const data = await supabaseService.getSponsors();
        setSponsorTiers(data.sponsorTiers || []);
      } catch (e) {
        console.error('Error loading sponsors from Supabase', e);
        setSponsorTiers([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [])

  return (
    <>
      <style>{`
        body {
          font-family: 'DM Sans', sans-serif;
          background: #0e0e0e;
          color: #fff;
        }
        
        main {
          max-width: 1000px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }
        
        h1 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 3rem;
          color: #e53935;
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .tier {
          margin-bottom: 2.5rem;
        }
        
        .tier h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2rem;
          color: #e53935;
          text-align: left;
          margin-bottom: 1rem;
        }
        
        .sponsor-logos {
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
          justify-content: left;
          align-items: center;
        }
        
        .sponsor-logos img {
          background: #222;
          border-radius: 10px;
          box-shadow: 0 2px 12px #0005;
          padding: 1.5rem;
          max-width: 320px;
          max-height: 180px;
          object-fit: contain;
        }
        
        .placeholder {
          color: #888;
          font-size: 1.1rem;
          padding: 2rem 0;
        }

        .sponsor-contact {
          text-align: center;
          color: #cecece;
          margin-top: 3rem;
        }

        .sponsor-contact a {
          color: #e53935;
          text-decoration: underline;
        }
      `}</style>

      <main>
        <h1>Sponsors</h1>
        
        {sponsorTiers.map((tier, index) => (
          <section key={index} className="tier">
            <h2>{tier.tier}</h2>
            <div className="sponsor-logos">
              {tier.sponsors && tier.sponsors.length > 0 ? (
                tier.sponsors.map((sponsor, sponsorIndex) => (
                  sponsor.website ? (
                    <a 
                      key={sponsorIndex}
                      href={sponsor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ cursor: 'pointer' }}
                    >
                      <img 
                        src={sponsor.logo || sponsor.image} 
                        alt={sponsor.name} 
                        title={sponsor.name} 
                      />
                    </a>
                  ) : (
                    <img 
                      key={sponsorIndex}
                      src={sponsor.logo || sponsor.image} 
                      alt={sponsor.name} 
                      title={sponsor.name} 
                    />
                  )
                ))
              ) : (
                <span className="placeholder">
                  {tier.placeholder || `No ${tier.tier.toLowerCase()} yet.`}
                </span>
              )}
            </div>
          </section>
        ))}
        
        <p className="sponsor-contact">
          Interested in sponsoring Fenrir or supporting our team?{' '}
          <a href="https://www.paypal.com/fundraiser/charity/3728956" target="_blank" rel="noopener">
            Donate
          </a>{' '}
          or{' '}
          <a href="/contact">Contact us</a> for more info!
        </p>
      </main>
    </>
  )
}

export default Sponsors