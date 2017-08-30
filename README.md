# react-jed

### i18n API:

** All the `txt`, `pluralTxt` and `context` should be literal string. **

```js
gettext(txt)
pgettext(context, txt)
ngettext(txt, pluralTxt, count)
npgettext(context, txt, pluralTxt, count)
```

### I18nProvider
We should get the i18n instance by `getI18n`, then pass it to <I18nProvider>. Then we can get it from `Component.props` in the whole components tree cooperate with `translate()`.

```js
import { getI18n, I18nProvider } from 'react-jed';


const i18n = getI18n(localeJSON)

<I18nProvider i18n={this.i18n}>
    <WrappedComponent i18n={this.i18n} {...this.props} />
</I18nProvider>
```

The `localeJSON` should match the standard Gettext data format, like
```js
{
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
}
```

### Localize a component:

```js
import { translate, type I18nType } from '../../modules/i18n';

class Comp extends React.Component {
    props: {
        i18n: I18nType,
    };

    render() {
        const { gettext } = this.props.i18n;
        return <div>{gettext('hello')}</div>;
    }
}

export default translate(Comp);
```

In test files, you won't be able to use `shallow` rendering with the translated component. Instead, you'll want to access the wrapped component directly like so:

```js
import TranslatedComponent from '.';

const Comp = TranslatedComponent.WrappedComponent;
const tree = shallow(<Comp />);
```
