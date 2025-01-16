import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-xl font-bold">Voting System</h1>
        <div className="space-x-4">
          {/* Render Home and About Us if logged in */}
          {isLoggedIn ? (
            <>
              <Link
                to="/home"
                className="bg-white text-blue-600 px-6 py-2 rounded-lg shadow-lg hover:bg-gray-200 transition-all"
              >
                Home
              </Link>
              <Link
                to="/about-us"
                className="bg-white text-blue-600 px-6 py-2 rounded-lg shadow-lg hover:bg-gray-200 transition-all"
              >
                About Us
              </Link>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
