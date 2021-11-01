import { compare, genSalt, hash } from 'bcryptjs'
import Router from 'koa-router'

import { pool } from '../../database/postgres'
import { emailRegEx } from '../../utils'
import { generateJWT } from '../../utils/jwt'
import { UserContext } from '../..'
import { userORM } from './ORM'
import login from './sql/login.sql'
import logout from './sql/logout.sql'
import me from './sql/me.sql'
import register from './sql/register.sql'

export const userRouter = new Router<UserContext>({ prefix: __dirname.slice(7) })

userRouter.get('/', async (ctx, next) => {
  const userId = ctx.state.userId
  if (!userId)
    ctx.throw(
      403,
      JSON.stringify({ message: '로그인되어 있지 않습니다. 로그인 후 다시 요청해주세요.' })
    )

  const { rows } = await pool
    .query(me, [userId])
    .catch((error) => ctx.throw(400, 'Database ' + error))

  ctx.body = userORM(rows[0])
  return next()
})

userRouter.post('/', async (ctx, next) => {
  if (ctx.state.userId)
    return ctx.throw(
      403,
      JSON.stringify({ message: 'Header에 있는 JWT를 제외하고 다시 요청해주세요.' })
    )

  const { email, passwordHash } = ctx.request.body
  if (!emailRegEx.test(email))
    return ctx.throw(400, JSON.stringify({ message: '이메일 형식에 맞춰서 입력해주세요.' }))

  const passwordHashWithSalt = await hash(passwordHash, await genSalt())

  const { rows } = await pool
    .query(register, [email, passwordHashWithSalt])
    .catch((error) => ctx.throw(400, 'Database ' + error))
  const { id: userId } = rows[0]
  if (!userId) return ctx.throw(400, JSON.stringify({ message: '이미 존재하는 이메일입니다.' }))

  ctx.body = { jwt: await generateJWT({ userId }) }
  return next()
})

userRouter.post('/login', async (ctx, next) => {
  const userId = ctx.state.userId
  if (userId)
    return ctx.throw(
      403,
      JSON.stringify({ message: 'Header에 있는 JWT를 제외하고 다시 요청해주세요.' })
    )

  const { email, passwordHash } = ctx.request.body

  const { rowCount, rows } = await pool
    .query(login, [email])
    .catch((error) => ctx.throw(500, 'Database error: ' + error))
  if (rowCount === 0)
    return ctx.throw(
      401,
      JSON.stringify({ message: '로그인에 실패했어요. 이메일 또는 비밀번호를 확인해주세요.' })
    )

  const authenticationSuceed = await compare(passwordHash, rows[0].password_hash)
  if (!authenticationSuceed)
    return ctx.throw(
      401,
      JSON.stringify({ message: '로그인에 실패했어요. 이메일 또는 비밀번호를 확인해주세요.' })
    )

  ctx.body = { jwt: await generateJWT({ userId: rows[0].id }) }
  return next()
})

userRouter.post('/logout', async (ctx, next) => {
  const userId = ctx.state.userId
  if (!userId)
    return ctx.throw(
      403,
      JSON.stringify({ message: '로그인되어 있지 않습니다. 로그인 후 다시 요청해주세요.' })
    )

  await pool.query(logout, [userId])

  ctx.body = { message: '로그아웃에 성공했습니다.' }
  return next()
})
