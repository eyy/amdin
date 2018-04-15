const mongoose = require('mongoose')

const Author = module.exports = mongoose.model('single', {
  title: String
})

Author.amdin = {
  single: true
}
