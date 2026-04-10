import { useState } from 'react'
import Oferta from '../Oferta/Oferta'
import './Footer.css'

const CONTACTS = [
  { icon: '📞', label: 'Телефон', value: '+7 (900) 644-50-01', href: 'tel:+79006445001' },
  { icon: '📧', label: 'Email', value: 'info@reliz-hotel.ru', href: 'mailto:info@reliz-hotel.ru' },
  { icon: '📍', label: 'Адрес', value: 'Абхазия, г. Пицунда', href: '#map' },
  { icon: '⏰', label: 'Заезд / Выезд', value: 'с 14:00 / до 12:00', href: null },
]

const SOCIAL = [
  { label: 'ВКонтакте', href: 'https://vk.ru/reliz.abkhazia' },
  { label: 'Telegram', href: 'https://t.me/reliz_abkhazia' },
  { label: 'Instagram', href: 'https://www.instagram.com/reliz.abkhazia?igsh=MXh1MHdrZjUyb3pxcg==' },
  { label: 'WhatsApp', href: 'https://wa.me/+79006445001' },
]
  
export default function Footer() {
  const [ofertaOpen, setOfertaOpen] = useState(false)
  const handleOfertaClick = () => setOfertaOpen(false)

  return (
    <footer id="footer" className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <div className="footer__logo">
            <span className="footer__logo-main">Релиз</span>
            <span className="footer__logo-sub">Гостиница · Абхазия</span>
          </div>
          <p className="footer__tagline">
            Уютная гостиница у Чёрного моря.
          </p>
          <div className="footer__social">
            {SOCIAL.map(({ label, href }) => (
              <a key={label} href={href} className="footer__social-link" target="_blank" rel="noopener noreferrer">
                {label}
              </a>
            ))}
          </div>
          <div>
            <p className="footer__oferta-text">
              Минимальный срок проживания 3 ночи.
            </p>
            <div className="footer__oferta-privacy-buttons">
              <button className="footer__oferta-button" onClick={() => setOfertaOpen(v => !v)} aria-label="Открыть публичную оферту">
                Публичная оферта
              </button>
              <a href="https://reliz-hotel.ru/Политика_конфиденциальности.pdf" className="footer__privacy-policy-link">Политика конфиденциальности</a>
            </div>
          </div>
        </div>

        <div className="footer__contacts">
          <h3 className="footer__col-title">Контакты</h3>
          <ul className="footer__contact-list">
            {CONTACTS.map(({ icon, label, value, href }) => (
              <li key={label} className="footer__contact-item">
                <span className="footer__contact-icon">{icon}</span>
                <div>
                  <span className="footer__contact-label">{label}</span>
                  {href ? (
                    <a href={href} className="footer__contact-value footer__contact-value--link">{value}</a>
                  ) : (
                    <span className="footer__contact-value">{value}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__booking">
          <h3 className="footer__col-title">Бронирование</h3>
          <p className="footer__booking-text">
            Свяжитесь с нами по телефону или напишите в мессенджер — мы ответим в течение нескольких минут.
          </p>
          <a href="#contact" className="footer__cta">
            Забронировать номер
          </a>
        </div>

      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} Релиз. Все права защищены.</p>
        <p>Абхазия, г. Пицунда</p>
      </div>
      <Oferta ofertaOpen={ofertaOpen} handleOfertaClick={handleOfertaClick} />
    </footer>
  )
}
