const Koa = require('koa'),
  logger = require('koa-logger'),
  admin = require('../server')

const PORT = 3000

const app = new Koa

app.use(logger())

app.use(admin({
  title: 'Amdin Example'
}))

app.use(ctx => {
  ctx.redirect('/admin/')
})

app.listen(PORT, () => {
  console.log('running on http://localhost:' + PORT)
})