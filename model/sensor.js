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
    
    // Add the update method
    update: async (id, data) => {
        const { temperature, humidity, water_sensor, motion_sensor, door_locked, door, lamp } = data;

        // Build the set clause dynamically based on provided data
        let setClause = '';
        let values = [];
        let counter = 1;

        if (temperature !== undefined) {
            setClause += `temperature = $${counter}, `;
            values.push(temperature);
            counter++;
        }
        if (humidity !== undefined) {
            setClause += `humidity = $${counter}, `;
            values.push(humidity);
            counter++;
        }
        if (water_sensor !== undefined) {
            setClause += `water_sensor = $${counter}, `;
            values.push(water_sensor);
            counter++;
        }
        if (motion_sensor !== undefined) {
            setClause += `motion_sensor = $${counter}, `;
            values.push(motion_sensor);
            counter++;
        }
        if (door_locked !== undefined) {
            setClause += `door_locked = $${counter}, `;
            values.push(door_locked);
            counter++;
        }
        if (door !== undefined) {
            setClause += `door = $${counter}, `;
            values.push(door);
            counter++;
        }
        if (lamp !== undefined) {
            setClause += `lamp = $${counter}, `;
            values.push(lamp);
            counter++;
        }

        // Remove the last comma and space
        setClause = setClause.slice(0, -2);

        // Add the id at the end of the values array
        values.push(id);

        // Execute the query to update the sensor data
        const res = await pool.query(`
            UPDATE sensors
            SET ${setClause}
            WHERE id = $${counter}
            RETURNING *;
        `, values);

        // Return the updated sensor data
        return res.rows[0];
    }
};

module.exports = Sensor;
