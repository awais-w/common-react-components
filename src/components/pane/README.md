# Pane

Component to display a Pane. Widget acts as a container for Cards.

## Properties

| propName   | propType                 | defaultValue | isRequired | oneOf                                                      | Description                                 |
| ---------- | ------------------------ | ------------ | ---------- | ---------------------------------------------------------- | ------------------------------------------- |
| title1     | string                   | -            | +          |                                                            | Main title text                             |
| title2     | string                   | -            | -          |                                                            | Secondary title text                        |
| title3     | string                   | -            | -          |                                                            | Tertiary title text                         |
| titleRight | oneOf([string, element]) | -            | -          |                                                            | Title text floating to right of Pane header |
| icon       | object                   | -            | -          | {name: 'Icon Name'}, {name: 'Custom-Icon', isCustom: true} | Heading icon                                |
| isLoading  | boolean                  | false        | -          |                                                            | Loading state                               |
| collapsed  | boolean                  | false        | -          |                                                            | Collapsed state                             |

## Examples

### Delivery details pane

```javascript
<Pane
  key='delivery'
  title1='Delivery Details'
  title2='Title 2'
  title3='Title 3'
  title4='Title 4'
  titleRight='Title Right'
  icon={{ name: 'Icon', isCustom: false }}
  isLoading={false}
  collapsed={false}
/>
```
