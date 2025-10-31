import { useEffect, useState } from 'react'
import './PrivacyPolicy.css'

const PrivacyPolicy = () => {
  const [openSections, setOpenSections] = useState({ 0: true }) // First section open by default

  useEffect(() => {
    document.title = 'SolarPack · Privacy Policy'
  }, [])

  const toggleSection = (index) => {
    setOpenSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const sections = [
    {
      title: "Summary",
      content: (
        <p>
          We collect a minimal set of data points <strong>only</strong> to make the
          app function and to help us understand and improve performance. We do
          <em> not</em> use your data for advertising, marketing, personalization,
          or tracking across other apps.
        </p>
      )
    },
    {
      title: "Data We Collect",
      content: (
        <ul>
          <li><strong>Precise Location</strong> – Enables GPS-based features such as lap timing and detailed telemetry.</li>
          <li><strong>Coarse Location</strong> – Provides general region information (e.g., for Bluetooth proximity) when precise GPS is unnecessary.</li>
          <li><strong>Device ID</strong> – Helps differentiate hardware models and debug device-specific issues.</li>
          <li><strong>Product Interaction</strong> – Anonymous aggregate data on how you navigate the app (e.g., tab switches) to improve user experience.</li>
          <li><strong>Crash Data</strong> – Automatic crash reports allow us to diagnose bugs and improve stability.</li>
          <li><strong>Performance Data</strong> – Metrics like launch time and connection latency help us monitor and optimize performance.</li>
        </ul>
      )
    },
    {
      title: "Data We Don't Collect",
      content: (
        <ul>
          <li>Contact information (name, email, phone, address)</li>
          <li>User-generated content (photos, messages, files)</li>
          <li>Payment or financial details</li>
          <li>Advertising identifiers or usage for ad targeting</li>
          <li>Health, biometric, or other sensitive personal data</li>
        </ul>
      )
    },
    {
      title: "Tracking",
      content: (
        <p>
          Our app <strong>does not</strong> use any data for cross-app or cross-company tracking as defined by Apple.
          No data is shared with data brokers or ad networks.
        </p>
      )
    },
    {
      title: "Third-Party Services",
      content: (
        <p>
          We use trusted third-party services (e.g., Firebase) solely for analytics, crash reporting,
          and cloud data storage. Each provider is contractually bound to process data only on our
          behalf and not for their own marketing or advertising.
        </p>
      )
    },
    {
      title: "Data Retention",
      content: (
        <p>
          Telemetry and analytics data are stored for the shortest duration necessary to fulfill
          the purposes outlined above, after which they are either deleted or fully anonymized.
        </p>
      )
    },
    {
      title: "Contact Us",
      content: (
        <p>
          Questions? Open an issue on{' '}
          <a href="https://github.com/NCSU-Solarpack" target="_blank" rel="noopener noreferrer">GitHub</a>
          {' '}or email us at{' '}
          <a href="mailto:solarpacknc@ncsu.edu">solarpacknc@ncsu.edu</a>.
        </p>
      )
    }
  ]

  return (
    <div className="privacy-container">
      <h1>SOLARPACK Privacy & Data</h1>
      <div className="effective-date"><strong>Effective Date:</strong> July&nbsp;8, 2025</div>

      <div id="policy">
        {sections.map((section, index) => (
          <div key={index} className="policy-section">
            <button 
              className="policy-toggle"
              onClick={() => toggleSection(index)}
            >
              <span 
                className="chevron"
                style={{ 
                  transform: openSections[index] ? 'rotate(90deg)' : 'rotate(0deg)' 
                }}
              >
                ›
              </span> 
              {section.title.includes("Don't") ? (
                <>Data We <em>Don't</em> Collect</>
              ) : (
                section.title
              )}
            </button>
            <div className={`policy-content ${openSections[index] ? 'open' : ''}`}>
              {section.content}
            </div>
          </div>
        ))}
      </div>

      <div className="footer-note">— End of Policy —</div>
    </div>
  )
}

export default PrivacyPolicy