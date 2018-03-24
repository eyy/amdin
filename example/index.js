const Koa = require('koa'),
  logger = require('koa-logger'),
  mongoose = require('mongoose'),
  admin = require('../server')

require('./models/book')
require('./models/author')

mongoose.connect('mongodb://localhost/amdin')
  .then(() => console.log('mongoose connected'))
  .catch(err => { throw new Error(err) } )

const app = new Koa

app.use(logger())

// here you go

app.use(admin({
  title: 'Amdin Example'
}))

// app.use(ctx => {
//   ctx.redirect('/admin/')
// })

app.listen(3000, () => {
  console.log('running on http://localhost:' + 3000)
})