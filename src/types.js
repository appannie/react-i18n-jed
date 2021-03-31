// @flow
export type I18nType = {
    lang: string,
    gettext: string => string,
    pgettext: (string, string) => string,
    ngettext: (string, string, number) => string,
    npgettext: (string, string, string, number) => string,
};
