import { useEffect } from 'react'

const features = [
  {
    icon: 'fa-tachometer-alt',
    title: 'Real-Time Data',
    text: 'Monitor vehicle speed, RPM, current draw, and battery metrics with live-updating gauges and visualizations.'
  },
  {
    icon: 'fa-solar-panel',
    title: 'Solar Monitoring',
    text: 'Track solar voltage, power output, and charging status with dedicated solar system analytics.'
  },
  {
    icon: 'fa-battery-full',
    title: 'Battery Management',
    text: 'Cell-level voltage and temperature monitoring with a comprehensive 100-cell grid display and fault detection.'
  },
  {
    icon: 'fa-microchip',
    title: 'System Health',
    text: 'Complete board health monitoring with status indicators for all auxiliary systems and ignition control.'
  },
  {
    icon: 'fa-chart-line',
    title: 'Analytics',
    text: 'Rolling line charts and historical data visualization for charge rates and performance metrics.'
  },
  {
    icon: 'fa-cog',
    title: 'Motor Control',
    text: 'Monitor motor and controller temperatures, voltages, and cooling system status with precision gauges.'
  }
]

const screenshots = [
  { image: '/images/ipad-app/Ipad 1.png', alt: 'Home Page' },
  { image: '/images/ipad-app/Ipad 2.png', alt: 'BMS Page' },
  { image: '/images/ipad-app/Ipad 3.png', alt: 'Motor Controller Page' }
]

const App = () => {
  useEffect(() => {
    document.title = 'SolarPack · App'
  }, [])

  return (
    <>
      <style>{`
        .app-subtitle {
          text-align: center;
          color: var(--subtxt);
          font-size: 1.1rem;
          line-height: 1.7;
          max-width: 640px;
          margin: 0.75rem auto 2rem;
        }

        .app-buttons {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1.25rem;
          flex-wrap: wrap;
          margin-bottom: 3rem;
        }

        .appstore-btn,
        .telemetry-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          height: 4.6rem;
          padding: 0 1.75rem;
          border-radius: 10px;
          border: 1px solid #333;
          text-decoration: none;
          box-shadow: 0 4px 12px #0006;
          transition: transform var(--speed) ease, background var(--speed) ease, box-shadow var(--speed) ease;
        }

        .appstore-btn {
          background: #000;
          color: #fff;
        }

        .appstore-btn:hover {
          background: #1a1a1a;
          transform: translateY(-2px);
        }

        .appstore-btn:active {
          transform: translateY(1px);
        }

        .appstore-btn i {
          font-size: 2.1rem;
        }

        .appstore-btn-text {
          display: flex;
          flex-direction: column;
          line-height: 1.1;
        }

        .appstore-btn-eyebrow {
          font-size: 0.7rem;
          letter-spacing: 0.03em;
          color: #ccc;
        }

        .appstore-btn-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.6rem;
          letter-spacing: 0.03em;
        }

        .telemetry-btn {
          background: var(--accent);
          border-color: var(--accent);
          color: #fff;
          font-weight: 600;
          font-size: 1.15rem;
        }

        .telemetry-btn i {
          font-size: 1.3rem;
        }

        .telemetry-btn:hover {
          background: #ff4a45;
          border-color: #ff4a45;
          box-shadow: 0 6px 18px #0008;
        }

        .telemetry-btn:active {
          transform: translateY(1px);
        }

        .features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .feature {
          text-align: center;
        }

        .feature i {
          font-size: 2.5rem;
          color: var(--accent);
          margin-bottom: 0.5rem;
        }

        .feature h3 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.7rem;
          color: var(--accent);
          margin: 0.5rem 0;
          letter-spacing: 0.05em;
        }

        .feature p {
          margin: 0.75rem 0 0;
          font-size: 1.05rem;
          color: var(--subtxt);
        }

        .screenshots-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 300px));
          justify-content: center;
          gap: 2rem;
          margin-top: 0.5rem;
        }

        .screenshot-card {
          text-align: center;
        }

        .screenshot-card img {
          width: 100%;
          display: block;
          border-radius: var(--radius);
          box-shadow: 0 2px 16px #0005;
          background: #222;
        }

        .privacy-link {
          text-align: center;
          margin: 3rem 0 1.5rem;
        }

        .privacy-link a {
          color: var(--accent);
          text-decoration: none;
          opacity: 0.8;
          transition: opacity 0.2s ease;
        }

        .privacy-link a:hover {
          opacity: 1;
        }

        @media (max-width: 480px) {
          .app-buttons {
            flex-direction: column;
          }
        }
      `}</style>

      <h1>SolarPack App</h1>
      <p className="app-subtitle">
        Real-time vehicle telemetry, comprehensive system monitoring, and solar data visualization
        for the SolarPack car computer.
      </p>
      <div className="app-buttons">
        <a
          href="https://apps.apple.com/us/app/solarpack/id6748289347"
          className="appstore-btn"
          aria-label="Download on the App Store"
        >
          <i className="fab fa-apple" aria-hidden="true"></i>
          <span className="appstore-btn-text">
            <span className="appstore-btn-eyebrow">Download on the</span>
            <span className="appstore-btn-title">App Store</span>
          </span>
        </a>
        <a
          href="https://solarpack-app-server-alyv.onrender.com/#"
          target="_blank"
          rel="noopener noreferrer"
          className="telemetry-btn"
        >
          <i className="fas fa-satellite-dish" aria-hidden="true"></i>
          View Live Telemetry
        </a>
      </div>

      <section className="section features">
        {features.map((feature) => (
          <div key={feature.title} className="feature">
            <i className={`fas ${feature.icon}`} aria-hidden="true"></i>
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
          </div>
        ))}
      </section>

      <section className="section">
        <h2>See It In Action</h2>
        <div className="screenshots-grid">
          {screenshots.map((shot) => (
            <div key={shot.image} className="screenshot-card">
              <img src={shot.image} alt={shot.alt} />
            </div>
          ))}
        </div>
      </section>

      <div className="privacy-link">
        <a href="/privacy-policy">Privacy & Data Policy</a>
      </div>
    </>
  )
}

export default App
