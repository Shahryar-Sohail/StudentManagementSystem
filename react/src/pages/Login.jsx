import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/LoginNavbar';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate(); // ✅ hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    setMsg(data.message);

    if (res.ok) {
      localStorage.setItem('token', data.token); // ✅ Save token here
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />


      <div className='flex justify-center mt-10 text-4xl text-gray-700  dark:text-white'>
        <h1>Login Page</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-11/12 lg:w-1/2 mx-auto my-10 p-8 bg-white rounded shadow dark:bg-gray-800"
      >
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Enter Username"
            id="username"
            className="w-full max-w-md px-4 py-2 border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-6 flex justify-center">
          <input
            type="password"
            placeholder="*********"
            id="password"
            className="w-full max-w-md px-4 py-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex justify-center">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Sign in
          </button>
        </div>

        <p className="text-center mt-4 text-red-500">{msg}</p>
      </form>

      <div className='flex justify-center '>
        
        <div className="dark:text-white text-gray-500">
          Username: <span className='text-red-500'>admin</span> <br />
          Password: <span className='text-green-500'>admin</span>
        </div>         
      </div>
    </div>

  );
}
