export function userORM(rows: any[]) {
  return rows.map((row) => ({
    id: row.id,
    creationTime: row.creation_time,
    modificationTime: row.modification_time,
    email: row.email,
  }))
}
