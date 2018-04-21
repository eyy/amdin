const mongoose = require('mongoose')

const Book = module.exports = mongoose.model('book', {
  title: { type: String, required: true, label: 'כותרת' },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'author', label: 'מחבר' },
  created: { type: Date, editable: false, default: Date.now, label: 'תאריך' },
  cover: { type: Object, field: 'picture', label: 'כריכה', multiple: true }
})

Book.amdin = {
  label: 'ספר',
  plural: 'ספרים',
  list: [ 'title', 'author' ],
  list_populate: [ 'author' ]
}

if (!module.parent)
  (async function () {
    let b = new Book({ title: 'test' })
    console.log(b)
    let c = await b.save()
    console.log(c)
  })()
