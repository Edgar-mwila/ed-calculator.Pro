import React, { useState } from 'react';
import CalcButton from '../components/calcButton';

type EquationType = 'polynomial' | 'simultaneous' | null;
type PolynomialSubType = '1' | '2' | '3' | '4' | null;
type SimultaneousSubType = '2' | '3' | null;
type EquationSubType = PolynomialSubType | SimultaneousSubType;

const solvePolynomial = (coefficients: number[]): string => {
  // Using a simple numerical method (Newton's method) for demonstration
  const findRoots = (coeffs: any[]) => {
      const roots = [];
      const degree = coeffs.length - 1;

      // A simple implementation of Newton's method
      for (let i = 0; i < degree; i++) {
          let x = Math.random() * 10; // Initial guess
          for (let j = 0; j < 100; j++) { // Iterate to find root
              const fx = coeffs.reduce((acc: number, coeff: number, index: number) => acc + coeff * Math.pow(x, degree - index), 0);
              const dfx = coeffs.reduce((acc: number, coeff: number, index: number) => acc + (degree - index) * coeff * Math.pow(x, degree - index - 1), 0);
              if (dfx === 0) break; // Avoid division by zero
              x -= fx / dfx; // Update guess
          }
          roots.push(x);
      }
      return roots;
  };

  const roots = findRoots(coefficients);
  return `Roots of the polynomial: ${roots.join(', ')}`;
};

// Function to solve simultaneous equations using Gaussian elimination
const solveSimultaneousEquations = (coefficients: number[][]): string => {
  const n = coefficients.length;
  const augmentedMatrix = coefficients.map(row => [...row]);

  // Gaussian elimination
  for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
          const ratio = augmentedMatrix[j][i] / augmentedMatrix[i][i];
          for (let k = i; k < n + 1; k++) {
              augmentedMatrix[j][k] -= ratio * augmentedMatrix[i][k];
          }
      }
  }

  const solutions = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
      solutions[i] = augmentedMatrix[i][n] / augmentedMatrix[i][i];
      for (let j = i - 1; j >= 0; j--) {
          augmentedMatrix[j][n] -= augmentedMatrix[j][i] * solutions[i];
      }
  }

  return `Solutions of the simultaneous equations: ${solutions.join(', ')}`;
};

