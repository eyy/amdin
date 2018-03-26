const mongoose = require('mongoose')

const Field = module.exports = mongoose.model('field', {
  title: { type: String, required: true },
  boolean: Boolean,
  object: {
    nested: { type: String, field: 'textarea' }
  },
  array: [ {
    string: { type: String, default: 'Yes' }
  } ],
  enum: { type: String, enum: [ 'Yes', 'No', 'Maybe' ], default: 'Maybe' }
})

Field.amdin = {
  list: [ 'title', 'enum' ]
}