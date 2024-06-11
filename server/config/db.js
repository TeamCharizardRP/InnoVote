import pg from 'pg';
const { Pool } = pg;
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Run to test db connection
const testConnection = async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Connection has been established successfully:', res.rows[0]);
  } catch (err) {
    console.error('Error executing query', err.stack);
  } finally {
    await pool.end();
    console.log('Pool has ended');
  }
};
testConnection();

const db = {
  async query(queryString, values) {
    try {
      const result = await pool.query(queryString, values);
      return result.rows;
    } catch (err) {
      console.error('Query error:', err.stack);
    } finally {
      await pool.end();
    }
  },
};

export default db;
