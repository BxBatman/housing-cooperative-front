import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";
import translationEN from './translations/translationEN';
import translationPL from './translations/translationPL';

const resources = {
    en: {
        translation: translationEN
    },
    pl : {
        translation: translationPL
    }
};

i18n
    .use(reactI18nextModule) // passes i18n down to react-i18next
    .init({
        resources,
        keySeparator: false, // we do not use keys in form messages.welcome
        fallbackLng: localStorage.getItem("lang"),
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });


export default i18n;