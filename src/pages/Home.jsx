import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabaseService } from '../utils/supabase'
import {
  PHOTOS, HERO, MISSION, STATS, SUPERLATIVES, BUILT, SUBTEAMS, ROAD_AHEAD, NEEDS, CTA,
} from '../content/site'
import useFitText from '../hooks/useFitText'
import './Home.css'

const Photo = ({ p, sizes = '100vw', eager = false, className = '', style }) => (
  <img
    src={p.src}
    srcSet={p.srcSet}
    sizes={p.srcSet ? sizes : undefined}
    width={p.w}
    height={p.h}
    alt={p.alt}
    loading={eager ? 'eager' : 'lazy'}
    decoding="async"
    className={className}
    style={style}
  />
)

const Arrow = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
    <path d="M12 36 36 12M16 12h20v20" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="square" />
  </svg>
)

// Live build meter: reads the same schedule tables the admin Schedule tab writes.
const useBuild = () => {
  const [build, setBuild] = useState(null)
  useEffect(() => {
    let alive = true
    supabaseService.getScheduleData()
      .then((data) => {
        if (!alive) return
        const projects = (data.projects || []).filter((p) => p.status !== 'cancelled')
        const done = projects.filter((p) => p.status === 'completed').length
        const byTeam = {}
        projects.forEach((p) => {
          const t = (byTeam[p.team] ||= { total: 0, done: 0, open: [] })
          t.total += 1
          if (p.status === 'completed') t.done += 1
          else t.open.push(p.title)
        })
        setBuild({ total: projects.length, done, pct: projects.length ? Math.round((done / projects.length) * 100) : 0, byTeam })
      })
      .catch(() => alive && setBuild(null))
    return () => { alive = false }
  }, [])
  return build
}

const useLiveSession = () => {
  const [session, setSession] = useState(null)
  useEffect(() => {
    let alive = true
    supabaseService.getActiveSession().then((s) => alive && setSession(s)).catch(() => {})
    return () => { alive = false }
  }, [])
  return session
}

const Hero = () => {
  const session = useLiveSession()
  return (
    <section className="hh f-red" aria-labelledby="hh-title">
      <h1 id="hh-title" className="display lines hh-title">
        <span className="line l1"><span data-line style={{ '--i': 0 }}>{HERO.lines[0]}</span></span>
        <span className="line l2"><span data-line style={{ '--i': 1 }}>{HERO.lines[1]}</span></span>
      </h1>
      <figure className="hh-photo">
        <Photo p={PHOTOS.sunsetSide} sizes="(max-width: 760px) 100vw, 52vw" eager />
      </figure>
      <div className="hh-bottom" data-after-lines>
        {session && (
          <Link to="/telemetry" className="hh-live textlink">
            Car 99 is on track right now{session.track?.name ? ` at ${session.track.name}` : ''}. Watch the telemetry
          </Link>
        )}
        <p className="lead">{HERO.sentence}</p>
        <Link to={HERO.action.to} className="btn">{HERO.action.label} <span className="arrow" aria-hidden="true">↗</span></Link>
      </div>
    </section>
  )
}

const Mission = () => (
  <section className="stair f-ink" aria-label="Who we are">
    <p className="stair-text display">
      {MISSION.lines.map((l, i) => (
        <span key={i} className={`stair-line ${i % 2 ? 'red' : ''}`} style={{ '--n': i }} data-reveal>{l} </span>
      ))}
    </p>
    <div className="stair-photos">
      <Photo p={PHOTOS.campus} sizes="(max-width: 760px) 50vw, 20vw" />
      <Photo p={PHOTOS.push} sizes="(max-width: 760px) 50vw, 20vw" />
    </div>
    <p className="stair-note small">{MISSION.note}</p>
  </section>
)

