import Router from 'koa-router'

export const rootRouter = new Router({ prefix: __dirname.slice(7) })

rootRouter.get('/', (ctx, next) => {
  ctx.body = 'Hello world!'
  next()
})
