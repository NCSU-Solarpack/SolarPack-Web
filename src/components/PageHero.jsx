// Inner-page opener: a flat field, a title of two short lines, one sentence,
// and optionally one hard-cropped photograph tilted off the right edge.
const PageHero = ({ lines, sentence, field = 'f-red', photo, children }) => (
  <section className={`page-hero ${field} ${photo ? 'has-photo' : ''}`}>
    <h1 className="lines" style={{ '--maxch': Math.max(...lines.map((l) => l.length)) }}>
      {lines.map((l, i) => (
        <span key={l} className="line"><span data-line style={{ '--i': i }}>{l}</span></span>
      ))}
    </h1>
    {photo && (
      <figure className="ph-photo">
        <img src={photo.src} srcSet={photo.srcSet} sizes="(max-width: 760px) 100vw, 44vw" width={photo.w} height={photo.h} alt={photo.alt} />
      </figure>
    )}
    <div className="row" data-after-lines>
      {sentence && <p>{sentence}</p>}
      {children}
    </div>
  </section>
)

export default PageHero
