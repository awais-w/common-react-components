# Chip

Chips are compact elements that represent an input, attribute, or action.

## Properties

| propName | propType | defaultValue | isRequired | oneOf                                                         | Description                      |
| -------- | -------- | ------------ | ---------- | ------------------------------------------------------------- | -------------------------------- |
| Icon     | object   | -            | +          | `{name: 'Icon Name'}` `{name: 'Custom Icon', isCustom: true}` | Icon name and type               |
| Label    | string   | -            | +          |                                                               | Label text                       |
| Color    | string   | `black`      | -          | `red`, `amber`, `blue`, `green`, `grey`, `black`              | Colour variants                  |
| onClick  | func     | -            | +          |                                                               | Function to handle onClick event |

## Examples

### Blue chip

```javascript
<Chip icon={{ name: 'person' }} label='Icon Label' onClick={func()} color='blue' />
```

### Red chip with Custom Icon

```javascript
<Chip icon={{ name: 'icon-custom-icon', isCustom: true }} label='Custom Icon' onClick={func()} color='red' />
```
