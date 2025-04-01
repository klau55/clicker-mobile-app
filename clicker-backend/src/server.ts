import express, { Request, Response, NextFunction } from "express";
import userRoutes from "./routes/userRoutes";
import cors from "cors";
import { initializeDatabase } from "./db";
import path from "path";

// Rate limiting for security
const rateLimit = (windowMs: number, maxRequests: number): express.RequestHandler => {
    const requests = new Map<string, number[]>();
    
    return (req: Request, res: Response, next: NextFunction) => {
        const ip = req.ip || req.socket.remoteAddress || 'unknown';
        const now = Date.now();
        
        if (!requests.has(ip)) {
            requests.set(ip, [now]);
            return next();
        }
        
        // Get timestamps for this IP and filter out old ones
        const timestamps = requests.get(ip)!.filter(time => time > now - windowMs);
        
        if (timestamps.length < maxRequests) {
            timestamps.push(now);
            requests.set(ip, timestamps);
            return next();
        }
        
        res.status(429).json({ 
            message: "Too many requests, please try again later",
            retryAfter: Math.floor((windowMs - (now - timestamps[0])) / 1000)
        });
    };
};

// Error logging middleware
const errorLogger = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(`[${new Date().toISOString()}] Error:`, {
        error: err.message,
        stack: err.stack,
        method: req.method,
        path: req.path,
        ip: req.ip,
        body: req.body
    });
    next(err);
};

// Error handler middleware
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ 
        message: "Internal server error",
        error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
};

const app = express();

// Security and utility middleware
app.use(express.json({ limit: '1mb' })); // Limit payload size
app.use(cors({
    origin: process.env.NODE_ENV === "development" 
        ? '*' 
        : ['http://localhost:3000', 'http://localhost:19000', 'http://localhost:19006']
}));

// Apply rate limiting to certain routes
app.use('/api/login', rateLimit(60 * 1000, 5)); // 5 requests per minute
app.use('/api/register', rateLimit(60 * 1000, 3)); // 3 requests per minute

// Main routes
app.get('/', (req: Request, res: Response) => {
    res.send("Clicker backend is running...");
});

app.use("/api", userRoutes);

// Static files for production
if (process.env.NODE_ENV === 'production') {
    const staticPath = path.join(__dirname, '../../clicker-frontend/web-build');
    app.use(express.static(staticPath));
    
    app.get('*', (req, res) => {
        res.sendFile(path.join(staticPath, 'index.html'));
    });
}

// Error handling
app.use(errorLogger);
app.use(errorHandler);

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// Don't start if this file is imported
if (require.main === module) {
    // Initialize database before starting server
    initializeDatabase().then(() => {
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server is running on port ${PORT}`);
            console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log('Access the server from other devices using your computer\'s IP address');
        });
    }).catch(error => {
        console.error('Failed to initialize database:', error);
        process.exit(1);
    });
}

export default app;

