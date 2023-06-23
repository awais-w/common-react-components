# Portal

Use this component if you wish to add a component in a different part of the DOM tree to its natural location. By default, this will be the 'body' element.

| propName     | propType | defaultValue | isRequired | Description                                                                    |
| ------------ | -------- | ------------ | ---------- | ------------------------------------------------------------------------------ |
| nodeSelector | string   | 'body'       | -          | A CSS selector to defining where the child component should be in the DOM tree |
| children     | element  | -            | -          | The JSX element to render in the new position                                  |

## Examples

### Rendering a modal

This will render the modal component as a direct child of my-modal-parent, regardless of its natural position in the DOM tree.

```javascript
<Portal nodeSelector={'.my-modal-parent'}>
  <Modal>My modal content</Modal>
</Portal>
```
