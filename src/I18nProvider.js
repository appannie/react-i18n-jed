// @flow
import * as React from 'react';
import { type I18nType } from '.';
import I18nContext from './I18nContext';

const I18nProvider = (props: { i18n: I18nType, children?: React.Node }) => (
    <I18nContext.Provider value={props.i18n}>{props.children}</I18nContext.Provider>
);

export { I18nContext };

export default I18nProvider;
