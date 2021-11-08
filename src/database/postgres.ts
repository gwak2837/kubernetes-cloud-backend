import { Pool } from 'pg'

console.log('👀 - process.env.CA_CERTIFICATE', process.env.CA_CERTIFICATE)

export const pool = new Pool({
  connectionString: process.env.CONNECTION_STRING,
  ...(process.env.NODE_ENV === 'production' && {
    ssl: {
      rejectUnauthorized: true,
      ca: `-----BEGIN CERTIFICATE-----\n${process.env.CA_CERTIFICATE}\n-----END CERTIFICATE-----`,
      checkServerIdentity: () => {
        return undefined
      },
    },
  }),
})
