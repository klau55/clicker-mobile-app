import request from 'supertest';
import app from '../server';

describe('Server tests', () => {
  // These are simple endpoint tests that don't need database cleanup

  it('should return a welcome message on the root path', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Clicker backend is running');
  });

  it('should return 404 for an invalid route', async () => {
    const response = await request(app).get('/invalid-route-that-doesnt-exist');
    expect(response.status).toBe(404);
  });
});
