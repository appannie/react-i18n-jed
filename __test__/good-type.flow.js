// @flow strict
/* eslint-disable */
import * as React from 'react';
import { translate, type I18nType } from '../src';
import mockI18n from '../src/mockI18n';

let result;

// Case 1: functional component
const ComponentA = ({
    i18n,
    content,
    children,
}: {
    i18n: I18nType,
    content: string,
    children: React.Node,
}) => (
    <div>
        {i18n.gettext('hey')}
        {content}
        {children}
    </div>
);

const TComponentA = translate(ComponentA);
result = <TComponentA content="foo">bar</TComponentA>;
result = (
    <TComponentA.WrappedComponent content="foo" i18n={mockI18n}>
        bar
    </TComponentA.WrappedComponent>
);

// Case 2: simple class component
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
result = <TComponentB content="foo">bar</TComponentB>;

// Case 3: class component with static
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
result = <TComponentC content="foo">bar</TComponentC>;

ComponentC.method('foo');
// FIXME: Should not throw error
// TComponentC.WrappedComponent.method('foo');
// `name` is build-in string prop
const TComponentName = TComponentC.name;
const TComponentDisplayName = TComponentC.displayName;

// Case 4: class component with defaultProps
class ComponentD extends React.Component<{
    i18n: I18nType,
    content: string,
    children: React.Node,
}> {
    static defaultProps = {
        content: 'foo',
    };

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

// Case 4: React stateless component
const StatelessCom = ({name, i18n}: {name: string, i18n: I18nType}) => <div>{i18n.gettext('S')}</div>
const TStatelessCom = translate(StatelessCom);

result = <TStatelessCom name="Kate" />;
