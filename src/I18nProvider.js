// @flow
import * as React from 'react';
import { type I18nType } from '.';
import I18nContext from './I18nContext';

const I18nProvider = ({ i18n, children }: { i18n: I18nType, children?: React.Node }) => (
    <I18nContext.Provider value={i18n}>{children}</I18nContext.Provider>
);

export { I18nContext };

export default I18nProvider;
