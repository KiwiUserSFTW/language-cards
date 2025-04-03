import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const languageDetector = new LanguageDetector();

// let pass only first 2 latters
languageDetector.addDetector({
  name: 'customDetector',
  lookup(options) {
    let found;
    if (typeof window !== 'undefined') {
      let query = new URLSearchParams(window.location.search);
      found = query.get(options.lookupQuerystring);

      if (found) return found.split('-')[0];

      found = window.localStorage.getItem(options.lookupLocalStorage);
      if (found) return found.split('-')[0];

      found = document.cookie.match(
        '(^|;)\\s*' + options.lookupCookie + '\\s*=\\s*([^;]+)'
      );
      if (found) return found.pop().split('-')[0];
    }
    return found || options.fallbackLng;
  },
});

i18n
  .use(languageDetector)
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    detection: {
      order: [
        'customDetector',
        'querystring',
        'cookie',
        'localStorage',
        'navigator',
        'htmlTag',
        'path',
        'subdomain',
      ],
      caches: ['cookie'],
    },
  });

export default i18n;
