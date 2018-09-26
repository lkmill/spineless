'use strict'

const p = require('path')

module.exports = {
  install(less, pluginManager, functions) {
    const { tree } = less

    functions.add('img-url', function imgUrl (value) {
      return new tree.URL(new tree.Quoted('"', p.join('/img', value.value)), this.index, this.currentFileInfo)
    })
  }
}

