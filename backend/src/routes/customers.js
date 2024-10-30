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
          id: row.customerId,
          name: row.customerName,
          phone: row.customerPhone,
          email: row.customerEmail,
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

router.delete('/:id', (req, res) => {
  const customerId = req.params.id;

  // First, delete associated reservations
  const deleteReservationsQuery = `DELETE FROM reservations WHERE customerId = ?`;
  db.run(deleteReservationsQuery, [customerId], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Next, delete the customer
    const deleteCustomerQuery = `DELETE FROM customers WHERE id = ?`;
    db.run(deleteCustomerQuery, [customerId], function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: `Customer with ID ${customerId} and associated reservations have been deleted.` });
    });
  });
});

router.put('/:id', (req, res) => {
  const customerId = req.params.id;
  const { name, phone, email } = req.body;

  const updateCustomerQuery = `UPDATE customers SET name = ?, phone = ?, email = ? WHERE id = ?`;
  db.run(updateCustomerQuery, [name, phone, email, customerId], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: `Customer with ID ${customerId} not found.` });
    }
    res.json({ message: `Customer with ID ${customerId} has been updated.` });
  });
});


module.exports = router;
