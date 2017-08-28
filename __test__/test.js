// @flow
import React from 'react';
import { shallow, mount } from 'enzyme';
import PropTypes from 'prop-types';
import fetchPonyfill from 'fetch-ponyfill';
import Cookies from 'universal-cookie';
import { translate, localizePage, I18nProvider, type I18nType } from '../src';
import { wrapI18n } from '../src/localizePage';
import mockI18n from '../src/mockI18n';
import { getI18n, getLocale } from '../src/util';

const { fetch } = fetchPonyfill();

jest.mock(
    'universal-cookie',
    /* eslint-disable class-methods-use-this */
    () =>
        class {
            get() {
                return 'fr';
            }
        }
    /* eslint-enable class-methods-use-this */
);

jest.mock('fetch-ponyfill', () => {
    const resObj = {
        language: 'en-US',
    };
    const resFakePromise = {
        status: 200,
        then: () => resFakePromise,
        catch: (errFn?: Function) => {
            if (errFn) {
                return errFn(resObj);
            }
            return resObj;
        },
        json: () =>
            new Promise(resolve => {
                process.nextTick(() => resolve(resObj));
            }),
    };
    const api = {
        fetch: jest.fn(() => resFakePromise),
    };
    return jest.fn(() => api);
});

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

describe('<I18nProvider>', () => {
    it('children get i18n from context', () => {
        let testElement: any = null;
        const eleWithProvider = mount(
            <I18nProvider i18n={mockI18n}>
                <TestElement ref={component => (testElement = component)} />
            </I18nProvider>
        );

        expect(eleWithProvider).toMatchSnapshot();
        expect(testElement.context.i18n).toEqual(mockI18n);
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

describe('localize Page', () => {
    /* eslint react/no-multi-comp: 0 */
    const Page = ({ i18n }: { i18n: I18nType }) => {
        const { gettext } = i18n;
        return (
            <div>
                {gettext('Apps')}
            </div>
        );
    };

    const LocalizedPage = localizePage(Page);
    const localizedPage = shallow(<LocalizedPage locale={localeJSON} />);

    const enLang = 'en-US';
    localeJSON.language = enLang;
    const i18n = wrapI18n(enLang, getI18n(localeJSON));

    it('i18n gettext', () => {
        expect(i18n.gettext('')).toEqual('');
        expect(i18n.gettext('Ad Expense')).toEqual('Test Ad Expense');
    });

    it('i18n ngettext', () => {
        expect(i18n.ngettext('Cat', 'Cats', 1)).toEqual('Cat');
        expect(i18n.ngettext('Cat', 'Cats', 2)).toEqual('Cats');
    });

    it('i18n ngettext fix for singular language', () => {
        const lang = 'zh-CN';
        localeJSON.language = lang;
        const cnI18n = wrapI18n(lang, getI18n(localeJSON));
        expect(cnI18n.ngettext('Cat', 'Cats', 2)).toEqual('Cat');
    });

    it('i18n npgettext', () => {
        expect(i18n.npgettext('Test Context', 'Cat', 'Cats', 2)).toEqual('Cats');
    });

    it('i18n npgettext fix for singular language', () => {
        const lang = 'zh-CN';
        localeJSON.language = lang;
        const cnI18n = wrapI18n(lang, getI18n(localeJSON));
        expect(cnI18n.npgettext('Test Context', 'Cat', 'Cats', 2)).toEqual('Cat');
    });

    it('async request locale data', () => {
        LocalizedPage.getInitialProps({
            req: {
                headers: {
                    cookie: '',
                },
            },
        });

        expect(fetch).toHaveBeenCalledWith(
            'about:///static/_locales/fr-FR/aa_react.json'
        );
    });

    it('wrapped component with async getInitialProps', () => {
        const asyncPropsData = {
            test: 'test',
        };

        function getAsyncPropsData() {
            return new Promise(resolve => {
                process.nextTick(() => resolve(asyncPropsData));
            });
        }
        class AsyncPage extends React.Component {
            static async getInitialProps() {
                const myData = await getAsyncPropsData();

                return { myData };
            }

            props: {
                i18n: Object,
                locale2: Object,
            };

            render() {
                return <div />;
            }
        }

        localeJSON.language = 'en-US';

        const LocalizedAsyncPage = localizePage(AsyncPage);

        LocalizedAsyncPage.getInitialProps({
            req: {
                headers: {
                    cookie: '',
                },
            },
        });

        expect(fetch).toHaveBeenCalledWith(
            'about:///static/_locales/fr-FR/aa_react.json'
        );
    });

    it('render localized page', () => {
        expect(localizedPage).toMatchSnapshot();
    });
});

describe('localize util', () => {
    const socket = {
        server: {
            address: () => ({
                address: 'localhost',
                port: 3000,
            }),
        },
    };

    beforeEach(() => {
        fetch.mockClear();
    });

    it('i18n get locale', () => {
        expect.assertions(1);
        return expect(
            getLocale({
                connection: {},
                headers: {},
                socket,
            })
        ).resolves.toEqual({
            language: 'fr-FR',
        });
    });

    it('i18n fetch locale not in node server', () => {
        getLocale();
        expect(fetch).toHaveBeenCalledWith(
            'about:///static/_locales/fr-FR/aa_react.json'
        );
    });

    it('i18n fetch locale by https', () => {
        getLocale({
            connection: {
                encrypted: true,
            },
            headers: { cookie: '' },
            socket,
        });

        expect(fetch).toHaveBeenCalledWith(
            'https://localhost:3000/static/_locales/fr-FR/aa_react.json'
        );
    });

    it('doesnt fetch remote resource if language is english', async () => {
        Cookies.prototype.get = jest.fn(() => undefined);

        const res = await getLocale({
            connection: {},
            headers: {},
            socket,
        });
        expect(res).toEqual({ language: 'en-US' });
        expect(fetch).not.toHaveBeenCalled();
    });
});

describe('mock i18n', () => {
    it('gettext get text', () => {
        expect(mockI18n.gettext('txt')).toEqual('txt');
        expect(mockI18n.ngettext('a', 'b', 2)).toEqual('b');
        expect(mockI18n.npgettext('a', 'b', 'c', 2)).toEqual('b');
    });
});
