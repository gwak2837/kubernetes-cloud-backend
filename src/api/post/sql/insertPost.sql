INSERT INTO post (title, contents, user_id)
VALUES ($1, $2, $3)
RETURNING id