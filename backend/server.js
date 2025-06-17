const express = require('express')
const mongoose = require('mongoose');
const app = express()
const port = 3000



// connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mydb')
  .then(() => {
    console.log('✅ MongoDB connected');
    
  })
  .catch((err) => {
    console.error('❌ Connection error:', err);
  });

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

const User = mongoose.model('User', userSchema);

app.get('/', (req, res) => {
  res.send('Hello wor')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})