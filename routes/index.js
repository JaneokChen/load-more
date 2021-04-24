const router = require('koa-router')()
const fs = require('fs')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.post('/user', async (ctx, next)=>{
  ctx.body = {
    name: '返回值2'
  }
})

router.get('/list', async(ctx, next)=>{
  console.log(ctx.request.body)
  console.log(ctx.request.query)
  console.log(ctx.request.headers.token)
  await new Promise((resolve, reject)=>{
    setTimeout(()=>{
      resolve()
    }, 2000)
  })

  ctx.set('Access-Control-Allow-Origin', 'https://localhost:3001')
  ctx.body = {
    errcode: 0,
    errmsg: 'ok',
    list: [
      {"username": "Dean","age": 18, "gender": "male"},
      {"username": "Rory", "age": 18, "gender": "female"},
      {"username": "Jane", "age": 24, "gender": "female"}
    ]
  }
})

router.post('/list2', async (ctx, next)=>{
  console.log(ctx.request.body)
  console.log(ctx.request.query);
  ctx.body = 'oke124324'
})

router.post('/list', async (ctx, next)=>{
  console.log(ctx.request.body)
  var args = [
    {field: 'page', type: 'number'},
    {field: 'count', type: 'number'}
  ]

  var body = ctx.request.body

  for(var i=0; i<args.length; i++){
    var item = args[i]
    if(!Object.keys(body).includes(item.field)){
      ctx.body = {
        errcode: -1,
        errmsg: '参数个数错误'
      }
      return
    } else if(typeof(body[item.filed]) != item.type){
      ctx.body = {
        errcode: -2,
        errmsg: '参数类型错误'
      }
    }
  }

  let data = fs.readFileSync('./data/list.json')
  data = JSON.parse(data)

  let list = data.splice(body.page*body.count, body.count)

  ctx.body = {
    errcode: 0,
    errmsg: 'ok',
    list
  }
})

module.exports = router
