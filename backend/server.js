const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User'); 
const Attendance = require('./models/Attendance.js');
const studentRoutes = require('./routes/studentRoutes.js'); 
const attendanceRoutes = require('./routes/attendanceRoutes');
const authRoutes = require('./routes/auth');
require('dotenv').config(); 



const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());   

// Middleware
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET; // Use environment variable for JWT secret


// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/mydb')
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ Connection error:', err));

// Sample route
app.get('/', async (req, res) => {
  const students = await User.find();

  // Serve HTML + inline script to log data in browser console
  res.send(`
    <h1>✅ Express backend working</h1>
    <script>
      const data = ${JSON.stringify(students)};
      console.log("📦 Student Data from MongoDB:", data);
    </script>
  `);
});


//Sample Attendance 
app.get('/attendance-log', async (req, res) => {
  const attendance = await Attendance.find();

  res.send(`
    <h1>📅 Attendance Data Loaded</h1>
    <script>
      const attendanceData = ${JSON.stringify(attendance)};
      console.log("🧾 Attendance Data from MongoDB:", attendanceData);
    </script>
  `);
});


// Mounts all routes from studentRoutes.js
app.use('/api/students', studentRoutes); 

// Mounts all routes from attendanceRoutes.js
app.use('/api/attendance', attendanceRoutes);

// Routes
app.use('/api', authRoutes);


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

//Image Fix
app.use('/asset', express.static('public/asset'));

