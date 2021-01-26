import { ReactNode, ComponentType, ComponentClass } from 'react';

declare namespace reactI18nJed {
    export const I18nProvider: ComponentType<{ i18n: I18n; children?: ReactNode }>;
    interface Translate {
        <P extends { i18n: I18n }>(x: ComponentType<P>): ComponentClass<Omit<P, 'i18n'>>;
    }

    export const translate: Translate;

    export const useI18n: () => I18n;

    export const sprintf: (arg0: string, ...rest: (string | number)[]) => string;

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
