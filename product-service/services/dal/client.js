import { Client } from "pg";

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;

export const createClient = (dbOptions = {}) => {
  const defaultDbOptions = {
    host: PG_HOST,
    port: PG_PORT,
    database: PG_DATABASE,
    user: PG_USERNAME,
    password: PG_PASSWORD,
    // ssl: {
    //   rejectUnauthorized: false
    // },
    // connectionTimeoutMillis: 5000
  };

  return new Client({...defaultDbOptions, ...dbOptions});
};