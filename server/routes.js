const Router = require('koa-router'),
  body = require('koa-body'),
  mongoose = require('mongoose'),
  { preSave, registry } = require('./options')
  // upload = require('./upload')

const router = module.exports = new Router

// router.use('/api/upload', upload.routes())

const api = new Router

api.get('/', ctx => {
  ctx.body = {
    models: Object.keys(mongoose.models).map(m => {
      let opts = mongoose.models[ m ].amdin
      return {
        name: m,
        label: opts.label,
        plural: opts.plural,
        single: opts.single
      }
    }),
    conf: registry
  }
})

// middleware: set ctx.Model
api.use('/:model', async (ctx, next) => {
  ctx.Model = mongoose.models[ctx.params.model]
  if (!ctx.Model)
    return ctx.throw(404, 'No model ' + ctx.params.model)

  await next()
})

// get model options and schema
api.get('/:model/options', ctx => {
  ctx.body = ctx.Model.amdin
})

// list documents
api.get('/:model', async ctx => {
  let opts = ctx.Model.amdin,
    query = ctx.Model.find()
      .select(opts.list)

  if (opts.list_populate)
    query.populate(opts.list_populate)

  if (opts.sortable)
    query.sort(opts.sortable)

  let docs = await query.lean()

  if (opts.list_populate)
    for (let doc of docs)
      for (let ref of opts.list_populate)
        if (doc[ref])
          doc[ref] = doc[ref][ mongoose.models[ref].amdin.title ]

  ctx.body = docs
})

// sorting documents
api.put('/:model/sort', body(), async ctx => {
  let data = ctx.request.body,
    key = ctx.Model.amdin.sortable

  if (!Array.isArray(data) || !key)
    return ctx.throw(500)

  let sort = await Promise.all(data.map(([ id, value ]) =>
    ctx.Model.findByIdAndUpdate(id, { [ key ]: value })
      .then(() => true)
  ))

  ctx.body = sort.every(val => val === true) ? { ok: true } : sort
})

// activate action
api.get('/:model/actions/:index/:id', async ctx => {
  let action = ctx.Model.amdin.actions[ ctx.params.index ]
  if (!action)
    ctx.throw(500)

  ctx.body = await action.fn(ctx.params.id)
})

// create a new doc
api.post('/:model', body(), async ctx => {
  ctx.body = await ctx.Model.create(
    preSave(ctx.request.body, ctx.Model)
  )
})

// list documents for ref selection
api.get('/:model/ref', async ctx => {
  let title = ctx.Model.amdin.title
  let docs = await ctx.Model.find()
    .select(title)
    .lean()

  ctx.body = docs.map(d => [ d._id, d[title] ])
})

// middleware: throw error if no document
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

// get document
api.get('/:model/:id', async ctx => {
  if (!ctx.Model.amdin.single)
    ctx.body = await ctx.Model.findById(ctx.params.id)
  else
    ctx.body = (await ctx.Model.findOne()) || {}
})

// edit document
api.put('/:model/:id', body(), async ctx => {
  if (!ctx.Model.amdin.single)
    ctx.body = await ctx.Model.findByIdAndUpdate(
      ctx.params.id,
      preSave(ctx.request.body, ctx.Model),
      {
        'new': true,
        runValidators: true
      }
    )
  else
    ctx.body = await ctx.Model.findOneAndUpdate(
      {},
      preSave(ctx.request.body, ctx.Model),
      {
        'new': true,
        runValidators: true,
        upsert: true,
        setDefaultsOnInsert: true
      }
    )
})

// delete document
api.delete('/:model/:id', async ctx => {
  await ctx.Model.findByIdAndRemove(ctx.params.id)
  ctx.body = { ok: true }
})

api.use(ctx => {
  ctx.throw(404)
})

router.use('/api', api.routes())
