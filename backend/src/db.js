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
  // Create customers table
  db.run(`CREATE TABLE IF NOT EXISTS customers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE
        )`, (err) => {
    if (err) {
      console.error('Error creating customers table:', err.message);
    } else {
      console.log('Customers table created.');
    }
  });

  // Create reservations table with a foreign key reference to customers
  db.run(`CREATE TABLE IF NOT EXISTS reservations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            customerId INTEGER NOT NULL,
            reservationDate TEXT NOT NULL,
            numberOfPeople INTEGER NOT NULL,
            tableNumber INTEGER NOT NULL,
            FOREIGN KEY (customerId) REFERENCES customers(id) ON DELETE CASCADE
        )`, (err) => {
    if (err) {
      console.error('Error creating reservations table:', err.message);
    } else {
      console.log('Reservations table created.');
    }
  });
});

module.exports = db;
