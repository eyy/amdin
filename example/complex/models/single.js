const mongoose = require('mongoose')

const Author = module.exports = mongoose.model('single', {
  title: String,
  picture: { type: Object, field: 'picture', multiple: true }
})

Author.amdin = {
  single: true
}
