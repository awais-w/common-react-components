# Modal

### Usage

```js
import Modal from '@cmc/modal/esnext/Modal';
```

### Properties

| propName        | propType | defaultValue | isRequired | Description                                                                                        |
| --------------- | -------- | ------------ | ---------- | -------------------------------------------------------------------------------------------------- |
| onClose         | func     | -            |            | Function to be called when close button is clicked                                                 |
| primaryButton   | object   | -            |            | Container object for the primary navigation button. See table below for properties in this object  |
| secondaryButton | object   | -            |            | Container object for the secondary navigation button.See table below for properties in this object |
| children        | element  | -            |            | The content of the modal                                                                           |
| title           | string   | -            |            | The title of the modal                                                                             |
| isLoading       | boolean  | false        |            | Flag to say if modal should display loading content                                                |
| parentSelector  | string   | -            |            | A css selector to specify this modals direct parent                                                |

#### Navigation buttons

The primary and secondary navigation buttons can take the following properties

| property    | propertyType | Description                                                                   |
| ----------- | ------------ | ----------------------------------------------------------------------------- |
| handleClick | func         | Function to be called when button is clicked                                  |
| isDisabled  | boolean      | If button is disabled, it will render different and the onClick will not work |
| text        | string       | The text to display on the button                                             |
