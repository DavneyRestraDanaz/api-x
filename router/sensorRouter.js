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
    const { temperature, humidity, water_sensor, sensor_pir, sensor_api } = req.body;
    console.log(req.body);

    try {
        const newSensor = await Sensor.create(temperature, humidity, water_sensor, sensor_pir, sensor_api);
        res.status(201).json(newSensor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
