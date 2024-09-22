import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ArithmeticCalculator from './pages/ArithmeticCalculator';
import GeometricCalculator from './pages/GeometricCalculator';
import CalculusCalculator from './pages/CalculusCalculator';
import EquationsCalculator from './pages/EquationsCalculator';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-4">
          <button
            onClick={toggleDarkMode}
            className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/arithmetic" element={<ArithmeticCalculator />} />
            <Route path="/goemetric" element={<GeometricCalculator />} />
            <Route path="/calculus" element={<CalculusCalculator />} />
            <Route path="/equation" element={<EquationsCalculator />} />
            {/* Add more routes for other calculator modes here */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;