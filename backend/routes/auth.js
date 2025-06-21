const express = require('express');
const router = express.Router();
const Login = require('../models/Login');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Login.findOne({ username });

    if (!user) return res.status(401).json({ message: 'Invalid username' });
    if (user.password !== password) return res.status(401).json({ message: 'Wrong password' });

    res.json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
