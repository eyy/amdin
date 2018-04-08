const mongoose = require('mongoose')

const Author = module.exports = mongoose.model('author', {
  name: String,
  sort: { type: Number, default: 0, hide: true }
})

Author.amdin = {
  sortable: 'sort'
}
