import path from "path";
import express from "express";
import bodyParser from 'body-parser'
import cors from 'cors';
import authRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv";
import connectToMongoDB from "./db/connectToMongoDB.js";
import { cookie } from "express-validator";
import cookieParser from 'cookie-parser';
import portfolioRoutes from "./routes/portfolio.routes.js"

dotenv.config(); //Ensuring that the env variables are loaded

const __dirname = path.resolve();

const PORT = process.env.PORT || 6900;
const app = express();
app.use(cors({ origin: "https://stock-manager-0dkk.onrender.com", credentials: true }))

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes)
app.use("/api/auth", portfolioRoutes);
app.use(express.static(path.join(__dirname, "/frontend/build")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"))
})

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server running on port: ${PORT} 👍🏻`)
})
