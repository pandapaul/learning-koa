const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const route = require('koa-route')
const fs = require('fs')
const session = require('koa-session')
const views = require('co-views')
const path = require('path')

const render = views(path.join(__dirname, 'views'), {
  ext: 'ejs'
})

const app = new Koa()
const port = +process.argv[2] || 5000

app.keys = ['some', 'keys']

app.use(session(app))
app.use(bodyparser())
app.use(errorHandler())
app.use(responseTime())

function errorHandler () {
  return async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      ctx.status = 500
      ctx.body = 'internal server error'
    }
  }
}

function responseTime () {
  return async (ctx, next) => {
    const start = Date.now()
    await next()
    ctx.set('X-Response-Time', Date.now() - start)
  }
}

app.use(route.get('/', ctx => {
  const user = {
    name: {
      first: 'Tobi',
      last: 'Holowaychuk'
    },
    species: 'ferret',
    age: 3
  }
  return render('user', { user })
  .then(t => {
    ctx.body = t
  })
}))
app.use(route.all('/error', ctx => {
  throw new Error('ooops')
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
