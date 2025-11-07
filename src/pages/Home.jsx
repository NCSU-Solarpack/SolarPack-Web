import { useState, useEffect, useRef } from 'react'
import ProgressTracker from '../components/ProgressTracker'
import { supabaseService } from '../utils/supabase'
import './Home.css'

const Home = () => {
  const [progress, setProgress] = useState(0)
  const [upcomingProjects, setUpcomingProjects] = useState([])

  useEffect(() => {
    document.title = 'SolarPack'
    // Fetch schedule data and calculate average progress and upcoming projects
    const fetchProgressAndUpcoming = async () => {
      try {
        const data = await supabaseService.getScheduleData()
        const projects = data.projects || []
        const totalProjects = projects.length
        if (totalProjects > 0) {
          // Calculate percent completed projects
          const completed = projects.filter(p => p.status === 'completed').length
          const percentCompleted = Math.round((completed / totalProjects) * 100)
          setProgress(percentCompleted)
        } else {
          setProgress(0)
        }
        // Filter upcoming projects: not completed, not overdue
        const now = new Date()
        const upcoming = projects
          .filter(p => p.status !== 'completed' && new Date(p.dueDate) >= now)
          .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
          .slice(0, 3)
        setUpcomingProjects(upcoming)
      } catch (err) {
        setProgress(0)
        setUpcomingProjects([])
      }
    }
    fetchProgressAndUpcoming()
  }, [])

  return (
    <>
      <section className="hero">
        <img src="/solarpack_logo.gif" alt="SolarPack Logo" />
        <div className="hero-content">
          <h1>SolarPack</h1>
          <div className="subtitle">Solar Vehicle Team at NC State</div>
          <p>
            Striving to break barriers in the sustainable vehicle industry with a hardworking group 
            of over 80 passionate students. Join us in our journey to a more sustainable future for transportation.
          </p>
          <a 
            className="donate-btn" 
            href="https://www.paypal.com/fundraiser/charity/3728956" 
            target="_blank" 
            rel="noopener" 
            aria-label="Donate to SolarPack via PayPal"
          >
            <i className="fab fa-paypal" aria-hidden="true"></i>
            Donate
          </a>
        </div>
      </section>


      <div style={{ width: '100%', background: 'transparent', marginBottom: 0 }}>
        <ProgressTracker percentage={progress} upcomingProjects={upcomingProjects} />
      </div>

      <section className="section">
        <img src="/hero_shot.jpg" alt="SolarPack Team" />
        <h2>Sustainable, Efficient, and Powerful.</h2>
        <p>
          As NC State's first solar vehicle team, we are aiming to show the world that solar energy 
          can be used to power a car. Along the way, we are making a solar vehicle no other team has done before.
        </p>
      </section>

      <section className="section features">
        <div className="feature">
          <ion-icon name="earth-outline"></ion-icon>
          <h3>Global Impact</h3>
          <p>
            We're showing the world that solar energy can power a multi-occupancy car. By building a vehicle 
            no one has seen before, we hope to prove that sustainability and power can go hand in hand.
          </p>
        </div>
        <div className="feature">
          <ion-icon name="cog-outline"></ion-icon>
          <h3>Engineering Excellence</h3>
          <p>
            Our team thrives on creative problem solving. Members develop real-world skills as they tackle 
            unique engineering challenges throughout our build process.
          </p>
        </div>
        <div className="feature">
          <ion-icon name="bulb-outline"></ion-icon>
          <h3>Innovation</h3>
          <p>
            Pioneering new solutions, our members are always innovating—using every resource to bring big 
            ideas to life and push the boundaries of solar vehicle technology.
          </p>
        </div>
        <div className="feature">
          <ion-icon name="hand-left-outline"></ion-icon>
          <h3>Collaboration</h3>
          <p>
            We partner with companies and alumni to guide our journey, building strong relationships as we 
            promote the future of energy-efficient vehicles.
          </p>
        </div>
        <div className="feature">
          <ion-icon name="location-outline"></ion-icon>
          <h3>Rooted in the Triangle</h3>
          <p>
            Proudly representing the Research Triangle, we embody the spirit of innovation and excellence 
            that defines our region—driving forward as leaders in sustainable technology.
          </p>
        </div>
      </section>

      <RaceCarousel />

      <div className="socials">
        <a href="https://www.instagram.com/solarpacknc/" target="_blank" rel="noopener">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://www.linkedin.com/company/solarpack-nc-state/" target="_blank" rel="noopener">
          <i className="fab fa-linkedin"></i>
        </a>
        <a href="https://www.facebook.com/SolarPackNC/" target="_blank" rel="noopener">
          <i className="fab fa-facebook"></i>
        </a>
      </div>
    </>
  )
}

const RaceCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const trackRef = useRef(null)
  const viewportRef = useRef(null)
  const [slideWidth, setSlideWidth] = useState(320)
  const [viewportWidth, setViewportWidth] = useState(0)
  const [translateBase, setTranslateBase] = useState(0)

  const images = [
    '/race2025/race2025_1.jpg',
    '/race2025/race2025_2.jpg',
    '/race2025/race2025_3.jpg',
    '/race2025/race2025_4.jpg',
    '/race2025/race2025_5.jpg',
    '/race2025/race2025_6.jpg',
    '/race2025/race2025_7.jpg',
    '/race2025/race2025_8.jpg',
    '/race2025/race2025_9.jpg'
  ]

  const recalculate = () => {
    if (trackRef.current && viewportRef.current) {
      const firstSlide = trackRef.current.querySelector('.carousel-slide')
      if (firstSlide) {
        const slideRect = firstSlide.getBoundingClientRect()
        const viewportRect = viewportRef.current.getBoundingClientRect()
        setSlideWidth(slideRect.width)
        setViewportWidth(viewportRect.width)
        setTranslateBase(Math.round((viewportRect.width - slideRect.width) / 2))
      }
    }
  }

  useEffect(() => {
    recalculate()
    
    const resizeObserver = new ResizeObserver(recalculate)
    if (viewportRef.current) {
      resizeObserver.observe(viewportRef.current)
    }

    return () => resizeObserver.disconnect()
  }, [])

  const gap = 19.2 // 1.2rem in pixels (assuming 16px base)

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const translateX = -Math.round(currentIndex * (slideWidth + gap)) + translateBase

  // Touch/mouse handling
  const [startX, setStartX] = useState(null)

  const handleStart = (clientX) => {
    setStartX(clientX)
  }

  const handleEnd = (clientX) => {
    if (startX !== null) {
      const diff = clientX - startX
      if (diff < -30) nextSlide()
      else if (diff > 30) prevSlide()
      setStartX(null)
    }
  }

  return (
    <section className="section race-carousel">
      <h2>2025 Race Highlights</h2>

      <div className="carousel-container">
        <button 
          className="carousel-arrow left" 
          onClick={prevSlide}
          aria-label="Previous"
        >
          <i className="fas fa-chevron-left"></i>
        </button>

        <div 
          className="carousel-viewport" 
          ref={viewportRef}
          onMouseDown={(e) => handleStart(e.pageX)}
          onMouseUp={(e) => handleEnd(e.pageX)}
          onTouchStart={(e) => handleStart(e.touches[0].pageX)}
          onTouchEnd={(e) => handleEnd(e.changedTouches[0].pageX)}
        >
          <div 
            className="carousel-track" 
            ref={trackRef}
            style={{ transform: `translateX(${translateX}px)` }}
          >
            {images.map((src, index) => (
              <div key={index} className="carousel-slide">
                <img src={src} alt={`Race 2025 Image ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        <button 
          className="carousel-arrow right" 
          onClick={nextSlide}
          aria-label="Next"
        >
          <i className="fas fa-chevron-right"></i>
        </button>

        <div className="carousel-dots">
          {images.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Home