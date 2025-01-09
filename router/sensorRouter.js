// router/sensorRouter.js
const express = require('express');
const Sensor = require('../model/sensor');

const router = express.Router();

// Mendapatkan semua data sensor
router.get('/', async (req, res) => {
    try {
        const sensors = await Sensor.getAll();
        res.json(sensors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Menambahkan data sensor baru
router.post('/', async (req, res) => {
    const { temperature, humidity, water_sensor, motion_sensor, door_locked, door, lamp } = req.body;
    console.log(req.body);

    try {
        const newSensor = await Sensor.create(temperature, humidity, water_sensor, motion_sensor, door_locked, door, lamp);
        res.status(201).json(newSensor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Memperbarui data sensor tertentu (partial update)
// router/sensorRouter.js
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    
    try {
        // Dapatkan data sensor yang ada
        const currentSensor = await Sensor.getById(id);
        if (!currentSensor) {
            return res.status(404).json({ message: 'Sensor not found' });
        }

        // Update sensor dengan data baru
        const updatedSensor = await Sensor.update(id, updates);
        res.json(updatedSensor);
    } catch (error) {
        console.error('Error updating sensor:', error);
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;

