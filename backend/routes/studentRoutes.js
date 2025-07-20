const express = require('express');
const router = express.Router();
const User = require('../models/User');

// 🔹 GET all students
router.get('/', async (req, res) => {
  const search = req.query.search || '';
  const students = await User.find({
    name: { $regex: search, $options: 'i' } // case-insensitive search
  });
  res.json(students);
});


// 🔹 GET single student by ID
router.get('/:id', async (req, res) => {
  const student = await User.findById(req.params.id);
  res.json(student);
});

// 🔹 POST: Add new student
router.post('/', async (req, res) => {
  const newStudent = new User(req.body);
  await newStudent.save();
  res.status(201).json(newStudent);
});

// 🔹 PUT: Update student by ID
router.put('/:id', async (req, res) => {
  const updatedStudent = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedStudent);
});

// 🔹 DELETE: Remove student by ID
router.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'Student deleted' });
});

module.exports = router;
