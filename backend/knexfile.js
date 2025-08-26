// knexfile.js
require('dotenv').config();

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: process.env.PGHOST || '127.0.0.1',
      port: process.env.PGPORT ? parseInt(process.env.PGPORT) : 5432,
      user: process.env.PGUSER || 'postgres',
      password: process.env.PGPASSWORD || '21128377',
      database: process.env.PGDATABASE || 'petsdb',
      ssl: process.env.PGSSL === 'true' ? { rejectUnauthorized: false } : false
    },
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL, // para produção, normalmente usado no Heroku
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  }

};
