import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const defaults = {
  client: 'postgresql',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './database/migrations'
  }
};

const knexConfig = {
  development: {
    ...defaults,
  },
};

export default knexConfig;
