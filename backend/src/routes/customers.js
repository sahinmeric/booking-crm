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

//GET all customers with reservation details
router.get('/', (req, res) => {
  const query = `
    SELECT 
      customers.id AS customerId, 
      customers.name AS customerName, 
      customers.phone AS customerPhone, 
      customers.email AS customerEmail,
      reservations.id AS reservationId,
      reservations.reservationDate, 
      reservations.numberOfPeople, 
      tables.tableName, 
      tables.tableDescription, 
      tables.capacity, 
      tables.tableNumber
    FROM customers
    LEFT JOIN reservations ON reservations.customerId = customers.id
    LEFT JOIN tables ON reservations.tableId = tables.id;
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Group reservations by customer
    const customers = rows.reduce((acc, row) => {
      const customer = acc.find(c => c.customerId === row.customerId);

      if (!customer) {
        acc.push({
          customerId: row.customerId,
          customerName: row.customerName,
          customerPhone: row.customerPhone,
          customerEmail: row.customerEmail,
          reservations: row.reservationId ? [{
            reservationId: row.reservationId,
            reservationDate: row.reservationDate,
            numberOfPeople: row.numberOfPeople,
            tableName: row.tableName,
            tableDescription: row.tableDescription,
            capacity: row.capacity,
            tableNumber: row.tableNumber
          }] : []
        });
      } else if (row.reservationId) {
        customer.reservations.push({
          reservationId: row.reservationId,
          reservationDate: row.reservationDate,
          numberOfPeople: row.numberOfPeople,
          tableName: row.tableName,
          tableDescription: row.tableDescription,
          capacity: row.capacity,
          tableNumber: row.tableNumber
        });
      }

      return acc;
    }, []);

    res.json(customers);
  });
});


module.exports = router;
