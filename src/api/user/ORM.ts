import { user } from '../../database/types'

export function userORM(user: Partial<user>) {
  return {
    id: user.id,
    creationTime: user.creation_time,
    modificationTime: user.modification_time,
    email: user.email,
  }
}
