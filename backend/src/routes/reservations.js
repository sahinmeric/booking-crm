const express = require('express');
const router = express.Router();
const db = require('../db')

// Get all reservations
router.get('/', (req, res) => {
  db.all('SELECT * FROM reservations', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Create a new reservation
router.post('/', (req, res) => {
  const { customer, reservationDate, numberOfPeople, tableNumber } = req.body;
  db.run('INSERT INTO reservations (customer, reservationDate, numberOfPeople, tableNumber) VALUES (?, ?, ?, ?)',
    [customer, reservationDate, numberOfPeople, tableNumber],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID });
    });
});

module.exports = router;
