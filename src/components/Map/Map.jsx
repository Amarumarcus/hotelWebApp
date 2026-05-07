import './Map.css'


const MAP_IFRAME_URL = 
  'https://yandex.ru/map-widget/v1/?ll=40.294067%2C43.180055&z=16&pt=40.294067%2C43.180055,pm2rdm~40.294067,43.180055,text:Reliz%20Hotel'

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
            src={MAP_IFRAME_URL}
            title="Расположение гостиницы Релиз"
            width="100%"
            height="400"
            allowFullScreen
            loading="lazy"
          />
        </div>

      </div>
    </section>
  )
}