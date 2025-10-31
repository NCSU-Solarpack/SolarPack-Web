import { useEffect, useState } from 'react'

const App = () => {
  const [activeModal, setActiveModal] = useState(null)

  useEffect(() => {
    document.title = 'SolarPack · App'
  }, [])

  const openModal = (modalId) => {
    setActiveModal(modalId)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setActiveModal(null)
    document.body.style.overflow = ''
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const modalData = {
    ipad1: {
      image: '/images/ipad-app/Ipad 1.png',
      title: 'Home Page',
      description: 'The Home Page is the main dashboard for the app, providing a real-time overview of all critical vehicle and system stats. It is designed for quick-glance monitoring and immediate access to the most important data.',
      features: [
        'Live Gauges: Speed, RPM, and current draw with animated arc gauges',
        'Battery & Solar Info: Battery voltage, wattage, solar voltage, and solar power',
        'Temperature Readouts: Motor and inverter temperatures',
        'System Status Indicator: Animated status dot and label',
        'Responsive Layout: Optimized for iPad with large, easy-to-read values'
      ]
    },
    ipad2: {
      image: '/images/ipad-app/Ipad 2.png',
      title: 'BMS Page',
      description: 'The BMS (Battery Management System) Page provides a detailed, real-time overview of battery pack health, cell-level data, and system status. Essential for monitoring, diagnostics, and troubleshooting of the battery system.',
      features: [
        'Pack Overview: Total battery voltage, current draw, wattage, and 12V battery voltage',
        'State Badges: Charging/discharging status and enable signals',
        'Cell Grid: 10×10 grid of all cell voltages and temperatures, labeled and color-coded',
        'Fault Codes: Lists active BMS fault codes',
        'Status Indicator: Animated status dot and label for BMS power state'
      ]
    },
    ipad3: {
      image: '/images/ipad-app/Ipad 3.png',
      title: 'Motor Controller Page',
      description: 'The Motor Controller Page provides a comprehensive, real-time view of the traction motor and its controller, including RPM, temperatures, voltages, and cooling system status. Essential for monitoring drive performance and diagnosing issues.',
      features: [
        'RPM Gauge: Large animated arc gauge for motor RPM',
        'Temperature Readouts: Motor and controller (inverter) temperatures',
        'Voltage Monitoring: High-voltage and 12V system voltages',
        'Cooling System Status: Visual indicators for radiator and pump status',
        'System Status Indicator: Header with animated status dot and label'
      ]
    },
    ipad4: {
      image: '/images/ipad-app/Ipad 4.png',
      title: 'Charging Page',
      description: 'The Charging Page provides a comprehensive, real-time overview of battery pack and solar charging status, including charge rates, voltages, estimated time remaining, and solar-only mode controls. Essential for monitoring charging performance and managing energy sources.',
      features: [
        'Charging Status: Charger plugged in, requested current, charge rate, and pack voltage',
        'Solar Charging: Solar voltage, amps, power, and charger status',
        'Battery Visualization: Large battery icon with animated fill',
        'Estimated Time Remaining: Calculates time to full charge',
        'Solar-Only Mode: Toggle switch for solar-only charging',
        'Rolling Line Chart: Real-time chart of charge rates'
      ]
    },
    ipad5: {
      image: '/images/ipad-app/Ipad 5.png',
      title: 'Low Voltage Page',
      description: 'The Low Voltage Page provides a real-time overview of board health and auxiliary systems, including a grid of board status indicators and ignition mode controls. Essential for monitoring the health of low-voltage electronics and managing ignition states.',
      features: [
        'Board Health Grid: 2×3 grid of board cards showing status (OK, Fault, Offline)',
        'Ignition Mode Control: View and adjust ignition mode (OFF, ACC, ON, START)',
        'Status Indicators: Animated status dots for live feedback',
        'Responsive Layout: Optimized for iPad with grid-based design and large icons'
      ]
    }
  }

  return (
    <>
      <style>{`
        /* Page-specific styles */
        :root {
          --card: #1a1a1a;
          --subtxt: #c9c9c9;
        }
        
        .section {
          background: var(--card);
          border-radius: var(--radius);
          padding: 2rem 1.5rem;
          margin: 2.5rem auto 0;
          max-width: 1200px;
          box-shadow: 0 1px 6px #0003;
        }
        
        .footer {
          text-align: center;
          color: #888;
          font-size: 1rem;
          margin: 3.5rem 0 1.5rem;
        }

        /* App Screenshots Grid */
        .screenshots-container {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-top: 3rem;
        }

        .screenshots-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          width: 100%;
          justify-content: center;
          padding: 0 1rem;
        }

        .screenshot-card {
          position: relative;
          cursor: pointer;
          transition: transform 0.3s ease;
          border-radius: var(--radius);
          overflow: hidden;
          background: #222;
        }

        .screenshot-card:hover {
          transform: translateY(-8px) scale(1.02);
        }

        .screenshot-card img {
          width: 100%;
          height: auto;
          max-width: 100%;
          border-radius: var(--radius);
          display: block;
        }

        .screenshot-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0,0,0,0.9));
          color: white;
          padding: 1.5rem;
          transform: translateY(100%);
          transition: transform 0.3s ease;
        }

        .screenshot-card:hover .screenshot-overlay {
          transform: translateY(0);
        }

        .screenshot-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.5rem;
          color: var(--accent);
          margin-bottom: 0.5rem;
        }

        .screenshot-preview {
          font-size: 0.9rem;
          color: #ccc;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.9);
          display: ${activeModal ? 'flex' : 'none'};
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 2rem;
        }

        .modal-content {
          background: var(--surface);
          border-radius: var(--radius);
          max-width: 900px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          padding: 2rem;
        }

        .modal-image {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modal-image img {
          max-width: 100%;
          max-height: 500px;
          border-radius: var(--radius);
          box-shadow: 0 8px 32px rgba(0,0,0,0.5);
        }

        .modal-details {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .modal-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.5rem;
          color: var(--accent);
          margin-bottom: 1rem;
        }

        .modal-description {
          color: var(--muted);
          line-height: 1.6;
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
        }

        .modal-features {
          list-style: none;
          padding: 0;
        }

        .modal-features li {
          display: flex;
          align-items: center;
          margin-bottom: 0.8rem;
          color: var(--text);
        }

        .modal-features li::before {
          content: "✓";
          color: var(--accent);
          font-weight: bold;
          margin-right: 0.8rem;
          font-size: 1.2rem;
        }

        .close-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          color: var(--text);
          font-size: 2rem;
          cursor: pointer;
          transition: color 0.3s ease;
          z-index: 1001;
        }

        .close-btn:hover {
          color: var(--accent);
        }

        .app-buttons-row {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1.2rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
        }

        .app-buttons-row a {
          display: flex;
          align-items: center;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .modal-content {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            padding: 1.5rem;
          }

          .modal-title {
            font-size: 2rem;
          }

          .screenshots-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .section {
            margin: 1.5rem auto 0;
            padding: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .modal-overlay {
            padding: 1rem;
          }

          .modal-content {
            padding: 1rem;
          }

          .app-buttons-row {
            flex-direction: column;
            gap: 1rem;
          }

          .app-buttons-row a {
            justify-content: center;
          }
        }
      `}</style>

      <section className="section" style={{ textAlign: 'center' }}>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '3rem', color: 'var(--accent)', marginBottom: '1.2rem' }}>
          SolarPack App
        </h1>
        <p style={{ color: 'var(--subtxt)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2.2rem' }}>
          Welcome to the SolarPack App page! Here you'll find information about our mobile and web applications, features, and how to get involved as a user or developer.
        </p>
        
        {/* App Store and Telemetry Buttons Row */}
        <div className="app-buttons-row">
          <a href="https://apps.apple.com/us/app/solarpack/id6748289347">
            <img 
              src="/images/app_store.png" 
              alt="Download on the App Store" 
              style={{ height: '60px', width: 'auto', boxShadow: 'none', background: 'none' }} 
            />
          </a>
          <a 
            href="https://solarpack-app-server-alyv.onrender.com/#" 
            style={{ textDecoration: 'none' }} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <button style={{
              background: 'var(--accent)',
              color: '#fff',
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '1.3rem',
              fontWeight: 'bold',
              letterSpacing: '2px',
              padding: '1.0rem 2.2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.7rem',
              border: 'none',
              borderRadius: '10px',
              boxShadow: '0 2px 12px #0003',
              cursor: 'pointer',
              transition: 'background 0.2s',
              textTransform: 'uppercase'
            }}>
              <i className="fas fa-satellite-dish" style={{ fontSize: '1.5rem' }}></i>
              VIEW LIVE TELEMETRY
            </button>
          </a>
        </div>
        
        {/* App Screenshots Grid: Interactive iPad Screenshots */}
        <div className="screenshots-container">
          <div className="screenshots-grid">
            {Object.entries(modalData).map(([key, data]) => (
              <div key={key} className="screenshot-card" onClick={() => openModal(key)}>
                <img src={data.image} alt={`iPad Screenshot ${key.slice(-1)}`} />
                <div className="screenshot-overlay">
                  <div className="screenshot-title">{data.title}</div>
                  <div className="screenshot-preview">Click to learn more about the {data.title.toLowerCase()} features...</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Popup */}
        {activeModal && modalData[activeModal] && (
          <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && closeModal()}>
            <div className="modal-content">
              <button className="close-btn" onClick={closeModal}>&times;</button>
              <div className="modal-image">
                <img src={modalData[activeModal].image} alt={modalData[activeModal].title} />
              </div>
              <div className="modal-details">
                <h2 className="modal-title">{modalData[activeModal].title}</h2>
                <p className="modal-description">
                  {modalData[activeModal].description}
                </p>
                <ul className="modal-features">
                  {modalData[activeModal].features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Minimalistic Privacy Policy Link */}
      <div style={{ textAlign: 'center', margin: '2.5rem 0 0', fontSize: '0.98rem' }}>
        <a 
          href="/privacy-policy" 
          style={{ color: 'var(--accent)', textDecoration: 'none', opacity: '0.8', transition: 'opacity 0.2s' }}
        >
          Privacy & Data Policy
        </a>
      </div>
    </>
  )
}

export default App