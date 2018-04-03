# Amdin

A plug-and-play admin for [Mongoose](http://mongoosejs.com), written with [Koa](http://koajs.com) and [Vue](https://vuejs.org).

### 1
```
npm i --save amdin mongoose koa
```

### 2

```js
const Koa = require('koa'),
  mongoose = require('mongoose'),
  admin = require('amdin')

mongoose.connect('mongodb://localhost/amdin')
mongoose.model('Book', {
  title: String,
  summery: { type: String, field: 'textarea' }
})

const app = new Koa

app.use(admin())

app.use(ctx => {
  ctx.redirect('/admin/')
})

app.listen(3000, () => {
  console.log('running on http://localhost:' + 3000)
})
```

### 3
```
open http://localhost:3000/admin
```
![The result.](https://i.imgur.com/Wah72V8.png)