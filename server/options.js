const _ = require('lodash'),
  debug = require('debug')('amdin'),
  mongoose = require('mongoose'),
  models = mongoose.models

// init model options

/*
  Model.amdin = {
    list: Array,
    listFn: () => Promise,
    label: String,
    title: String
  }
 */

module.exports = function setModelOptions () {
  for (let name in models)
    if (models.hasOwnProperty(name)) {
      let Model = models[name],
        paths = Model.schema.paths,
        opts = Model.amdin = Model.amdin || {}

      opts.label = opts.label || _.capitalize(name)
      opts.title = opts.title || paths.name ? 'name' : 'title'
      opts.paths = getPaths(paths)
      opts.list = opts.list || getListPaths(paths)

      debug(name, 'options init')
    }
}

function getListPaths (paths) {
  return Object.keys(paths)
    .filter(n => !n.startsWith('_') && !paths[n].$isMongooseArray)
}

function getPaths (paths) {
  return _.reduce(paths, (acc, path, name) => {
    if (name.startsWith('_'))
      return acc

    let opts = _.extend({}, path.options)
    opts.type = path.instance
    opts.label = opts.label || _.capitalize(name)

    if (path.$isMongooseArray)
      opts.schema = getPaths(path.schema.paths)

    acc[name] = opts
    return acc
  }, {})
}