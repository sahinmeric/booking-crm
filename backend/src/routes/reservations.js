const express = require('express');
const router = express.Router();

// Get all reservations
router.get('/', (req, res) => {
  db.all('SELECT * FROM reservations', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

module.exports = router;
