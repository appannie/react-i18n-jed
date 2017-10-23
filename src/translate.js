// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import hoistStatics from 'hoist-non-react-statics';
import type { I18nType } from '.';

declare class TranslatedComponent<OP> extends React$Component<OP> {
    static WrappedComponent: Class<React$Component<*>>,
    props: OP,
    state: void,
}

declare type TranslatedComponentClass<OP> = Class<TranslatedComponent<OP>>;

function translate<Props: {}>(
    WrappedComponent: React.ComponentType<$Supertype<{ i18n: I18nType } & Props>>
): TranslatedComponentClass<Props> {
    class Translate extends React.Component<{}> {
        static contextTypes = { i18n: PropTypes.object };
        static WrappedComponent = WrappedComponent;
        static displayName = `Translate(${WrappedComponent.displayName ||
            WrappedComponent.name})`;

        render() {
            return <WrappedComponent i18n={this.context.i18n} {...this.props} />;
        }
    }

    const Output: TranslatedComponentClass<Props> = hoistStatics(
        Translate,
        WrappedComponent
    );
    return Output;
}

export default translate;
