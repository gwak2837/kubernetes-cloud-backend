INSERT INTO "user" (email, password_hash)
VALUES ($1, $2)
RETURNING id