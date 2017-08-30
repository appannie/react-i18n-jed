// @flow
import React from 'react';
import { shallow, mount } from 'enzyme';
import PropTypes from 'prop-types';
import { getI18n, translate, I18nProvider } from '../src';
import mockI18n from '../src/mockI18n';

const localeJSON = {
    domain: 'messages',
    language: 'en-US',
    locale_data: {
        messages: {
            '': {
                domain: 'messages',
            },
            'Ad Expense': ['Test Ad Expense'],
            'App or Publisher': ['App or Publisher'],
            Cat: ['Cat', 'Cats'],
        },
    },
};

class TestElement extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.i18n = context.i18n;
    }

    i18n: Object;

    render() {
        return <div>Test</div>;
    }
}

TestElement.contextTypes = {
    i18n: PropTypes.object,
};

describe('get i18n by Jed', () => {
    it('gettext by i18n', () => {
        const i18n = getI18n(localeJSON);
        expect(i18n.gettext('Ad Expense')).toBe('Test Ad Expense');
    });
});

describe('<I18nProvider>', () => {
    it('children get i18n from context', () => {
        let testElement: any = null;
        const eleWithProvider = mount(
            <I18nProvider i18n={mockI18n}>
                <TestElement ref={component => (testElement = component)} />
            </I18nProvider>
        );
        expect(testElement.context.i18n).toEqual(mockI18n);
        expect(eleWithProvider).toMatchSnapshot();
    });
});

describe('translate Component', () => {
    it('render translated component', () => {
        const LocalizedEle = translate(TestElement);
        const localizedEle = shallow(<LocalizedEle i18n={mockI18n} />);
        const instEle = localizedEle.instance();
        expect(instEle.props.i18n).toEqual(mockI18n);
        expect(localizedEle).toMatchSnapshot();
    });
});

describe('mock i18n', () => {
    it('gettext get text', () => {
        expect(mockI18n.gettext('txt')).toEqual('txt');
        expect(mockI18n.ngettext('a', 'b', 2)).toEqual('b');
        expect(mockI18n.npgettext('a', 'b', 'c', 2)).toEqual('b');
    });
});
