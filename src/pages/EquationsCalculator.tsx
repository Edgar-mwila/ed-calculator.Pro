import React, { useState } from 'react';
import CalcButton from '../components/calcButton';

type EquationType = 'polynomial' | 'simultaneous' | null;
type PolynomialSubType = '1' | '2' | null;
type SimultaneousSubType = 'simultaneous' | null;
type EquationSubType = PolynomialSubType | SimultaneousSubType;

// Note: In a real-world scenario, you'd want to use a proper math library for these calculations
const solveLinearEquation = (a: number, b: number): string => {
  if (a === 0) return 'No solution';
  return `x = ${-b / a}`;
};

const solveQuadraticEquation = (a: number, b: number, c: number): string => {
  const discriminant = b * b - 4 * a * c;
  if (discriminant > 0) {
    const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    return `x1 = ${x1.toFixed(2)}, x2 = ${x2.toFixed(2)}`;
  } else if (discriminant === 0) {
    const x = -b / (2 * a);
    return `x = ${x.toFixed(2)}`;
  } else {
    return 'No real solutions';
  }
};

const solveSimultaneousEquations = (a1: number, b1: number, c1: number, a2: number, b2: number, c2: number): string => {
  const determinant = a1 * b2 - a2 * b1;
  if (determinant === 0) {
    return 'No unique solution';
  }
  const x = (c1 * b2 - c2 * b1) / determinant;
  const y = (a1 * c2 - a2 * c1) / determinant;
  return `x = ${x.toFixed(2)}, y = ${y.toFixed(2)}`;
};

