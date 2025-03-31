import express, { Request, Response } from "express";
import userRoutes from "./routes/userRoutes";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send("Clicker backend is running...");
});

app.use("/api", userRoutes);

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Access the server from other devices using your computer\'s IP address');
});

