const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: String,          // You can use your custom ID like "f2022065132"
    required: true
  },
  name: {
    type: String,          // Student name (optional, helpful for display)
    required: true
  },
  date: {
    type: String,          // Format: "2025-06-17"
    required: true
  },
  isPresent: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('Attendance', attendanceSchema);
