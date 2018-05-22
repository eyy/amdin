const _ = require('lodash'),
  debug = require('debug')('amdin'),
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
exports.transform = transform
exports.registry = {}

function setModelOptions (models) {
  for (let name in models)
    if (models.hasOwnProperty(name)) {
      let Model = models[name],
        { paths } = Model.schema,
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
    opts.label = opts.label || _.capitalize(name.replace(/.*?\./, ''))

    if (path.$isMongooseArray)
      opts.schema = getPaths(path.schema.paths)

    _.set(acc, name, opts)
    return acc
  }, {})
}

function run (paths, doc, fn) {
  for (let name in paths)
    if (paths.hasOwnProperty(name) && !name.startsWith('_')) {
      // console.log(name)
      let path = paths[ name ]

      if (path.$isMongooseArray) {
        let arr = _.get(doc, name)
        if (arr && arr.length)
          arr.forEach(d => run(path.schema.paths, d, fn))
        continue
      }

      fn(name, path.options, doc)
    }
}

function transform (doc, Model) {
  let deletePictures = []

  run(Model.schema.paths, doc, function (name, opts, doc) {
    if (opts.editable === false)
      _.unset(doc, name)

    let data = _.get(doc, name)
    if (opts.field === 'picture' && data && data.length) {
      _.set(doc, name, data.filter(pic => {
        if (!pic || !pic.public_id)
          return false

        if (pic.deleted) {
          deletePictures.push(pic.public_id)
          return false
        }
        return true
      }))
    }
  })

  if (deletePictures.length)
    cloudinary.v2.api.delete_resources(deletePictures, function (err) {
      if (err)
        console.error(err)
      console.log('deleted ' + deletePictures.length + ' pictures')
    })

  return doc
}
