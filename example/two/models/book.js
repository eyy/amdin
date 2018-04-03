const mongoose = require('mongoose')

const Book = module.exports = mongoose.model('book', {
  title: { type: String, required: true, label: 'כותרת' },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'author', label: 'מחבר' },
  created: { type: Date, editable: false, default: Date.now, label: 'תאריך' }
})

Book.amdin = {
  label: 'ספר',
  plural: 'ספרים',
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

if (!module.parent)
  (async function () {
    let b = new Book({ title: 'test' })
    console.log(b)
    let c = await b.save()
    console.log(c)
  })()