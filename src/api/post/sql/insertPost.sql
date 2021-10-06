INSERT INTO post (title, contents)
VALUES ($1, $2)
RETURNING id