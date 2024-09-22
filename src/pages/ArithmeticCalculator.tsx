import React, { useState } from 'react';
import CalcButton from '../components/calcButton';

const ArithmeticCalculator: React.FC = () => {
  const [display, setDisplay] = useState<string>('0');
  const [memory, setMemory] = useState<number>(0);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);

  const handleButtonClick = (value: string) => {
    if (waitingForOperand) {
      setDisplay(value);
      setWaitingForOperand(false);
    } else {
      setDisplay(prev => prev === '0' ? value : prev + value);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setWaitingForOperand(false);
  };

  const handleCalculate = () => {
    try {
      setDisplay(eval(display).toString());
      setWaitingForOperand(true);
    } catch (error) {
      setDisplay('Error');
    }
  };

  const handleMemoryOperation = (operation: string) => {
    const currentValue = parseFloat(display);
    switch (operation) {
      case 'M+':
        setMemory(memory + currentValue);
        break;
      case 'M-':
        setMemory(memory - currentValue);
        break;
      case 'MR':
        setDisplay(memory.toString());
        break;
      case 'MC':
        setMemory(0);
        break;
    }
    setWaitingForOperand(true);
  };

  const handleAdvancedOperation = (operation: string) => {
    const currentValue = parseFloat(display);
    switch (operation) {
      case '√':
        setDisplay(Math.sqrt(currentValue).toString());
        break;
      case 'x²':
        setDisplay(Math.pow(currentValue, 2).toString());
        break;
      case '1/x':
        setDisplay((1 / currentValue).toString());
        break;
      case '%':
        setDisplay((currentValue / 100).toString());
        break;
    }
    setWaitingForOperand(true);
  };

  const buttons = [
    'MC', 'MR', 'M+', 'M-',
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
    '√', 'x²', '1/x', '%'
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-calc w-full max-w-md mx-auto">
      <div className="p-4 bg-gray-50 dark:bg-gray-700 text-right">
        <div className="text-3xl font-semibold text-gray-900 dark:text-white">{display}</div>
      </div>
      <div className="grid grid-cols-4 gap-2 p-4">
        {buttons.map((btn) => (
          <CalcButton
            key={btn}
            value={btn}
            onClick={() => {
              if (['M+', 'M-', 'MR', 'MC'].includes(btn)) {
                handleMemoryOperation(btn);
              } else if (['√', 'x²', '1/x', '%'].includes(btn)) {
                handleAdvancedOperation(btn);
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

export default ArithmeticCalculator;