// @flow
import React from 'react';
import hoistStatics from 'hoist-non-react-statics';

import { getLocale, getI18n } from './util';
import { type I18nType, type Lang } from '.';
import I18nProvider from './I18nProvider';

const onlySingularLocaleList = ['zh-CN', 'ko-KR', 'ja-JP'];

const noop = () => {};

/* eslint gettext/no-variable-string: 0 */
export function wrapI18n(lang: Lang, i18n: I18nType): I18nType {
    const i18nAPI = {
        lang,
        gettext(text: string) {
            if (text) {
                return i18n.gettext(text);
            }
            return '';
        },
        // contextual marker
        pgettext: i18n.pgettext.bind(i18n),
        // pluralized contextually marker
        ngettext: (keyTxt: string, pluralTxt: string, count: number) => {
            // for the locale which doen't support the plural
            if (onlySingularLocaleList.includes(lang)) {
                return i18nAPI.gettext(keyTxt);
            }

            return i18n.ngettext(keyTxt, pluralTxt, count);
        },
        npgettext: (ctx: string, keyTxt: string, pluralTxt: string, count: number) => {
            // for the locale which doen't support the plural
            if (onlySingularLocaleList.includes(lang)) {
                return i18nAPI.pgettext(ctx, keyTxt);
            }

            return i18n.npgettext(ctx, keyTxt, pluralTxt, count);
        },
    };

    return i18nAPI;
}

export function localizePage(WrappedComponent: any) {
    class TranslatePage extends React.Component {
        static async getInitialProps(ctx: { req: Object }) {
            const { req } = ctx;
            const getInitialProps = WrappedComponent.getInitialProps || noop;
            const [locale: Object, wrappedComponentProps: Object] = await Promise.all([
                getLocale(req),
                getInitialProps(ctx),
            ]);

            return {
                locale,
                ...wrappedComponentProps,
            };
        }

        constructor(props, context) {
            super(props, context);

            const lang = props.locale.language;
            const i18n = getI18n(props.locale);

            this.i18n = wrapI18n(lang, i18n);
        }

        props: {
            locale: Object,
        };

        i18n: I18nType;

        render() {
            return (
                <I18nProvider i18n={this.i18n}>
                    <WrappedComponent i18n={this.i18n} {...this.props} />
                </I18nProvider>
            );
        }
    }

    TranslatePage.displayName = `TranslatePage(${WrappedComponent.displayName})`;

    return hoistStatics(TranslatePage, WrappedComponent, {
        // `getInitialProps` not in hoist static list, so we add it here to prevent override
        getInitialProps: true,
    });
}
