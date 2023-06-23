# formatMoney

formatMoney accepts an amount and converts it to the specified currency string in the options object, defaults to GBP

## Usage

```jsx
import formatMoney from '@argos/utils/esnext/formatMoney';

// Returns "£12.50"
formatMoney(12.5);

// Returns "$12.50"
formatMoney(12.5, 'USD');
```
