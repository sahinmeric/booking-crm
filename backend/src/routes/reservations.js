const express = require('express');
const router = express.Router();
const db = require('../db')

// Updated GET /api/reservations with full details
router.get('/', (req, res) => {
  const query = `
    SELECT 
      reservations.id, 
      reservations.reservationDate, 
      reservations.numberOfPeople, 
      customers.name AS customerName, 
      customers.phone AS customerPhone, 
      customers.email AS customerEmail,
      tables.tableName, 
      tables.tableDescription, 
      tables.capacity, 
      tables.tableNumber
    FROM reservations
    JOIN customers ON reservations.customerId = customers.id
    JOIN tables ON reservations.tableId = tables.id;
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});



// Create a new reservation
router.post('/', (req, res) => {
  const { customerId, tableId, reservationDate, numberOfPeople } = req.body;

  // Check if the customer exists
  const customerQuery = 'SELECT id FROM customers WHERE id = ?';
  db.get(customerQuery, [customerId], (customerErr, customer) => {
    if (customerErr) {
      return res.status(500).json({ error: customerErr.message });
    }
    if (!customer) {
      return res.status(400).json({ error: 'Invalid customer ID' });
    }

    // Check if the table exists
    const tableQuery = 'SELECT id FROM tables WHERE id = ?';
    db.get(tableQuery, [tableId], (tableErr, table) => {
      if (tableErr) {
        return res.status(500).json({ error: tableErr.message });
      }
      if (!table) {
        return res.status(400).json({ error: 'Invalid table ID' });
      }

      // If both customer and table exist, proceed to create the reservation
      const reservationQuery = `
        INSERT INTO reservations (customerId, tableId, reservationDate, numberOfPeople)
        VALUES (?, ?, ?, ?)
      `;
      db.run(
        reservationQuery,
        [customerId, tableId, reservationDate, numberOfPeople],
        function (reservationErr) {
          if (reservationErr) {
            return res.status(500).json({ error: reservationErr.message });
          }
          res.status(201).json({ id: this.lastID });
        }
      );
    });
  });
});

router.delete('/:id', (req, res) => {
  const reservationId = req.params.id;

  const deleteReservationQuery = `DELETE FROM reservations WHERE id = ?`;
  db.run(deleteReservationQuery, [reservationId], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: `Reservation with ID ${reservationId} has been deleted.` });
  });
});

module.exports = router;
