// @flow
import * as React from 'react';
import hoistStatics from 'hoist-non-react-statics';
import type { I18nType } from '.';
import { I18nContext } from './I18nProvider';

declare class TranslatedComponent<OP, Com> extends React$Component<OP> {
    static WrappedComponent: Com;
    static displayName: ?string;
    props: OP;
    state: void;
}

declare type TranslatedComponentClass<OP, Com> = Class<TranslatedComponent<OP, Com>>;

type InjectedProps = { i18n: I18nType };

function translate<
    Com: React.ComponentType<*>,
    Props: $Diff<React.ElementConfig<Com>, InjectedProps>
>(WrappedComponent: Com): TranslatedComponentClass<Props, Com> {
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

    const Output: any = hoistStatics(Translate, WrappedComponent);
    return Output;
}

export default translate;
