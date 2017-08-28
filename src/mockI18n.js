// @flow
const mockSingular = (key: string) => key;
const mockPlural = (a: string, b: string, count: number) => {
    if (count === 1) {
        return a;
    }
    return b;
};

const mockI18n = {
    lang: 'en-US',
    gettext: mockSingular,
    ngettext: mockPlural,
    pgettext: mockSingular,
    npgettext: (a: string, b: string, key: string, count: number) =>
        mockPlural(a, b, count),
};

export default mockI18n;
