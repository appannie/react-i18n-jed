// @flow
import Jed, { sprintf } from 'jed';
import I18nProvider from './I18nProvider';
import translate from './translate';

function getI18n(localeJSON: Object) {
    const i18n = new Jed(localeJSON);
    return i18n;
}

export type I18nType = {
    lang: string,
    gettext: string => string,
    pgettext: (string, string) => string,
    ngettext: (string, string, number) => string,
    npgettext: (string, string, string, number) => string,
};

export { getI18n, I18nProvider, translate, sprintf };
