import { useEffect, useState } from 'react'
import { supabaseService } from '../utils/supabase'
import PageHero from '../components/PageHero'
import { PHOTOS } from '../content/site'
import './Pages.css'

const Alumni = () => {
  const [alumniData, setAlumniData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    document.title = 'SolarPack · Alumni'
    const loadAlumniData = async () => {
      try {
        const data = await supabaseService.getAlumni()
        setAlumniData(data.alumniData || [])
      } catch (err) {
        console.error('Error loading alumni data from Supabase:', err)
        setError(err.message)
        setAlumniData([])
      } finally {
        setLoading(false)
      }
    }
    loadAlumniData()
  }, [])

  return (
    <>
      <PageHero
        lines={['Who built', 'it first']}
        sentence="Every semester of SolarPack leadership, newest first. Fenrir stands on their welds."
        photo={PHOTOS.campus}
      />

      <section className="stage f-paper" aria-label="Leadership by semester">
        <div className="stage-fixed">
          <img src={PHOTOS.firstCarPaddock.src} width={PHOTOS.firstCarPaddock.w} height={PHOTOS.firstCarPaddock.h} alt={PHOTOS.firstCarPaddock.alt} />
          <img src={PHOTOS.firstCarGarage.src} width={PHOTOS.firstCarGarage.w} height={PHOTOS.firstCarGarage.h} alt={PHOTOS.firstCarGarage.alt} loading="lazy" />
        </div>
        <div className="stage-scroll">
          {loading && <p className="state">Loading alumni…</p>}
          {error && <p className="state">Alumni could not load right now. Try again in a minute.</p>}
          {alumniData.map((semester) => (
            <section key={semester.semester} className="semester" data-reveal>
              <h2>{semester.semester}</h2>
              <ul>
                {semester.leadership?.map((member, i) => (
                  <li key={`${member.role}-${i}`}>
                    <span>{member.role}</span>
                    <b>{member.name}</b>
                  </li>
                ))}
              </ul>
            </section>
          ))}
          <img className="stage-end" src={PHOTOS.suspension.src} width={PHOTOS.suspension.w} height={PHOTOS.suspension.h} alt={PHOTOS.suspension.alt} loading="lazy" />
        </div>
      </section>
    </>
  )
}

export default Alumni
