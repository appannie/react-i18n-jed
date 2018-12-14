// @flow strict
/* eslint-disable no-redeclare */
import * as React from 'react';
import type { I18nType } from '.';
import { I18nContext } from './I18nProvider';

type InjectedProps = { i18n: I18nType };

function translate<
    Com: React.ComponentType<*>,
    Props: $Diff<React.ElementConfig<Com>, InjectedProps>
>(
    WrappedComponent: Com
): React.ComponentType<Props> & {
    WrappedComponent: Com,
    // To match default react displayName prop type
    displayName?: ?string,
} {
    class Translate extends React.Component<Props> {
        static WrappedComponent: Com = WrappedComponent;

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

    return Translate;
}

export default translate;
