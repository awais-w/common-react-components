# Select

### Usage

```js
import Select from '@cmc/select/esnext/Select';
```

### Properties

| propName          | propType        | defaultValue | isRequired | Description                                                         |
| ----------------- | --------------- | ------------ | ---------- | ------------------------------------------------------------------- |
| label             | string          | -            |            | Label for component                                                 |
| placeholder       | string          | -            |            | Placeholder text for empty first option                             |
| errorMessage      | string          | -            |            | Error message to be displayed below the component                   |
| value             | string / number | -            |            | The current selected value of the component                         |
| handleChange      | function        | -            |            | callback function to be executed when option selected               |
| isDisabled        | boolean         | false        |            | Disabled state of the component                                     |
| options           | array           | -            |            | collection of primitive values for options                          |
| optionsWithValues | array           | -            |            | collection of objects with value and options properties for options |
| firstOptionEmpty  | boolean         | true         |            | Adds an empty first option to the component                         |
| isMandatory       | boolean         | false        |            | Defines the field as mandatory                                      |
