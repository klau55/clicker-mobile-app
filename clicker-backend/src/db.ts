import { Pool, PoolConfig, QueryResult, QueryResultRow } from "pg";

// Read environment variables or use defaults
const dbConfig: PoolConfig = {
    user: process.env.DB_USER || "postgres",
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "clickerdb",
    password: process.env.DB_PASSWORD || "NDKJB-UQJMP-4VL8W-XBLQX-MPCNR",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    // Add connection pool settings
    max: 20, // Maximum number of clients in the pool
    idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
    connectionTimeoutMillis: 2000, // How long to wait for a connection
};

// Create the pool
export const pool = new Pool(dbConfig);

// Add event listeners for pool errors
pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

// Initialize database with required tables
export const initializeDatabase = async (): Promise<void> => {
    const client = await pool.connect();
    
    try {
        // Create tables in a transaction
        await client.query('BEGIN');
        
        // Users table
        await client.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password_hash VARCHAR(100) NOT NULL,
                total_taps INTEGER DEFAULT 0,
                created_at TIMESTAMP DEFAULT NOW(),
                last_active TIMESTAMP
            )
        `);
        
        // User stats table
        await client.query(`
            CREATE TABLE IF NOT EXISTS user_stats (
                user_id INTEGER PRIMARY KEY REFERENCES users(id),
                last_login TIMESTAMP DEFAULT NOW(),
                login_count INTEGER DEFAULT 0
            )
        `);
        
        // Tap activity table
        await client.query(`
            CREATE TABLE IF NOT EXISTS tap_activity (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id),
                tap_time TIMESTAMP DEFAULT NOW()
            )
        `);
        
        // Create indexes for performance
        await client.query(`
            CREATE INDEX IF NOT EXISTS username_idx ON users(username);
            CREATE INDEX IF NOT EXISTS tap_time_idx ON tap_activity(tap_time);
            CREATE INDEX IF NOT EXISTS user_id_tap_time_idx ON tap_activity(user_id, tap_time);
        `);
        
        await client.query('COMMIT');
        console.log('Database initialized successfully');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error initializing database:', error);
        throw error;
    } finally {
        client.release();
    }
};

// Helper function for queries with automatic error handling
export const executeQuery = async <T extends QueryResultRow>(
    query: string, 
    params: any[] = []
): Promise<QueryResult<T>> => {
    const client = await pool.connect();
    try {
        return await client.query<T>(query, params);
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    } finally {
        client.release();
    }
};
