const pool = require('./db');

const Sensor = {
    // Ambil semua data sensor
    getAll: async () => {
        try {
            const res = await pool.query('SELECT * FROM sensors ORDER BY created_at DESC');
            return res.rows;
        } catch (error) {
            console.error('Error fetching sensors:', error);
            throw new Error('Failed to fetch sensors');
        }
    },

    // Buat entri sensor baru
    create: async (temperature, humidity, water_sensor, motion_sensor, door_locked, door, lamp) => {
        try {
            const res = await pool.query(`
                INSERT INTO sensors (temperature, humidity, water_sensor, motion_sensor, door_locked, door, lamp, created_at)
                VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
                RETURNING *;
            `, [temperature, humidity, water_sensor, motion_sensor, door_locked, door, lamp]);

            return res.rows[0];
        } catch (error) {
            console.error('Error creating sensor:', error);
            throw new Error('Failed to create sensor');
        }
    },

    // Perbarui data sensor
    update: async (id, data) => {
        const { temperature, humidity, water_sensor, motion_sensor, door_locked, door, lamp } = data;

        // Validasi jika tidak ada data yang diberikan
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
            // Gunakan COALESCE untuk mempertahankan nilai lama jika data baru bernilai undefined atau null
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
            `, [
                temperature ?? null, // Jika undefined, set ke null
                humidity ?? null,
                water_sensor ?? null,
                motion_sensor ?? null,
                door_locked ?? null,
                door ?? null,
                lamp ?? null,
                id
            ]);

            // Kembalikan hasil update
            return res.rows[0];
        } catch (error) {
            console.error('Error updating sensor:', error);
            throw new Error('Failed to update sensor');
        }
    }
};

module.exports = Sensor;
