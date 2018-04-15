const Router = require('koa-router'),
  body = require('koa-body'),
  path = require('path'),
  cloudinary = require('cloudinary')

const UPLOAD_DIR = path.join(__dirname, '../uploads')

function upload (file) {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(file, (err, res) => {
      if (err) reject(err)
      else resolve(res)
    })
  })
}

const router = module.exports = new Router

router.post(
  '/',
  body({
    multipart: true,
    formidable: {
      uploadDir: UPLOAD_DIR,
      keepExtensions: true
    }
  }),
  async ctx => {
    let local = ctx.request.body.files.file.path
    ctx.body = await upload(local)
  }
)
