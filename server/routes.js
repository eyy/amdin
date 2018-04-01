const Router = require('koa-router'),
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
  if (!ctx.Model)
    return ctx.throw(404, 'No model ' + ctx.params.model)

  await next()
})

api.get('/:model', async ctx => {
  ctx.body = await ctx.Model.amdin.listFn()
})

api.post('/:model', async ctx => {
  ctx.body = await ctx.Model.create(ctx.request.body)
})

api.get('/:model/options', ctx => {
  ctx.body = ctx.Model.amdin
})

api.get('/:model/ref', async ctx => {
  let title = ctx.Model.amdin.title
  let docs = await ctx.Model.find()
    .select(title)
    .lean()

  ctx.body = docs.map(d => [ d._id, d[title] ])
})

api.use('/:model/:id', async (ctx, next) => {
  try {
    await next()
  }
  catch (err) {
    if (err.name === 'CastError')
      ctx.throw(404, 'No such document')
    else
      ctx.throw(500, err)
  }
})

api.get('/:model/:id', async ctx => {
  ctx.body = await ctx.Model.findById(ctx.params.id)
})

api.put('/:model/:id', async ctx => {
  ctx.body = await ctx.Model.findByIdAndUpdate(ctx.params.id, ctx.request.body)
})

api.delete('/:model/:id', async ctx => {
  await ctx.Model.findByIdAndRemove(ctx.params.id)
  ctx.body = { ok: true }
})

api.use(ctx => {
  ctx.throw(404)
})

router.use('/api', api.routes())