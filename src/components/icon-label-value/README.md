# IconLabelValue

Component to display an icon, a label and a single or multiple values.

## Displaying values

The component allows 2 different ways to pass the value[s] that need to be displayed:

### Single value

For achieving this behaviour a single string should be passed as `value`

### Multiple values

For achieving this behaviour an array with the following shape needs to be provided

```javascript
{
  value, //text to display
    key, //react key prop
    onClick; //click handler
}
```

## Handling clicks

The component offers 2 ways of handling clicks:

### Whole component

it can be attached to the whole component by using the `onClick` prop

```javascript
<IconLabelValue
  key='person-name'
  isInline={boolean('isInline', false)}
  icon={text('icon', 'person')}
  isCustom={false}
  label={text('label', 'User:')}
  value={text('value', 'John Doe')}
  onClick={action("You've clicked something!")} //click handler on the whole component
/>
```

### Value

it can be attached just to the value by using the `onClick` field on the value object.
When providing this, the event won't buble to the component `onClick` handler

```javascript
<IconLabelValue
  key='person-name'
  isInline={boolean('isInline', false)}
  label={text('label', 'User:')}
  icon={text('icon', 'person')}
  isCustom={boolean('isCustom', false)}
  value={object('values', [
    {
      value: 'John Doe',
      key: 'user1',
      onClick: action("You've clicked user 1"), //click handler on the value
    },
  ])}
  onClick={action("You've clicked the whole component!")} //click handler on the whole component
/>
```
