const Router = require('koa-router'),
  { models } = require('mongoose'),
  { preSave, registry } = require('./options')

const router = module.exports = new Router

const api = new Router

api.get('/', ctx => {
  ctx.body = {
    models: Object.keys(models)
      .map(m => ({
        name: m,
        label: models[ m ].amdin.label,
        plural: models[ m ].amdin.plural
      })),
    conf: registry
  }
})

api.use('/:model', async (ctx, next) => {
  ctx.Model = models[ctx.params.model]
  if (!ctx.Model)
    return ctx.throw(404, 'No model ' + ctx.params.model)

  await next()
})

api.get('/:model', async ctx => {
  let opts = ctx.Model.amdin,
    query = ctx.Model.find()

  if (opts.list)
    query.select(opts.list)

  if (opts.list_populate)
    query.populate(opts.list_populate)

  let docs = await query.lean()

  if (opts.list_populate)
    for (let doc of docs)
      for (let ref of opts.list_populate)
        if (doc[ref])
          doc[ref] = doc[ref][ models[ref].amdin.title ]

  ctx.body = docs
})

api.post('/:model', async ctx => {
  ctx.body = await ctx.Model.create(
    preSave(ctx.request.body, ctx.Model)
  )
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
  ctx.body = await ctx.Model.findByIdAndUpdate(
    ctx.params.id,
    preSave(ctx.request.body, ctx.Model),
    {
      runValidators: true
    }
  )
})

api.delete('/:model/:id', async ctx => {
  await ctx.Model.findByIdAndRemove(ctx.params.id)
  ctx.body = { ok: true }
})

api.use(ctx => {
  ctx.throw(404)
})

router.use('/api', api.routes())
