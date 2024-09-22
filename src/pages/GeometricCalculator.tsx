import React, { useState } from 'react';
import CalcButton from '../components/calcButton';

const GeometricCalculator: React.FC = () => {
  const [display, setDisplay] = useState<string>('');
  const [currentOperation, setCurrentOperation] = useState<string>('');
  const [firstValue, setFirstValue] = useState<number | null>(null);

  const handleButtonClick = (value: string) => {
    setDisplay(prev => prev + value);
  };

  const handleClear = () => {
    setDisplay('');
    setCurrentOperation('');
    setFirstValue(null);
  };

  const handleOperation = (operation: string) => {
    if (display) {
      setFirstValue(parseFloat(display));
      setDisplay('');
      setCurrentOperation(operation);
    }
  };

  const handleCalculate = () => {
    if (firstValue !== null && display && currentOperation) {
      const secondValue = parseFloat(display);
      let result: number;

      switch (currentOperation) {
        case 'area_rectangle':
          result = firstValue * secondValue;
          setDisplay(`Area: ${result}`);
          break;
        case 'area_circle':
          result = Math.PI * Math.pow(firstValue, 2);
          setDisplay(`Area: ${result.toFixed(2)}`);
          break;
        case 'volume_cube':
          result = Math.pow(firstValue, 3);
          setDisplay(`Volume: ${result}`);
          break;
        case 'volume_sphere':
          result = (4/3) * Math.PI * Math.pow(firstValue, 3);
          setDisplay(`Volume: ${result.toFixed(2)}`);
          break;
        default:
          setDisplay('Error');
      }

      setFirstValue(null);
      setCurrentOperation('');
    }
  };

  const buttons = [
    '7', '8', '9', 'Area (Rectangle)',
    '4', '5', '6', 'Area (Circle)',
    '1', '2', '3', 'Volume (Cube)',
    '0', '.', '=', 'Volume (Sphere)'
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
              if (['Area (Rectangle)', 'Area (Circle)', 'Volume (Cube)', 'Volume (Sphere)'].includes(btn)) {
                handleOperation(btn.toLowerCase().replace(' ', '_'));
              } else if (btn === '=') {
                handleCalculate();
              } else {
                handleButtonClick(btn);
              }
            }}
            className={btn === '=' ? 'bg-primary-light dark:bg-primary-dark text-white' : ''}
          />
        ))}
        <CalcButton
          value="Clear"
          onClick={handleClear}
          className="col-span-4 bg-red-500 text-white hover:bg-red-600"
        />
      </div>
    </div>
  );
};

export default GeometricCalculator;