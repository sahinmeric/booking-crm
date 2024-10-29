const express = require('express');
const db = require('../db'); // Adjust the path as necessary
const router = express.Router();

// POST: Add a new customer
router.post('/', (req, res) => {
  const { name, email, phone } = req.body;

  const sql = `INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)`;

  db.run(sql, [name, email, phone], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, name, email, phone });
  });
});

// GET: Retrieve all customers
router.get('/', (req, res) => {
  const sql = `SELECT * FROM customers`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json(rows);
  });
});

module.exports = router;
