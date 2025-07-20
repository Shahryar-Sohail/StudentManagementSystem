const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: String,
  name: String,
  gender: String,
  degree: String,
  semester: String,
  cgpa: Number,
  email: String,
  contact: String,
  image: String,
  isPresent: Boolean
});

module.exports = mongoose.model('User', userSchema);
// This code defines a Mongoose schema for a User model in a MongoDB database.