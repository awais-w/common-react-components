# formatCurrency

formatCurrency accepts an input + outputType - converting the input to the outputType specified

## Usage

```jsx
import formatCurrency from '@argos/utils/esnext/formatCurrency';

// Returns "GBP"
formatCurrency({
  input: '£',
  outputFormat: 'abbreviation',
});

// Returns "£"
formatCurrency({
  input: 'GBP',
  outputFormat: 'symbol',
});
```
