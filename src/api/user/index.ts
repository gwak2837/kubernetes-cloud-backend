import Router from 'koa-router'
import insert from './sql/insert.sql'

export const userRouter = new Router({ prefix: __dirname.slice(7) })

userRouter.get('/', (ctx, next) => {
  ctx.body = { a: 'aa', b: insert }
  next()
})

userRouter.post('/', (ctx, next) => {
  ctx.body = { a: 'aa', b: 'bbdassdfadasddfsadfc' }
  next()
})
