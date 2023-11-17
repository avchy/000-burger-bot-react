import en from "translations/en.json"
import ru from "translations/ru.json"
import he from "translations/he.json"
import fr from "translations/fr.json"

import { initReactI18next } from "react-i18next"
import i18n from "i18next"
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  },
  he: {
    translation: he,
  },
  fr: {
    translation: fr,
  },
}

// eslint-disable-next-line
i18n
.use(Backend)
.use(LanguageDetector)
.use(initReactI18next).init({
  resources,
  debug: true,
  interpolation: {
    escapeValue: false,
  },
  lng: JSON.parse(localStorage.getItem("language")),
  fallbackLng: "en",
})

export default i18n
