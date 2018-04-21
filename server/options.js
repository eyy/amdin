const _ = require('lodash'),
  debug = require('debug')('amdin'),
  mongoose = require('mongoose'),
  cloudinary = require('cloudinary')

// init model options

/*
  Model.amdin = {
    list: [String],
    list_populate: [String],
    sortable: String,
    label: String,
    title: String,
    actions: [{
      label: String,
      fn: Function -> Promise(updatedDoc)
    }]
  }
 */

exports.setModelOptions = setModelOptions
exports.preSave = preSave
exports.runPaths = runPaths
exports.registry = {}

function setModelOptions () {
  let { models } = mongoose

  for (let name in models)
    if (models.hasOwnProperty(name)) {
      let Model = models[name],
        paths = Model.schema.paths,
        opts = Model.amdin = Model.amdin || {}

      opts.single = opts.single || false
      opts.label = opts.label || _.capitalize(name)
      opts.plural = opts.plural || _.capitalize(name) + 's'
      opts.title = opts.title || paths.name ? 'name' : 'title'
      opts.list = opts.list || getListPaths(paths)
      opts.paths = getPaths(paths, Model)

      debug(name, 'options init')
    }
}

function getListPaths (paths) {
  return Object.keys(paths)
    .filter(n =>
      !n.startsWith('_') &&
      !paths[n].$isMongooseArray
    )
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
  let deletePictures = []

  for (let [ name, path ] of runPaths(Model.amdin.paths)) {
    if (path.editable === false)
      delete doc[ name ]

    if (path.field === 'picture' && doc[ name ].length) {
      doc[ name ] = doc[ name ].filter(pic => {
        if (!pic || !pic.public_id)
          return false

        if (pic.deleted) {
          deletePictures.push(pic.public_id)
          return false
        }
        return true
      })
      console.log(doc[ name ])
    }
  }

  if (deletePictures.length)
    cloudinary.v2.api.delete_resources(deletePictures, function (err) {
      if (err)
        console.error(err)
      console.log('deleted ' + deletePictures.length + ' pictures')
    })

  return doc
}

function * runPaths (paths, parent = '') {
  for (let name in paths)
    if (paths.hasOwnProperty(name) && !name.startsWith('_')) {
      let path = paths[ name ]
      if (path.$isMongooseArray)
        for (let p of runPaths(path.schema.paths, parent ? parent + '.' + name : name))
          yield p
      else
        yield [ name, path, parent ]
    }
}

if (!module.parent) (async () => {
  let paths = {
    a: 'String',
    b: 'String',
    c: {
      $isMongooseArray: true,
      schema: {
        paths: {
          a: 'String',
          b: 'String'
        }
      }
    }
  }

  for (let p of runPaths(paths))
    console.log(p)
})()
