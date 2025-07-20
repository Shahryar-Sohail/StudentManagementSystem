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
    <>
      <Navbar />


      <div className='flex justify-center mt-10 text-4xl text-gray-700  '>
        <h1>Login Page</h1>
      </div>
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

      <div className='flex justify-center mt-5 '>
        <button data-tooltip-target="tooltip-default" type="button" class="text-white bg-red-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Credentials Here</button>

        <div id="tooltip-default" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700">
          Username: admin<br />
          Password: admin
          <div class="tooltip-arrow" data-popper-arrow></div>
        </div>
      </div>


    </>

  );
}
