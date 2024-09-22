import React from 'react';
import { Link } from 'react-router-dom';

const calculationModes = [
  { name: 'Arithmetic', path: '/arithmetic', icon: '➕' },
  { name: 'Geometric', path: '/geometric', icon: '📐' },
  { name: 'Calculus', path: '/calculus', icon: '∫' },
  { name: 'Equations', path: '/equations', icon: '𝑓(x)' },
];

const CalculationModeSelector: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {calculationModes.map((mode) => (
        <Link
          key={mode.name}
          to={mode.path}
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col items-center justify-center"
        >
          <span className="text-4xl mb-2">{mode.icon}</span>
          <span className="text-gray-900 dark:text-white font-semibold">{mode.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default CalculationModeSelector;