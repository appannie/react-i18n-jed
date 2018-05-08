// @flow
import Jed, { sprintf } from 'jed';
import I18nProvider, { I18nContext } from './I18nProvider';
import translate from './translate';

export type I18nType = {
    lang: string,
    gettext: string => string,
    pgettext: (string, string) => string,
    ngettext: (string, string, number) => string,
    npgettext: (string, string, string, number) => string,
};

export { I18nProvider, I18nContext, translate, sprintf, Jed };
