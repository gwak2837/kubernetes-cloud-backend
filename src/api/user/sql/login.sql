SELECT id,
  email,
  password_hash
FROM "user"
WHERE email = $1