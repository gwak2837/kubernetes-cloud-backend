import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import { postRouter } from './api/post'
import { rootRouter } from './api'
import { userRouter } from './api/user'

export const app = new Koa()
const port = process.env.PORT

app.use(cors())
app.use(bodyParser())

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})

app.use(rootRouter.routes())
app.use(userRouter.routes())
app.use(postRouter.routes())
