import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "data", "lia.db");

export const db = new Database(dbPath);
db.pragma("foreign_keys = ON");