const Stats = () => (
  <section className="stats f-paper" aria-labelledby="stats-title">
    <h2 id="stats-title" className="stats-title">{STATS.heading}</h2>
    {STATS.items.map((s, i) => (
      <div key={s.figure} className={`stat stat-${i + 1}`} data-reveal style={{ '--d': i }}>
        <span className="display stat-fig tnum">{s.figure}</span>
        <span className="stat-cap">{s.caption}</span>
      </div>
    ))}
  </section>
)

const Superlatives = () => {
  const pairs = ['t-paper', 't-asphalt', 't-red', 't-paper', 't-grey']
  const cells = [
    { type: 'head' },
    { type: 'word', ...SUPERLATIVES[0], c: pairs[0] },
    { type: 'photo', p: PHOTOS.cockpit },
    { type: 'word', ...SUPERLATIVES[1], c: pairs[1] },
    { type: 'photo', p: PHOTOS.nightLineup },
    { type: 'word', ...SUPERLATIVES[2], c: pairs[2] },
    { type: 'word', ...SUPERLATIVES[3], c: pairs[3] },
    { type: 'photo', p: PHOTOS.pitTent },
    { type: 'word', ...SUPERLATIVES[4], c: 't-ink2' },
    { type: 'photo', p: PHOTOS.sunsetSponsors },
    { type: 'word', word: '99', caption: 'Fenrir’s race number', c: 't-red' },
    { type: 'link' },
  ]
  return (
    <section className="wall f-ink" aria-labelledby="wall-title">
      {cells.map((c, i) => {
        const d = { 'data-reveal': true, style: { '--d': i % 4 } }
        if (c.type === 'head') return (
          <div key={i} className="cell t-red" {...d}>
            <h2 id="wall-title" className="cell-word" style={{ '--chars': 5 }}>Voted</h2>
            <span className="cell-cap">Our yearbook superlatives</span>
          </div>
        )
        if (c.type === 'photo') return (
          <figure key={i} className="cell photo" {...d}><Photo p={c.p} sizes="(max-width: 760px) 50vw, 25vw" /></figure>
        )
        if (c.type === 'link') return (
          <Link key={i} to="/team" className="cell t-paper cell-link" {...d}>
            <span className="cell-word" style={{ '--chars': 4 }}>Crew</span>
            <span className="cell-cap">Meet the people who built it ↗</span>
          </Link>
        )
        return (
          <div key={i} className={`cell ${c.c}`} {...d}>
            <span className="cell-word" style={{ '--chars': Math.max(c.word.length, 4) }}>{c.word}</span>
            <span className="cell-cap">{c.caption}</span>
          </div>
        )
      })}
    </section>
  )
}

const Built = () => (
  <section className="slips" aria-labelledby="built-title">
    <Photo p={PHOTOS.sunsetOpen} className="slips-bg" sizes="100vw" />
    <div className="slips-copy">
      <h2 id="built-title" className="visually-hidden">{BUILT.heading}</h2>
      {BUILT.paragraphs.map((t, i) => <p key={i} data-reveal style={{ '--d': i }}>{t}</p>)}
    </div>
    <ul className="slips-row" aria-label="Systems already built">
      {BUILT.slips.map((s, i) => (
        <li key={s.title} className={`slip s${i + 1}`} data-reveal style={{ '--d': i }}>
          <b>{s.title}</b>
          <span className="slip-team">{s.team}</span>
          <span aria-hidden="true" className="slip-div">- - - - - - - - - - - -</span>
          {s.lines.map((l) => <span key={l}>{l}</span>)}
          <span className="slip-ok">Built and racing</span>
        </li>
      ))}
    </ul>
  </section>
)

