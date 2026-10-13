import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabaseService } from '../utils/supabase'
import PageHero from '../components/PageHero'
import { PHOTOS, FOOTER } from '../content/site'
import './Team.css'

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedMember, setSelectedMember] = useState(null)
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    document.title = 'SolarPack · Team'
    const loadTeamData = async () => {
      try {
        const data = await supabaseService.getTeamMembers()
        const sorted = (data.teamMembers || []).sort((a, b) => (a.order || 0) - (b.order || 0))
        setTeamMembers(sorted)
      } catch (err) {
        console.error('Error loading team data from Supabase:', err)
        setError(err.message)
        setTeamMembers([])
      } finally {
        setIsLoading(false)
      }
    }
    loadTeamData()
  }, [])

  useEffect(() => {
    if (!selectedMember) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') setSelectedMember(null) }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [selectedMember])

  const preview = teamMembers[hovered ?? 0]

  return (
    <>
      <PageHero
        lines={['The', 'crew']}
        field="f-ink"
        sentence="The leads who design, wire, weld and drive Fenrir. Eighty students stand behind them."
        photo={PHOTOS.pitTent}
      />

      <section className="roster f-paper" aria-labelledby="roster-title">
        <h2 id="roster-title" className="sec-head">Leads</h2>
        {isLoading && <p className="state">Loading the crew…</p>}
        {error && <p className="state">The roster could not load right now. Try again in a minute.</p>}
        {!isLoading && !error && teamMembers.length === 0 && <p className="state">No team members listed yet.</p>}
        {teamMembers.length > 0 && (
          <div className="roster-grid">
            <ul className="roster-list" onMouseLeave={() => setHovered(null)}>
              {teamMembers.map((m, i) => (
                <li key={m.id ?? m.name} data-reveal style={{ '--d': i % 4 }}>
                  <button
                    className="roster-row"
                    onMouseEnter={() => setHovered(i)}
                    onFocus={() => setHovered(i)}
                    onClick={() => setSelectedMember(m)}
                  >
                    {m.image && <img className="roster-thumb" src={m.image} alt="" loading="lazy" />}
                    <span className="roster-name">{m.name}</span>
                    <span className="roster-role">{m.role}</span>
                  </button>
                </li>
              ))}
            </ul>
            <figure className="roster-preview" aria-hidden="true">
              {preview?.image && <img key={preview.image} src={preview.image} alt="" />}
              {preview && <figcaption>{preview.name}, {preview.role}</figcaption>}
            </figure>
          </div>
        )}
      </section>

      <section className="sec f-red crew-photos" aria-labelledby="crew-title">
        <div className="crew-head">
          <h2 id="crew-title" className="sec-head">Race week</h2>
          <p className="lead">Hi-vis vests, harnesses, a tent in the paddock and a car that will not stop drifting.</p>
        </div>
        <div className="strip">
          <img src={PHOTOS.cockpit.src} srcSet={PHOTOS.cockpit.srcSet} sizes="42vw" width={PHOTOS.cockpit.w} height={PHOTOS.cockpit.h} alt={PHOTOS.cockpit.alt} loading="lazy" />
          <img src={PHOTOS.scrutineering.src} width={PHOTOS.scrutineering.w} height={PHOTOS.scrutineering.h} alt={PHOTOS.scrutineering.alt} loading="lazy" />
          <img src={PHOTOS.nightLineup.src} srcSet={PHOTOS.nightLineup.srcSet} sizes="33vw" width={PHOTOS.nightLineup.w} height={PHOTOS.nightLineup.h} alt={PHOTOS.nightLineup.alt} loading="lazy" />
        </div>
        <div className="crew-cta">
          <a className="btn" href={FOOTER.action.href}>{FOOTER.action.label} <span className="arrow" aria-hidden="true">↗</span></a>
          <Link className="textlink" to="/alumni">Past leadership</Link>
        </div>
      </section>

      {selectedMember && (
        <div className="site-dialog" onClick={() => setSelectedMember(null)} role="dialog" aria-modal="true" aria-label={selectedMember.name}>
          <div className="panel member" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setSelectedMember(null)} autoFocus>Close</button>
            {selectedMember.image && <img src={selectedMember.image} alt={selectedMember.name} />}
            <div className="member-text">
              <h2>{selectedMember.name}</h2>
              <p className="lead">{selectedMember.role}</p>
              {selectedMember.bio && <p>{selectedMember.bio}</p>}
              {(selectedMember.user_email || selectedMember.email) && (
                <a className="textlink" href={`mailto:${selectedMember.user_email || selectedMember.email}`}>
                  {selectedMember.user_email || selectedMember.email}
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Team
