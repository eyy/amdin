const mongoose = require('mongoose')

const Book = module.exports = mongoose.model('book', {
  title: { type: String, required: true },
  boolean: { type: Boolean, default: true },
  object: {
    nested: String
  },
  array: [{
    string: { type: String, default: 'no' }
  }],
  enum: { type: String, enum: ['Yes', 'No', 'Maybe'], default: 'Maybe' }
})

Book.amdin = {
  list: [ 'title', 'boolean' ]
}