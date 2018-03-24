const mongoose = require('mongoose')

const Author = module.exports = mongoose.model('author', {
  name: String
})