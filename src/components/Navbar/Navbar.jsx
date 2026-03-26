import { useState, useEffect } from 'react'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'Главная', href: '#hero' },
  { label: 'О нас', href: '#about' },
  { label: 'Галерея', href: '#galleries' },
  { label: 'Карта', href: '#map' },
  { label: 'Контакты', href: '#footer' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLinkClick = () => setMenuOpen(false)

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <a href="#hero" className="navbar__logo">
        <span className="navbar__logo-main">Релиз</span>
        <span className="navbar__logo-sub">Boutique Hotel</span>
      </a>

      <nav className={`navbar__nav ${menuOpen ? 'navbar__nav--open' : ''}`}>
        {NAV_LINKS.map(({ label, href }) => (
          <a key={href} href={href} className="navbar__link" onClick={handleLinkClick}>
            {label}
          </a>
        ))}
        <a href="tel: +79111536774" className="navbar__cta" onClick={handleLinkClick}>
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
