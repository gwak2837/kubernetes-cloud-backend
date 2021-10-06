import { post } from '../../database/types'

export function postORM(rows: Partial<post>[]) {
  return rows.map((row) => ({
    id: row.id,
    creationTime: row.creation_time,
    modificationTime: row.modification_time,
    title: row.title,
    contents: row.contents,
  }))
}
