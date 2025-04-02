import request from 'supertest';
import app from '../server';
import { clearDatabase, closeDbConnection } from './dbUtils';
import bcrypt from 'bcrypt';
import { pool } from '../db';

describe('User API tests', () => {
  beforeEach(async () => {
    // Clear database before each test
    await clearDatabase();
  });

  afterAll(async () => {
    await closeDbConnection();
  });

  describe('POST /api/register', () => {
    it('should register a new user successfully', async () => {
      const userData = {
        username: 'testuser',
        password: 'password123',
      };

      const response = await request(app).post('/api/register').send(userData);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('User registered successfully');
      expect(response.body.user).toHaveProperty('id');
      expect(response.body.user.username).toBe(userData.username);
      expect(response.body.user.total_taps).toBe(0);
    });

    it('should return 400 if username is too short', async () => {
      const userData = {
        username: 'te', // Less than 3 characters
        password: 'password123',
      };

      const response = await request(app).post('/api/register').send(userData);

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('Username must be between 3 and 20 characters');
    });

    it('should return 400 if password is too short', async () => {
      const userData = {
        username: 'testuser',
        password: '12345', // Less than 6 characters
      };

      const response = await request(app).post('/api/register').send(userData);

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('Password must be at least 6 characters');
    });
  });

  describe('POST /api/login', () => {
    beforeEach(async () => {
      // Create a test user for login tests
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash('password123', saltRounds);

      // Insert user directly to avoid registration process
      await pool.query(
        'INSERT INTO users (username, password_hash, total_taps, created_at) VALUES ($1, $2, 0, NOW())',
        ['loginuser', passwordHash]
      );
    });

    it('should login a user successfully', async () => {
      const loginData = {
        username: 'loginuser',
        password: 'password123',
      };

      const response = await request(app).post('/api/login').send(loginData);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Login successful');
      expect(response.body.user).toHaveProperty('id');
      expect(response.body.user.username).toBe(loginData.username);
      expect(response.body.user.total_taps).toBe(0);
    });

    it('should return 400 for invalid credentials', async () => {
      const loginData = {
        username: 'loginuser',
        password: 'wrongpassword',
      };

      const response = await request(app).post('/api/login').send(loginData);

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('Invalid username or password');
    });
  });
});
