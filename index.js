const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const route = require('koa-route')
const fs = require('fs')

const app = new Koa()
const port = +process.argv[2] || 5000

app.use(bodyparser())

app.use(route.get('/', ctx => {
  ctx.body = 'hello koa'
}))
app.use(route.post('/', ctx => {
  ctx.body = (ctx.request.body.name || '').toUpperCase()
}))
app.use(route.get('/stream', ctx => {
  ctx.body = fs.createReadStream(process.argv[3])
}))
app.use(route.get('/json', ctx => {
  ctx.body = { foo: 'bar' }
}))
app.use(route.get('/404', ctx => {
  ctx.body = 'page not found'
}))
app.use(route.get('/500', ctx => {
  ctx.body = 'internal server error'
}))
app.listen(port)
console.log(`Listening on port ${port}`)