const EquationsCalculator: React.FC = () => {
  const [equationType, setEquationType] = useState<EquationType>(null);
  const [equationSubType, setEquationSubType] = useState<EquationSubType>(null);
  const [coefficients, setCoefficients] = useState<number[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [equation, setEquation] = useState<string>('');

  const handleEquationTypeSelect = (type: EquationType) => {
    setEquationType(type);
    setEquationSubType(null);
    setCoefficients([]);
    setResult(null);
    setEquation('');
  };

  const handleEquationSubTypeSelect = (subType: EquationSubType) => {
    setEquationSubType(subType);
    setCoefficients(Array(subType === 'simultaneous' ? 6 : subType === '2' ? 3 : 2).fill(0));
    setResult(null);
    setEquation('');
  };

  const handleCoefficientChange = (index: number, value: string) => {
    const newCoefficients = [...coefficients];
    newCoefficients[index] = parseFloat(value) || 0;
    setCoefficients(newCoefficients);
    updateEquation(newCoefficients);
  };

  const updateEquation = (newCoefficients: number[]) => {
    let eq = '';
    if (equationType === 'polynomial') {
      eq = newCoefficients.map((coeff, index) => {
        const power = newCoefficients.length - index - 1;
        if (coeff === 0) return '';
        let term = coeff > 0 && index !== 0 ? '+' : '';
        term += coeff === 1 && power > 0 ? '' : `${coeff}`;
        if (power > 1) term += `x^${power}`;
        else if (power === 1) term += 'x';
        return term;
      }).join('') + ' = 0';
    } else if (equationType === 'simultaneous') {
      eq = `${newCoefficients[0]}x + ${newCoefficients[1]}y = ${newCoefficients[2]}\n${newCoefficients[3]}x + ${newCoefficients[4]}y = ${newCoefficients[5]}`;
    }
    setEquation(eq);
  };

  const handleCalculate = () => {
    let res = '';
    if (equationType === 'polynomial') {
      if (equationSubType === '2' && coefficients.length === 3) {
        res = solveQuadraticEquation(coefficients[0], coefficients[1], coefficients[2]);
      } else if (equationSubType === '1' && coefficients.length === 2) {
        res = solveLinearEquation(coefficients[0], coefficients[1]);
      }
    } else if (equationType === 'simultaneous' && coefficients.length === 6) {
      res = solveSimultaneousEquations(
        coefficients[0],
        coefficients[1],
        coefficients[2],
        coefficients[3],
        coefficients[4],
        coefficients[5]
      );
    }
    setResult(res);
  };

  const renderInputFields = () => {
    if (!equationSubType) return null;

    if (equationType === 'polynomial') {
      return (
        <div className="flex flex-wrap items-center mb-4">
          {coefficients.map((coeff, index) => (
            <input
              key={index}
              type="number"
              value={coeff}
              onChange={(e) => handleCoefficientChange(index, e.target.value)}
              className="w-20 p-2 m-1 border rounded"
              placeholder={`x^${coefficients.length - index - 1}`}
            />
          ))}
        </div>
      );
    } else if (equationType === 'simultaneous') {
      return (
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <input
              type="number"
              value={coefficients[0]}
              onChange={(e) => handleCoefficientChange(0, e.target.value)}
              className="w-20 p-2 m-1 border rounded"
              placeholder="a1"
            />
            <span>x +</span>
            <input
              type="number"
              value={coefficients[1]}
              onChange={(e) => handleCoefficientChange(1, e.target.value)}
              className="w-20 p-2 m-1 border rounded"
              placeholder="b1"
            />
            <span>y =</span>
            <input
              type="number"
              value={coefficients[2]}
              onChange={(e) => handleCoefficientChange(2, e.target.value)}
              className="w-20 p-2 m-1 border rounded"
              placeholder="c1"
            />
          </div>
          <div className="flex items-center">
            <input
              type="number"
              value={coefficients[3]}
              onChange={(e) => handleCoefficientChange(3, e.target.value)}
              className="w-20 p-2 m-1 border rounded"
              placeholder="a2"
            />
            <span>x +</span>
            <input
              type="number"
              value={coefficients[4]}
              onChange={(e) => handleCoefficientChange(4, e.target.value)}
              className="w-20 p-2 m-1 border rounded"
              placeholder="b2"
            />
            <span>y =</span>
            <input
              type="number"
              value={coefficients[5]}
              onChange={(e) => handleCoefficientChange(5, e.target.value)}
              className="w-20 p-2 m-1 border rounded"
              placeholder="c2"
            />
          </div>
        </div>
      );
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-calc w-full max-w-md mx-auto p-4">
      <div className="mb-4">
        <CalcButton
          value="Polynomial"
          onClick={() => handleEquationTypeSelect('polynomial')}
          className={`mr-2 ${equationType === 'polynomial' ? 'bg-primary-light dark:bg-primary-dark text-white' : ''}`}
        />
        <CalcButton
          value="Simultaneous"
          onClick={() => handleEquationTypeSelect('simultaneous')}
          className={equationType === 'simultaneous' ? 'bg-primary-light dark:bg-primary-dark text-white' : ''}
        />
      </div>

      {equationType === 'polynomial' && (
        <div className="mb-4">
          <CalcButton
            value="Linear"
            onClick={() => handleEquationSubTypeSelect('1')}
            className={`mr-2 ${equationSubType === '1' ? 'bg-secondary-light dark:bg-secondary-dark text-white' : ''}`}
          />
          <CalcButton
            value="Quadratic"
            onClick={() => handleEquationSubTypeSelect('2')}
            className={equationSubType === '2' ? 'bg-secondary-light dark:bg-secondary-dark text-white' : ''}
          />
        </div>
      )}

      {equationType === 'simultaneous' && (
        <div className="mb-4">
          <CalcButton
            value="2 Variables"
            onClick={() => handleEquationSubTypeSelect('simultaneous')}
            className={equationSubType === 'simultaneous' ? 'bg-secondary-light dark:bg-secondary-dark text-white' : ''}
          />
        </div>
      )}

      {renderInputFields()}

      {equation && (
        <div className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Equation: {equation}
        </div>
      )}

      <CalcButton
        value="Solve"
        onClick={handleCalculate}
        className="w-full bg-primary-light dark:bg-primary-dark text-white"
      />

      {result && (
        <div className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
          Solution: {result}
        </div>
      )}
    </div>
  );
};

export default EquationsCalculator;