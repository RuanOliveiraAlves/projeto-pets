const knex = require('knex');
require('dotenv').config();

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.PGHOST || '127.0.0.1',
    port: process.env.PGPORT ? parseInt(process.env.PGPORT) : 5432,
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || '21128377',
    database: process.env.PGDATABASE || 'petsdb',
    ssl: process.env.PGSSL === 'true' ? { rejectUnauthorized: false } : false
  },
  pool: { min: 0, max: 10 }
});

module.exports = db;
