const Koa = require('koa')
const bodyparser = require('koa-bodyparser')

const app = new Koa()
const port = +process.argv[2] || 5000

app.use(bodyparser())
app.use(ctx => {
  if (ctx.path === '/') {
    ctx.body = (ctx.request.body.name || '').toUpperCase()
  } else if (ctx.path === '/404') {
    ctx.body = 'page not found'
  } else if (ctx.path === '/500') {
    ctx.body = 'internal server error'
  }
})
app.listen(port)
console.log(`Listening on port ${port}`)
