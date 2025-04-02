import request from 'supertest';
import app from '../server';
import { clearDatabase, closeDbConnection } from './dbUtils';
import { pool } from '../db';

describe('Tap API tests', () => {
  let userId: number;

  beforeEach(async () => {
    // Clear database before each test
    await clearDatabase();

    // Create a test user and save the ID
    const result = await pool.query(`
      INSERT INTO users (username, password_hash, total_taps, created_at) 
      VALUES ('tapuser', 'hash', 10, NOW())
      RETURNING id
    `);
    userId = result.rows[0].id;
  });

  afterAll(async () => {
    await closeDbConnection();
  });

  describe('POST /api/tap', () => {
    it('should increment user taps', async () => {
      // First verify the user exists
      const userCheck = await pool.query('SELECT * FROM users WHERE username = $1', ['tapuser']);
      expect(userCheck.rows.length).toBe(1);

      const tapData = {
        username: 'tapuser',
      };

      const response = await request(app).post('/api/tap').send(tapData);

      expect(response.status).toBe(200);
      expect(response.body.username).toBe('tapuser');
      expect(response.body.total_taps).toBe(11);

      // Verify in the database
      const dbResult = await pool.query('SELECT total_taps FROM users WHERE username = $1', [
        'tapuser',
      ]);
      expect(dbResult.rows[0].total_taps).toBe(11);

      // Verify tap activity was logged using the saved user ID
      const tapCount = await pool.query('SELECT COUNT(*) FROM tap_activity WHERE user_id = $1', [
        userId,
      ]);
      expect(parseInt(tapCount.rows[0].count)).toBe(1);
    });

    it('should return 404 for non-existent user', async () => {
      const tapData = {
        username: 'nonexistentuser',
      };

      const response = await request(app).post('/api/tap').send(tapData);

      expect(response.status).toBe(404);
      expect(response.body.message).toContain('User not found');
    });

    it('should return 400 if username is missing', async () => {
      const response = await request(app).post('/api/tap').send({});

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('Username is required');
    });
  });
});
