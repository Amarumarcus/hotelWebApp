import { useState, useCallback, useRef, useEffect } from 'react'
import './Galleries.css'

const gallery = import.meta.glob('/src/assets/gallery/*.png', { eager: true });
const kitchen = import.meta.glob('/src/assets/kitchen/*.png', { eager: true });
const nearby = import.meta.glob('/src/assets/nearby/*.png', { eager: true });

function makeSlides(imGobj) {
  return Object.values(imGobj).map((img, i) => ({
    src: img.default,
    alt: `Фото ${i + 1}`,
  }))
}


const GALLERIES = [
  {
    id: 'main',
    label: 'Галерея',
    title: 'Номера и\u00a0<em>территория</em>',
    slides: makeSlides(gallery),
  },
  {
    id: 'kitchen',
    label: 'Кухня',
    title: 'Общая\u00a0<em>кухня</em>',
    slides: makeSlides(kitchen),
  },
  {
    id: 'nearby',
    label: 'Окрестности',
    title: 'Парк\u00a0и\u00a0<em>море</em>',
    slides: makeSlides(nearby),
  },
]

/* ─── Single carousel ─── */
function Carousel({ slides }) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(null)
  const touchStart = useRef(null)

  const go = useCallback((dir) => {
    setDirection(dir)
    setCurrent(prev =>
      dir === 'next'
        ? (prev + 1) % slides.length
        : (prev - 1 + slides.length) % slides.length
    )
  }, [slides.length])

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight') go('next')
      if (e.key === 'ArrowLeft') go('prev')
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [go])

  // Touch swipe
  const onTouchStart = (e) => { touchStart.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if (touchStart.current === null) return
    const delta = touchStart.current - e.changedTouches[0].clientX
    if (Math.abs(delta) > 40) go(delta > 0 ? 'next' : 'prev')
    touchStart.current = null
  }

  return (
    <div
      className="carousel"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="carousel__track">
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className={`carousel__slide ${i === current ? 'carousel__slide--active' : ''}`}
            aria-hidden={i !== current}
          >
            <img src={slide.src} alt={slide.alt} loading="lazy" />
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button className="carousel__arrow carousel__arrow--prev" onClick={() => go('prev')} aria-label="Назад">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button className="carousel__arrow carousel__arrow--next" onClick={() => go('next')} aria-label="Вперёд">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Counter */}
      <div className="carousel__counter">
        <span>{String(current + 1).padStart(2, '0')}</span>
        <span className="carousel__counter-sep" />
        <span className="carousel__counter-total">{String(slides.length).padStart(2, '0')}</span>
      </div>

      {/* Thumbnails strip */}
      <div className="carousel__thumbs">
        {slides.map((slide, i) => (
          <button
            key={i}
            className={`carousel__thumb ${i === current ? 'carousel__thumb--active' : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Слайд ${i + 1}`}
          >
            <img src={slide.src} alt={slide.alt} loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  )
}

/* ─── Galleries section ─── */
export default function Galleries() {
  const [activeTab, setActiveTab] = useState(0)
  const active = GALLERIES[activeTab]

  return (
    <section id="galleries" className="galleries">
      <div className="galleries__inner">

        <div className="galleries__header">
          <span className="section-label">Фотогалерея</span>
          <h3 className="section-title">
            Посмотрите на наш <em>уют</em>
          </h3>
        </div>

        {/* Tabs */}
        <div className="galleries__tabs" role="tablist">
          {GALLERIES.map((g, i) => (
            <button
              key={g.id}
              role="tab"
              aria-selected={i === activeTab}
              className={`galleries__tab ${i === activeTab ? 'galleries__tab--active' : ''}`}
              onClick={() => setActiveTab(i)}
            >
              {g.label}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div className="galleries__panel">
          <div className="galleries__panel-header">
            <h3
              className="galleries__panel-title"
              dangerouslySetInnerHTML={{ __html: active.title }}
            />
          </div>
          <Carousel key={activeTab} slides={active.slides} />
        </div>

      </div>
    </section>
  )
}
