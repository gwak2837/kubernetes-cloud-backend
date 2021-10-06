import { user } from '../../database/types'

export function userORM(rows: Partial<user>[]) {
  return rows.map((row) => ({
    id: row.id,
    creationTime: row.creation_time,
    modificationTime: row.modification_time,
    email: row.email,
  }))
}
