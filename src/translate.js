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

function translate<Com: React$ComponentType<*>>(
    WrappedComponent: Com
): TranslatedComponentClass<$Diff<React.ElementConfig<Com>, InjectedProps>> {
    const name = WrappedComponent.displayName || WrappedComponent.name || 'Component';

    class Translate extends React.Component<
        $Diff<React.ElementConfig<Com>, InjectedProps>
    > {
        static WrappedComponent = WrappedComponent;

        static displayName = `Translate(${name})`;

        render() {
            const { forwardedRef, ...restProps } = this.props;
            return (
                <I18nContext.Consumer>
                    {i18n => (
                        <WrappedComponent ref={forwardedRef} i18n={i18n} {...restProps} />
                    )}
                </I18nContext.Consumer>
            );
        }
    }

    const ForwardedComponent = React.forwardRef((props, ref) => (
        <Translate {...props} forwardedRef={ref} />
    ));

    return (hoistStatics(ForwardedComponent, WrappedComponent): any);
}

export default translate;
