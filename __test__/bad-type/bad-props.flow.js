// @flow strict
/* eslint-disable */
import * as React from 'react';
import { translate, type I18nType } from '../../src';
import mockI18n from '../../src/mockI18n';

// Case 1: throw error for missing props
class ComponentB extends React.PureComponent<{
    i18n: I18nType,
    content: string,
    children: React.Node,
}> {
    componentDidMount() {
        console.log('hey');
    }

    render() {
        const { i18n, content, children } = this.props;

        return (
            <div>
                {i18n.gettext('hey')}
                {content}
                {children}
            </div>
        );
    }
}

const TComponentB = translate(ComponentB);
// Should throw error for missing required prop content
const result = <TComponentB >bar</TComponentB>;
