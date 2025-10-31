import { useEffect, useState } from 'react'

const Donate = () => {
  const [selectedAmount, setSelectedAmount] = useState(null)
  const [customAmount, setCustomAmount] = useState('')
  const [showPayPal, setShowPayPal] = useState(false)

  useEffect(() => {
    document.title = 'SolarPack · Donate'
  }, [])

  const donationChoices = [5, 50, 100, 200]

  const handleChoiceClick = (amount) => {
    setSelectedAmount(amount)
    setCustomAmount(amount.toString())
    setShowPayPal(true)
  }

  const handleCustomAmountChange = (e) => {
    const value = e.target.value
    setCustomAmount(value)
    if (value && parseFloat(value) >= 1) {
      setSelectedAmount(parseFloat(value))
      setShowPayPal(true)
    } else {
      setShowPayPal(false)
    }
  }

  const handlePayPalDonate = () => {
    if (selectedAmount && selectedAmount >= 1) {
      window.open('https://www.paypal.com/fundraiser/charity/3728956', '_blank')
    }
  }

  return (
    <>
      <style>{`
        /* Page-specific styles */
        h1 { 
          font-family: "Bebas Neue", sans-serif; 
          font-size: clamp(2.5rem, 7vw, 4.5rem); 
          letter-spacing: 0.04em; 
          margin: 2.5rem 0 0.5rem; 
          text-align: center; 
        }
        
        .donate-section { 
          background: var(--card); 
          border-radius: var(--radius); 
          box-shadow: 0 1px 6px #0003; 
          padding: 2.5rem 1.5rem; 
          max-width: 600px; 
          margin: 2.5rem auto 0; 
          text-align: center; 
        }
        
        .donate-btn { 
          display: inline-block; 
          background: var(--accent); 
          color: #fff; 
          font-size: 1.2rem; 
          font-weight: 600; 
          padding: 0.9rem 2.2rem; 
          border: none; 
          border-radius: var(--radius); 
          margin-top: 1.5rem; 
          cursor: pointer; 
          transition: background 0.15s; 
          text-decoration: none; 
        }
        
        .donate-btn:hover { 
          background: #b71c1c; 
        }

        .footer { 
          text-align: center; 
          color: #888; 
          font-size: 1rem; 
          margin: 3.5rem 0 1.5rem; 
        }

        .donation-choices-group {
          display: flex;
          gap: 0.7rem;
          align-items: center;
          justify-content: center;
          margin-top: 0.5rem;
          flex-wrap: wrap;
        }
        
        .donation-choice {
          background: var(--accent);
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 1.08rem;
          font-weight: 600;
          padding: 0.6rem 1.3rem;
          cursor: pointer;
          transition: background 0.18s, box-shadow 0.18s;
          box-shadow: 0 1px 4px #0002;
          outline: none;
        }
        
        .donation-choice.active, .donation-choice:focus {
          background: #b71c1c;
          box-shadow: 0 2px 8px #0003;
        }
        
        .donation-choice:hover {
          background: #c0392b;
        }
        
        #donation-amount {
          border: 1.5px solid var(--accent);
          border-radius: 8px;
          padding: 0.6rem 1rem;
          font-size: 1.08rem;
          width: 160px;
          margin-left: 0.7rem;
          transition: border-color 0.18s;
          background: var(--surface);
          color: var(--text);
        }
        
        #donation-amount:focus {
          border-color: #b71c1c;
          outline: none;
        }
        
        .selected-amount-display {
          font-size: 1.7rem;
          font-weight: 700;
          color: var(--accent);
          margin: 1.2rem auto 0.7rem auto;
          text-align: center;
          letter-spacing: 0.02em;
        }

        .donate-note { 
          margin-top: 1.5rem; 
          color: var(--subtxt); 
          font-size: 0.82rem; 
          line-height: 1.4; 
        }

        .donation-uses {
          text-align: left;
          max-width: 420px;
          margin: 1.5rem auto;
          color: var(--subtxt);
          font-size: 1.08rem;
          line-height: 1.7;
        }

        .donation-uses li {
          margin-bottom: 0.5rem;
        }

        .donation-uses b {
          color: var(--text);
        }
      `}</style>

      <h1>Support Our Mission</h1>
      <div className="donate-section">
        <p>Your donation helps us build, innovate, and compete in solar car challenges. Every contribution makes a difference!</p>
        
        {/* PayPal Donation Section */}
        <form style={{ margin: '2rem 0' }}>
          <div style={{ marginBottom: '1.2rem' }}>
            <label htmlFor="donation-amount" style={{ fontWeight: '600', marginBottom: '0.7rem', display: 'block' }}>
              Choose an amount:
            </label>
            <div className="donation-choices-group">
              {donationChoices.map((amount) => (
                <button 
                  key={amount}
                  type="button" 
                  className={`donation-choice ${selectedAmount === amount ? 'active' : ''}`}
                  onClick={() => handleChoiceClick(amount)}
                >
                  ${amount}
                </button>
              ))}
              <input 
                type="number" 
                min="1" 
                step="1" 
                id="donation-amount" 
                placeholder="Custom amount"
                value={customAmount}
                onChange={handleCustomAmountChange}
              />
            </div>
          </div>
          
          {showPayPal && selectedAmount && (
            <>
              <div className="selected-amount-display">
                You are donating: ${parseFloat(selectedAmount).toFixed(2)}
              </div>
              <button 
                type="button"
                className="donate-btn"
                onClick={handlePayPalDonate}
              >
                <i className="fab fa-paypal" style={{ marginRight: '0.5rem' }}></i>
                Donate with PayPal
              </button>
            </>
          )}
        </form>
        
        <ul className="donation-uses">
          <li><b>Aeroshell Construction:</b> The largest portion of your donation will go directly toward building our new carbon fiber aeroshell, which is essential for our car's performance and efficiency.</li>
          <li><b>Regulatory Components:</b> We need to purchase fasteners, wires, and other small accessories to meet strict race regulations—including the battery box, ballast boxes, and other required safety features.</li>
          <li><b>2026 Race Preparation:</b> Your support helps us meet all technical and safety requirements so we can compete in the 2026 solar car race and represent NC State on a national stage.</li>
        </ul>
        
        <p className="donate-note">
          We are a 501(c)(3) charitable organization, EIN: 81-4817863. All the contributions are tax deductible. No goods or services will be provided for the contribution.
        </p>
      </div>
      
    </>
  )
}

export default Donate