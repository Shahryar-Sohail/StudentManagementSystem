const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');

// 🔹 POST: Mark attendance
router.post('/', async (req, res) => {
  try {
    const newAttendance = new Attendance(req.body);
    await newAttendance.save();
    res.status(201).json(newAttendance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 🔹 GET: Fetch all attendance records
router.get('/', async (req, res) => {
  try {
    const attendance = await Attendance.find();
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
