import { ReactNode, ComponentType } from 'react';

declare namespace reactI18nJed {
    export const I18nProvider: ComponentType<{ i18n: I18n; children?: ReactNode }>;

    export const translate: ComponentType<T>;

    export const useI18n: () => I18n;

    export const sprintf: (...rest: string) => string;

    export interface I18n {
        lang: string;
        gettext: (keyTxt: string) => string;
        pgettext: (ctx: string, keyTxt: string) => string;
        ngettext: (keyTxt: string, pluralTxt: string, count: number) => string;
        npgettext: (
            ctx: string,
            keyTxt: string,
            pluralTxt: string,
            count: number
        ) => string;
    }
}

export = reactI18nJed;
