import React from 'react';
import { Link } from 'react-router-dom';
import CalculationModeSelector from '../components/calculationModeSelector';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Advanced Calculator</h1>
      <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 text-center max-w-2xl">
        Welcome to our advanced calculator app. Choose a calculation mode to get started!
      </p>
      <CalculationModeSelector />
      <div className="mt-8">
        <Link to="/arithmetic" className="text-primary-light dark:text-primary-dark hover:underline">
          Go to Arithmetic Calculator
        </Link>
      </div>
    </div>
  );
};

export default Home;