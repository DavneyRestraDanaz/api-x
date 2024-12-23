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
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { temperature, humidity, water_sensor, motion_sensor, door_locked, door, lamp } = req.body;
    
    try {
        const updatedSensor = await Sensor.update(id, {
            temperature,
            humidity,
            water_sensor,
            motion_sensor,
            door_locked,
            door,
            lamp
        });

        if (!updatedSensor) {
            return res.status(404).json({ message: 'Sensor not found' });
        }

        res.json(updatedSensor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
