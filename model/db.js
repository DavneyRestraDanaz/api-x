// model/db.js
const { Pool } = require('pg');
require('dotenv').config(); // Memuat variabel lingkungan

const pool = new Pool({
    user: process.env.DB_USER, // Mengambil dari variabel lingkungan
    host: process.env.DB_HOST, // Mengambil dari variabel lingkungan
    database: process.env.DB_NAME, // Mengambil dari variabel lingkungan
    password: process.env.DB_PASS, // Mengambil dari variabel lingkungan
    port: process.env.DB_PORT, // Mengambil dari variabel lingkungan
});

module.exports = pool;
