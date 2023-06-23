# Include CMC-Components in your project

- [Prerequisites](#prerequisites)
- [Usage](#usage)

## Prerequisites

Ensure the project has an `npmrc` with the argos nexus repository added

`registry=https://nexus3.deveng.systems/repository/NPM/ @argos:registry=https://nexus3.deveng.systems/repository/argos-npm/`

## Usage

After installing the package there are 2 ways it may be consumed

1 ) For tiny bundle sizes, components should be imported into your project individually i.e.

```javascript
import Icon from '@cmc/icon';
```

Please note the default behaviour here will be to import ONLY the minified .js ( Which doesn't have any css compiled into it, look at the link mentioned in point 2 if you wish to know why )

2 ) If you would like to manually compile the dependencies yourself ( See reasons on why you would do so here [Why so complex?](https://www.argos.co.uk/assets/bolt/storybook/iframe.html?selectedKind=Argos%20Storybook%7CDocumentation&selectedStory=Consuming%20Components#why-so-complex-%F0%9F%98%AD)
) you can import the components like so

```javascript
import Icon from '@cmc/icon/esnext/icon';
```
