const koa = require('koa')

const app = new koa()
const port = +process.argv[2] || 5000 

app.use(ctx => {
  if (ctx.path === '/') {
    ctx.body = 'hello koa'
  } else if (ctx.path === '/404') {
    ctx.body = 'page not found'
  } else if (ctx.path === '/500') {
    ctx.body = 'internal server error'
  }
})
app.listen(port)
console.log(`Listening on port ${port}`)
