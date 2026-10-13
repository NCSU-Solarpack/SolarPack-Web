import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { supabaseService } from '../utils/supabase'
import DepthHero from '../components/DepthHero'
import useFitText from '../hooks/useFitText'
import {
  PHOTOS, LINKS, STATS, SUBTEAMS, ROAD_AHEAD, NEEDS, MANIFESTO, SUPERLATIVE_TICKER, RAIL,
  TIMELINE, SYSTEMS, NUMBERS, NEXT_RACE,
} from '../content/site'
import './Home.css'

gsap.registerPlugin(ScrollTrigger)

const reduce = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const Img = ({ p, sizes = '50vw', className = '', eager }) => (
  <img src={p.src} srcSet={p.srcSet} sizes={p.srcSet ? sizes : undefined} width={p.w} height={p.h} alt={p.alt}
    loading={eager ? 'eager' : 'lazy'} decoding="async" className={className} />
)

// ---------- data hooks ----------
const useBuild = () => {
  const [build, setBuild] = useState(null)
  useEffect(() => {
    let alive = true
    supabaseService.getScheduleData().then((data) => {
      if (!alive) return
      const projects = (data.projects || []).filter((p) => p.status !== 'cancelled')
      const done = projects.filter((p) => p.status === 'completed').length
      const byTeam = {}
      projects.forEach((p) => {
        const t = (byTeam[p.team] ||= { total: 0, done: 0 })
        t.total += 1
        if (p.status === 'completed') t.done += 1
      })
      setBuild({ total: projects.length, done, pct: projects.length ? Math.round((done / projects.length) * 100) : 0, byTeam, at: new Date() })
    }).catch(() => alive && setBuild(null))
    return () => { alive = false }
  }, [])
  return build
}

const useSession = () => {
  const [s, setS] = useState(undefined)
  useEffect(() => {
    let alive = true
    supabaseService.getActiveSession().then((v) => alive && setS(v)).catch(() => alive && setS(null))
    return () => { alive = false }
  }, [])
  return s
}

const useSponsors = () => {
  const [logos, setLogos] = useState([])
  useEffect(() => {
    let alive = true
    supabaseService.getSponsors().then((d) => {
      if (!alive) return
      setLogos((d.sponsorTiers || []).flatMap((t) => (t.sponsors || []).map((s) => ({ ...s, tier: t.tier }))))
    }).catch(() => {})
    return () => { alive = false }
  }, [])
  return logos
}

const useCountdown = (iso) => {
  const [left, setLeft] = useState(null)
  useEffect(() => {
    if (!iso) return
    const tick = () => setLeft(Math.max(0, new Date(iso) - Date.now()))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [iso])
  if (left == null) return null
  const d = Math.floor(left / 864e5), h = Math.floor(left / 36e5) % 24, m = Math.floor(left / 6e4) % 60, s = Math.floor(left / 1e3) % 60
  return { d, h, m, s }
}

// ---------- sections ----------
const Hero = ({ build }) => {
  const fit = useFitText()
  const cd = useCountdown(NEXT_RACE.date)
  const pad = (n) => String(n).padStart(2, '0')
  return (
    <section className="hx" aria-labelledby="hx-title">
      <DepthHero
        image={PHOTOS.sunsetSide.srcSet ? '/images/2026/fenrir-sunset-side-2400.webp' : PHOTOS.sunsetSide.src}
        depth="/images/2026/fenrir-sunset-side-depth.webp"
        fallback="/images/2026/fenrir-sunset-side-1200.webp"
        alt={PHOTOS.sunsetSide.alt}
      />
      <div className="hx-top" data-after-lines>
        <span className="tag">NC State solar vehicle team · Raleigh, NC</span>
        <span className="hx-hint mono">
          <span className="only-hover">Move over the car · see under the skin</span>
          <span className="only-touch">The lens shows the car's bones</span>
        </span>
        <span className="tag live">
          {cd ? `${NEXT_RACE.name} in ${cd.d}d ${pad(cd.h)}:${pad(cd.m)}:${pad(cd.s)}` : build ? `Shop board · ${build.pct}% built` : 'Shop board · live'}
        </span>
      </div>
      <h1 id="hx-title" className="hx-title display lines">
        <span className="line"><span ref={fit} data-line style={{ '--i': 0 }}>Fenrir</span></span>
      </h1>
      <dl className="hx-stats" data-after-lines>
        <div><dt>Car</dt><dd>99</dd></div>
        <div><dt>Students</dt><dd>{STATS.items[0].figure}</dd></div>
        <div><dt>Pack</dt><dd>13.6<small>kWh</small></dd></div>
        <div><dt>Seats</dt><dd>2</dd></div>
        <div><dt>Started as</dt><dd>Gas<small>car</small></dd></div>
      </dl>
    </section>
  )
}

const Manifesto = () => {
  const ref = useRef(null)
  const words = MANIFESTO.split(' ')
  useLayoutEffect(() => {
    if (reduce()) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.mf-word', { opacity: 0.14 }, {
        opacity: 1, stagger: 0.08, ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top 75%', end: 'bottom 45%', scrub: true },
      })
    }, ref)
    return () => ctx.revert()
  }, [])
  return (
    <section ref={ref} className="mf" aria-label="Who we are">
      <span className="tag">Who we are</span>
      <p className="mf-text display">
        {words.map((w, i) => <span key={i} className={`mf-word ${/gas|sun|drift/i.test(w) ? 'red' : ''}`}>{w} </span>)}
      </p>
      <div className="mf-row">
        <p className="lead">Eighty students design, weld, wire and drive it. Fenrir is car 99, and it carries a passenger.</p>
        <Link className="btn ghost" to="/team">Meet the crew <span className="arrow" aria-hidden="true">↗</span></Link>
      </div>
    </section>
  )
}

