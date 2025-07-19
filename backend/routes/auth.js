const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // ✅ add this
const router = express.Router();
const Login = require('../models/Login');

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Login.findOne({ username });

    if (!user) return res.status(401).json({ message: 'Invalid username' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Wrong password' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Login Error:', err); // ✅ this logs the actual error
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
