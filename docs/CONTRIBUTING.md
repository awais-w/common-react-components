# Developing

> CMC-components development uses [lerna](https://github.com/lerna/lerna) and [Storybook](https://github.com/storybooks/storybook)

- [Developing](#developing)
  - [Getting Started](#getting-started)
  - [Workflow](#workflow)
    - [Standards](#standards)
      - [Accessibility](#accessibility)
      - [New Components](#new-components)
    - [Script & Git Hooks](#Script-&-Git-Hooks)
    - [Component HTML / JSX Structure](#component-html--jsx-structure)
    - [Sub-Components](#sub-components)
    - [Embedding Flexibility](#embedding-flexibility)
    - [CSS](#css)

## Getting Started

- `yarn start` : the Storybook app will be on http://localhost:9001

## Workflow

1.  Create a branch with your feature or fix and push it to Git.
2.  Hack. Hack. Hack. Include at least one new test
3.  Any commit should include `component-name: commit message`
4.  Push everything to branch and ensure it passes all package [script hooks](#Script-&-Git-Hooks)
5.  Include any screenshots within the comment that might help explain.

_Please note:_ Git Hooks have been set up to run `precommit` and `prepush` tasks

---

### Standards

#### Accessibility

> Check your component meets accessibility requirements

- Keyboard users (tabbing etc)
- Screen readers users with Voice-Over

See [A11y.md for help and shortcuts](./docs/A11y.md).

#### New Components

Using other packages as an example ( e.g `icon` ) you should create an esnext folder with the following structure `component-name/esnext/componentName.jsx`.
This should be reflected in the `package.json` of that component:

```json
{
  "main": "dist/componentName.min.js",
  "esnext": "esnext/componentName.jsx"
}
```

---

### Script & Git Hooks

#### Commiting

- the `pre-commit` hook runs `lint-staged`, where we will run linters against staged git files
  - lint:js (eslint run against all monitored js and jsx files)
  - prettier:assets (clean up markdown and json file)
  - lint:scss (stylelint all css and scss files againt our base extentions)

#### Pushing

- the `pre-push` command runs a couple of validation checks to ensure things like bundlesizes are maintained, tests are passing, and other requirements are met
  - test (runs all Jest tests against the threshold)
  - webpack (production build for the two scripts below)
    - bundlesize (checks all gzip files against defined sizes)
    - check:css (looks for unused CSS snippets)

### Component HTML / JSX Structure

- Each component should be completely wrapped with a `component-name` i.e.

```HTML
/* 😡 bad container! 😡 */
  <div class='component-container'> ... </div>

/* 😡 bad sibling! 😡 */
  <div class='component'> ... </div>
  <div class='component-label'> ... </div>

/* 😀 happy component 😀 */
  <div class='component'>
    <div class='component__text'> ... </div>
    <div class='component__label'> ... </div>
  </div>
```

---

### Sub-Components

Sometimes, when the component is large, it helps to build sub-components.

These should be built following these standards:

- Components should be placed in `/components/SubComponent/SubComponent.jsx`
- Please keep tests with the code i.e. `/components/SubComponent/SubComponent.spec.jsx`
- Please prefix all sub-components classes with the component class name.

```HTML
/* 😡 bad sub-component! 😡 */
/* This is bad as it's class is now out of local-scope and is global */
  <div class='sub-component'> ... </div>

/* 😀 happy sub-component 😀 */
/* More verbose, but less risk of class i.e. if you sub-component is an Alert or Button */
  <div class='component-sub-component'> ... </div>
```

---

### Embedding Flexibility

- Components should always deconstruct props and apply any unused props to outer-most div
- Export propTypes (e.g. aria-label) to reduce duplicate code

```JS
const { position, label, ...props } = this.props;
return (<div {...props}> ... </div>)
```

- Don't forget to concat className's

```JS
const { className, ...props } = this.props;
return (<div className={ className + ' component-name'} {...props}> ... </div>)
```

---

### CSS

- Class names should always match the component name
- Always use the provided colour variables (Do not add new one unless agreed by design)
- Use BEM
  - Block: the name of the component e.g. `my-component`
  - Element: i.e. title or link e.g. `my-component__link`
  - modifier: a variation of the block or element e.g. `my-component--small`
- How _not_ to use BEM
  - Using the block class anywhere else apart from the outer-most element
  - chaining elements e.g. `my-comp__title__link`
  - Nesting any CSS (with the exception of maybe when using a modifier)
