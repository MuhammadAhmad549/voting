import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const parties = [
  { name: 'Pakistan Tehreek-e-Insaf', logo: '/pti.jpeg', path: '/vote/Pakistan Tehreek-e-Insaf' },
  { name: 'Pakistan Muslim League (N)', logo: '/pmln.jpeg', path: '/vote/Pakistan Muslim League (N)' },
  { name: 'Pakistan Peoples Party', logo: '/ppp.jpeg', path: '/vote/Pakistan Peoples Party' },
  { name: 'Jamaat-e-Islami', logo: '/jamat.jpeg', path: '/vote/Jamaat-e-Islami' },
];

const AdminDashboard = () => {
  const [voteCounts, setVoteCounts] = useState([]);

  useEffect(() => {
    const fetchVoteCounts = async () => {
      try {
        const response = await axios.get('/api/admin/voteCounts');
        setVoteCounts(response.data);
      } catch (error) {
        console.error('Error fetching vote counts:', error);
      }
    };

    fetchVoteCounts();
  }, []);

  const data = {
    labels: voteCounts.map((party) => party.name),
    datasets: [
      {
        label: 'Votes',
        data: voteCounts.map((party) => party.count),
        backgroundColor: ['rgba(75, 192, 192, 0.8)', 'rgba(153, 102, 255, 0.8)', 'rgba(255, 159, 64, 0.8)', 'rgba(255, 99, 132, 0.8)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Vote Count by Party', font: { size: 20 } },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { font: { size: 14 } },
      },
      x: {
        ticks: { font: { size: 14 } },
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-8 flex-shrink-0">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <h2 className="text-xl font-semibold">Vote Counting</h2>
        <ul className="mt-6 space-y-4">
          <li className="text-lg font-medium hover:text-gray-300 cursor-pointer">Overview</li>
          <li className="text-lg font-medium hover:text-gray-300 cursor-pointer">Reports</li>
          <li className="text-lg font-medium hover:text-gray-300 cursor-pointer">Settings</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-100">
        <div className="bg-white h-full p-6 rounded-lg shadow-md">
          <div className="h-96 md:h-auto">
            {/* Bar Chart */}
            <Bar data={data} options={options} />
          </div>

          {/* Party Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {parties.map((party, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center flex flex-col items-center">
                <img src={party.logo} alt={`${party.name} logo`} className="w-16 h-16 mb-4 rounded-full" />
                <h3 className="text-xl font-bold">{party.name}</h3>
                <p className="text-gray-700 mt-2">
                  Votes: {voteCounts[index] ? voteCounts[index].count : 0}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
