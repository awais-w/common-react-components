# Argos Utils

## Sorting Variants

Utils for sorting variants from Product API or Search API responses.

| Function                              | Purpose                                                         |
| ------------------------------------- | --------------------------------------------------------------- |
| [sortVariants(mapper)](#sortvariants) | The sorting helper for variants though a mapper                 |
| [sortAttributes()](#sortattributes)   | The sorting helper for attribute                                |
| [variantFilter()](#variantfilter)     | Helper for filtering a variant by attributes                    |
| [typeMapper()](#typemapper)           | Mapper to extract type and value from an attribute              |
| [defaultMapper()](#defaultmapper)     | Mapper to extract the value for a attribute type from a variant |

#### sortVariants()

The main helper takes a function and returns a function.

The signatures are as follows

```
const mapper = (variant) => {}
const func = sortVariants(mapper)
```

where `mapper()` takes the variant payload and extracts only the information needed for sorting.

For example, if the payload for a variant is

```
const variant = {
  "partNumber": "tuc132196869",
  "price": 5,
  "deliveryPrice": 3.95,
  "freeDelivery": false,
  "variableDeliveryPrice": false,
  "attributes": [
    {
      "type": "Colour",
      "value": "BLACK",
      "shortValue": "BLACK",
      "order": 0
    },
    {
      "type": "Size",
      "value": "L",
      "shortValue": "L",
      "order": 2
    }
  ]
}
```

the relevant information is

```
[
  {
    "type": "Colour",
    "value": "BLACK"
  },
  {
    "type": "Size",
    "value": "L"
  }
]
```

so that if we want to sort by `Size` we would define a mapper

```
mapper(variant) -> { type: "Size", value: "L" }
```

and so on for each variant. This `BLACK` value is then for sorting.

At this point, we use `sortVariants()` through standard JavaScript Arrays API `.sort()`.

The signature is `sortVariants(current, next)` and the function compares the type values for each pair of items in the array.

```
const variantSizeValues = [
  'L',
  'XL',
  'S'
]
```

would result in

```
// Sorting function
const sorter = sortVariants(mapper)
// Sorted list
variantSizeValues.sort(sorter)
```

#### sortAttributes()

Similar to `sortVariants()`, this is a function to use with Arrays `.sort()`.
It does not take a mapper and instead directly uses the values of an array.

#### variantFilter()

This function is a helper for Arrays `.filter()` and removes irrelevant results for sorting.

For example, our variant results might be

```
const variants = [
  {
    ...
    "attributes": [
      {
        "type": "Colour",
        "value": "GREEN",
        ...
      },
      {
        "type": "Size",
        "value": "L",
        ...
      }
    ]
  },
  {
    ...
    "attributes": [
      {
        "type": "Colour",
        "value": "GREEN",
        ...
      },
      {
        "type": "Size",
        "value": "M",
        ...
      }
    ]
  },
  {
    ...
    "attributes": [
      {
        "type": "Colour",
        "value": "RED",
        ...
      },
      {
        "type": "Size",
        "value": "S",
        ...
      }
    ]
  },
  ...
]
```

and we are only interested in sorting variants with colour `GREEN`.

```
variants
  .filter(variantFilter('Colour', 'GREEN'))
  .sort(sortVariants(defaultMapper('Size')))
```

will take only `GREEN` variants and sort them by `Size`.

#### typeMapper()

Simple currying function to memorise `type` and produce multiple `value`.

For example,

```
const memorisedType = typeMapper('Colour')
const red = memorisedType('RED')
```

will produce `red = { "type": "Colour", "value": "RED" }`.

This is used to simply abstract away sorting untyped data.

Say you had a list of

```
const variants = [
  'XL',
  'S',
  'M',
]
```

and you would like to sort is as `Size`. Well, `sortVariants()` doesn't know what type it is.
To tell it, we could use `variants.sort(sortVariants('Size'))` which then refers to `Size` part of the config.

#### defaultMapper()

Simply defaults to handling objects of type

```
const results = {
  ...
  attributes: [
    {
      "type": "Colour",
      "value": "RED",
      ...
    },
    ...
  ]
}
```

and matches Product API responses. It simply extracts `value` for given `type` from `variant`.

For example,

```
const attribute = defaultMapper('Colour')(results)
// { "type": "Colour", "value: "RED" }
```

which is then used for sorting.
