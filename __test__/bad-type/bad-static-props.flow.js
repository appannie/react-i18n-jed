// @flow strict
/* eslint-disable */
import * as React from 'react';
import { translate, type I18nType } from '../../src';
import mockI18n from '../../src/mockI18n';

//Case 1: class component with static
class ComponentC extends React.Component<{
    i18n: I18nType,
    content: string,
    children: React.Node,
}> {
    static method(str: string) {
        console.log('hey', str);
    }

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

const TComponentC = translate(ComponentC);
const result = <TComponentC content="foo">bar</TComponentC>;

ComponentC.method('foo');

// Should throw Error
TComponentC.WrappedComponent.notExistMethod('foo');