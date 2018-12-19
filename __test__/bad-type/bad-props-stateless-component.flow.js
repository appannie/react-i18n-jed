// @flow strict
/* eslint-disable */
import * as React from 'react';
import { translate, type I18nType } from '../../src';
import mockI18n from '../../src/mockI18n';


// Case 1: React stateless component
const StatelessCom = ({ name, i18n }: { name: string, i18n: I18nType }) => (
    <div>{i18n.gettext('S')}</div>
);
const TStatelessCom = translate(StatelessCom);
// Should throw error for missing required prop content
const result = <TStatelessCom />;
