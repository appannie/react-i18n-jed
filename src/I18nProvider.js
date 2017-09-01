// @flow
import React from 'react';
import PropTypes from 'prop-types';

import { type I18nType } from '.';

class I18nProvider extends React.Component {
    props: {
        i18n: I18nType,
        children?: any,
    };

    getChildContext() {
        const { i18n } = this.props;
        return { i18n };
    }

    render() {
        const { children } = this.props;
        return React.Children.only(children);
    }
}

I18nProvider.childContextTypes = {
    i18n: PropTypes.object,
};

export default I18nProvider;
