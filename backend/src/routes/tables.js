const express = require('express');
const db = require('../db'); // Adjust the path as necessary
const router = express.Router();

// POST: Add a new table
router.post('/', (req, res) => {
  const { tableName, tableDescription, capacity, tableNumber } = req.body;

  const sql = `INSERT INTO tables (tableName, tableDescription, capacity, tableNumber) 
               VALUES (?, ?, ?, ?)`;

  db.run(sql, [tableName, tableDescription, capacity, tableNumber], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, tableName, tableDescription, capacity, tableNumber });
  });
});

// GET: Retrieve all tables
router.get('/', (req, res) => {
  const sql = `SELECT * FROM tables`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json(rows);
  });
});

router.delete('/:id', (req, res) => {
  const tableId = req.params.id;

  // First, delete associated reservations
  const deleteReservationsQuery = `DELETE FROM reservations WHERE tableId = ?`;
  db.run(deleteReservationsQuery, [tableId], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Next, delete the table
    const deleteTableQuery = `DELETE FROM tables WHERE id = ?`;
    db.run(deleteTableQuery, [tableId], function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: `Table with ID ${tableId} and associated reservations have been deleted.` });
    });
  });
});

// Update a table
router.put('/:id', (req, res) => {
  const tableId = req.params.id;
  const { tableName, tableDescription, capacity, tableNumber } = req.body;

  const updateTableQuery = `UPDATE tables SET tableName = ?, tableDescription = ?, capacity = ?, tableNumber = ? WHERE id = ?`;
  db.run(updateTableQuery, [tableName, tableDescription, capacity, tableNumber, tableId], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: `Table with ID ${tableId} not found.` });
    }
    res.json({ message: `Table with ID ${tableId} has been updated.` });
  });
});

module.exports = router;
