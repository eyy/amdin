const _ = require('lodash'),
  debug = require('debug')('amdin'),
  mongoose = require('mongoose')

// init model options

/*
  Model.amdin = {
    list: Array,
    listFn: () => Promise,
    label: String,
    title: String
  }
 */

exports.setModelOptions = setModelOptions
exports.preSave = preSave
exports.registry = {}

function setModelOptions () {
  let models = mongoose.models

  for (let name in models)
    if (models.hasOwnProperty(name)) {
      let Model = models[name],
        paths = Model.schema.paths,
        opts = Model.amdin = Model.amdin || {}

      opts.label = opts.label || _.capitalize(name)
      opts.plural = opts.plural || _.capitalize(name) + 's'
      opts.title = opts.title || paths.name ? 'name' : 'title'
      opts.list = opts.list || getListPaths(paths)
      opts.listFn = opts.listFn || defaultListFn(Model)
      opts.paths = getPaths(paths)

      debug(name, 'options init')
    }
}

function defaultListFn (Model) {
  return () => Model.find()
    .select(Model.amdin.list)
    .lean()
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

function preSave (doc, Model) {
  let paths = Model.amdin.paths

  for (let path in paths)
    if (paths.hasOwnProperty(path))
      if (paths[ path ].editable === false)
        delete doc[ path ]

  return doc
}