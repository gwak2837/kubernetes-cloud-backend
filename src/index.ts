import Koa from 'koa'
import { rootRouter } from './api'
import { userRouter } from './api/user'
import { pool } from './database/postgres'

export const app = new Koa()
const port = process.env.PORT

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})

app.use(rootRouter.routes())
app.use(userRouter.routes())

pool
  .query('SELECT NOW()')
  .then((query) => console.log(query.rows))
  .catch((error) => console.error(error))
