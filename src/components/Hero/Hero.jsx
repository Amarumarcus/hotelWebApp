import { useState, useEffect, useRef } from 'react'
import './Hero.css'
import img1 from '/src/assets/main/1.png'
import img2 from '/src/assets/main/2.png'
import img3 from '/src/assets/main/3.png'
import img4 from '/src/assets/main/4.png'
import img5 from '/src/assets/main/5.png'

const SLIDES = [
  { src: img1, alt: 'Гостиница Релиз, вид на отель ночью', priority: true },
  { src: img2, alt: 'Гостиница Релиз, вид на отель днем' },
  { src: img3, alt: 'Гостиница Релиз, вид на номер' },
  { src: img4, alt: 'Гостиница Релиз, территория отеля, сад и пруд' },
  { src: img5, alt: 'Гостиница Релиз, в номере вид на кровать' }
]

const INTERVAL = 4000

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  const timerRef = useRef(null)

  const goTo = (index) => {
    if (animating) return
    setAnimating(true)
    setTimeout(() => {
      setCurrent(index)
      setAnimating(false)
    }, 600)
  }

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % SLIDES.length)
    }, INTERVAL)
    return () => clearInterval(timerRef.current)
  }, [])

  const handleDotClick = (i) => {
    clearInterval(timerRef.current)
    goTo(i)
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % SLIDES.length)
    }, INTERVAL)
  }

  return (
    <section id="hero" className="hero">
      {/* Slides */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          className={`hero__slide ${i === current ? 'hero__slide--active' : ''}`}
          aria-hidden={i !== current}
        >
          <img src={slide.src} alt={slide.alt} loading={i === 0 ? 'eager' : 'lazy'} />
        </div>
      ))}

      {/* Overlay */}
      <div className="hero__overlay" />

      {/* Content */}
      <div className="hero__content">
        <p className="hero__eyebrow">Абхазия · Пицунда</p>
        <h1 className="hero__title">
          Релиз
          <span className="hero__title-sub">Мини-отель</span>
        </h1>
        <p className="hero__tagline">
          Уютный гостевой дом у моря, окружённый зеленью и горным воздухом
        </p>
        <div className="hero__actions">
          <a href="#about" className="hero__btn hero__btn--primary">Узнать больше</a>
          <a href="tel:+79006445001" className="hero__btn hero__btn--outline">Забронировать</a>
        </div>
      </div>

      {/* Dots */}
      <div className="hero__dots" role="tablist" aria-label="Слайды">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`Слайд ${i + 1}`}
            className={`hero__dot ${i === current ? 'hero__dot--active' : ''}`}
            onClick={() => handleDotClick(i)}
          />
        ))}
      </div>

      {/* Scroll hint */}
      <div className="hero__scroll-hint" aria-hidden="true">
        <span />
      </div>
    </section>
  )
}
