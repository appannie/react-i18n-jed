// @flow strict
/* eslint-disable no-redeclare */
import * as React from 'react';
import hoistStatics from 'hoist-non-react-statics';
import type { I18nType } from '.';
import { I18nContext } from './I18nProvider';

function translate<Config: { +i18n: I18nType }, Instance: ?*>(
    WrappedComponent: React.AbstractComponent<Config>
): React.AbstractComponent<$Diff<Config, { i18n: I18nType }>, Instance> & {
    WrappedComponent: React.AbstractComponent<Config>,
} {
    const name = WrappedComponent.displayName || WrappedComponent.name || 'Component';

    class Translate extends React.Component<
        $Diff<
            Config & {
                forwardedRef: *,
            },
            { i18n: I18nType }
        >
    > {
        static WrappedComponent = WrappedComponent;

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

    const ForwardedComponent = React.forwardRef<Config, Instance>((props, ref) => (
        <Translate {...props} forwardedRef={ref} />
    ));

    ForwardedComponent.displayName = `Translate(${name})`;

    return (hoistStatics(ForwardedComponent, WrappedComponent): any);
}

export default translate;
