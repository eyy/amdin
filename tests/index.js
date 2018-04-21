const test = require('tape'),
  mongoose = require('mongoose'),
  routes = require('../server/routes'),
  { setModelOptions } = require('../server/options')

mongoose.connect('mongodb://localhost/amdin-test')
let Model = mongoose.model('test', {
  name: { type: String, editable: false }
})

setModelOptions()

test('model list', t => {
  let ctx = {}
  run('/api')[0](ctx)

  t.equals(ctx.body.models[0].name, 'test')
  t.end()
})

test('model options', t => {
  let ctx = { Model, params: { model: 'test' } }
  run('/api/test/options')[0](ctx)

  console.log(ctx.body)

  // t.equals(ctx.body.label, 'Test')
  t.end()
})

function run (url) {
  for (let layer of routes.stack)
    if (url.match(layer.regexp))
      return layer.stack
  throw new Error('No match for ' + url)
}
