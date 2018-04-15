const Koa = require('koa'),
  serve = require('koa-static'),
  error = require('koa-json-error'),
  mount = require('koa-mount'),
  path = require('path'),
  routes = require('./routes'),
  { setModelOptions, registry } = require('./options')

module.exports = function init (options = {}) {
  setModelOptions()

  registry.lang = options.lang
    ? require('../lang/' + options.lang)
    : { _name: 'English' }

  registry.title = options.title

  return mount('/admin', app)
}

const app = new Koa

app.use(serve(path.resolve(__dirname, '../dist')))
app.use(error())
app.use(routes.routes())
