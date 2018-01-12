const koa = require('koa')

const app = new koa()
const port = 

app.use(ctx => {
  ctx.body = 'hello'
})
app.listen(+process.argv[2] || 5000)