const Shop = () => {
  const build = useBuild()
  const [open, setOpen] = useState(0)
  return (
    <section className="shop f-paper" aria-labelledby="shop-title">
      <div className="shop-intro">
        <h2 id="shop-title" data-reveal>In the shop</h2>
        <div className="shop-meter" data-reveal style={{ '--d': 1 }}>
          {build && build.total > 0 ? (
            <>
              <p className="display shop-pct tnum" aria-label={`${build.pct} percent`}>{build.pct}%</p>
              <p>
                of this season’s build is done: {build.done} of {build.total} projects on the team schedule, live from our
                shop board. Below is what every subteam is working on now.
              </p>
            </>
          ) : (
            <p>Every subteam has a project on the bench. Pick one to see what it is building now.</p>
          )}
        </div>
      </div>
      <div className="acc" data-reveal style={{ '--d': 2 }}>
        {SUBTEAMS.map((t, i) => {
          const live = build?.byTeam?.[t.id]
          const isOpen = open === i
          return (
            <div key={t.id} className={`acc-panel tint-${i + 1} ${isOpen ? 'open' : ''}`}>
              <button
                className="acc-tab"
                aria-expanded={isOpen}
                aria-controls={`acc-${t.id}`}
                onClick={() => setOpen(i)}
              >
                <span>{t.name}</span>
              </button>
              <div id={`acc-${t.id}`} className="acc-body" hidden={!isOpen}>
                <div className="acc-text">
                  <h3>{t.name}</h3>
                  {live && live.total > 0 && (
                    <p className="acc-live tnum">{live.done} of {live.total} scheduled projects done</p>
                  )}
                  <ul>{t.projects.map((p) => <li key={p}>{p}</li>)}</ul>
                </div>
                <Photo p={PHOTOS[t.photo]} className="acc-photo" sizes="(max-width: 760px) 100vw, 28vw" />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

const RoadAhead = () => (
  <section className="road f-red" aria-labelledby="road-title">
    <figure className="road-photo"><Photo p={PHOTOS.nightHeadlights} sizes="(max-width: 760px) 100vw, 50vw" /></figure>
    <div className="road-copy">
      <h2 id="road-title" data-reveal>{ROAD_AHEAD.heading}</h2>
      <ul className="road-list lead">
        {ROAD_AHEAD.items.map((t, i) => <li key={t} data-reveal style={{ '--d': i }}>{t}</li>)}
      </ul>
      <div className="road-quotes f-ink">
        {ROAD_AHEAD.quotes.map((q) => (
          <blockquote key={q.who} data-reveal>
            <p>“{q.text}”</p>
            <footer className="small">{q.who}</footer>
          </blockquote>
        ))}
      </div>
    </div>
  </section>
)

const Needs = () => (
  <section className="needs f-paper" aria-labelledby="needs-title">
    <div className="needs-col">
      <h2 id="needs-title" className="needs-word">{NEEDS.word}</h2>
      <p className="needs-intro">{NEEDS.intro}</p>
      {NEEDS.groups.map((g, i) => (
        <details key={g.name} className="bar" open={i === 0}>
          <summary><span>{g.name}</span><span className="plus" aria-hidden="true">+</span></summary>
          <ul>{g.items.map((it) => <li key={it}>{it}</li>)}</ul>
        </details>
      ))}
    </div>
    <figure className="needs-photo">
      <Photo p={PHOTOS.sunsetSponsors} className="tilt-r" sizes="(max-width: 760px) 100vw, 38vw" />
      <figcaption className="lead">Your logo goes on the door. Sponsors ride on every panel of Fenrir, right next to NC State.</figcaption>
    </figure>
  </section>
)

const SponsorBand = () => {
  const fit = useFitText()
  return (
  <Link to={CTA.to} className="band f-red on-red">
    <span className="band-top">
      <span className="band-sentence">{CTA.sentence}</span>
      <Arrow />
    </span>
    <span ref={fit} className="band-word display">{CTA.word}</span>
  </Link>
  )
}

const Home = () => {
  useEffect(() => {
    document.title = 'SolarPack · NC State solar car team'
  }, [])

  return (
    <>
      <Hero />
      <Mission />
      <Stats />
      <Superlatives />
      <Built />
      <Shop />
      <RoadAhead />
      <Needs />
      <SponsorBand />
    </>
  )
}

export default Home
