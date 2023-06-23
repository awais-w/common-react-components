# Example

This component only lives here as a "how to" guide - it's to be used as a reference when creating new components and demonstrates how to create a story which makes use of all the addons we support

### :nerd_face: Usage

```js
import Example from 'components/Example';
```

<!-- STORY -->

### Properties

| propName | propType | defaultValue | isRequired | Desciption                |
| -------- | -------- | ------------ | ---------- | ------------------------- |
| text     | string   | -            | +          | Text to render            |
| onClick  | func     | null         |            | Call back for click event |

### Styling

#### BEM

BEM (Block Element Modifier) is used to style components. First add it to the component `package.json`:

```js
npx lerna add @argos/utils --scope @cmc/{component}
```

Example:

```js
npx lerna add @argos/utils --scope @cmc/icon-label-value
```

Then import into your component:

```js
import bem from '@argos/utils/esnext/bem';
```

Use convention `cmc-{component}` to give classNames to component:

```js
const cn = bem({ prefix: 'cmc-', block: 'example' });
```

#### Font (Using Bolt mixins)

Bolt font mixins are used to standardise text across `cmc` components. Add to `package.json`:

```js
npx lerna add @argos/bolt --scope @cmc/{component}
```

Example:

```js
npx lerna add @argos/bolt --scope @cmc/icon-label-value
```

Then import into your component scss file:

```css
@import '~@argos/bolt/src/scss/abstracts/variables';
```

Add `font-standard` mixin to the top of your component scss:

```css
.cmc-icon-label-value {
  @include font-standard;
}
```

If bold text is required, add `font-bold` mixin:

```css
.&__bold {
  @include font-bold;
}
```
