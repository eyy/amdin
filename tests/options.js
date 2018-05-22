const test = require('tape'),
  mongoose = require('mongoose'),
  proxyquire = require('proxyquire'),
  { setModelOptions, transform } = require('../server/options')

function createTransform () {
  let deletedPics = []

  const { transform } = proxyquire('../server/options', {
    cloudinary: {
      v2: {
        api: {
          delete_resources (arr) {
            console.log('deleted pictures', arr)
            deletedPics.push(...arr)
          }
        }
      }
    }
  })

  return { transform, deletedPics }
}

let Model = mongoose.model('test-transform', {
  str: String,
  un: { type: String, editable: false },
  pic: { type: Object, field: 'picture' },
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
    pic: { type: Object, field: 'picture' },
    obj: {
      str: String,
      pic: { type: Object, field: 'picture' }
    },
    arr: [ {
      un: { type: String, editable: false },
      pic: { type: Object, field: 'picture' }
    } ]
  }],

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
  let deletedPics = []

  const { transform } = proxyquire('../server/options', {
    cloudinary: {
      v2: {
        api: {
          delete_resources (arr) {
            deletedPics = arr
          }
        }
      }
    }
  })

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
  t.deepEqual(deletedPics, [ '234' ])
  t.end()
})

test('transform: remove array', t => {
  let doc = {
    arr: [
      { str: '1', __deleted: true },
      { str: '1', __deleted: true },
      { str: '1', __deleted: true },
      { str: '2' }
    ]
  }
  let tr = transform(doc, Model)

  t.deepEqual(tr, {
    arr: [
      { str: '2' }
    ]
  })
  t.end()
})

test('transform: remove array with pics', t => {
  let { transform, deletedPics } = createTransform()

  let doc = {
    arr: [
      {
        str: '1',
        pic: [
          { public_id: '1' },
          { public_id: '2' }
        ],
        __deleted: true
      },
      { str: '2' }
    ]
  }
  let tr = transform(doc, Model)

  t.deepEqual(tr, {
    arr: [
      { str: '2' }
    ]
  })
  t.deepEqual(deletedPics, [ '1', '2' ])

  t.end()
})

test('transform: remove array[].object.pic', t => {
  let { transform, deletedPics } = createTransform()

  let doc = {
    arr: [
      {
        str: '1',
        obj: {
          pic: [
            { public_id: 'a' },
            { public_id: 'b' }
          ],
        },
        __deleted: true
      },
      { str: '2' }
    ]
  }
  let tr = transform(doc, Model)

  t.deepEqual(tr, {
    arr: [
      { str: '2' }
    ]
  })
  t.deepEqual(deletedPics, [ 'a', 'b' ])

  t.end()
})

test('transform: remove array[].array[].pic', t => {
  let { transform, deletedPics } = createTransform()

  let doc = {
    arr: [
      {
        arr: [ {
          pic: [
            { public_id: '4' },
            { public_id: '5' }
          ],
        } ],
        __deleted: true
      }
    ]
  }
  let tr = transform(doc, Model)

  t.deepEqual(tr, {
    arr: []
  })
  t.deepEqual(deletedPics, [ '4', '5' ])

  t.end()
})
