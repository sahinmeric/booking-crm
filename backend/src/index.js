const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

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


app.get('/', (req, res) => {
  res.send('Welcome to the Booking CRM API!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
