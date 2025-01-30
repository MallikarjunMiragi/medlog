import React from 'react';
import { useLocation } from 'react-router-dom';

const WelcomePage = () => {
  const location = useLocation();
  const user = location.state?.user || "Guest";

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-black">
      <h1 className="text-4xl font-bold mb-4">Welcome, {user}!</h1>
      <p className="text-lg">You have successfully logged in.</p>
    </div>
  );
};

export default WelcomePage;
