const mongoose = require('mongoose')

module.exports = mongoose.model('book', {
  title: { type: String, required: true },
  boolean: Boolean,
  object: {
    nested: String
  },
  array: [{
    string: String
  }],
  enum: { type: String, enum: ['Yes', 'No', 'Maybe'], default: 'Yes' }
})