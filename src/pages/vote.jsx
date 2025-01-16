import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import InputMask from 'react-input-mask';

const PartyVote = () => {
  const { partyId } = useParams();
  const [idCard, setIdCard] = useState('');
  const [showIdPrompt, setShowIdPrompt] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleVote = () => {
    setShowIdPrompt(true);
  };

  const submitIdCard = async () => {
    // Basic format validation (e.g., length check)
    const idCardPattern = /^\d{5}-\d{7}-\d{1}$/;
    if (!idCardPattern.test(idCard)) {
      alert('Invalid ID card number format.');
      return;
    }

    try {
      await axios.post(`/api/vote/${partyId}`, { idCard });
      setShowIdPrompt(false);
      setShowConfirmation(true);
      // Redirect to home after 2 seconds (optional)
      setTimeout(() => navigate('/home'), 2000);
    } catch (error) {
      console.error("Error casting vote", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 animate__animated animate__fadeIn relative">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 bg-gray-300 text-gray-800 p-2 rounded-full shadow-md hover:bg-gray-400 transition-transform transform hover:scale-105"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="bg-white p-8 rounded-lg shadow-md animate__animated animate__zoomIn">
        <h1 className="text-2xl font-bold mb-6">Vote for {partyId}</h1>
        <button
          onClick={handleVote}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          Cast Vote
        </button>
      </div>

      {/* ID Card Prompt */}
      {showIdPrompt && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg animate__animated animate__fadeInUp">
            <button
              onClick={() => setShowIdPrompt(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-xl font-semibold mb-4">Enter Your ID Card</h2>
            <InputMask
              mask="99999-9999999-9"
              value={idCard}
              onChange={(e) => setIdCard(e.target.value)}
              className="w-full px-4 py-2 mb-4 border rounded-md"
              placeholder="Enter ID Card Number (e.g., 00000-0000000-0)"
            />
            <button
              onClick={submitIdCard}
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-transform transform hover:scale-105"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Popup */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg animate__animated animate__fadeInUp">
            <button
              onClick={() => navigate('/home')}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-xl font-semibold mb-4">Thank You!</h2>
            <p className="text-lg mb-4">Your vote has been cast successfully. Thank you for your participation!</p>
            <button
              onClick={() => navigate('/home')}
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-transform transform hover:scale-105"
            >
              Go to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartyVote;
