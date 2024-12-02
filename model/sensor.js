// model/Sensor.js
const pool = require('./db');

const Sensor = {
    getAll: async () => {
        const res = await pool.query('SELECT * FROM sensors');
        return res.rows;
    },
    create: async (temperature, humidity, water_sensor, sensor_pir, sensor_api) => {
        const res = await pool.query(`
            INSERT INTO sensors (temperature, humidity, water_sensor, sensor_pir, sensor_api, created_at)
            VALUES ($1, $2, $3, $4, $5, NOW()) -- NOW() untuk timestamp saat ini
            RETURNING *;
        `, [temperature, humidity, water_sensor, sensor_pir, sensor_api]);
        return res.rows[0];
    },
};

module.exports = Sensor;
