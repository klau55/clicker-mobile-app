import { Pool } from 'pg';
import { pool } from '../db';

/**
 * Helper function to clear all tables for testing
 */
export const clearDatabase = async (): Promise<void> => {
  const client = await pool.connect();
  try {
    // Use a transaction to ensure atomicity
    await client.query('BEGIN');

    // Delete in correct order to handle foreign key constraints
    await client.query('DELETE FROM tap_activity');
    await client.query('DELETE FROM user_stats');
    await client.query('DELETE FROM users');

    // Reset sequences
    await client.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
    await client.query('ALTER SEQUENCE tap_activity_id_seq RESTART WITH 1');

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error clearing database:', error);
    throw error;
  } finally {
    client.release();
  }
};

/**
 * Helper function to create test user
 */
export const createTestUser = async (username: string, passwordHash: string): Promise<any> => {
  try {
    const result = await pool.query(
      'INSERT INTO users (username, password_hash, total_taps, created_at) VALUES ($1, $2, 0, NOW()) RETURNING id, username, created_at',
      [username, passwordHash]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error creating test user:', error);
    throw error;
  }
};

/**
 * Close database connections
 */
export const closeDbConnection = async (): Promise<void> => {
  try {
    await pool.end();
  } catch (err) {
    console.error('Error closing pool:', err);
  }
};
