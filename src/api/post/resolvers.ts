import Router from 'koa-router'

import { pool } from '../../database/postgres'
import { UserContext } from '../..'
import { postORM } from './ORM'
import deletePost from './sql/deletePost.sql'
import insertPost from './sql/insertPost.sql'
import post from './sql/post.sql'
import posts from './sql/posts.sql'
import updatePost from './sql/updatePost.sql'

export const postRouter = new Router<UserContext>({ prefix: __dirname.slice(7) })

postRouter.get('/', async (ctx, next) => {
  const { offset, limit } = ctx.params
  const { rowCount, rows } = await pool
    .query(posts, [limit ?? 10, offset ?? 0])
    .catch((error) => ctx.throw(500, 'Database ' + error))

  if (rowCount === 0) return ctx.throw(404, '게시글이 존재하지 않습니다.')

  ctx.body = rows.map((row) => postORM(row))
  return next()
})

postRouter.get('/:id', async (ctx, next) => {
  const postId = ctx.params.id
  const { rowCount, rows } = await pool
    .query(post, [postId])
    .catch((error) => ctx.throw(500, 'Database ' + error))

  if (rowCount === 0) return ctx.throw(404, '해당 ID의 게시글이 존재하지 않습니다.')

  ctx.body = postORM(rows[0])
  return next()
})

postRouter.post('/', async (ctx, next) => {
  const userId = ctx.state.userId
  if (!userId) return ctx.throw(403, '로그인되어 있지 않습니다. 로그인 후 다시 요청해주세요.')

  const { title, contents } = ctx.request.body
  if (!title || !contents) return ctx.throw(400, '게시글 제목과 내용을 입력해주세요.')

  const { rows } = await pool
    .query(insertPost, [title, contents, userId])
    .catch((error) => ctx.throw(500, 'Database ' + error))

  ctx.body = { postId: rows[0].id }
  return next()
})

postRouter.patch('/:id', async (ctx, next) => {
  const userId = ctx.state.userId
  if (!userId) return ctx.throw(403, '로그인되어 있지 않습니다. 로그인 후 다시 요청해주세요.')

  const postId = ctx.params.id
  ctx.body = updatePost + postId
  return next()
})

postRouter.delete('/:id', async (ctx, next) => {
  const userId = ctx.state.userId
  if (!userId) return ctx.throw(403, '로그인되어 있지 않습니다. 로그인 후 다시 요청해주세요.')

  const postId = ctx.params.id
  const { rowCount, rows } = await pool
    .query(deletePost, [postId, userId])
    .catch((error) => ctx.throw(500, 'Database ' + error))
  if (rowCount === 0)
    return ctx.throw(404, '해당 ID의 게시글이 존재하지 않거나 본인의 게시물이 아닙니다.')

  ctx.body = { postId: rows[0].id }
  return next()
})
