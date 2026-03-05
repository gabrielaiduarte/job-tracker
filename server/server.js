import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import jobsRouter from "./routes/jobs.js"
import { initDB } from "./database/db.js";
import authRouter from "./routes/auth.js"
import auth from "./middleware/auth.js";

dotenv.config()

const app = express()

const db = await initDB();
app.locals.db = db

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter)
app.use("/jobs", auth, jobsRouter)

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Job Tracker API is running")
})

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})