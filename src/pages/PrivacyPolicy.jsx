import { useEffect } from 'react'
import PageHero from '../components/PageHero'
import { PHOTOS } from '../content/site'

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = 'SolarPack · Privacy Policy'
  }, [])

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
      <PageHero lines={['Privacy', 'and data']} field="f-ink" sentence="What the SolarPack app, website and race telemetry collect, and what we never do with it. Effective August 4, 2026." photo={PHOTOS.nightHeadlights} />
      <section className="sec f-paper">
        <div className="prose privacy">
          {sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              {section.content}
            </section>
          ))}
        </div>
        <div className="strip" style={{ marginTop: 96 }}>
          <img src={PHOTOS.sunsetSide.src} srcSet={PHOTOS.sunsetSide.srcSet} sizes="42vw" width={PHOTOS.sunsetSide.w} height={PHOTOS.sunsetSide.h} alt={PHOTOS.sunsetSide.alt} loading="lazy" />
          <img src={PHOTOS.rear.src} width={PHOTOS.rear.w} height={PHOTOS.rear.h} alt={PHOTOS.rear.alt} loading="lazy" />
          <img src={PHOTOS.cockpit.src} srcSet={PHOTOS.cockpit.srcSet} sizes="33vw" width={PHOTOS.cockpit.w} height={PHOTOS.cockpit.h} alt={PHOTOS.cockpit.alt} loading="lazy" />
        </div>
      </section>
    </>
  )
}

export default PrivacyPolicy
