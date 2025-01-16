import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const SignIn = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '', idCard: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'idCard') {
      // Allow only numbers and format the ID card number as XXXXX-XXXXXXX-X
      const formattedValue = value.replace(/\D/g, '').replace(/(\d{5})(\d{7})(\d{1})/, '$1-$2-$3');
      setCredentials({ ...credentials, idCard: formattedValue });
    } else {
      setCredentials({ ...credentials, [name]: value });
    }
  };

  const submitIdCard = (idCard) => {
    const idCardPattern = /^\d{5}-\d{7}-\d{1}$/;
    return idCardPattern.test(idCard);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, idCard } = credentials;

    if (!submitIdCard(idCard)) {
      setError('Invalid ID card number format. It should be in the format XXXXX-XXXXXXX-X.');
      return;
    }

    try {
      await axios.post('/api/signin', { email, password, idCard });
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userIdCard', idCard);
      navigate('/home');
    } catch (error) {
      console.error("Error signing in", error);
      setError('Error signing in. Please check your credentials.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-8 rounded-lg shadow-md animate-slideIn" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-6">Sign In</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Email</label>
          <input 
            type="email" 
            name="email" 
            required 
            onChange={handleChange} 
            className="w-full px-4 py-2 border rounded-md" 
          />
        </div>
        <div className="mb-4 relative">
          <label className="block mb-2 text-sm font-medium">Password</label>
          <input 
            type={showPassword ? "text" : "password"} 
            name="password" 
            required 
            onChange={handleChange} 
            className="w-full px-4 py-2 border rounded-md" 
          />
          <span 
            className="absolute right-3 top-9 cursor-pointer text-gray-600" 
            onClick={togglePasswordVisibility}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </span>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">ID Card Number</label>
          <input 
            type="text" 
            name="idCard" 
            value={credentials.idCard}
            required 
            maxLength="15"
            placeholder="00000-0000000-0" 
            onChange={handleChange} 
            className="w-full px-4 py-2 border rounded-md" 
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">Sign In</button>
        <p className="mt-4">Don't have an account? <Link to="/signup" className="text-blue-600">Sign Up</Link></p>
      </form>
    </div>
  );
};

export default SignIn;
