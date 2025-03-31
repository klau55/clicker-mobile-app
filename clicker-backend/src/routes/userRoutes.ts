import { Router, RequestHandler } from "express";
import { pool } from "../db";
import bcrypt from "bcrypt";

const router = Router();

// register user
const registerHandler: RequestHandler = async (req, res) => {
    const { username, password } = req.body;

    try {
        const checkUser = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        if (checkUser.rows.length > 0) {
            res.status(400).json({ message: "User already exists" });
            return;
        }

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const insertUserQuery = `
            INSERT INTO users (username, password_hash, total_taps)
            VALUES ($1, $2, 0)
            RETURNING id, username
        `;

        const result = await pool.query(insertUserQuery, [username, passwordHash]);
        const newUser = result.rows[0];

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser.id,
                username: newUser.username,
            },
        });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// login user
const loginHandler: RequestHandler = async (req, res) => {
    const { username, password } = req.body;

    try {
        const userQuery = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        if (userQuery.rows.length === 0) {
            res.status(400).json({ message: "Invalid username or password" });
            return;
        }

        const user = userQuery.rows[0];

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid username or password" });
            return;
        }
        res.json({
            message: "Login successful",
            user: {
                id: user.id,
                username: user.username,
                total_taps: user.total_taps,
            },
        });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// increment taps
const tapHandler: RequestHandler = async (req, res) => {
    const { username } = req.body;

    try {
        await pool.query("UPDATE users SET total_taps = total_taps + 1 WHERE username = $1", [username]);

        const result = await pool.query("SELECT total_taps FROM users WHERE username = $1", [username]);
        const updatedTaps = result.rows[0]?.total_taps;

        res.json({ username, total_taps: updatedTaps });
    } catch (error) {
        console.error("Error incrementing taps:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// leaderboard
const leaderboardHandler: RequestHandler = async (req, res) => {
    try {
        const leaderboardQuery = `
            SELECT username, total_taps
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
        const checkUser = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        const exists = checkUser.rows.length > 0;
        
        res.json({ 
            username,
            exists 
        });
    } catch (error) {
        console.error("Error checking username:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.post("/tap", tapHandler);
router.get("/leaderboard", leaderboardHandler);
router.get("/check-username", checkUsernameHandler);

export default router;
