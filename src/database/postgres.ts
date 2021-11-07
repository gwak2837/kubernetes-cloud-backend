import { Pool } from 'pg'

export const pool = new Pool({
  connectionString: process.env.CONNECTION_STRING,
  ...(process.env.NODE_ENV === 'production' && {
    ssl: {
      rejectUnauthorized: true,
      ca: process.env.CA_CERTIFICATE,
      checkServerIdentity: () => {
        return undefined
      },
    },
  }),
})
