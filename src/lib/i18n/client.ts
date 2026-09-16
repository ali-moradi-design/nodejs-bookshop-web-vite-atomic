import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '@/lib/i18n/locales/en.json';
import fa from '@/lib/i18n/locales/fa.json';

const resources = {
  en: { translation: en },
  fa: { translation: fa },
};

if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });
}

export default i18n;
