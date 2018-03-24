const _ = require('lodash'),
  debug = require('debug')('amdin'),
  mongoose = require('mongoose'),
  models = mongoose.models

// init model options

module.exports = function setModelOptions () {
  for (let name in models)
    if (models.hasOwnProperty(name)) {
      let Model = models[name],
        paths = Model.schema.paths,
        opts = Model.amdin = Model.amdin || {}

      opts.label = opts.label || _.capitalize(name)
      opts.title = opts.title || paths.name ? 'name' : 'title'
      opts.paths = getPaths(paths)

      // debug(name, 'options init', opts)
    }
}

function getPaths (paths) {
  return _.reduce(paths, (acc, path, name) => {
    if (name.startsWith('_'))
      return acc

    let opts = path.options
    opts.type = path.instance

    acc[name] = opts
    return acc
  }, {})
}