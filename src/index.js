// @flow
import Jed, { sprintf } from 'jed';
import I18nProvider from './I18nProvider';
import translate from './translate';
import mockI18n from './mockI18n';

export type I18nType = {
    lang: string,
    gettext: string => string,
    pgettext: (string, string) => string,
    ngettext: (string, string, number) => string,
    npgettext: (string, string, string, number) => string,
};

export { I18nProvider, translate, mockI18n, sprintf, Jed };
