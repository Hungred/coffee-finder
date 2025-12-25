import Database from 'better-sqlite3';
const db = new Database('cafes.db');

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS cafes (
    id TEXT PRIMARY KEY,
    name TEXT,
    city TEXT,
    wifi INTEGER,
    seat INTEGER,
    quiet INTEGER,
    tasty INTEGER,
    cheap INTEGER,
    music INTEGER,
    url TEXT,
    address TEXT,
    latitude TEXT,
    longitude TEXT,
    limited_time TEXT,
    socket TEXT,
    standing_desk TEXT,
    mrt TEXT,
    open_time TEXT
    )
    `
).run();

export default db;
