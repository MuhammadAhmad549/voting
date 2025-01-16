import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatDistance, startOfDay, endOfDay, isBefore, isAfter } from 'date-fns';
import 'animate.css'; // Import animation library


const parties = [
  { name: 'Pakistan Tehreek-e-Insaf', logo: '/pti.jpeg', path: '/vote/Pakistan Tehreek-e-Insaf' },
  { name: 'Pakistan Muslim League (N)', logo: '/pmln.jpeg', path: '/vote/Pakistan Muslim League (N)' },
  { name: 'Pakistan Peoples Party', logo: '/ppp.jpeg', path: '/vote/Pakistan Peoples Party' },
  { name: 'Jamaat-e-Islami', logo: '/jamat.jpeg', path: '/vote/Jamaat-e-Islami' },
];

const Home = () => {
  const [timeMessage, setTimeMessage] = useState('');

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const today = startOfDay(now);
      const start = new Date(today.setHours(20, 0, 0)); 
      const end = new Date(today.setHours(9, 0, 0)); 

      if (isBefore(now, start)) {
        setTimeMessage(`Voting starts in ${formatDistance(start, now, { addSuffix: true })}`);
      } else if (isAfter(now, end)) {
        setTimeMessage('Voting has ended for today');
      } else {
        setTimeMessage(`Voting ends in ${formatDistance(end, now, { addSuffix: true })}`);
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 animate__animated animate__fadeIn">
       
      <h1 className="text-3xl font-bold mb-8">Vote for Your Party</h1>
      <div className="mb-8 p-4 bg-blue-600 text-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Voting Status</h2>
        <p className="text-lg">{timeMessage}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {parties.map((party, index) => (
          <Link
            key={index}
            to={party.path}
            className="flex items-center justify-between bg-blue-500 text-white p-4 rounded-md hover:bg-blue-700 transition-transform transform hover:scale-105 hover:shadow-lg animate__animated animate__zoomIn"
          >
            <span className="text-lg font-semibold">{party.name}</span>
            <img src={party.logo} alt={`${party.name} logo`} className="h-10 w-10 rounded-full border" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
