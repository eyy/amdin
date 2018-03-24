const Router = require('koa-router'),
  koaBody = require('koa-body'),
  mongoose = require('mongoose'),
  models = mongoose.models

const router = module.exports = new Router

const api = new Router

api.get('/', ctx => {
  ctx.body = Object.keys(models)
    .map(m => ({ name: m, label: models[m].amdin.label }))
})

api.use('/:model', async (ctx, next) => {
  ctx.Model = models[ctx.params.model]
  await next()
})

api.get('/:model', async ctx => {
  let opts = ctx.Model.amdin,
    docs

  if (opts.listFn)
    docs = await opts.listFn()

  else
    docs = await ctx.Model.find()
      .select(opts.list)
      .lean()

  ctx.body = docs
})

api.get('/:model/schema', ctx => {
  ctx.body = ctx.Model.amdin
})

api.post('/:model', koaBody(), async ctx => {
  ctx.body = await ctx.Model.create(ctx.requset.body)
})

api.get('/:model/:id', async ctx => {
  ctx.body = await ctx.Model.findById(ctx.params.id)
})

api.put('/:model/:id', koaBody(), async ctx => {
  ctx.body = await ctx.Model.findByIdAndUpdate(ctx.params.id, ctx.requset.body)
})

api.delete('/:model/:id', async ctx => {
  ctx.body = await ctx.Model.findByIdAndRemove(ctx.params.id)
})

router.use('/api', api.routes())