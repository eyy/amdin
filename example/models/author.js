const mongoose = require('mongoose')

module.exports = mongoose.model('author', {
  name: String
})