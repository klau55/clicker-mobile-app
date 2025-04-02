import { checkUsernameExists } from '../routes/userRoutes';
import { pool } from '../db';
import { clearDatabase, closeDbConnection } from './dbUtils';

describe('Utility functions', () => {
  describe('checkUsernameExists', () => {
    beforeEach(async () => {
      await clearDatabase();

      // Create a test user
      await pool.query(`
        INSERT INTO users (username, password_hash, total_taps, created_at) 
        VALUES ('existinguser', 'hash', 0, NOW())
      `);
    });

    afterAll(async () => {
      await closeDbConnection();
    });

    it('should return true for existing username', async () => {
      const exists = await checkUsernameExists('existinguser');
      expect(exists).toBe(true);
    });

    it('should return false for non-existent username', async () => {
      const exists = await checkUsernameExists('nonexistentuser');
      expect(exists).toBe(false);
    });
  });
});
