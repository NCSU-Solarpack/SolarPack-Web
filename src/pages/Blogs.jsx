import { useState, useEffect } from 'react'
import { supabaseService } from '../utils/supabase'
import PageHero from '../components/PageHero'
import { PHOTOS, LINKS } from '../content/site'
import './Pages.css'

const fmt = (d) => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

// Plain-text excerpt from the stored HTML body
const createExcerpt = (html, maxLength = 220) => {
  if (!html) return ''
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = html
  const text = tempDiv.textContent || tempDiv.innerText || ''
  return text.length <= maxLength ? text : text.substring(0, maxLength).trim() + '…'
}

const Blogs = () => {
  const [blogs, setBlogs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedBlog, setSelectedBlog] = useState(null)

  useEffect(() => {
    document.title = 'SolarPack · Blog'
    const loadBlogs = async () => {
      try {
        const data = await supabaseService.getPublishedBlogs()
        setBlogs(data || [])
      } catch (error) {
        console.error('Error loading blogs:', error)
        setBlogs([])
      } finally {
        setIsLoading(false)
      }
    }
    loadBlogs()
  }, [])

  useEffect(() => {
    if (!selectedBlog) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') setSelectedBlog(null) }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [selectedBlog])

  const fallback = [PHOTOS.sunsetOpen, PHOTOS.scrutineering, PHOTOS.nightHeadlights, PHOTOS.wrench]

  return (
    <>
      <PageHero
        lines={['From the', 'paddock']}
        sentence="Build updates and race reports, written by the people holding the wrenches."
        photo={PHOTOS.nightLineup}
      />

      <section className="posts f-paper" aria-label="Posts">
        {isLoading && <p className="state">Loading posts…</p>}
        {!isLoading && blogs.length === 0 && (
          <div className="posts-empty">
            <h2 className="sec-head">Nothing posted yet</h2>
            <p className="lead">The first race report is being written. Until then the paddock lives on <a className="textlink" href={LINKS.instagram} target="_blank" rel="noopener">Instagram</a>.</p>
          </div>
        )}
        {blogs.map((blog, i) => {
          const img = blog.image_url ? { src: blog.image_url, alt: blog.title } : { ...fallback[i % fallback.length], srcSet: undefined }
          return (
            <article key={blog.id} className={`post ${i % 2 ? 'flip' : ''}`} data-reveal>
              <button className="post-img" onClick={() => setSelectedBlog(blog)} aria-label={`Read ${blog.title}`}>
                <img src={img.src} alt={img.alt} loading="lazy" />
              </button>
              <div className="post-text">
                <h2>{blog.title}</h2>
                <p className="small">{blog.author ? `${blog.author}, ` : ''}{fmt(blog.created_at)}</p>
                <p>{createExcerpt(blog.body)}</p>
                <button className="btn" onClick={() => setSelectedBlog(blog)}>Read the post</button>
              </div>
            </article>
          )
        })}
      </section>

      <section className="sec f-ink" aria-label="Photos from race week">
        <div className="strip">
          <img src={PHOTOS.sunsetSide.src} srcSet={PHOTOS.sunsetSide.srcSet} sizes="42vw" width={PHOTOS.sunsetSide.w} height={PHOTOS.sunsetSide.h} alt={PHOTOS.sunsetSide.alt} loading="lazy" />
          <img src={PHOTOS.rear.src} width={PHOTOS.rear.w} height={PHOTOS.rear.h} alt={PHOTOS.rear.alt} loading="lazy" />
          <img src={PHOTOS.cockpit.src} srcSet={PHOTOS.cockpit.srcSet} sizes="33vw" width={PHOTOS.cockpit.w} height={PHOTOS.cockpit.h} alt={PHOTOS.cockpit.alt} loading="lazy" />
        </div>
      </section>

      {selectedBlog && (
        <div className="site-dialog" onClick={() => setSelectedBlog(null)} role="dialog" aria-modal="true" aria-label={selectedBlog.title}>
          <article className="panel reader" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setSelectedBlog(null)} autoFocus>Close</button>
            {selectedBlog.image_url && <img className="reader-img" src={selectedBlog.image_url} alt={selectedBlog.title} />}
            <div className="reader-body">
              <h1>{selectedBlog.title}</h1>
              <p className="small">{selectedBlog.author ? `${selectedBlog.author}, ` : ''}{fmt(selectedBlog.created_at)}</p>
              {selectedBlog.link_url && (
                <a href={selectedBlog.link_url} target="_blank" rel="noopener noreferrer" className="btn red">
                  {selectedBlog.link_text || 'Read more'} <span className="arrow" aria-hidden="true">↗</span>
                </a>
              )}
              <div className="prose" dangerouslySetInnerHTML={{ __html: selectedBlog.body }} />
            </div>
          </article>
        </div>
      )}
    </>
  )
}

export default Blogs
