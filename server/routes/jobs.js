import express from "express";

const router = express.Router();

// GET jobs for logged-in user
router.get("/", async (req, res) => {
  const db = req.app.locals.db;
  const userId = req.user.userId;

  try {
    const jobs = await db.all(
      "SELECT id, company, title, status FROM jobs WHERE user_id = ?",
      [userId]
    );
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Database error" });
  }
});

// CREATE job for logged-in user
router.post("/", async (req, res) => {
  const db = req.app.locals.db;
  const userId = req.user.userId;

  const { company, title, status } = req.body;

  if (!company || !title || !status) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const result = await db.run(
      "INSERT INTO jobs (company, title, status, user_id) VALUES (?, ?, ?, ?)",
      [company, title, status, userId]
    );

    res.status(201).json({
      id: result.lastID,
      company,
      title,
      status
    });
  } catch (err) {
    res.status(500).json({ message: "Database error" });
  }
});

// UPDATE job (only if it belongs to logged-in user)
router.put("/:id", async (req, res) => {
  const db = req.app.locals.db;
  const userId = req.user.userId;

  const id = parseInt(req.params.id);
  const { company, title, status } = req.body;

  try {
    const job = await db.get(
      "SELECT * FROM jobs WHERE id = ? AND user_id = ?",
      [id, userId]
    );

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const updatedCompany = company || job.company;
    const updatedTitle = title || job.title;
    const updatedStatus = status || job.status;

    await db.run(
      "UPDATE jobs SET company = ?, title = ?, status = ? WHERE id = ? AND user_id = ?",
      [updatedCompany, updatedTitle, updatedStatus, id, userId]
    );

    res.json({
      id,
      company: updatedCompany,
      title: updatedTitle,
      status: updatedStatus
    });
  } catch (err) {
    res.status(500).json({ message: "Database error" });
  }
});

// DELETE job (only if it belongs to logged-in user)
router.delete("/:id", async (req, res) => {
  const db = req.app.locals.db;
  const userId = req.user.userId;

  const id = parseInt(req.params.id);

  try {
    const job = await db.get(
      "SELECT id, company, title, status FROM jobs WHERE id = ? AND user_id = ?",
      [id, userId]
    );

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    await db.run(
      "DELETE FROM jobs WHERE id = ? AND user_id = ?",
      [id, userId]
    );

    res.json({
      message: "Job deleted",
      job
    });
  } catch (err) {
    res.status(500).json({ message: "Database error" });
  }
});

export default router;