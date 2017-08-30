# react-jed

### i18n API:

** All the `txt`, `pluralTxt` and `context` should be literal string.

```js
gettext(txt)
pgettext(context, txt)
ngettext(txt, pluralTxt, count)
npgettext(context, txt, pluralTxt, count)
```

### i18n Provider
We should get the i18n instance by `getI18n`, then pass it to <I18nProvider>. Then we can get it from `Component.props` in the whole components tree.

Get the i18n instance:
`const i18n = getI18n(localeJSON)`

Pass to provider:
```js
<I18nProvider i18n={this.i18n}>
    <WrappedComponent i18n={this.i18n} {...this.props} />
</I18nProvider>
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
