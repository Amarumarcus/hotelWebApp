import { useState } from 'react'
import './ContactForm.css'
import PrivacyPolicy from '../PrivacyPolicy/PrivacyPolicy'

const INITIAL_STATE = {
  name: '',
  phone: '',
  email: '',
  booking: '',
}

const INITIAL_ERRORS = {
  name: '',
  phone: '',
  email: '',
  consent: '',
}

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function validatePhone(value) {
  return /^[\+]?[\d\s\-\(\)]{7,}$/.test(value.trim())
}

export default function ContactForm() {
  const [fields, setFields]   = useState(INITIAL_STATE)
  const [consent, setConsent] = useState(false)
  const [errors, setErrors]   = useState(INITIAL_ERRORS)
  const [touched, setTouched] = useState({})
  const [status, setStatus]   = useState('idle') // 'idle' | 'loading' | 'success' | 'error'

  const [privacyPolicyOpen, setPrivacyPolicyOpen] = useState(false)
  const handlePrivacyPolicyClick = () => setPrivacyPolicyOpen(false)

  function validate(data, consentChecked) {
    const errs = { name: '', phone: '', email: '', consent: '' }
    if (!data.name.trim())   errs.name  = 'Пожалуйста, укажите ФИО'
    if (!data.phone.trim())  errs.phone = 'Пожалуйста, укажите номер телефона'
    else if (!validatePhone(data.phone)) errs.phone = 'Введите корректный номер телефона'
    if (!data.email.trim())  errs.email = 'Пожалуйста, укажите Email'
    else if (!validateEmail(data.email)) errs.email = 'Введите корректный Email адрес'
    if (!consentChecked) errs.consent = 'Необходимо ваше согласие для отправки заявки'
    return errs
  }

  function handleChange(e) {
    const { name, value } = e.target
    setFields(prev => ({ ...prev, [name]: value }))
    if (touched[name]) {
      const errs = validate({ ...fields, [name]: value }, consent)
      setErrors(prev => ({ ...prev, [name]: errs[name] }))
    }
  }

  function handleConsentChange(e) {
    const checked = e.target.checked
    setConsent(checked)
    if (touched.consent) {
      setErrors(prev => ({
        ...prev,
        consent: checked ? '' : 'Необходимо ваше согласие для отправки заявки',
      }))
    }
  }

  function handleBlur(e) {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    const errs = validate(fields, consent)
    setErrors(prev => ({ ...prev, [name]: errs[name] }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const allTouched = { name: true, phone: true, email: true, consent: true }
    setTouched(allTouched)
    const errs = validate(fields, consent)
    setErrors(errs)
    if (Object.values(errs).some(Boolean)) return

    setStatus('loading')
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fields.name,
          phone: fields.phone,
          email: fields.email,
          booking: fields.booking,
        }),
      });

      if (!response.ok) {
        throw new Error(`Ошибка сервера: ${response.status}`)
      }

      setStatus('success')
    } catch (err) {
      console.error('Ошибка отправки:', err)
      setStatus('error')
    }
  }

  function handleReset() {
    setFields(INITIAL_STATE)
    setConsent(false)
    setErrors(INITIAL_ERRORS)
    setTouched({})
    setStatus('idle')
  }

  return (
    <section id="contact" className="contact-section">
      <div className="contact-section__inner">
        <div className="contact-section__header">
          <span className="section-label">Обратная связь</span>
          <h2 className="section-title">Свяжитесь <em>с нами</em></h2>
          <div className="divider" />
          <p className="contact-section__subtitle">
            Оставьте заявку — или свяжитесь с нами по телефону&nbsp;
            <a className="contact-form__value contact-form__value--link" href="tel:+79006445001">+7 (900) 644-50-01</a>.
          </p>
        </div>

        <div className="contact-section__card">
          {status === 'success' ? (
            <div className="contact-form__success" role="status" aria-live="polite">
              <div className="contact-form__success-icon" aria-hidden="true">✓</div>
              <h3 className="contact-form__success-title">Заявка отправлена!</h3>
              <p className="contact-form__success-text">
                Спасибо! Ваше сообщение получено. Мы свяжемся с вами в ближайшее время.
              </p>
              <button className="contact-form__submit contact-form__submit--success" onClick={handleReset}>
                Отправить ещё одну заявку
              </button>
            </div>
          ) : (
            <form
              className="contact-form"
              onSubmit={handleSubmit}
              noValidate
              aria-label="Форма обратной связи"
            >
              {/* Required fields */}
              <fieldset className="contact-form__group">
                <legend className="contact-form__legend">
                  Контактные данные <span className="contact-form__required-note">* обязательные поля</span>
                </legend>

                <div className="contact-form__field">
                  <label className="contact-form__label" htmlFor="cf-name">
                    ФИО <span className="contact-form__asterisk" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="cf-name"
                    className={`contact-form__input ${errors.name && touched.name ? 'contact-form__input--error' : ''}`}
                    type="text"
                    name="name"
                    value={fields.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Иванов Иван Иванович"
                    autoComplete="name"
                    aria-required="true"
                    aria-describedby={errors.name && touched.name ? 'error-name' : undefined}
                  />
                  {errors.name && touched.name && (
                    <span id="error-name" className="contact-form__error" role="alert">{errors.name}</span>
                  )}
                </div>

                <div className="contact-form__field">
                  <label className="contact-form__label" htmlFor="cf-phone">
                    Номер телефона <span className="contact-form__asterisk" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="cf-phone"
                    className={`contact-form__input ${errors.phone && touched.phone ? 'contact-form__input--error' : ''}`}
                    type="tel"
                    name="phone"
                    value={fields.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="+7 (900) 000-00-00"
                    autoComplete="tel"
                    aria-required="true"
                    aria-describedby={errors.phone && touched.phone ? 'error-phone' : undefined}
                  />
                  {errors.phone && touched.phone && (
                    <span id="error-phone" className="contact-form__error" role="alert">{errors.phone}</span>
                  )}
                </div>

                <div className="contact-form__field">
                  <label className="contact-form__label" htmlFor="cf-email">
                    Email <span className="contact-form__asterisk" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="cf-email"
                    className={`contact-form__input ${errors.email && touched.email ? 'contact-form__input--error' : ''}`}
                    type="email"
                    name="email"
                    value={fields.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="example@mail.ru"
                    autoComplete="email"
                    aria-required="true"
                    aria-describedby={errors.email && touched.email ? 'error-email' : undefined}
                  />
                  {errors.email && touched.email && (
                    <span id="error-email" className="contact-form__error" role="alert">{errors.email}</span>
                  )}
                </div>
              </fieldset>

              {/* Optional fields */}
              <fieldset className="contact-form__group">
                <legend className="contact-form__legend">Информация по бронированию</legend>

                <div className="contact-form__field">
                  <label className="contact-form__label" htmlFor="cf-booking">
                    Ваши пожелания
                    <span className="contact-form__optional"> (необязательно)</span>
                  </label>
                  <textarea
                    id="cf-booking"
                    className="contact-form__input contact-form__textarea"
                    name="booking"
                    value={fields.booking}
                    onChange={handleChange}
                    placeholder="Укажите желаемые даты заезда/выезда, количество гостей или любые другие пожелания и вопросы..."
                    rows={4}
                    aria-required="false"
                  />
                </div>
              </fieldset>

              {/* Consent checkbox */}
              <div className="contact-form__consent-wrap">
                <label className="contact-form__consent-label">
                  <input
                    id="cf-consent"
                    className="contact-form__consent-input"
                    type="checkbox"
                    name="consent"
                    checked={consent}
                    onChange={handleConsentChange}
                    onBlur={() => {
                      setTouched(prev => ({ ...prev, consent: true }))
                      if (!consent) setErrors(prev => ({ ...prev, consent: 'Необходимо ваше согласие для отправки заявки' }))
                    }}
                    aria-required="true"
                    aria-describedby={errors.consent && touched.consent ? 'error-consent' : undefined}
                  />
                  <span className="contact-form__consent-box" aria-hidden="true" />
                  <span className="contact-form__consent-text">
                    Я согласен(а) на{' '}
                    <span className="contact-form__consent-link" onClick={() => setPrivacyPolicyOpen(v => !v)}>обработку персональных данных и трансграничную передачу данных</span>
                    <span className="contact-form__asterisk" aria-hidden="true"> *</span>
                  </span>
                </label>
                {errors.consent && touched.consent && (
                  <span id="error-consent" className="contact-form__error" role="alert">{errors.consent}</span>
                )}
                <PrivacyPolicy privacyPolicyOpen={privacyPolicyOpen} handlePrivacyPolicyClick={handlePrivacyPolicyClick} />
              </div>

              {/* Send error */}
              {status === 'error' && (
                <p className="contact-form__send-error" role="alert">
                  Не удалось отправить заявку. Пожалуйста, попробуйте ещё раз или свяжитесь с нами по телефону.
                </p>
              )}

              <button
                type="submit"
                className="contact-form__submit"
                disabled={status === 'loading'}
                aria-busy={status === 'loading'}
              >
                {status === 'loading' && (
                  <span className="contact-form__spinner" aria-hidden="true" />
                )}
                {status === 'loading' ? 'Отправка...' : 'Отправить заявку'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
