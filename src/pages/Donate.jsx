import { useEffect, useState } from 'react'
import PageHero from '../components/PageHero'
import { PHOTOS, LINKS } from '../content/site'
import './Pages.css'

const donationChoices = [5, 50, 100, 200]

const uses = [
  { title: 'The aeroshell', text: 'The biggest share goes into the new body: fiberglass, Lantor Soric core, carbon fiber and resin.' },
  { title: 'Race-legal parts', text: 'Fasteners, wire and the small parts that pass inspection: the battery box, ballast boxes and safety gear.' },
  { title: 'Getting to the start line', text: 'Entry fees, travel and everything it takes to put NC State on the grid next season.' },
]

const Donate = () => {
  const [selectedAmount, setSelectedAmount] = useState(null)
  const [customAmount, setCustomAmount] = useState('')

  useEffect(() => {
    document.title = 'SolarPack · Donate'
  }, [])

  const pick = (amount) => {
    setSelectedAmount(amount)
    setCustomAmount(String(amount))
  }

  const onCustom = (e) => {
    const value = e.target.value
    setCustomAmount(value)
    setSelectedAmount(value && parseFloat(value) >= 1 ? parseFloat(value) : null)
  }

  const donate = () => {
    if (selectedAmount && selectedAmount >= 1) window.open(LINKS.donate, '_blank', 'noopener')
  }

  return (
    <>
      <PageHero
        lines={['Back the', 'build']}
        sentence="Every dollar goes into the car, the tools that build it, or getting it to the start line."
        photo={PHOTOS.sunsetOpen}
      />

      <section className="give f-paper" aria-labelledby="give-title">
        <div className="give-form">
          <h2 id="give-title" className="sec-head">Pick an amount</h2>
          <div className="amounts" role="group" aria-label="Donation amount">
            {donationChoices.map((amount) => (
              <button
                key={amount}
                type="button"
                className={`amount display tnum ${selectedAmount === amount ? 'on' : ''}`}
                aria-pressed={selectedAmount === amount}
                onClick={() => pick(amount)}
              >
                ${amount}
              </button>
            ))}
          </div>
          <label className="custom" htmlFor="donation-amount">
            <span>Or your own amount, in dollars</span>
            <input type="number" min="1" step="1" id="donation-amount" inputMode="numeric" placeholder="25" value={customAmount} onChange={onCustom} />
          </label>
          <button type="button" className="btn red give-go" onClick={donate} disabled={!selectedAmount}>
            {selectedAmount ? `Give $${parseFloat(selectedAmount).toFixed(2)} with PayPal` : 'Choose an amount first'}
            <span className="arrow" aria-hidden="true">↗</span>
          </button>
          <p className="small">SolarPack is a 501(c)(3) charitable organization, EIN 81-4817863. Contributions are tax deductible. No goods or services are provided in exchange.</p>
        </div>
        <ul className="give-uses">
          {uses.map((u, i) => (
            <li key={u.title} data-reveal style={{ '--d': i }}>
              <h3>{u.title}</h3>
              <p>{u.text}</p>
            </li>
          ))}
          <li className="give-photo" data-reveal>
            <img src={PHOTOS.scrutineering.src} width={PHOTOS.scrutineering.w} height={PHOTOS.scrutineering.h} alt={PHOTOS.scrutineering.alt} loading="lazy" />
          </li>
        </ul>
      </section>

      <section className="sec f-red" aria-label="Photos">
        <div className="strip">
          <img src={PHOTOS.nightHeadlights.src} srcSet={PHOTOS.nightHeadlights.srcSet} sizes="42vw" width={PHOTOS.nightHeadlights.w} height={PHOTOS.nightHeadlights.h} alt={PHOTOS.nightHeadlights.alt} loading="lazy" />
          <img src={PHOTOS.suspension.src} width={PHOTOS.suspension.w} height={PHOTOS.suspension.h} alt={PHOTOS.suspension.alt} loading="lazy" />
          <img src={PHOTOS.pitTent.src} srcSet={PHOTOS.pitTent.srcSet} sizes="33vw" width={PHOTOS.pitTent.w} height={PHOTOS.pitTent.h} alt={PHOTOS.pitTent.alt} loading="lazy" />
        </div>
      </section>
    </>
  )
}

export default Donate
