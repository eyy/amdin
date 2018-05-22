const test = require('tape'),
  mongoose = require('mongoose'),
  proxyquire = require('proxyquire'),
  { transform, setModelOptions } = proxyquire('../server/options', {
    cloudinary: { v2: { api: {
      delete_resources(arr) {
        console.log('deleted pictures', arr)
      }
    } } }
  })

let Model = mongoose.model('test-transform', {
  str: String,
  un: { type: String, editable: false },
  obj: {
    un: { type: String, editable: false },
    arr: [ {
      str: String,
      un: { type: String, editable: false }
    } ]
  },
  arr: [{
    str: String,
    un: { type: String, editable: false },
    obj: {
      str: String
    },
    arr: [ {
      un: { type: String, editable: false }
    } ]
  }],
  pic: { type: Object, field: 'picture' }
})
setModelOptions(mongoose.models)

test('transform: remove editable=false', t => {
  let doc = {
    un: 'no',
    arr: [
      { str: '1', un: 'no' },
      { str: '2' }
    ]
  }
  let tr = transform(doc, Model)

  t.deepEqual(tr, {
    arr: [
      { str: '1' },
      { str: '2' }
    ]
  })
  t.end()
})

test('transform: array within array', t => {
  let doc = {
    arr: [
      {
        arr: [
          { str: 1, un: 'no' },
          { str: 2 }
        ]
      }
    ]
  }
  let tr = transform(doc, Model)

  t.deepEqual(tr, {
    arr: [
      {
        arr: [
          { str: 1 },
          { str: 2 }
        ]
      }
    ]
  })
  t.end()
})

test('transform: remove pictures', t => {
  let doc = {
    pic: [
      { public_id: 'asd' },
      null,
      {},
      { public_id: '234', deleted: true }
    ]
  }
  let tr = transform(doc, Model)

  t.deepEqual(tr, {
    pic: [
      { public_id: 'asd' }
    ]
  })
  t.end()
})
