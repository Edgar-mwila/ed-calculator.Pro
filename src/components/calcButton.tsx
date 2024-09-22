import React from 'react';

interface CalcButtonProps {
  value: string;
  onClick: () => void;
  className?: string;
}

const CalcButton: React.FC<CalcButtonProps> = ({ value, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`
        bg-gray-200 dark:bg-gray-600 
        rounded-lg p-4 
        text-xl font-semibold 
        text-gray-800 dark:text-white 
        hover:bg-gray-300 dark:hover:bg-gray-500 
        transition-colors
        ${className}
      `}
    >
      {value}
    </button>
  );
};

export default CalcButton;