// @flow
import * as React from 'react';
import { type I18nType } from '.';
import mockI18n from './mockI18n';

const I18nContext: React.Context<I18nType> = React.createContext(mockI18n);

export function useI18n(): I18nType {
    return React.useContext(I18nContext);
}

export default I18nContext;
