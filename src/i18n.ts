import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import commonEN from 'locales/en/common'
import countriesEN from 'locales/en/countries'

const resources = {
  en: {
    common: commonEN,
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
