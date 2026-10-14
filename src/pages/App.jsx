import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import './Pages.css'

const features = [
  { title: 'Real-time data', text: 'Speed, RPM, current draw and battery metrics on live gauges.' },
  { title: 'Solar monitoring', text: 'Solar voltage, power output and charging status, as they happen.' },
  { title: 'Battery management', text: 'Voltage and temperature for every one of 100 cells, with fault detection.' },
  { title: 'System health', text: 'Status for every board and auxiliary system, plus ignition control.' },
  { title: 'Analytics', text: 'Rolling charts of charge rate and performance across the session.' },
  { title: 'Motor control', text: 'Motor and controller temperatures, voltages and cooling, precisely.' },
]

const shot = (i, alt) => ({ src: `/images/ipad-app/ipad-${i}.webp`, w: 1600, h: 1200, alt })
const screenshots = [
  shot(1, 'SolarPack iPad app home screen with speed, gear and power readouts'),
  shot(2, 'Battery management screen showing voltage and temperature for 100 cells'),
  shot(3, 'Motor controller screen with temperatures and voltages'),
  shot(4, 'SolarPack iPad app system status screen'),
]

const App = () => {
  useEffect(() => {
    document.title = 'SolarPack · App'
  }, [])

  return (
    <>
      <PageHero
        lines={['The pit', 'wall app']}
        field="f-ink"
        sentence="The iPad app that rides in Fenrir: live telemetry, every battery cell and the solar array, built by our Low Voltage team."
        photo={screenshots[0]}
      >
        <div className="app-actions">
          <a className="btn inverse" href="https://apps.apple.com/us/app/solarpack/id6748289347">Get it on the App Store <span className="arrow" aria-hidden="true">↗</span></a>
          <Link className="textlink" to="/telemetry">Watch live telemetry</Link>
        </div>
      </PageHero>

      <section className="sec f-paper" aria-labelledby="does-title">
        <div className="split">
          <h2 id="does-title" className="sec-head does-head">What it does</h2>
          <dl className="does">
            {features.map((f, i) => (
              <div key={f.title} data-reveal style={{ '--d': i % 3 }}>
                <dt>{f.title}</dt>
                <dd>{f.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="shots f-red" aria-label="Screenshots">
        {screenshots.slice(1).map((s, i) => (
          <img key={s.src} className={`shot shot-${i + 1}`} src={s.src} width={s.w} height={s.h} alt={s.alt} loading="lazy" data-reveal style={{ '--d': i }} />
        ))}
        <p className="shots-note"><Link className="textlink" to="/privacy-policy">Privacy and data policy</Link></p>
      </section>
    </>
  )
}

export default App
