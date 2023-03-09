const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

// 引入cors支持跨域请求
const cors = require('koa-cors')
app.use(cors())

const index = require('./routes/index')
const users = require('./routes/users')
// 配置登录页面的路由
const login = require('./routes/login')
// 配置新区楼宇页面的路由
const newly = require('./routes/newly')
// 配置宿舍列表页面的路由
const dormList = require('./routes/dormList')
// 配置学生列表页面的路由
const xslb = require('./routes/xslb')
// 配置损坏报修页面的路由
const shbx = require('./routes/shbx')
// 配置宿舍评分页面的路由
const sspf = require('./routes/sspf')
// 配置楼管评分页面的路由
const lgpf = require('./routes/lgpf')
// 配置报修统计页面的路由
const bxtj = require('./routes/bxtj')
// 配置用户权限页面的路由
const yhqx = require('./routes/yhqx')
//  管理员登录页面的路由
const signin = require('./routes/signin')
//  用户注册的路由
const signup = require('./routes/signup')
//  用户注册的路由
const type = require('./routes/type')
//  个人信息的路由
const account = require('./routes/account')
//购买保险的路由
const buyinsurance = require('./routes/buyinsurance')
//管理员权限的路由
const role = require('./routes/role')
//超管查看所有用户信息
const userlist = require('./routes/userlist')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(login.routes(), login.allowedMethods())
app.use(newly.routes(), newly.allowedMethods())
app.use(dormList.routes(), dormList.allowedMethods())
app.use(xslb.routes(), xslb.allowedMethods())
app.use(shbx.routes(), shbx.allowedMethods())
app.use(sspf.routes(), sspf.allowedMethods())
app.use(lgpf.routes(), lgpf.allowedMethods())
app.use(bxtj.routes(), bxtj.allowedMethods())
app.use(yhqx.routes(), yhqx.allowedMethods())
app.use(signin.routes(), signin.allowedMethods())
app.use(signup.routes(), signup.allowedMethods())
app.use(type.routes(), type.allowedMethods())
app.use(account.routes(), account.allowedMethods())
app.use(buyinsurance.routes(), buyinsurance.allowedMethods())
app.use(role.routes(), role.allowedMethods())
app.use(userlist.routes(), userlist.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

// cors设置允许所有域名跨域
// var allowCrossDomin = function(req,res,next){
// 	// 设置请求源
// 	res.header('Access-Control-Allow-Origin','*');
// 	// 设置请求头
// 	res.header('Access-Control-Allow-Headers','*');
// 	// 请求方法
// 	res.header('Access-Control-Allow-Methods','*');
// 	next();
// };
// app.use(allowCrossDomin);

module.exports = app