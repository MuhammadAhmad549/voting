import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Admin login API call
      await axios.post('/api/admin/login', credentials);
      localStorage.setItem('isAdminLoggedIn', true);
      navigate('/admin/dashboard');  // Redirect to admin dashboard
    } catch (error) {
      console.error("Error signing in admin", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-8 rounded-lg shadow-md" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Email</label>
          <input type="email" name="email" onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Password</label>
          <input type="password" name="password" onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
