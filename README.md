# Amdin

A plug-and-play admin for [Mongoose](http://mongoosejs.com), written with [Koa](http://koajs.com) and [Vue](https://vuejs.org).

```
npm i --save amdin
```

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

app.listen(3000)
```

![The result.](https://i.imgur.com/Wah72V8.png)