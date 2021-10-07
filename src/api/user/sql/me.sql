SELECT id,
  creation_time,
  modification_time,
  email
FROM "user"
WHERE id = $1