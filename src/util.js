// @flow
import Jed from 'jed';
import fetchPonyfill from 'fetch-ponyfill';
import Cookies from 'universal-cookie';

const langJSONFileName = 'aa_react.json';
const { fetch } = fetchPonyfill();
export const LANG_MAP = {
    en: 'en-US',
    de: 'de-DE',
    fr: 'fr-FR',
    jp: 'ja-JP',
    kr: 'ko-KR',
    ru: 'ru-RU',
    cn: 'zh-CN',
};

const checkStatus = (res: Response) => {
    if (res.ok) {
        return res;
    }

    throw new Error(`Fetch error: ${res.url} returned ${res.status} ${res.statusText}`);
};
const parseJSON = (res: Response) => res.json();

function getI18n(localeJSON: Object) {
    const i18n = new Jed(localeJSON);
    return i18n;
}

async function getLocale(req?: Object) {
    let baseUrl = '';
    const cookies = new Cookies(req ? req.headers.cookie || '' : null);
    const aaLangName = cookies.get('aa_language');
    const lang = LANG_MAP[aaLangName] || 'en-US';

    if (req && req.connection) {
        const address = req.socket.server.address();
        const nodeUrlProtocol = req.connection.encrypted ? 'https:' : 'http:';
        baseUrl = `${nodeUrlProtocol}//${address.address}:${address.port}`;
    } else {
        baseUrl = `${global.location.protocol}//${global.location.hostname}`;
    }

    if (lang === 'en-US') {
        return Promise.resolve({ language: lang });
    }

    const localeJSON = await fetch(
        `${baseUrl}/static/_locales/${lang}/${langJSONFileName}`
    )
        .then(checkStatus)
        .then(parseJSON)
        .catch(err => {
            console.log(err);
            return {};
        });

    localeJSON.language = lang;
    return localeJSON;
}

export { getI18n, getLocale };
