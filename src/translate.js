// @flow strict
/* eslint-disable no-redeclare */
import * as React from 'react';
import hoistStatics from 'hoist-non-react-statics';
import type { I18nType } from '.';
import { I18nContext } from './I18nProvider';

function translate<Config: { +i18n: I18nType }>(
    WrappedComponent: React.AbstractComponent<Config>
): React.AbstractComponent<$Diff<Config, { i18n: I18nType }>> & {
    WrappedComponent: React.AbstractComponent<Config>,
} {
    const name = WrappedComponent.displayName || WrappedComponent.name || 'Component';

    class Translate extends React.Component<$Diff<Config, { i18n: I18nType }>> {
        static WrappedComponent = WrappedComponent;

        static displayName = `Translate(${name})`;

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
