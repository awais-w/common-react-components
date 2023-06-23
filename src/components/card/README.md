# Card

Component to display a card/panel in either a collapsed or expanded view. Can be used to display a variety of information, from simple core information such as order numbers and addresses, to more detailed information when expanded.

## Properties

| propName           | propType | defaultValue | isRequired | oneOf                                                                                           | Description                                                                          |
| ------------------ | -------- | ------------ | ---------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| title1             | string   | -            | +          |                                                                                                 | Main title text                                                                      |
| title2             | string   | -            | +          |                                                                                                 | Secondary title text                                                                 |
| title3             | string   | -            | -          |                                                                                                 | Tertiary title text                                                                  |
| icon               | string   | -            | -          |                                                                                                 | Heading icon                                                                         |
| role               | string   | -            | -          | `attention` `informative` `complete`                                                            | Styles the Card                                                                      |
| summary            | string   | -            | -          |                                                                                                 | Display summary text when the Card is collapsed. Will not show when Card is expanded |
| children           | element  | -            | -          | `element arrayOf(element)`                                                                      | Display additional information when Card is expanded                                 |
| isExpanded         | boolean  | `false`      | -          |                                                                                                 | Determines whether Card is collapsed or expanded                                     |
| onToggle           | func     | -            | -          |                                                                                                 | Function to handle toggle of collapsed or expanded state                             |
| isAsynchBody       | bool     | -            | -          |                                                                                                 | Toggles whether Card is expandable or not                                            |
| actions            | element  | -            | -          |                                                                                                 | ... menu on the top right                                                            |
| expandedPanelType  | string   | `panel-info` | -          | `panel-primary` `panel-secondary` `panel-info` `panel-complete` `panel-active` `panel-inactive` | Style of Card when expanded                                                          |
| collapsedPanelType | string   | `panel-info` | -          | `panel-primary` `panel-secondary` `panel-info` `panel-complete` `panel-active` `panel-inactive` | Style of Card when collapsed                                                         |

## Examples

### Non expandable Card

```javascript
<Card
  title1='TITLE 1'
  title2='Title 2'
  icon={'account_circle'}
  summary='This is summary text'
  onToggle={func()}
  expandedPanelType='panel-info'
  collapsedPanelType='panel-info'
/>
```

### Expandable Card (Contains children)

```javascript
<Card
  title1='TITLE 1'
  title2='Title 2'
  icon={'account_circle'}
  summary='This is summary text'
  isExpanded={true}
  onToggle={func()}
  expandedPanelType='panel-info'
  collapsedPanelType='panel-info'>
  <div>Child 1</div>
  <div>Child 2</div>
  <div>Child 3</div>
</Card>
```

### Card with Actions

```javascript
<Card
  title1='TITLE 1'
  title2='Title 2'
  icon={'account_circle'}
  summary='This is summary text'
  isExpanded={false}
  onToggle={func()}
  expandedPanelType='panel-info'
  collapsedPanelType='panel-info'
  actions={
    <div key='1' className='cha-panel__actions-item'>Action 1</div>,
    <div key='2' className='cha-panel__actions-item'>Action 2</div>,
    <div key='3' className='cha-panel__actions-item'>Action 3</div>,
  }
/>
```
