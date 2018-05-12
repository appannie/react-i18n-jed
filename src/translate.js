// @flow
import * as React from 'react';
import hoistStatics from 'hoist-non-react-statics';
import type { I18nType } from '.';
import { I18nContext } from './I18nProvider';

type WrappedComponentClass<P> = Class<
    React$Component<$Supertype<{ i18n: I18nType } & P>>
>;
type TranslatedComponentClass<P> = Class<React$Component<P>>;

function translate<Props>(
    WrappedComponent: WrappedComponentClass<Props>
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

    return hoistStatics(Translate, WrappedComponent);
}

export default translate;
