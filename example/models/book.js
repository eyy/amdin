const mongoose = require('mongoose')

module.exports = mongoose.model('book', {
  title: String
})