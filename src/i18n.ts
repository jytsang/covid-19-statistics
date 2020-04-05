import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import countriesEN from 'locales/en/countries'

console.log(countriesEN)

const resources = {
  en: {
    countries: countriesEN
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    whitelist: ['en', 'ja'],
    interpolation: {
      escapeValue: false
    }
  })
  
export default i18n
