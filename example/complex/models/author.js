const mongoose = require('mongoose')

const Author = module.exports = mongoose.model('author', {
  sort: { type: Number, default: 0, hide: true },
  name: String,
})

Author.amdin = {
  sortable: 'sort'
}
