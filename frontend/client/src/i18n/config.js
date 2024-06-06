import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-http-backend";

export const supportedLngs = {
  es: "Español",
  en: "English",
};

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: "es",
    fallbackLng: "en",
    supportedLngs: Object.keys(supportedLngs),
    debug: true,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
