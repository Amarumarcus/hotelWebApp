import './Footer.css'

const CONTACTS = [
  { icon: '📞', label: 'Телефон', value: '+7 (999) 999-99-99', href: 'tel:+79999999999' },
  { icon: '📧', label: 'Email', value: 'info@sukhumhouse.ru', href: 'mailto:info@sukhumhouse.ru' },
  { icon: '📍', label: 'Адрес', value: 'Абхазия, г. Пицунда', href: '#map' },
  { icon: '⏰', label: 'Заезд / Выезд', value: 'с 14:00 / до 12:00', href: null },
]

const SOCIAL = [
  { label: 'ВКонтакте', href: 'https://vk.com' },
  { label: 'Telegram', href: 'https://t.me' },
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'WhatsApp', href: 'https://wa.me/79999999999' },
]

export default function Footer() {
  return (
    <footer id="footer" className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <div className="footer__logo">
            <span className="footer__logo-main">Релиз</span>
            <span className="footer__logo-sub">Мини-отель · Абхазия</span>
          </div>
          <p className="footer__tagline">
            Уютный гостевой дом у самого Чёрного моря.<br />
            Отдыхайте, как дома.
          </p>
          <div className="footer__social">
            {SOCIAL.map(({ label, href }) => (
              <a key={label} href={href} className="footer__social-link" target="_blank" rel="noopener noreferrer">
                {label}
              </a>
            ))}
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
          <a href="tel:+79999999999" className="footer__cta">
            Забронировать номер
          </a>
          <p className="footer__booking-note">
            Бесплатная отмена до 24 часов
          </p>
        </div>

      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} Релиз. Все права защищены.</p>
        <p>Абхазия, г. Пицунда</p>
      </div>
    </footer>
  )
}
