module.exports = ({ page, selector }) => {
  return page.evaluate(
    ({ selector }) => {
      function getDefaultStyles(node) {
        const nodeCopy = node.cloneNode()
        document.querySelector('body').appendChild(nodeCopy)
        nodeCopy.style = 'all: initial;'

        const style = Object.assign({}, getComputedStyle(nodeCopy))

        style.all = ''

        document.querySelector('body').removeChild(nodeCopy)

        return style
      }

      function filterProperties(styles) {
        const filteredStyles = {}
        // filter out values that are strictly not style property values
        for (style in styles) {
          if (Number.isNaN(parseInt(style)) && omitProperties.every(val => val !== style)) {
            filteredStyles[style] = styles[style]
          }
        }

        return filteredStyles
      }

      const omitProperties = [
        // shorthands or contains duplicate data
        'animation',
        'background',
        'border',
        'borderBottom',
        'borderColor',
        'borderLeft',
        'borderRight',
        'borderTop',
        'columnRule',
        'cssText',
        'font',
        'listStyle',
        'margin',
        'offset',
        'outline',
        'overflow',
        'overscrollBehavior',
        'padding',
        'textDecoration',
        'transition',

        // always null
        'parentRule',

        // functions
        'setProperty',
        'removeProperty',
        'getPropertyPriority',
        'getPropertyValue',
        'item',
      ]

      function compactStyles(node) {
        const computedStyles = getComputedStyle(node)
        const defaultStyles = getDefaultStyles(node)
        const styleDiff = {}

        for (style in computedStyles) {
          if (computedStyles[style] !== defaultStyles[style]) {
            styleDiff[style] = computedStyles[style]
          }
        }

        return filterProperties(styleDiff)
      }

      function getStyles() {
        const nodes = Array.from(document.querySelectorAll(selector))

        if (!nodes.length) {
          throw new Error(`selector "${selector}" not found.`)
        }

        return nodes.map(compactStyles)
      }

      return getStyles()
    },
    { selector }
  )
}
