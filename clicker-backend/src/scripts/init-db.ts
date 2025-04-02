import { initializeDatabase } from '../db';

console.log('Initializing database...');
initializeDatabase()
  .then(() => {
    console.log('Database initialized successfully!');
    process.exit(0);
  })
  .catch(err => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  });