const EquationsCalculator: React.FC = () => {
  const [equationType, setEquationType] = useState<EquationType>(null);
  const [equationSubType, setEquationSubType] = useState<EquationSubType>(null);
  const [coefficients, setCoefficients] = useState<number[][]>([]);
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
    if (equationType === 'polynomial') {
      setCoefficients([Array(parseInt(subType as string) + 1).fill(0)]);
    } else if (equationType === 'simultaneous') {
      const vars = parseInt(subType as string);
      setCoefficients(Array(vars).fill(Array(vars + 1).fill(0)));
    }
    setResult(null);
    setEquation('');
  };

  const handleCoefficientChange = (rowIndex: number, colIndex: number, value: string) => {
    const newCoefficients = coefficients.map((row, i) => 
      i === rowIndex ? row.map((col, j) => j === colIndex ? parseFloat(value) || 0 : col) : row
    );
    setCoefficients(newCoefficients);
    updateEquation(newCoefficients);
  };

  const updateEquation = (newCoefficients: number[][]) => {
    let eq = '';
    if (equationType === 'polynomial') {
      eq = newCoefficients[0].map((coeff, index) => {
        const power = newCoefficients[0].length - index - 1;
        if (coeff === 0) return '';
        let term = coeff > 0 && index !== 0 ? ' + ' : index !== 0 ? ' - ' : '';
        term += Math.abs(coeff) === 1 && power > 0 ? '' : `${Math.abs(coeff)}`;
        if (power > 1) term += `x^${power}`;
        else if (power === 1) term += 'x';
        return term;
      }).join('') + ' = 0';
    } else if (equationType === 'simultaneous') {
      eq = newCoefficients.map((row, i) => 
        row.map((coeff, j) => {
          if (j === row.length - 1) return ` = ${coeff}`;
          if (coeff === 0) return '';
          let term = coeff > 0 && j !== 0 ? ' + ' : j !== 0 ? ' - ' : '';
          term += Math.abs(coeff) === 1 ? '' : `${Math.abs(coeff)}`;
          term += String.fromCharCode(120 + j); // 'x', 'y', 'z', ...
          return term;
        }).join('')
      ).join('\n');
    }
    setEquation(eq);
  };

  const handleCalculate = () => {
    let res = '';
    if (equationType === 'polynomial') {
      res = solvePolynomial(coefficients[0]);
    } else if (equationType === 'simultaneous') {
      res = solveSimultaneousEquations(coefficients);
    }
    setResult(res);
  };

  const renderInputFields = () => {
    if (!equationSubType) return null;

    if (equationType === 'polynomial') {
      return (
        <div className="flex flex-wrap items-center mb-4">
          {coefficients[0].map((coeff, index) => (
            <input
              key={index}
              type="number"
              value={coeff || ''}
              onChange={(e) => handleCoefficientChange(0, index, e.target.value)}
              className="w-20 p-2 m-1 border rounded"
              placeholder={`x^${coefficients[0].length - index - 1}`}
            />
          ))}
        </div>
      );
    } else if (equationType === 'simultaneous') {
      return (
        <div className="mb-4">
          {coefficients.map((row, i) => (
            <div key={i} className="flex items-center mb-2">
              {row.map((coeff, j) => (
                <React.Fragment key={j}>
                  <input
                    type="number"
                    value={coeff || ''}
                    onChange={(e) => handleCoefficientChange(i, j, e.target.value)}
                    className="w-16 p-2 m-1 border rounded"
                    placeholder={j === row.length - 1 ? 'const' : String.fromCharCode(120 + j)}
                  />
                  {j < row.length - 2 && <span className="mx-1">+</span>}
                  {j === row.length - 2 && <span className="mx-1">=</span>}
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Advanced Equation Solver</h2>
      <div className="mb-4 flex flex-wrap">
        <CalcButton
          value="Polynomial"
          onClick={() => handleEquationTypeSelect('polynomial')}
          className={`mr-2 mb-2 ${equationType === 'polynomial' ? 'bg-primary-light dark:bg-primary-dark text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
        />
        <CalcButton
          value="Simultaneous"
          onClick={() => handleEquationTypeSelect('simultaneous')}
          className={`mr-2 mb-2 ${equationType === 'simultaneous' ? 'bg-primary-light dark:bg-primary-dark text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
        />
      </div>

      {equationType === 'polynomial' && (
        <div className="mb-4 flex flex-wrap">
          {(['1', '2', '3', '4'] as const).map((degree) => (
            <CalcButton
              key={degree}
              value={`Degree ${degree}`}
              onClick={() => handleEquationSubTypeSelect(degree)}
              className={`mr-2 mb-2 ${equationSubType === degree ? 'bg-secondary-light dark:bg-secondary-dark text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
            />
          ))}
        </div>
      )}

      {equationType === 'simultaneous' && (
        <div className="mb-4 flex flex-wrap">
          {(['2', '3'] as const).map((vars) => (
            <CalcButton
              key={vars}
              value={`${vars} Variables`}
              onClick={() => handleEquationSubTypeSelect(vars)}
              className={`mr-2 mb-2 ${equationSubType === vars ? 'bg-secondary-light dark:bg-secondary-dark text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
            />
          ))}
        </div>
      )}

      {renderInputFields()}

      {equation && (
        <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Equation:</h3>
          <pre className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">{equation}</pre>
        </div>
      )}

      <CalcButton
        value="Solve"
        onClick={handleCalculate}
        className="w-full bg-primary-light dark:bg-primary-dark text-white py-3 rounded-lg text-lg font-semibold"
      />

      {result && (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Solution:</h3>
          <pre className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">{result}</pre>
        </div>
      )}
    </div>
  );
};

export default EquationsCalculator;