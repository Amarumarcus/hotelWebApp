import './Map.css'

const MAP_URL =
  'https://yandex.ru/map-widget/v1/' +
  '?ll=40.294670%2C43.180152' +
  '&z=15' +
  '&pt=40.294670%2C43.180152%2Cpm2rdm' +
  '&l=map' +
  '&lang=ru_RU'

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
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

      </div>
    </section>
  )
}
