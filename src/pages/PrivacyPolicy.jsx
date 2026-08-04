
import { useEffect, useState } from 'react'

// Inline styles for Privacy Policy
const privacyPolicyStyles = `
.privacy-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 3rem 1.2rem 5rem;
  min-height: 60vh;
}

.privacy-container h1 {
  font-family: "Bebas Neue", sans-serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  letter-spacing: 0.04em;
  margin: 0 0 0.4rem;
  text-align: center;
  color: var(--txt);
}

.effective-date {
  color: var(--subtxt);
  text-align: center;
  font-size: 1.05rem;
  margin-bottom: 2.5rem;
}

/* Accordion blocks */
.policy-section {
  margin-bottom: 1.2rem;
  background: var(--card);
  border-radius: var(--radius);
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.policy-toggle {
  all: unset;
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;
  padding: 1.1rem 1.2rem;
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--txt);
  transition: background 0.15s;
}

.policy-toggle:hover {
  background: #222;
}

.chevron {
  font-size: 1.9rem;
  line-height: 0;
  margin-right: 0.4rem;
  color: var(--accent);
  transition: transform 0.28s cubic-bezier(.4,2,.6,1);
}

.policy-content {
  padding: 1.15rem 2.2rem 1.2rem 2.7rem;
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--subtxt);
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  transition: max-height 0.35s cubic-bezier(.4,2,.6,1), opacity 0.25s;
}

.policy-content.open {
  max-height: 2000px;   /* big enough to show any section */
  opacity: 1;
}

@media (max-width: 600px) {
  .policy-content {
    padding: 1rem 0.9rem 1.1rem 1.2rem;
  }
}

.policy-content ul {
  padding-left: 1.4rem;
  margin: 0.6rem 0 0;
}

.policy-content li + li { 
  margin-top: 0.55rem; 
}

.policy-content a {
  color: var(--accent);
  text-decoration: none;
}

.policy-content a:hover { 
  text-decoration: underline; 
}

.footer-note {
  color: #888;
  text-align: center;
  font-size: 0.95rem;
  margin-top: 2.2rem;
}
`;

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
          We collect data needed to operate the SolarPack app, website, team tools,
          and race telemetry services. During races, the app may transmit the solar
          car&apos;s location and vehicle telemetry for live viewing and session history. We do
          <em> not</em> use your data for advertising, marketing, personalization,
          or tracking across other apps.
        </p>
      )
    },
    {
      title: "Data We Collect",
      content: (
        <ul>
          <li><strong>Precise Location and Motion Data</strong> – During an active race or telemetry connection, the app uses GPS coordinates, speed, heading, accuracy, and timestamps to show the solar car on a map, calculate distance and laps, and provide live and historical race telemetry. If background location is enabled, this may continue while the app is in the background or the screen is locked.</li>
          <li><strong>Vehicle Telemetry</strong> – The app processes and may transmit operational data such as battery status, electrical measurements, temperatures, motor speed, faults, and lap statistics.</li>
          <li><strong>Account Information</strong> – If you create or use a team account, Supabase Authentication processes your email address, name, authentication credentials, account role, and approval status.</li>
          <li><strong>Content You Provide</strong> – Team tools may store information you submit, such as clipboard content, schedules, notes, orders, blog content, and team or sponsor information.</li>
          <li><strong>Technical Data</strong> – Our hosting and database providers may process routine technical information such as IP address, browser or device type, access times, and service logs for security and reliable operation.</li>
        </ul>
      )
    },
    {
      title: "Data We Don't Collect",
      content: (
        <ul>
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
      title: "How We Use and Share Data",
      content: (
        <>
          <p>We use collected data to operate app features, authenticate team members, administer team activities, diagnose problems, and provide live and historical race telemetry.</p>
          <p><strong>Race telemetry is public:</strong> When telemetry streaming is active, the solar car&apos;s current and historical location and vehicle data may be displayed on the public SolarPack telemetry website to fans, sponsors, and other visitors. Do not start telemetry streaming where public disclosure of the car&apos;s location would create a safety or security risk.</p>
          <p>We use service providers, including Supabase for authentication, database storage, and realtime data, and our website and relay hosting providers. They process data to provide their services to us. We do not sell personal data or share it with advertising networks or data brokers.</p>
        </>
      )
    },
    {
      title: "Data Retention",
      content: (
        <p>
          Live telemetry is updated as new readings arrive. Historical race telemetry, lap records,
          account records, and content submitted through team tools are retained until they are no
          longer needed for the purposes described in this policy or are deleted by an authorized
          administrator, subject to operational backups and legal obligations. You may contact us
          to ask about access, correction, or deletion of personal information associated with you.
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
    <>
      <style>{privacyPolicyStyles}</style>
      <div className="privacy-container">
        <h1>SOLARPACK Privacy & Data</h1>
        <div className="effective-date"><strong>Effective Date:</strong> August&nbsp;4, 2026</div>

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
    </>
  )
}

export default PrivacyPolicy
