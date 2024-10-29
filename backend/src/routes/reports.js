const express = require('express');
const PDFDocument = require('pdfkit');
const ExcelJS = require('exceljs');
const db = require('../db'); // Adjust the path to your db.js file

const router = express.Router();

// PDF generation endpoint
router.get('/pdf', async (req, res) => {
  const doc = new PDFDocument();
  let filename = 'reservations_report.pdf';
  res.setHeader('Content-disposition', `attachment; filename=${filename}`);
  res.setHeader('Content-type', 'application/pdf');

  const reservations = await new Promise((resolve, reject) => {
    db.all(`SELECT * FROM reservations 
            INNER JOIN customers ON reservations.customerId = customers.id
            INNER JOIN tables ON reservations.tableId = tables.id`,
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
  });

  doc.pipe(res);
  doc.fontSize(20).text('Reservations Report', { align: 'center' });
  doc.moveDown();

  reservations.forEach(reservation => {
    doc.fontSize(12).text(`Reservation ID: ${reservation.id}`);
    doc.text(`Customer: ${reservation.name} (${reservation.email})`);
    doc.text(`Table: ${reservation.tableName}`);
    doc.text(`Date: ${reservation.reservationDate}`);
    doc.text(`People: ${reservation.numberOfPeople}`);
    doc.moveDown();
  });

  doc.end();
});

// Excel generation endpoint
router.get('/excel', async (req, res) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Reservations');

  worksheet.columns = [
    { header: 'ID', key: 'id', width: 10 },
    { header: 'Customer', key: 'customerName', width: 30 },
    { header: 'Table', key: 'tableName', width: 30 },
    { header: 'Date', key: 'reservationDate', width: 30 },
    { header: 'People', key: 'numberOfPeople', width: 10 },
  ];

  const reservations = await new Promise((resolve, reject) => {
    db.all(`SELECT * FROM reservations 
            INNER JOIN customers ON reservations.customerId = customers.id
            INNER JOIN tables ON reservations.tableId = tables.id`,
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
  });

  reservations.forEach(reservation => {
    worksheet.addRow({
      id: reservation.id,
      customerName: reservation.name,
      tableName: reservation.tableName,
      reservationDate: reservation.reservationDate,
      numberOfPeople: reservation.numberOfPeople,
    });
  });

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename=reservations_report.xlsx');

  await workbook.xlsx.write(res);
  res.end();
});

module.exports = router;
