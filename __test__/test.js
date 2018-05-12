// @flow
import React from 'react';
import { mount } from 'enzyme';
import { Jed, translate, I18nProvider } from '../src';
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

class TestElement extends React.Component<{
    testProp: string,
}> {
    constructor(props) {
        super(props);
        this.i18n = props.i18n;
    }

    i18n: Object;

    render() {
        return <div>Test</div>;
    }
}

describe('get i18n by Jed', () => {
    it('gettext by Jed', () => {
        const i18n = new Jed(localeJSON);
        expect(i18n.gettext('Ad Expense')).toBe('Test Ad Expense');
    });
});

describe('<I18nProvider>', () => {
    it('children get i18n from I18nProvider', () => {
        const LocalizedTest = translate(TestElement);
        const eleWithProvider = mount(
            <I18nProvider i18n={mockI18n}>
                <LocalizedTest testProp="required" />
            </I18nProvider>
        );
        expect(eleWithProvider).toMatchSnapshot();

        const i18nFromProvider = eleWithProvider.find('TestElement').prop('i18n');
        expect(i18nFromProvider).toEqual(mockI18n);
    });
});

describe('translate Component', () => {
    it('render translated component', () => {
        const LocalizedEle = translate(TestElement);
        const localizedEle = mount(<LocalizedEle i18n={mockI18n} testProp="required" />);
        const instEle = localizedEle.instance();
        expect(instEle.props.i18n).toEqual(mockI18n);
        expect(localizedEle).toMatchSnapshot();
    });
});

describe('mock i18n', () => {
    it('gettext get translated message', () => {
        expect(mockI18n.gettext('txt')).toEqual('txt');
    });

    it('ngettext get translated message', () => {
        expect(mockI18n.ngettext('a', 'b', 1)).toEqual('a');
        expect(mockI18n.ngettext('a', 'b', 2)).toEqual('b');
    });

    it('pgettext get translated message', () => {
        expect(mockI18n.pgettext('ctx', 'a')).toEqual('a');
    });

    it('pgettext get translated message', () => {
        expect(mockI18n.npgettext('a', 'b', 'c', 1)).toEqual('b');
        expect(mockI18n.npgettext('a', 'b', 'c', 2)).toEqual('c');
    });
});
