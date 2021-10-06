import Router from 'koa-router'
import deletePost from './sql/deletePost.sql'
import insertPost from './sql/insertPost.sql'
import { pool } from '../../database/postgres'
import post from './sql/post.sql'
import posts from './sql/posts.sql'
import updatePost from './sql/updatePost.sql'

export const postRouter = new Router({ prefix: __dirname.slice(7) })

postRouter.get('/', (ctx, next) => {
  ctx.body = posts
  next()
})

postRouter.get('/:id', async (ctx, next) => {
  const postId = ctx.params.id
  const { rowCount, rows } = await pool
    .query(post, [postId])
    .catch((error) => ctx.throw(500, 'Database error: ' + error))

  if (rowCount === 0) ctx.throw(404, '해당 ID의 게시글이 존재하지 않습니다.')

  ctx.body = { rows }
  next()
})

postRouter.post('/', async (ctx, next) => {
  const { title, contents } = ctx.request.body

  if (!title || !contents) ctx.throw(400, '게시글 제목과 내용을 입력해주세요.')

  const { rows } = await pool
    .query(insertPost, [title, contents])
    .catch((error) => ctx.throw(500, 'Database error: ' + error))

  ctx.body = { postId: rows[0].id }
  next()
})

postRouter.patch('/:id', async (ctx, next) => {
  const postId = ctx.params.id
  ctx.body = updatePost + postId
  next()
})

postRouter.delete('/:id', async (ctx, next) => {
  const postId = ctx.params.id
  const { rowCount, rows } = await pool
    .query(deletePost, [postId])
    .catch((error) => ctx.throw(500, 'Database error: ' + error))

  if (rowCount === 0) ctx.throw(404, '해당 ID의 게시글이 존재하지 않습니다.')

  ctx.body = { postId: rows[0].id }
  next()
})
