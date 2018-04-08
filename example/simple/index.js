const Koa = require('koa'),
  mongoose = require('mongoose'),
  admin = require('../../server')

mongoose.connect('mongodb://localhost/amdin')
mongoose.model('Book', {
  title: String,
  summery: { type: String, field: 'textarea' }
})

const app = new Koa

app.use(admin())

app.listen(3000, () => {
  console.log('running on http://localhost:' + 3000)
})