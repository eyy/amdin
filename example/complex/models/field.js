const mongoose = require('mongoose')

const phoneRegex = /\d{3}-?\d{3}-?\d{4}/

const Field = module.exports = mongoose.model('field', {
  title: { type: String, required: true, maxlength: 10 },
  boolean: Boolean,
  date: Date,
  num: { type: Number, min: 5, max: 42 },
  object: {
    nested: { type: String, field: 'textarea' }
  },
  array: [ {
    string: { type: String, default: 'Yes', maxlength: 10 }
  } ],
  enum: { type: String, enum: [ 'Yes', 'No', 'Maybe' ], default: 'Maybe' },
  phone: {
    type: String,
    validate: {
      validator: (v) => phoneRegex.test(v),
      message: '{VALUE} is not a valid phone number!'
    },
    required: [ true, 'User phone number required' ]
  },
})

Field.amdin = {
  list: [ 'title', 'enum' ],
  sort: 'sort'
}

if (!module.parent)
  (function () {
    let a = new Field
    a.title = 'Yesygjgjhgjhgnjhgnjhgnjgnjhgnjhgndfghjkgfghjk'
    a.phone = '0547470207'
    a.array = []
    a.array.push({})
    let err = a.validateSync()
    console.log(err)
  })()
