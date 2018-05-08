// @flow
import * as React from 'react';
import { type I18nType } from '.';

const I18nContext = React.createContext();

/* eslint-disable react/prefer-stateless-function */
class I18nProvider extends React.Component<{
    i18n: I18nType,
    children?: React.Node,
}> {
    render() {
        return (
            <I18nContext.Provider value={this.props.i18n}>
                {this.props.children}
            </I18nContext.Provider>
        );
    }
}

export { I18nContext };

export default I18nProvider;
/* eslint-enable react/prefer-stateless-function */
