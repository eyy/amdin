const Koa = require('koa'),
  serve = require('koa-static'),
  error = require('koa-json-error'),
  mount = require('koa-mount'),
  auth = require('koa-basic-auth'),
  path = require('path'),
  routes = require('./routes'),
  mongoose = require('mongoose'),
  { setModelOptions, registry } = require('./options')

module.exports = function init (options = {}) {
  setModelOptions(mongoose.models)

  registry.lang = options.lang
    ? require('../lang/' + options.lang)
    : { _name: 'English' }

  registry.title = options.title
  registry.cloudinary = options.cloudinary

  const app = new Koa

  app.use(async (ctx, next) => {
    try {
      await next()
    }
    catch (err) {
      if (401 === err.status) {
        ctx.status = 401
        ctx.set('WWW-Authenticate', 'Basic')
        ctx.body = 'Please Login'
      }
      else {
        console.error(err)
        throw err
      }
    }
  })
  app.use(auth(options.auth || { name: 'admin', pass: 'pass' }))
  app.use(serve(path.resolve(__dirname, '../dist')))
  app.use(error())
  app.use(routes.routes())

  return mount('/admin', app)
}
