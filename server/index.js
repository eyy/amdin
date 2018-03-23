const Koa = require('koa'),
  serve = require('koa-static'),
  error = require('koa-json-error'),
  mount = require('koa-mount'),
  routes = require('./routes')

module.exports = function init (options) {
  app.context.amdin = options
  return mount('/admin', app)
}

const app = new Koa

app.use(error())
app.use(routes.routes())
app.use(serve('dist'))