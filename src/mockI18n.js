// @flow
const mockSingular = (key: string) => key;
const mockContextSingular = (context: string, key: string) => key;
const mockPlural = (key: string, pluralKey: string, count: number) => {
    if (count === 1) {
        return key;
    }
    return pluralKey;
};

const mockI18n = {
    lang: 'en-US',
    gettext: mockSingular,
    ngettext: mockPlural,
    pgettext: mockContextSingular,
    npgettext: (context: string, key: string, pluralKey: string, count: number) =>
        mockPlural(key, pluralKey, count),
};

export default mockI18n;
