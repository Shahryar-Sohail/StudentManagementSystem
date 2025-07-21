import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddStudent from './pages/AddStudent';
import Attendance from './pages/Attendance';
import Login from './pages/Login';
import 'flowbite';
import './index.css';

function App() {
  return (
    <Routes>
      {/* <Route path="/home" element={<Home />} /> */}
      <Route path="/addStudent" element={<AddStudent />} />
      <Route path="/attendance" element={<Attendance />} />
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} /> {/* Optional: default route */}
    </Routes>
  );
}

export default App;
