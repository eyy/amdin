const mongoose = require('mongoose')

const Book = module.exports = mongoose.model('book', {
  title: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'author' }
})

Book.amdin = {
  list: [ 'title', 'author' ],
  async listFn () {
    let docs = await Book.find()
      .select(Book.amdin.list)
      .populate('author', 'name')
      .lean()

    return docs.map(d => {
      if (d.author)
        d.author = d.author.name
      return d
    })
  }
}