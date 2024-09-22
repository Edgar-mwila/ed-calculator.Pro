import React, { useState } from 'react';
import CalcButton from '../components/calcButton';

const CalculusCalculator: React.FC = () => {
  const [display, setDisplay] = useState<string>('');
  const [currentOperation, setCurrentOperation] = useState<string>('');

  const handleButtonClick = (value: string) => {
    setDisplay(prev => prev + value);
  };

  const handleClear = () => {
    setDisplay('');
    setCurrentOperation('');
  };

  const handleOperation = (operation: string) => {
    setCurrentOperation(operation);
  };

  const handleCalculate = () => {
    if (display && currentOperation) {
      let result: string;

      switch (currentOperation) {
        case 'derivative':
          result = `d/dx(${display})`;
          break;
        case 'integral':
          result = `∫(${display})dx`;
          break;
        case 'limit':
          result = `lim x→∞ (${display})`;
          break;
        default:
          result = 'Error';
      }

      setDisplay(result);
      setCurrentOperation('');
    }
  };

  const buttons = [
    '7', '8', '9', 'x',
    '4', '5', '6', '(',
    '1', '2', '3', ')',
    '0', '.', '=', '^'
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-calc w-full max-w-md mx-auto">
      <div className="p-4 bg-gray-50 dark:bg-gray-700 text-right">
        <div className="text-3xl font-semibold text-gray-900 dark:text-white">{display || '0'}</div>
      </div>
      <div className="grid grid-cols-4 gap-2 p-4">
        {buttons.map((btn) => (
          <CalcButton
            key={btn}
            value={btn}
            onClick={() => {
              if (btn === '=') {
                handleCalculate();
              } else {
                handleButtonClick(btn);
              }
            }}
            className={btn === '=' ? 'bg-primary-light dark:bg-primary-dark text-white' : ''}
          />
        ))}
        <CalcButton
          value="Derivative"
          onClick={() => handleOperation('derivative')}
          className="col-span-2 bg-secondary-light dark:bg-secondary-dark text-white"
        />
        <CalcButton
          value="Integral"
          onClick={() => handleOperation('integral')}
          className="col-span-2 bg-secondary-light dark:bg-secondary-dark text-white"
        />
        <CalcButton
          value="Limit"
          onClick={() => handleOperation('limit')}
          className="col-span-2 bg-secondary-light dark:bg-secondary-dark text-white"
        />
        <CalcButton
          value="Clear"
          onClick={handleClear}
          className="col-span-2 bg-red-500 text-white hover:bg-red-600"
        />
      </div>
    </div>
  );
};

export default CalculusCalculator;