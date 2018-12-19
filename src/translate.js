// @flow strict
/* eslint-disable no-redeclare */
import * as React from 'react';
import hoistStatics from 'hoist-non-react-statics';
import type { I18nType } from '.';
import { I18nContext } from './I18nProvider';

type InjectedProps = { i18n: I18nType };

declare class TranslatedComponent<OP> extends React$Component<OP> {
    static WrappedComponent: Class<React$Component<OP>>;
    static displayName: ?string;
    props: OP;
    state: void;
}

declare type TranslatedComponentClass<OP> = Class<TranslatedComponent<OP>>;

function translate<
    Com: React$ComponentType<*>,
    Props: $Diff<React.ElementConfig<Com>, InjectedProps>
>(WrappedComponent: Com): TranslatedComponentClass<Props> {
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

    return (hoistStatics(Translate, WrappedComponent): any);
}

export default translate;
