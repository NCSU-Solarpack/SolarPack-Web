import { useEffect } from 'react'

const App = () => {
  useEffect(() => {
    document.title = 'SolarPack · App'
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
        .app-hero {
          position: relative;
          background: linear-gradient(135deg, #1a1a1a 0%, #0c0c0c 100%);
          border-radius: var(--radius);
          padding: 4rem 2rem;
          margin-bottom: 3rem;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(227, 27, 35, 0.15);
        }

        .app-hero::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -20%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(227, 27, 35, 0.15) 0%, transparent 70%);
          border-radius: 50%;
          animation: pulse 8s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.5; }
        }

        .app-hero-content {
          position: relative;
          z-index: 1;
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }

        .app-hero h1 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3rem, 10vw, 5rem);
          color: var(--accent);
          margin-bottom: 1rem;
          letter-spacing: 0.08em;
          text-shadow: 0 0 40px rgba(227, 27, 35, 0.4);
        }

        .app-hero-subtitle {
          font-size: clamp(1.1rem, 2.5vw, 1.4rem);
          color: var(--subtxt);
          line-height: 1.7;
          margin-bottom: 2.5rem;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        /* App Buttons */
        .app-buttons {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
          margin-top: 2rem;
        }

        .app-store-badge {
          height: 56px;
          width: auto;
          transition: transform 0.3s ease, filter 0.3s ease;
          filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
        }

        .app-store-badge:hover {
          transform: translateY(-4px);
          filter: drop-shadow(0 8px 20px rgba(0, 0, 0, 0.4));
        }

        .telemetry-btn {
          background: linear-gradient(135deg, var(--accent) 0%, #c41920 100%);
          color: #fff;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.2rem;
          font-weight: bold;
          letter-spacing: 2px;
          padding: 1.1rem 2.5rem;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          border: none;
          border-radius: 10px;
          box-shadow: 0 4px 20px rgba(227, 27, 35, 0.4);
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          text-decoration: none;
        }

        .telemetry-btn:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(227, 27, 35, 0.6);
          background: linear-gradient(135deg, #ff2831 0%, #e31b23 100%);
        }

        .telemetry-btn:active {
          transform: translateY(-2px);
        }

        /* Features Section */
        .features-section {
          margin: 4rem 0;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .feature-card {
          background: linear-gradient(135deg, #1a1a1a 0%, #141414 100%);
          border-radius: var(--radius);
          padding: 2rem;
          text-align: center;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: 1px solid transparent;
          position: relative;
          overflow: hidden;
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(227, 27, 35, 0.1) 0%, transparent 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .feature-card:hover {
          transform: translateY(-8px);
          border-color: rgba(227, 27, 35, 0.3);
          box-shadow: 0 12px 40px rgba(227, 27, 35, 0.2);
        }

        .feature-card:hover::before {
          opacity: 1;
        }

        .feature-icon {
          font-size: 3rem;
          color: var(--accent);
          margin-bottom: 1rem;
          position: relative;
          z-index: 1;
          display: inline-block;
          transition: transform 0.4s ease;
        }

        .feature-card:hover .feature-icon {
          transform: scale(1.1) rotateY(360deg);
        }

        .feature-card h3 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.6rem;
          color: var(--accent);
          margin: 1rem 0 0.8rem;
          letter-spacing: 0.05em;
          position: relative;
          z-index: 1;
        }

        .feature-card p {
          font-size: 1rem;
          color: var(--subtxt);
          line-height: 1.6;
          position: relative;
          z-index: 1;
        }

        /* Section Titles */
        .section-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.5rem, 6vw, 3.5rem);
          text-align: center;
          color: var(--text);
          margin-bottom: 1rem;
          letter-spacing: 0.06em;
        }

        .section-subtitle {
          text-align: center;
          color: var(--subtxt);
          font-size: 1.15rem;
          max-width: 700px;
          margin: 0 auto 2rem;
          line-height: 1.6;
        }

        /* Screenshots Grid */
        .screenshots-section {
          margin: 4rem 0;
        }

        .screenshots-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2.5rem;
          margin-top: 3rem;
        }

        .screenshot-card {
          border-radius: 12px;
          overflow: hidden;
          background: #1a1a1a;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
        }

        .screenshot-card img {
          width: 100%;
          height: auto;
          display: block;
        }

        /* Privacy Link */
        .privacy-link {
          text-align: center;
          margin: 4rem 0 2rem;
          font-size: 1rem;
        }

        .privacy-link a {
          color: var(--accent);
          text-decoration: none;
          opacity: 0.8;
          transition: all 0.3s ease;
          padding: 0.5rem 1rem;
          border-radius: 6px;
        }

        .privacy-link a:hover {
          opacity: 1;
          background: rgba(227, 27, 35, 0.1);
        }

        /* Responsive Design */
        @media (max-width: 968px) {
          .app-hero {
            padding: 3rem 1.5rem;
          }

          .features-grid {
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 1.5rem;
          }

          .screenshots-grid {
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
          }
        }

        @media (max-width: 768px) {
          .app-buttons {
            flex-direction: column;
            gap: 1.2rem;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .screenshots-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .app-hero {
            padding: 2.5rem 1rem;
          }

          .feature-card {
            padding: 1.5rem;
          }
        }
      `}</style>

      {/* Hero Section */}
      <div className="app-hero">
        <div className="app-hero-content">
          <h1>SolarPack App</h1>
          <p className="app-hero-subtitle">
            Experience real-time vehicle telemetry, comprehensive system monitoring, and cutting-edge solar data visualization. 
            Built for performance, designed for insight.
          </p>
          
          <div className="app-buttons">
            <a href="https://apps.apple.com/us/app/solarpack/id6748289347" aria-label="Download on the App Store">
              <img 
                src="/images/app_store.png" 
                alt="Download on the App Store" 
                className="app-store-badge"
              />
            </a>
            <a 
              href="https://solarpack-app-server-alyv.onrender.com/#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="telemetry-btn"
            >
              <i className="fas fa-satellite-dish"></i>
              VIEW LIVE TELEMETRY
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <i className="fas fa-tachometer-alt feature-icon"></i>
            <h3>Real-Time Data</h3>
            <p>
              Monitor vehicle speed, RPM, current draw, and battery metrics with live-updating gauges and visualizations.
            </p>
          </div>

          <div className="feature-card">
            <i className="fas fa-solar-panel feature-icon"></i>
            <h3>Solar Monitoring</h3>
            <p>
              Track solar voltage, power output, and charging status with dedicated solar system analytics.
            </p>
          </div>

          <div className="feature-card">
            <i className="fas fa-battery-full feature-icon"></i>
            <h3>Battery Management</h3>
            <p>
              Cell-level voltage and temperature monitoring with a comprehensive 100-cell grid display and fault detection.
            </p>
          </div>

          <div className="feature-card">
            <i className="fas fa-microchip feature-icon"></i>
            <h3>System Health</h3>
            <p>
              Complete board health monitoring with status indicators for all auxiliary systems and ignition control.
            </p>
          </div>

          <div className="feature-card">
            <i className="fas fa-chart-line feature-icon"></i>
            <h3>Analytics</h3>
            <p>
              Rolling line charts and historical data visualization for charge rates and performance metrics.
            </p>
          </div>

          <div className="feature-card">
            <i className="fas fa-cog feature-icon"></i>
            <h3>Motor Control</h3>
            <p>
              Monitor motor and controller temperatures, voltages, and cooling system status with precision gauges.
            </p>
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="screenshots-section">
        <div className="screenshots-grid">
          {Object.entries(modalData).map(([key, data]) => (
            <div key={key} className="screenshot-card">
              <img src={data.image} alt={data.title} />
            </div>
          ))}
        </div>
      </section>

      {/* Privacy Policy Link */}
      <div className="privacy-link">
        <a href="/privacy-policy">Privacy & Data Policy</a>
      </div>
    </>
  )
}

export default App