import request from 'supertest';
import app from '../server';
import { clearDatabase, closeDbConnection } from './dbUtils';
import { pool } from '../db';

describe('Leaderboard API tests', () => {
  beforeEach(async () => {
    // Clear database before each test
    await clearDatabase();

    // Create test users with different tap counts
    await pool.query(`
      INSERT INTO users (username, password_hash, total_taps, created_at) 
      VALUES 
        ('user1', 'hash', 100, NOW()),
        ('user2', 'hash', 50, NOW()),
        ('user3', 'hash', 75, NOW()),
        ('user4', 'hash', 0, NOW()),
        ('user5', 'hash', 25, NOW())
    `);
  });

  afterAll(async () => {
    await closeDbConnection();
  });

  describe('GET /api/leaderboard', () => {
    it('should return leaderboard with default pagination', async () => {
      const response = await request(app).get('/api/leaderboard');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('pagination');
      expect(response.body.data.length).toBeLessThanOrEqual(10); // Default limit is 10
      expect(response.body.pagination.page).toBe(1);
      expect(response.body.pagination.limit).toBe(10);

      // Only users with taps > 0 should be included (4 total)
      expect(response.body.data.length).toBe(4);

      // Check order - should be descending by total_taps
      expect(response.body.data[0].username).toBe('user1'); // 100 taps
      expect(response.body.data[1].username).toBe('user3'); // 75 taps
      expect(response.body.data[2].username).toBe('user2'); // 50 taps
      expect(response.body.data[3].username).toBe('user5'); // 25 taps
    });

    it('should respect custom pagination parameters', async () => {
      const response = await request(app).get('/api/leaderboard?page=1&limit=2');

      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(2);
      expect(response.body.pagination.page).toBe(1);
      expect(response.body.pagination.limit).toBe(2);

      // Verify correct pages calculation: 4 users with taps > 0, limit 2 = 2 pages
      expect(response.body.pagination.pages).toBe(2);

      // Should be the top 2 users by total_taps
      expect(response.body.data[0].username).toBe('user1');
      expect(response.body.data[1].username).toBe('user3');
    });

    it('should include user rank when username is provided', async () => {
      const response = await request(app).get('/api/leaderboard?username=user3');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('userRank');
      expect(response.body.userRank).toBe(2);
    });
  });
});
