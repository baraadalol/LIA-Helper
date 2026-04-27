import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "data", "lia.db");

// skapa mapp om den inte finns
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new Database(dbPath);

// skapa tabeller om de inte finns
db.exec(`
CREATE TABLE IF NOT EXISTS companies (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  website TEXT,
  location TEXT,
  notes TEXT
);

CREATE TABLE IF NOT EXISTS applications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  company_id INTEGER,
  status TEXT,
  priority INTEGER,
  FOREIGN KEY (company_id) REFERENCES companies(id)
);
`);

export default db;
