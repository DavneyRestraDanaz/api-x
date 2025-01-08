// model/Sensor.js
const pool = require('./db');

const Sensor = {
    getAll: async () => {
        const res = await pool.query('SELECT * FROM sensors ORDER BY created_at DESC');
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
    
    update: async (id, data) => {
        const { temperature, humidity, water_sensor, motion_sensor, door_locked, door, lamp } = data;

        // Validasi apakah ada data yang diberikan
        if (
            temperature === undefined &&
            humidity === undefined &&
            water_sensor === undefined &&
            motion_sensor === undefined &&
            door_locked === undefined &&
            door === undefined &&
            lamp === undefined
        ) {
            throw new Error('No fields provided to update');
        }

        try {
            // Gunakan COALESCE untuk menyimpan nilai lama jika data baru bernilai undefined
            const res = await pool.query(`
                UPDATE sensors
                SET 
                    temperature = COALESCE($1, temperature),
                    humidity = COALESCE($2, humidity),
                    water_sensor = COALESCE($3, water_sensor),
                    motion_sensor = COALESCE($4, motion_sensor),
                    door_locked = COALESCE($5, door_locked),
                    door = COALESCE($6, door),
                    lamp = COALESCE($7, lamp)
                WHERE id = $8
                RETURNING *;
            `, [temperature, humidity, water_sensor, motion_sensor, door_locked, door, lamp, id]);

            return res.rows[0];
        } catch (error) {
            console.error('Error updating sensor:', error);
            throw new Error('Failed to update sensor');
        }
    }
};

module.exports = Sensor;
