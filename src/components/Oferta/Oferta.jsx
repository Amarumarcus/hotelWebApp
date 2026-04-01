import './Oferta.css'

export default function Oferta({ofertaOpen, handleOfertaClick}) {
    return (
        <div className={`oferta ${ofertaOpen ? 'oferta--open' : ''}`}>
          <div className="footer__oferta">
            <div className="footer__oferta-content">
              <button className="footer__oferta-close" onClick={handleOfertaClick} aria-label="Закрыть публичную оферту">
                ×
              </button>
              <h3 className="footer__oferta-title">Публичная оферта</h3>
              <p className="footer__oferta-text">
                Минимальный срок проживания — от 3 ночей.<br />
                Для подтверждения бронирования требуется предоплата за первые сутки проживания.<br />
                При отмене бронирования не позднее чем за 24 часа до даты заезда предоплата возвращается в полном объёме.<br />
              </p>
              <a href="https://reliz-hotel.netlify.app/Гостиница Релиз_прайc_2026.png" className="footer__oferta-link">Скачать прайс</a>
            </div>
          </div>
      </div>
    )
}