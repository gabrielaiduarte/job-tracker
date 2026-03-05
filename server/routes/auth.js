import express from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const router = express.Router();

function createToken(userId) {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d"});
}

// Register
router.post("/register", async (req, res) => {
    const db = req.app.locals.db;
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" })
    }

    try {
        const existing = await db.get("SELECT id FROM users WHERE email = ?", [email]);
        if (existing) {
            return res.status(409).json({ message: "Email already exists" })
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const result = await db.run(
            "INSERT INTO users (email, password) VALUES (?, ?)",
            [email, passwordHash]
        );

        const token = createToken(result.lastID);
        return res.status(201).json({ token })

    } catch (err) {
        return res.status(500).json({ message: "Database: error" })
    }
});

//Login
router.post("/login", async (req, res) => {
    const db = req.app.locals.db;
    const { email, password } = req.body;

    if ( !email || !password) {
        return res.status(400).json({ message: "Email and password required" });
    }

    try {
        const user = await db.get("SELECT id, password FROM users WHERE email = ?", [email])

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials"})
        }

        const ok = await bcrypt.compare(password, user.password)

        if (!ok) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        const token = createToken(user.id)
        return res.json({ token });

    } catch (err) {
        return res.status(500).json({ message: "Database error"})
    }
});

export default router;