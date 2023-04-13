import knex, { Knex } from 'knex';

const { env } = process;

const config: Knex.Config = {
  client: 'pg',
  connection: {
    user: env.DB_USER,
    host: env.DB_HOST,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE
  }
};

export const query = knex(config);
