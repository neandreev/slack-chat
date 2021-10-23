import i18n from 'i18next';
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ru from './locales/ru.js';
import en from './locales/en.js';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ru',
    lng: 'ru',
    debug: true,
    resources: { ru, en },
  });

export default i18n;
