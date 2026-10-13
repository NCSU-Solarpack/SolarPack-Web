import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabaseService } from '../utils/supabase'
import PageHero from '../components/PageHero'
import { PHOTOS, NEEDS, SUBTEAMS, LINKS } from '../content/site'
import './Sponsors.css'

const sponsorMail = `mailto:${LINKS.email}?subject=${encodeURIComponent('Sponsoring SolarPack')}&body=${encodeURIComponent('Hi SolarPack,\n\nWe are interested in sponsoring Fenrir. Please send the sponsorship packet.\n\n')}`

const Sponsors = () => {
  const [sponsorTiers, setSponsorTiers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = 'SolarPack · Sponsors'
    const load = async () => {
      try {
        const data = await supabaseService.getSponsors()
        setSponsorTiers(data.sponsorTiers || [])
      } catch (e) {
        console.error('Error loading sponsors from Supabase', e)
        setSponsorTiers([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <>
      <PageHero
        lines={['Sponsor', 'Fenrir']}
        sentence="Your name rides on the door of a car that holds the fastest lap in Formula Sun Grand Prix history. Here is who is already on it, and where your money goes."
        photo={PHOTOS.sunsetSponsors}
      >
        <a className="btn" href={sponsorMail}>Ask for the packet <span className="arrow" aria-hidden="true">↗</span></a>
      </PageHero>

      <section className="door f-ink" aria-labelledby="door-title">
        <h2 id="door-title" className="sec-head">On the door</h2>
        <div className="plate">
          <p className="door-cue">Pull to open ↓</p>
          {loading && <p className="state">Loading sponsors…</p>}
          {!loading && sponsorTiers.length === 0 && (
            <p className="state">Sponsor logos are on their way. Yours could be first.</p>
          )}
          {sponsorTiers.map((tier) => (
            <div key={tier.tier} className="plate-tier">
              <h3>{tier.tier.replace(/ sponsors?$/i, '')}</h3>
              <ul className={`logos ${/platinum/i.test(tier.tier) ? 'big' : ''}`}>
                {(tier.sponsors || []).map((s) => {
                  const logo = <img src={s.logo || s.image} alt={s.name} loading="lazy" />
                  return (
                    <li key={s.name} data-reveal>
                      {s.website ? <a href={s.website} target="_blank" rel="noopener noreferrer" title={s.name}>{logo}</a> : logo}
                    </li>
                  )
                })}
                {(!tier.sponsors || tier.sponsors.length === 0) && (
                  <li className="empty">{tier.placeholder || 'Open spot'}</li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="sec builds f-paper" aria-labelledby="builds-title">
        <div className="split">
          <div className="builds-copy">
            <h2 id="builds-title" className="sec-head">Where it goes</h2>
            <p className="lead">{NEEDS.intro} Every dollar goes into the car, the tools that build it, or getting it to the start line.</p>
            <img src={PHOTOS.wrench.src} width={PHOTOS.wrench.w} height={PHOTOS.wrench.h} alt={PHOTOS.wrench.alt} loading="lazy" className="builds-photo" />
          </div>
          <ul className="builds-list">
            {NEEDS.groups.map((g, i) => (
              <li key={g.name} data-reveal style={{ '--d': i % 3 }}>
                <h3>{g.name}</h3>
                <p>{g.items.join(', ')}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bench f-red" aria-labelledby="bench-title">
        <div className="bench-copy">
          <h2 id="bench-title" className="sec-head">On the bench</h2>
          <ul>
            {SUBTEAMS.map((t) => (
              <li key={t.id} data-reveal>
                <b>{t.name}</b>
                <span>{t.projects[0].split(':')[0]}{t.projects.length > 1 ? ` and ${t.projects.length - 1} more` : ''}</span>
              </li>
            ))}
          </ul>
          <Link to="/" className="textlink">See every project on the home page</Link>
        </div>
        <figure className="bench-photo">
          <img src={PHOTOS.cockpit.src} srcSet={PHOTOS.cockpit.srcSet} sizes="(max-width: 760px) 100vw, 45vw" width={PHOTOS.cockpit.w} height={PHOTOS.cockpit.h} alt={PHOTOS.cockpit.alt} loading="lazy" />
        </figure>
      </section>

      <section className="sec ask f-paper" aria-labelledby="ask-title">
        <h2 id="ask-title" className="sec-head">Talk to us</h2>
        <div className="ask-row">
          <a className="ask-mail display" href={sponsorMail}>{LINKS.email}</a>
          <p>Tell us what you make and we will send the packet with tiers, where logos go on the car, and what each level funds. Prefer to give directly? <Link className="textlink" to="/donate">Donate here</Link>.</p>
        </div>
        <div className="strip" style={{ marginTop: 64 }}>
          <img src={PHOTOS.nightLineup.src} srcSet={PHOTOS.nightLineup.srcSet} sizes="40vw" width={PHOTOS.nightLineup.w} height={PHOTOS.nightLineup.h} alt={PHOTOS.nightLineup.alt} loading="lazy" />
          <img src={PHOTOS.push.src} width={PHOTOS.push.w} height={PHOTOS.push.h} alt={PHOTOS.push.alt} loading="lazy" />
          <img src={PHOTOS.pitTent.src} srcSet={PHOTOS.pitTent.srcSet} sizes="33vw" width={PHOTOS.pitTent.w} height={PHOTOS.pitTent.h} alt={PHOTOS.pitTent.alt} loading="lazy" />
        </div>
      </section>
    </>
  )
}

export default Sponsors
