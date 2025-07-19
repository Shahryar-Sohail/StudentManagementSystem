const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Login = require('./models/Login');

mongoose.connect('mongodb://localhost:27017/mydb') // use your DB name
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('DB error', err));

async function hashPassword() {
  const user = await Login.findOne({ username: 'admin' }); // exact match ✅

  if (!user) return console.log('User not found');

  const hashed = await bcrypt.hash('admin', 10);
  user.password = hashed;
  await user.save();

  console.log('✅ Password hashed and updated');
  mongoose.disconnect();
}

hashPassword();
