import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function initDB() {
  const db = await open({
    filename: "./database/jobtracker.db",
    driver: sqlite3.Database
  });

  // Users table
  await db.exec(
    "CREATE TABLE IF NOT EXISTS users (" +
      "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
      "email TEXT UNIQUE NOT NULL, " +
      "password TEXT NOT NULL" +
    ");"
  );

  // Jobs table (includes user_id)
  await db.exec(
    "CREATE TABLE IF NOT EXISTS jobs (" +
      "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
      "company TEXT NOT NULL, " +
      "title TEXT NOT NULL, " +
      "status TEXT NOT NULL, " +
      "user_id INTEGER NOT NULL, " +
      "FOREIGN KEY(user_id) REFERENCES users(id)" +
    ");"
  );

  return db;
}