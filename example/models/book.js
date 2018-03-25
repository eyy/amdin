const mongoose = require('mongoose')

module.exports = mongoose.model('book', {
  title: { type: String, required: true },
  boolean: { type: Boolean, default: true },
  object: {
    nested: String
  },
  array: [{
    string: String
  }],
  enum: { type: String, enum: ['Yes', 'No', 'Maybe'], default: 'Maybe' }
})