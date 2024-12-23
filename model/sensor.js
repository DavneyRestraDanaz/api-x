// model/Sensor.js
const pool = require('./db');

const Sensor = {
    getAll: async () => {
        const res = await pool.query('SELECT * FROM sensors');
        return res.rows;
    },
    create: async (temperature, humidity, water_sensor, motion_sensor, door_locked, door, lamp) => {
        const res = await pool.query(`
            INSERT INTO sensors (temperature, humidity, water_sensor, motion_sensor, door_locked, door, lamp, created_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
            RETURNING *;
        `, [temperature, humidity, water_sensor, motion_sensor, door_locked, door, lamp]);
        return res.rows[0];
    },
};

module.exports = Sensor;
