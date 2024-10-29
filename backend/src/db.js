const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    console.error('Could not connect to database', err);
  } else {
    console.log('Connected to SQLite database.');
  }
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS reservations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            customer TEXT NOT NULL,
            reservationDate TEXT NOT NULL,
            numberOfPeople INTEGER NOT NULL,
            tableNumber INTEGER NOT NULL
        )`, (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      console.log('Reservations table created.');
    }
  });
});

module.exports = db;
