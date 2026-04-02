import './Map.css'

const MAP_URL =
  'https://yandex.ru/map-widget/v1/?um=constructor%3A5c5b181aa775502b20833429ebd17d6d460d2bc9cc6bff51f0978103291d0c49&source=constructor'

export default function Map() {

  return (
    <section id="map" className="map-section">
      <div className="map-section__inner">

        <div className="map-section__header">
          <span className="section-label">Как нас найти</span>
          <h4 className="section-title">
            Мы на <em>карте</em>
          </h4>
          <div className="divider" />
          <p className="map-section__address">
            Абхазия, г. Пицунда
          </p>
        </div>

        <div className="map-section__map">
          <iframe
            src={MAP_URL}
            title="Расположение гостиницы Релиз"
            allowFullScreen
            loading="lazy"
            width="100%"
            height="400"
          />
        </div>

      </div>
    </section>
  )
}
