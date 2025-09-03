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

// Força UTF-8 para toda conexão
db.raw("SET client_encoding TO 'UTF8'").then(() => {
  console.log('Conexão com UTF-8 garantida');
}).catch(err => console.error('Erro ao setar UTF-8', err));

module.exports = db;
