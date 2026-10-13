import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import useFitText from '../hooks/useFitText'
import { PHOTOS, LINKS } from '../content/site'
import './Pages.css'

const Contact = () => {
  const fit = useFitText()

  useEffect(() => {
    document.title = 'SolarPack · Contact'
  }, [])

  return (
    <>
      <PageHero
        lines={['Say', 'hello']}
        field="f-ink"
        sentence="Sponsors, recruits, reporters, rival teams: one inbox reads it all."
        photo={PHOTOS.nightLineup}
      />

      <section className="reach f-red" aria-label="Email">
        <a ref={fit} className="reach-mail display" href={`mailto:${LINKS.email}`}>{LINKS.email}</a>
      </section>

      <section className="sec f-paper" aria-labelledby="where-title">
        <div className="split">
          <div className="where">
            <h2 id="where-title" className="sec-head">Find us</h2>
            <ul className="where-list">
              <li><a href={LINKS.instagram} target="_blank" rel="noopener">Instagram</a><span>Race week, every day</span></li>
              <li><a href={LINKS.linkedin} target="_blank" rel="noopener">LinkedIn</a><span>For sponsors and recruiters</span></li>
              <li><a href={LINKS.facebook} target="_blank" rel="noopener">Facebook</a><span>For parents and alumni</span></li>
              <li><Link to="/sponsors">Sponsor packet</Link><span>Tiers and what they fund</span></li>
            </ul>
          </div>
          <div className="where-photos">
            <img src={PHOTOS.cockpit.src} srcSet={PHOTOS.cockpit.srcSet} sizes="(max-width: 760px) 100vw, 40vw" width={PHOTOS.cockpit.w} height={PHOTOS.cockpit.h} alt={PHOTOS.cockpit.alt} loading="lazy" />
            <img src={PHOTOS.campus.src} width={PHOTOS.campus.w} height={PHOTOS.campus.h} alt={PHOTOS.campus.alt} loading="lazy" />
            <img src={PHOTOS.pitTent.src} srcSet={PHOTOS.pitTent.srcSet} sizes="(max-width: 760px) 100vw, 40vw" width={PHOTOS.pitTent.w} height={PHOTOS.pitTent.h} alt={PHOTOS.pitTent.alt} loading="lazy" />
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
