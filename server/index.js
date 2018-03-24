const Koa = require('koa'),
  serve = require('koa-static'),
  error = require('koa-json-error'),
  body = require('koa-body'),
  mount = require('koa-mount'),
  routes = require('./routes'),
  setModelOptions = require('./options')

module.exports = function init (options) {
  setModelOptions()
  app.context.amdin = options
  return mount('/admin', app)
}

const app = new Koa

app.use(body())
app.use(error())
app.use(routes.routes())
app.use(serve('dist'))