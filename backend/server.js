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

// ✅ Dynamic port for Render
const port = process.env.PORT || 3000;

// ✅ CORS: open for all (during development)
app.use(cors());

// ✅ Middleware
app.use(express.json());

// ✅ JWT secret from .env
const JWT_SECRET = process.env.JWT_SECRET;

// ✅ MongoDB Atlas connection using MONGO_URI from .env
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Atlas connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Test route
app.get('/', async (req, res) => {
  const students = await User.find();
  res.send(`
    <h1>✅ Express backend working</h1>
    <script>
      const data = ${JSON.stringify(students)};
      console.log("📦 Student Data from MongoDB:", data);
    </script>
  `);
});

// ✅ Test Attendance route
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

// ✅ Routes
app.use('/api/students', studentRoutes); 
app.use('/api/attendance', attendanceRoutes);
app.use('/api', authRoutes);

// ✅ Serve static files
app.use('/asset', express.static('public/asset'));

// ✅ Start server
app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
});
