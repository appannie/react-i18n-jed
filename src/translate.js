// @flow strict
/* eslint-disable no-redeclare */
import * as React from 'react';
import type { I18nType } from '.';
import { I18nContext } from './I18nProvider';

declare class TranslatedComponent<OP> extends React$Component<OP> {
    static WrappedComponent: Class<React$Component<OP>>;
    static displayName: ?string;
    props: OP;
    state: void;
}

declare type TranslatedComponentClass<OP> = Class<TranslatedComponent<OP>>;

function translate<Props>(
    WrappedComponent: React.ComponentType<$Supertype<{ i18n: I18nType } & Props>>
): TranslatedComponentClass<Props> {
    class Translate extends React.Component<Props> {
        static WrappedComponent = WrappedComponent;

        static displayName = `Translate(${WrappedComponent.displayName ||
            WrappedComponent.name})`;

        render() {
            return (
                <I18nContext.Consumer>
                    {i18n => <WrappedComponent i18n={i18n} {...this.props} />}
                </I18nContext.Consumer>
            );
        }
    }

    return (Translate: any);
}

export default translate;
