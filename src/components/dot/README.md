# Dot

Component to display a value (usually a number) inside a circle. This is most often used for quantity counters etc.

## Properties

| propName | propType                                                              | defaultValue | isRequired | Description                                                                                    |
| -------- | --------------------------------------------------------------------- | ------------ | ---------- | ---------------------------------------------------------------------------------------------- |
| color    | oneOf([undefined, 'white', 'red', 'yellow', 'blue', 'black', 'grey']) | 'black'      | -          | The color of the circle.                                                                       |
| text     | string                                                                | ''           | -          | The text inside the circle. Note if this is more than two characters it will overflow the div. |
