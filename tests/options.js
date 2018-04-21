const test = require('tape'),
  mongoose = require('mongoose'),
  { setModelOptions, runPaths } = require('../server/options')

mongoose.connect('mongodb://localhost/amdin-test')
let Model = mongoose.model('test-options', {
  a: String,
  b: [{
    a: String
  }],
  c: [{
    a: [{
      a: String
    }]
  }],
  d: {
    a: String,
    b: [{
      a: String
    }]
  }
})

setModelOptions()

test('runPaths', t => {
  let paths = []
  for (let [ name, , parent ] of runPaths(Model.schema.paths))
    paths.push([ name, parent ])

  t.equal(paths, [
    [ 'a', '' ],
    [ 'a', 'b' ],
    [ 'a', 'c.a' ],
    [ 'd.a', '' ],
    [ 'a', 'd.b' ]
  ])
  t.end()
})