const Ticker = () => (
  <div className="tk" aria-label="Superlatives">
    <div className="tk-track">
      {[0, 1].map((k) => (
        <span key={k} className="tk-set" aria-hidden={k === 1}>
          {SUPERLATIVE_TICKER.map((t) => <span key={t} className="display">{t}<i /></span>)}
        </span>
      ))}
    </div>
  </div>
)

const Rail = () => {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    let down = false, sx = 0, sl = 0
    const d = (e) => { down = true; sx = e.pageX; sl = el.scrollLeft; el.classList.add('drag') }
    const m = (e) => { if (down) el.scrollLeft = sl - (e.pageX - sx) }
    const u = () => { down = false; el.classList.remove('drag') }
    el.addEventListener('pointerdown', d)
    window.addEventListener('pointermove', m)
    window.addEventListener('pointerup', u)
    return () => { el.removeEventListener('pointerdown', d); window.removeEventListener('pointermove', m); window.removeEventListener('pointerup', u) }
  }, [])
  return (
    <section className="rail" aria-label="Race week photos">
      <div className="rail-head wrap">
        <span className="tag">Race week, 2026</span>
        <span className="mono muted">Drag →</span>
      </div>
      <div ref={ref} className="rail-track" data-cursor>
        {RAIL.map((r, i) => (
          <figure key={r.p} className={`rail-item r${i % 3}`}>
            <Img p={PHOTOS[r.p]} sizes="(max-width: 760px) 80vw, 40vw" />
            <figcaption className="mono">{String(i + 1).padStart(2, '0')} · {r.tag}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

const Timeline = () => {
  const ref = useRef(null)
  const track = useRef(null)
  useLayoutEffect(() => {
    if (reduce()) return
    const mm = gsap.matchMedia()
    mm.add('(min-width: 900px)', () => {
      const distance = () => track.current.scrollWidth - window.innerWidth
      gsap.to(track.current, {
        x: () => -distance(), ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: () => `+=${distance()}`, scrub: 0.6, pin: true, invalidateOnRefresh: true, anticipatePin: 1 },
      })
    })
    return () => mm.revert()
  }, [])
  return (
    <section ref={ref} className="tl" aria-labelledby="tl-title">
      <div ref={track} className="tl-track">
        <div className="tl-intro">
          <span className="tag">Heritage</span>
          <h2 id="tl-title" className="tl-title">From gas<br />to sun</h2>
          <p className="lead muted">Four chapters of one car, and the next one already in CAD.</p>
        </div>
        {TIMELINE.map((t, i) => (
          <article key={t.year} className={`tl-card ${t.photo ? '' : 'no-photo'}`}>
            <span className="tl-year display">{t.year}</span>
            {t.photo ? <Img p={PHOTOS[t.photo]} sizes="(max-width: 900px) 92vw, 46vw" /> : <div className="tl-gas display" aria-hidden="true">Gas</div>}
            <div className="tl-copy">
              <span className="mono red">Chapter {i + 1}</span>
              <h3>{t.title}</h3>
              <p>{t.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

const HallOfFame = () => {
  const [hover, setHover] = useState(null)
  const prev = useRef(null)
  const listRef = useRef(null)
  useEffect(() => {
    const el = prev.current, list = listRef.current
    if (!el || !list) return
    let x = 0, y = 0, cx = 0, cy = 0, raf
    const move = (e) => { const r = list.getBoundingClientRect(); x = e.clientX - r.left; y = e.clientY - r.top }
    const loop = () => { cx += (x - cx) * 0.14; cy += (y - cy) * 0.14; el.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`; raf = requestAnimationFrame(loop) }
    list.addEventListener('pointermove', move)
    loop()
    return () => { cancelAnimationFrame(raf); list.removeEventListener('pointermove', move) }
  }, [])
  const built = SYSTEMS.filter((s) => s.status === 'built').length
  return (
    <section className="hof" aria-labelledby="hof-title">
      <div className="hof-head wrap">
        <div>
          <span className="tag">Hall of Fame</span>
          <h2 id="hof-title" className="sec-head">Every system on the car</h2>
        </div>
        <p className="lead muted">{built} built and racing. {SYSTEMS.length - built} in the shop right now. All designed by students.</p>
      </div>
      <div ref={listRef} className="hof-list" onPointerLeave={() => setHover(null)}>
        <div className="hof-row hof-labels mono" aria-hidden="true"><span>System</span><span>Subteam</span><span>Spec</span><span>Status</span></div>
        {SYSTEMS.map((s, i) => (
          <div key={s.name} className="hof-row" onPointerEnter={() => setHover(i)} data-reveal style={{ '--d': i % 4 }}>
            <span className="hof-name">{s.name}</span>
            <span className="mono muted">{s.team}</span>
            <span className="mono">{s.spec}</span>
            <span className={`hof-status mono ${s.status}`}>{s.status === 'built' ? 'Built' : 'In the shop'}</span>
          </div>
        ))}
        <div ref={prev} className={`hof-preview ${hover != null ? 'on' : ''}`} aria-hidden="true">
          {SYSTEMS.map((s, i) => (
            <img key={s.name} src={PHOTOS[s.photo].src} alt="" className={hover === i ? 'on' : ''} loading="lazy" />
          ))}
        </div>
      </div>
    </section>
  )
}

const Numbers = () => {
  const ref = useRef(null)
  useLayoutEffect(() => {
    const els = ref.current.querySelectorAll('[data-count]')
    if (reduce()) return
    const ctx = gsap.context(() => {
      els.forEach((el) => {
        const end = parseFloat(el.dataset.count), dec = parseInt(el.dataset.dec, 10)
        const o = { v: 0 }
        gsap.to(o, {
          v: end, duration: 1.6, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          onUpdate: () => { el.textContent = o.v.toFixed(dec) },
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [])
  return (
    <section ref={ref} className="nums" aria-label="Numbers">
      {NUMBERS.map((n) => (
        <div key={n.label} className="num">
          <p className="num-v display"><span data-count={n.value} data-dec={n.decimals}>{n.value.toFixed(n.decimals)}</span><small>{n.unit}</small></p>
          <p className="num-l">{n.label}</p>
        </div>
      ))}
    </section>
  )
}

const ShopBoard = ({ build }) => {
  const session = useSession()
  const live = session && session.status !== 'ended'
  return (
    <section className="board" aria-labelledby="board-title">
      <div className="board-head">
        <div>
          <span className={`tag ${build ? 'live' : ''}`}>Shop board · live from Supabase</span>
          <h2 id="board-title" className="sec-head">In the shop</h2>
        </div>
        <div className="board-pct">
          <span className="display">{build ? build.pct : '—'}<small>%</small></span>
          <span className="mono muted">{build ? `${build.done} of ${build.total} projects done` : 'Connecting to the shop board'}</span>
        </div>
      </div>
      <div className="board-grid">
        {SUBTEAMS.map((t) => {
          const b = build?.byTeam?.[t.id]
          const pct = b && b.total ? Math.round((b.done / b.total) * 100) : 0
          return (
            <article key={t.id} className="board-cell" data-reveal>
              <header>
                <h3>{t.name}</h3>
                <span className="mono">{b ? `${b.done}/${b.total}` : '—'}</span>
              </header>
              <div className="board-bar" aria-hidden="true"><i style={{ width: `${pct}%` }} /></div>
              <ul>{t.projects.slice(0, 3).map((p) => <li key={p}>{p.split(':')[0]}</li>)}</ul>
            </article>
          )
        })}
        <Link to="/telemetry" className="board-cell board-tlm">
          <header>
            <h3>Telemetry</h3>
            <span className={`mono ${live ? 'red' : 'muted'}`}>{session === undefined ? '…' : live ? 'Live' : 'Car parked'}</span>
          </header>
          <p className="lead">{live ? `Car 99 is on track${session.track?.name ? ` at ${session.track.name}` : ''}. Watch it live.` : 'When Fenrir runs, speed, battery and solar stream here over LoRa.'}</p>
          <span className="mono">Open the pit wall ↗</span>
        </Link>
      </div>
    </section>
  )
}

const RoadAhead = () => (
  <section className="ahead" aria-labelledby="ahead-title">
    <figure className="ahead-photo" data-reveal><Img p={PHOTOS.nightHeadlights} sizes="(max-width: 900px) 100vw, 45vw" /></figure>
    <div className="ahead-copy">
      <span className="tag">The road ahead</span>
      <blockquote className="ahead-quote">
        <p className="display">“{ROAD_AHEAD.quotes[0].text}”</p>
        <footer className="mono muted">{ROAD_AHEAD.quotes[0].who}</footer>
      </blockquote>
      <ol className="ahead-list">
        {ROAD_AHEAD.items.map((t, i) => (
          <li key={t} data-reveal style={{ '--d': i }}><span className="mono red">{String(i + 1).padStart(2, '0')}</span>{t}</li>
        ))}
      </ol>
      <p className="ahead-q2">“{ROAD_AHEAD.quotes[1].text}” <span className="mono muted">{ROAD_AHEAD.quotes[1].who}</span></p>
    </div>
  </section>
)

const Partners = () => {
  const logos = useSponsors()
  const row = logos.length ? logos : null
  return (
    <section className="partners" aria-labelledby="partners-title">
      <div className="partners-head wrap">
        <div>
          <span className="tag">Partners</span>
          <h2 id="partners-title" className="sec-head">On the door</h2>
        </div>
        <div className="partners-cta">
          <p className="lead muted">{NEEDS.intro} Composites, tools, converter parts and the trip to the start line.</p>
          <div className="partners-btns">
            <Link className="btn" to="/sponsors">Become a partner <span className="arrow" aria-hidden="true">↗</span></Link>
            <a className="btn ghost" href={LINKS.donate} target="_blank" rel="noopener">Donate</a>
          </div>
        </div>
      </div>
      {row && (
        <div className="lg" aria-label="Current sponsors">
          <div className="lg-track">
            {[0, 1, 2].map((k) => (
              <span key={k} className="lg-set" aria-hidden={k > 0}>
                {row.map((s) => <span key={s.name} className="lg-item"><img src={s.logo || s.image} alt={k ? '' : s.name} loading="lazy" /></span>)}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

const Home = () => {
  const build = useBuild()
  useEffect(() => {
    document.title = 'SolarPack · Fenrir, car 99 · NC State solar car team'
    const t = setTimeout(() => ScrollTrigger.refresh(), 800)
    return () => clearTimeout(t)
  }, [])
  return (
    <>
      <Hero build={build} />
      <Manifesto />
      <Ticker />
      <Rail />
      <Timeline />
      <HallOfFame />
      <Numbers />
      <ShopBoard build={build} />
      <RoadAhead />
      <Partners />
    </>
  )
}

export default Home
