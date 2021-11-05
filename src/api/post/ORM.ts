import { post } from '../../database/kubernetes'

export function postORM(post: Partial<post>) {
  return {
    id: post.id,
    creationTime: post.creation_time,
    modificationTime: post.modification_time,
    title: post.title,
    contents: post.contents,
    userId: post.user_id,
  }
}
