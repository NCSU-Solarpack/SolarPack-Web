import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { PHOTOS } from '../content/site'

const NotFound = () => {
  useEffect(() => {
    document.title = 'Page not found · SolarPack'
  }, [])

  return (
    <>
    <PageHero
      lines={['Wrong', 'turn']}
      sentence="This page does not exist or has moved. Error 404."
      photo={PHOTOS.sunsetSide}
    >
      <div className="app-actions">
        <Link to="/" className="btn">Back to the start line</Link>
        <Link to="/contact" className="textlink">Tell us what broke</Link>
      </div>
    </PageHero>
    <section className="sec f-ink" aria-label="Photos">
      <div className="strip">
        <img src={PHOTOS.nightLineup.src} srcSet={PHOTOS.nightLineup.srcSet} sizes="42vw" width={PHOTOS.nightLineup.w} height={PHOTOS.nightLineup.h} alt={PHOTOS.nightLineup.alt} loading="lazy" />
        <img src={PHOTOS.push.src} width={PHOTOS.push.w} height={PHOTOS.push.h} alt={PHOTOS.push.alt} loading="lazy" />
        <img src={PHOTOS.pitTent.src} srcSet={PHOTOS.pitTent.srcSet} sizes="33vw" width={PHOTOS.pitTent.w} height={PHOTOS.pitTent.h} alt={PHOTOS.pitTent.alt} loading="lazy" />
      </div>
    </section>
    </>
  )
}

export default NotFound
