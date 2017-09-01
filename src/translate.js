// @flow
import React from 'react';
import PropTypes from 'prop-types';
import hoistStatics from 'hoist-non-react-statics';

export default function translate(WrappedComponent: Object) {
    const Translate = (props, context) => (
        <WrappedComponent i18n={context.i18n} {...props} />
    );
    Translate.contextTypes = {
        i18n: PropTypes.object,
    };
    Translate.WrappedComponent = WrappedComponent;
    Translate.displayName = `Translate(${WrappedComponent.displayName ||
        WrappedComponent.name})`;

    return hoistStatics(Translate, WrappedComponent);
}
