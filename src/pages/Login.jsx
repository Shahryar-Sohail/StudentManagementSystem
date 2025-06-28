import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Navbar from '../components/Navbar';       

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate(); // ✅ hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    setMsg(data.message);

    if (res.ok) {
      navigate('/home'); // ✅ react-router navigation
    }
  };

  return (
    <>
      <Navbar />

      <form
        onSubmit={handleSubmit}
        className="w-11/12 lg:w-1/2 mx-auto my-10 p-8 bg-white rounded shadow"
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
    </>
  );
}
