// @flow
import * as React from 'react';
import hoistStatics from 'hoist-non-react-statics';
import type { I18nType } from '.';
import { I18nContext } from './I18nProvider';

declare class TranslatedComponent<OP, ST> extends React$Component<OP> {
    static WrappedComponent: Class<React$Component<OP>> & $Shape<ST>;
    static displayName: ?string;
    props: OP;
    state: void;
}

declare type TranslatedComponentClass<OP, ST> = Class<TranslatedComponent<OP, ST>>;

function translate<
    Props,
    Com: React.ComponentType<$Supertype<{ i18n: I18nType } & Props>>,
    ST: $Subtype<{ [_: $Keys<Com>]: any }>
>(WrappedComponent: Com): TranslatedComponentClass<Props, ST> & ST {
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
