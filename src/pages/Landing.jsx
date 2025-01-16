import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const LandingPage = () => {
  const navigate = useNavigate();

  // Check if the user is already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      navigate('/home');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600 text-white">
      <div className="text-center animate-fadeIn">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Voting System</h1>
        <p className="mb-8">Your vote matters. Sign up or sign in to get started!</p>
        <div className="space-x-4">
          <button
            onClick={() => navigate('/signup')}
            className="bg-white text-blue-600 px-6 py-2 rounded-lg shadow-lg hover:bg-gray-200 transition-all"
          >
            Sign Up
          </button>
          <button
            onClick={() => navigate('/signin')}
            className="bg-white text-blue-600 px-6 py-2 rounded-lg shadow-lg hover:bg-gray-200 transition-all"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
