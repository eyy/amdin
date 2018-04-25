require('dotenv').config()

const Koa = require('koa'),
  logger = require('koa-logger'),
  cors = require('@koa/cors'),
  mongoose = require('mongoose'),
  admin = require('../../server')

require('./models/single')
require('./models/book')
require('./models/author')
require('./models/field')

mongoose.connect('mongodb://localhost/amdin')
  .then(() => console.log('mongoose connected'))
  .catch(err => {
    throw new Error(err)
  })

const app = new Koa

app.use(logger())
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}))

app.use(admin({
  title: 'Amdin Example',
  // lang: 'he',
  auth: {
    name: 'admin',
    pass: '123'
  },
  cloudinary: {
    name: process.env.CLOUDINARY_CLOUDNAME,
    preset: process.env.CLOUDINARY_PRESET
  }
}))

app.use(ctx => {
  ctx.redirect('/admin/')
})

app.listen(3000, () => {
  console.log('running on http://localhost:' + 3000)
})
