# Styleshots

`styleshots` generates automatic jest snapshots for your styles

## Getting Started

Create a new test file and invoke styleshots with your configuration options.

```js
// styleshots.spec.js
import styleshots from "styleshots";

styleshots({
  url: "http://fancy-app.com",
  projectName: "Fancy App",
  selectors: [
    ".fancy-className-1",
    "#fancy-element-id",
    {
      selector: ".fancy-hoverable-element",
      hover: true
    }
  ]
});
```

Then, run your jest test suites as normal. For example:

`yarn jest styleshots.spec.js`

## Configuration

### `url`

Url from which to extact style information

### `selectors`

Array of selectors to snapshot. Each element in the array can be a string, or a configuration object with the following properties:

| **property**  | **type** | **description**                                                            | **default**    |
| ------------- | -------- | -------------------------------------------------------------------------- | -------------- |
| `selector`    | string   | DOM selector to snapshot                                                   | n/a (required) |
| `hover`       | boolean  | extracts styles for `selector` while element is hovered.                   | false          |
| `active`      | boolean  | extracts styles for `selector` while element is active.                    | false          |
| `focus`       | boolean  | extracts styles for `selector` while element is focused.                   | false          |
| `allMatches`  | boolean  | generates snapshot for all elements found that match `selector`.           | false          |
| `projectName` | string   | set the name of the project under test. Used for generating snapshot title | `url`          |

### `viewport`

sets viewport of page. Defaults to `width: 1280, height: 768 }`.

### `debug`

Log console output from `url` page
