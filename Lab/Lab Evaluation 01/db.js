require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.PGHOST || '127.0.0.1',
  port: parseInt(process.env.PGPORT || '5432', 10),
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || 'postgres',
  database: process.env.PGDATABASE || 'postgres',
});

async function initDB() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      is_urgent BOOLEAN DEFAULT FALSE,
      is_important BOOLEAN DEFAULT FALSE,
      due_date DATE,
      category VARCHAR(100),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    const client = await pool.connect();
    console.log('Successfully connected to PostgreSQL database:', pool.options.database);
    await client.query(createTableQuery);
    console.log('Ensured table "tasks" exists in PostgreSQL.');
    client.release();
  } catch (err) {
    console.error('Error connecting to PostgreSQL database:', err.message);
    console.warn('Please check your .env file credentials (PGUSER, PGPASSWORD, PGDATABASE, PGPORT, PGHOST).');
  }
}

module.exports = {
  pool,
  query: (text, params) => pool.query(text, params),
  initDB,
};
