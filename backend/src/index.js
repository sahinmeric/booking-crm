const express = require('express');
const cors = require('cors');
const db = require('./db');
const reservationsRouter = require('./routes/reservations');
const tablesRouter = require('./routes/tables');
const customersRouter = require('./routes/customers');
const reportsRouter = require('./routes/reports');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api/reservations', reservationsRouter);
app.use('/api/tables', tablesRouter);
app.use('/api/customers', customersRouter);
app.use('/api/reports', reportsRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the Booking CRM API!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
