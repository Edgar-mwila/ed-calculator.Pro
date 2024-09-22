import React, { useState } from 'react';
import CalcButton from '../components/calcButton';

// Note: In a real-world scenario, you'd want to use a proper math library for these calculations
const calculateDerivative = (equation: string) => {
  // This is a placeholder. In reality, you'd use a computer algebra system.
  return `d/dx(${equation})`;
};

const calculateIntegral = (equation: string, lowerBound?: number, upperBound?: number) => {
  if (lowerBound !== undefined && upperBound !== undefined) {
    return `∫[${lowerBound},${upperBound}] ${equation} dx`;
  }
  return `∫ ${equation} dx`;
};

const calculateLimit = (equation: string, approach: string) => {
  return `lim[x→${approach}] ${equation}`;
};

const CalculusCalculator: React.FC = () => {
  const [operation, setOperation] = useState<string | null>(null);
  const [equation, setEquation] = useState<string>('');
  const [lowerBound, setLowerBound] = useState<string>('');
  const [upperBound, setUpperBound] = useState<string>('');
  const [approach, setApproach] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);

  const handleOperationSelect = (op: string) => {
    setOperation(op);
    setEquation('');
    setLowerBound('');
    setUpperBound('');
    setApproach('');
    setResult(null);
  };

  const handleCalculate = () => {
    switch (operation) {
      case 'derivative':
        setResult(calculateDerivative(equation));
        break;
      case 'integral':
        if (lowerBound && upperBound) {
          setResult(calculateIntegral(equation, parseFloat(lowerBound), parseFloat(upperBound)));
        } else {
          setResult(calculateIntegral(equation));
        }
        break;
      case 'limit':
        setResult(calculateLimit(equation, approach));
        break;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-calc w-full max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Calculus Calculator</h2>
      {!operation ? (
        <div className="grid grid-cols-3 gap-2">
          <CalcButton value="Derivative" onClick={() => handleOperationSelect('derivative')} />
          <CalcButton value="Integral" onClick={() => handleOperationSelect('integral')} />
          <CalcButton value="Limit" onClick={() => handleOperationSelect('limit')} />
        </div>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter equation"
            value={equation}
            onChange={(e) => setEquation(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          {operation === 'integral' && (
            <div className="flex gap-2 mb-2">
              <input
                type="number"
                placeholder="Lower bound (optional)"
                value={lowerBound}
                onChange={(e) => setLowerBound(e.target.value)}
                className="w-1/2 p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Upper bound (optional)"
                value={upperBound}
                onChange={(e) => setUpperBound(e.target.value)}
                className="w-1/2 p-2 border rounded"
              />
            </div>
          )}
          {operation === 'limit' && (
            <input
              type="text"
              placeholder="x approaches"
              value={approach}
              onChange={(e) => setApproach(e.target.value)}
              className="w-full p-2 mb-2 border rounded"
            />
          )}
          <CalcButton value="Calculate" onClick={handleCalculate} className="w-full mb-2" />
          {result && (
            <div className="text-xl font-semibold text-gray-900 dark:text-white mt-4">
              Result: {result}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CalculusCalculator;