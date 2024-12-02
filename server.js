// server.js
const express = require('express');
const cors = require('cors'); // Import cors
const sensorRouter = require('./router/sensorRouter');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());

// Menggunakan router
app.use('/api/sensors', sensorRouter);

// Menjalankan server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
