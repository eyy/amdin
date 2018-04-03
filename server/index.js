const Koa = require('koa'),
  serve = require('koa-static'),
  error = require('koa-json-error'),
  body = require('koa-body'),
  mount = require('koa-mount'),
  routes = require('./routes'),
  { setModelOptions, registry } = require('./options')

module.exports = function init (options) {
  setModelOptions()

  registry.lang = options.lang
    ? require('../lang/' + options.lang)
    : { _name: 'English' }

  registry.title = options.title

  return mount('/admin', app)
}

const app = new Koa

app.use(serve('../dist'))
app.use(error())
app.use(body())
app.use(routes.routes())
