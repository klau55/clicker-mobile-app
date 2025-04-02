import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Database configuration
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: 'postgres',
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
});

const dbName = process.env.DB_NAME || 'clickerdb';

async function dropAndCreateDatabase() {
  try {
    console.log(`Dropping database ${dbName} if it exists...`);
    await pool.query(`DROP DATABASE IF EXISTS ${dbName};`);
    console.log('Database dropped!');

    console.log(`Creating empty database ${dbName}...`);
    await pool.query(`CREATE DATABASE ${dbName};`);
    console.log('Empty database created!');

    return true;
  } catch (error) {
    console.error('Error dropping/creating database:', error);
    return false;
  } finally {
    await pool.end();
  }
}

// Run the function
dropAndCreateDatabase()
  .then(success => {
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('Unexpected error:', error);
    process.exit(1);
  });
