import { Router, RequestHandler } from "express";
import { pool } from "../db";
import bcrypt from "bcrypt";

const router = Router();

// Password validation
const validatePassword = (password: string): { valid: boolean; message: string } => {
    if (password.length < 6) {
        return { valid: false, message: "Password must be at least 6 characters long" };
    }
    // Add more validation rules as needed
    return { valid: true, message: "" };
};

// Check if username exists
const checkUsernameExists = async (username: string): Promise<boolean> => {
    const checkUser = await pool.query("SELECT EXISTS(SELECT 1 FROM users WHERE username = $1)", [username]);
    return checkUser.rows[0].exists;
};

// register user
const registerHandler: RequestHandler = async (req, res) => {
    const { username, password } = req.body;
    
    // Input validation
    if (!username || !password) {
        res.status(400).json({ message: "Username and password are required" });
        return;
    }
    
    // Username format validation
    if (username.length < 3 || username.length > 20) {
        res.status(400).json({ message: "Username must be between 3 and 20 characters" });
        return;
    }
    
    // Password validation
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
        res.status(400).json({ message: passwordValidation.message });
        return;
    }

    try {
        // Start transaction
        const client = await pool.connect();
        
        try {
            await client.query("BEGIN");
            
            // Check if user exists - using the function
            const userExists = await checkUsernameExists(username);
            if (userExists) {
                await client.query("ROLLBACK");
                res.status(400).json({ message: "User already exists" });
                return;
            }

            const saltRounds = 10;
            const passwordHash = await bcrypt.hash(password, saltRounds);

            const insertUserQuery = `
                INSERT INTO users (username, password_hash, total_taps, created_at)
                VALUES ($1, $2, 0, NOW())
                RETURNING id, username, created_at
            `;

            const result = await client.query(insertUserQuery, [username, passwordHash]);
            const newUser = result.rows[0];
            
            // Create initial stats record
            const statsQuery = `
                INSERT INTO user_stats (user_id, last_login, login_count)
                VALUES ($1, NOW(), 1)
            `;
            await client.query(statsQuery, [newUser.id]);
            
            await client.query("COMMIT");
            
            res.status(201).json({
                message: "User registered successfully",
                user: {
                    id: newUser.id,
                    username: newUser.username,
                    created_at: newUser.created_at,
                },
            });
        } catch (error) {
            await client.query("ROLLBACK");
            throw error;
        } finally {
            client.release();
        }
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// login user
const loginHandler: RequestHandler = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({ message: "Username and password are required" });
        return;
    }

    try {
        // Use a transaction for login to update user stats
        const client = await pool.connect();
        
        try {
            await client.query("BEGIN");
            
            // Get user with join to retrieve stats
            const userQuery = `
                SELECT u.*, COUNT(s.user_id) as login_count
                FROM users u
                LEFT JOIN user_stats s ON u.id = s.user_id
                WHERE u.username = $1
                GROUP BY u.id
            `;
            
            const userResult = await client.query(userQuery, [username]);
            
            if (userResult.rows.length === 0) {
                await client.query("ROLLBACK");
                res.status(400).json({ message: "Invalid username or password" });
                return;
            }

            const user = userResult.rows[0];

            const isMatch = await bcrypt.compare(password, user.password_hash);
            if (!isMatch) {
                await client.query("ROLLBACK");
                res.status(400).json({ message: "Invalid username or password" });
                return;
            }
            
            // Update user stats
            const updateStatsQuery = `
                INSERT INTO user_stats (user_id, last_login, login_count)
                VALUES ($1, NOW(), 1)
                ON CONFLICT (user_id) 
                DO UPDATE SET 
                    last_login = NOW(),
                    login_count = user_stats.login_count + 1
            `;
            
            await client.query(updateStatsQuery, [user.id]);
            
            await client.query("COMMIT");
            
            res.json({
                message: "Login successful",
                user: {
                    id: user.id,
                    username: user.username,
                    total_taps: user.total_taps,
                    login_count: user.login_count,
                    created_at: user.created_at
                },
            });
        } catch (error) {
            await client.query("ROLLBACK");
            throw error;
        } finally {
            client.release();
        }
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// increment taps
const tapHandler: RequestHandler = async (req, res) => {
    const { username } = req.body;

    if (!username) {
        res.status(400).json({ message: "Username is required" });
        return;
    }

    try {
        // Using a transaction for the tap operation
        const client = await pool.connect();
        
        try {
            await client.query("BEGIN");
            
            // Update taps with a single query that returns the updated value
            const updateQuery = `
                UPDATE users 
                SET 
                    total_taps = total_taps + 1,
                    last_active = NOW()
                WHERE username = $1
                RETURNING username, total_taps
            `;
            
            const result = await client.query(updateQuery, [username]);
            
            if (result.rowCount === 0) {
                await client.query("ROLLBACK");
                res.status(404).json({ message: "User not found" });
                return;
            }
            
            // Log the tap in a separate activity table
            const logQuery = `
                INSERT INTO tap_activity (user_id, tap_time)
                SELECT id, NOW() FROM users WHERE username = $1
            `;
            
            await client.query(logQuery, [username]);
            await client.query("COMMIT");
            
            res.json(result.rows[0]);
        } catch (error) {
            await client.query("ROLLBACK");
            throw error;
        } finally {
            client.release();
        }
    } catch (error) {
        console.error("Error incrementing taps:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// leaderboard
const leaderboardHandler: RequestHandler = async (req, res) => {
    try {
        // Enhanced leaderboard query with more information
        const leaderboardQuery = `
            SELECT 
                username, 
                total_taps,
                EXTRACT(EPOCH FROM (NOW() - COALESCE(last_active, created_at)))/3600 AS hours_since_active,
                RANK() OVER (ORDER BY total_taps DESC) as rank
            FROM users
            ORDER BY total_taps DESC
            LIMIT 10
        `;

        const result = await pool.query(leaderboardQuery);
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// check if username exists
const checkUsernameHandler: RequestHandler = async (req, res) => {
    const { username } = req.query;
    
    if (!username || typeof username !== 'string') {
        res.status(400).json({ message: "Username parameter is required" });
        return;
    }
    
    try {
        const exists = await checkUsernameExists(username);
        
        res.json({ 
            username,
            exists 
        });
    } catch (error) {
        console.error("Error checking username:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get user stats
const userStatsHandler: RequestHandler = async (req, res) => {
    const { userId } = req.params;
    
    if (!userId) {
        res.status(400).json({ message: "User ID is required" });
        return;
    }
    
    try {
        const statsQuery = `
            SELECT 
                u.username,
                u.total_taps,
                u.created_at,
                COALESCE(u.last_active, u.created_at) as last_active,
                COUNT(ta.id) as tap_count_today,
                MAX(s.last_login) as last_login,
                MAX(s.login_count) as login_count
            FROM users u
            LEFT JOIN tap_activity ta ON u.id = ta.user_id AND ta.tap_time > NOW() - INTERVAL '1 day'
            LEFT JOIN user_stats s ON u.id = s.user_id
            WHERE u.id = $1
            GROUP BY u.id
        `;
        
        const result = await pool.query(statsQuery, [userId]);
        
        if (result.rows.length === 0) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error fetching user stats:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.post("/tap", tapHandler);
router.get("/leaderboard", leaderboardHandler);
router.get("/check-username", checkUsernameHandler);
router.get("/user-stats/:userId", userStatsHandler);

export default router;
