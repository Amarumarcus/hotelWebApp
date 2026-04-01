import { useState, useEffect } from 'react'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'Главная', href: '#hero' },
  { label: 'О нас', href: '#about' },
  { label: 'Галерея', href: '#galleries' },
  { label: 'Карта', href: '#map' },
  { label: 'Контакты', href: '#footer' },
  { label: 'Скачать прайс', href: 'https://reliz-hotel.netlify.app/Гостиница Релиз_прайc_2026.png'}
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLinkClick = () => setMenuOpen(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <a href="#hero" className="navbar__logo">
        <span className="navbar__logo-main">Релиз</span>
        <span className="navbar__logo-sub">Гостиница</span>
      </a>

      <nav className={`navbar__nav ${menuOpen ? 'navbar__nav--open' : ''}`}>
        {NAV_LINKS.map(({ label, href }) => (
          <a key={href} href={href} className="navbar__link" onClick={handleLinkClick}>
            {label}
          </a>
        ))}
        <a href="#contact" className="navbar__cta" onClick={handleLinkClick}>
          Забронировать
        </a>
      </nav>

      <button
        className={`navbar__burger ${menuOpen ? 'navbar__burger--open' : ''}`}
        onClick={() => setMenuOpen(v => !v)}
        aria-label="Открыть меню"
      >
        <span />
        <span />
        <span />
      </button>
    </header>
  )
}
