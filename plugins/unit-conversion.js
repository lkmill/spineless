'use strict'

const getVariable = require('./get-variable')

module.exports = {
  install(less, pluginManager, functions) {
    const { tree } = less

    functions.addMultiple({
      em (value) {
        const baseFontSize = getVariable('base-font-size', this.context.frames)

        if (value.type === 'Expression') {
          return new tree.Expression(value.value.map((v) => {
            if (v.unit.backupUnit === 'px') {
              return new tree.Dimension(v.value / baseFontSize, 'em')
            }

            return new tree.Dimension(v.value, 'em')
          }))
        }

        return new tree.Dimension(value.value / baseFontSize, 'em')
      },

      rem (value) {
        const baseFontSize = getVariable('base-font-size', this.context.frames)

        if (value.type === 'Expression') {
          return new tree.Expression(value.value.map((v) => {
            if (v.unit.backupUnit === 'px') {
              return new tree.Dimension(v.value / baseFontSize, 'rem')
            }

            return new tree.Dimension(v.value, 'rem')
          }))
        }

        return new tree.Dimension(value.value / baseFontSize, 'rem')
      },

      px (value) {
        const baseFontSize = getVariable('base-font-size', this.context.frames)

        if (value.type === 'Expression') {
          return new tree.Expression(value.value.map((v) => {
            if (v.unit.backupUnit === 'px') {
              return v
            }

            return new tree.Dimension(value.value * baseFontSize, 'px')
          }))
        }

        if (value.unit.backupUnit === 'px') {
          return value
        }

        return new tree.Dimension(value.value * baseFontSize, 'px')
      },
    })
  }
}
