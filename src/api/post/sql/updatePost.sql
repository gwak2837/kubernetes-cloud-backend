UPDATE post
SET modification_time = CURRENT_TIMESTAMP
WHERE id = $1
  AND user_id = $2
RETURNING *