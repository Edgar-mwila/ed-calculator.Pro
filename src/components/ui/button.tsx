import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => (
  <button
    className={`px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline ${className}`}
    {...props}
  >
    {children}
  </button>
);