# Styleshots

`styleshots` generates automatic jest snapshots for your styles

## Getting Started

Create a new test file and invoke styleshots with your configuration options.

```js
// styleshots.spec.js
import styleshots from 'styleshots'

styleshots({
  url: 'http://fancy-app.com',
  selectors: [
    '.fancy-className-1',
    '#fancy-element-id',
    {
      selector: '.fancy-hoverable-element',
      hover: true,
    },
  ],
})
```

Then, run your jest test suites as normal. For example:

`yarn jest styleshots.spec.js`

## Configuration

### `url`

Url from which to extact style information

### `selectors`

Array of selectors to snapshot. Each element in the array can be a string, or a configuration object with the following properties:

| **property** | **type** | **description**                                                                        |
| ------------ | -------- | -------------------------------------------------------------------------------------- |
| `selector`   | string   | DOM selector to snapshot _(required)_                                                  |
| `hover`      | boolean  | extracts styles for `selector` while element is hovered. _(defaults to false)_         |
| `active`     | boolean  | extracts styles for `selector` while element is active. _(defaults to false)_          |
| `focus`      | boolean  | extracts styles for `selector` while element is focused. _(defaults to false)_         |
| `allMatches` | boolean  | generates snapshot for all elements found that match `selector`. _(defaults to false)_ |
