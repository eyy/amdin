const Router = require('koa-router')

const router = module.exports = new Router

router.get('/api', ctx => {
  ctx.body = [
    'yes'
  ]
})