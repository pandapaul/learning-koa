const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const route = require('koa-route')
const session = require('koa-session')

const app = new Koa()
const port = +process.argv[2] || 5000

const form = `<form action="/login" method="POST">\
  <input name="username" type="text" value="username">\
  <input name="password" type="password" placeholder="The password is 'password'">\
  <button type="submit">Submit</button>\
</form>`

app.keys = ['some', 'keys']

app.use(session(app))
app.use(bodyparser())

app.use(route.get('/', ctx => {
  if (ctx.session.authenticated) {
    ctx.body = 'hello world'
  } else {
    ctx.status = 401
  }
}))

app.use(route.get('/login', ctx => {
  ctx.body = form
}))

app.use(route.post('/login', ctx => {
  if (ctx.request.body.username === 'username' && ctx.request.body.password === 'password') {
    ctx.session.authenticated = true
    ctx.redirect('/')
  } else {
    ctx.status = 400
  }
}))

app.use(route.all('/logout', ctx => {
  ctx.session.authenticated = false
  ctx.redirect('/login')
}))

app.listen(port)
console.log(`Listening on port ${port}`)
