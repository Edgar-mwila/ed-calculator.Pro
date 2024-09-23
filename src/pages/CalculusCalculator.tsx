import React, { useState } from 'react';
import { create, all } from 'mathjs';
import { Card, CardHeader, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

const math = create(all);

const calculateDerivative = (equation: string, variable: string = 'x') => {
  try {
    const expr = math.parse(equation);
    const derivative = math.derivative(expr, variable);
    return derivative.toString();
  } catch (error: any) {
    return `Error: ${error.message}`;
  }
};

const numericalIntegration = (f: (x: number) => number, a: number, b: number, n: number = 1000) => {
  const h = (b - a) / n;
  let sum = 0.5 * (f(a) + f(b));
  for (let i = 1; i < n; i++) {
    const x = a + i * h;
    sum += f(x);
  }
  return sum * h;
};

const calculateIntegral = (equation: string, variable: string = 'x', lowerBound?: number, upperBound?: number) => {
  try {
    const expr = math.parse(equation);
    const f = (x: number) => expr.evaluate({ [variable]: x });

    if (lowerBound !== undefined && upperBound !== undefined) {
      const result = numericalIntegration(f, lowerBound, upperBound);
      return result.toFixed(6);
    } else {
      return `Symbolic integration not supported. Please provide bounds for numerical integration.`;
    }
  } catch (error: any) {
    return `Error: ${error.message}`;
  }
};

const calculateLimit = (equation: string, variable: string = 'x', approach: string) => {
  try {
    const expr = math.parse(equation);
    const f = (x: number) => expr.evaluate({ [variable]: x });
    const approachValue = math.evaluate(approach);

    const epsilon = 1e-10;
    const leftLimit = f(approachValue - epsilon);
    const rightLimit = f(approachValue + epsilon);

    if (Math.abs(leftLimit - rightLimit) < epsilon) {
      return leftLimit.toFixed(6);
    } else {
      return "Cannot find the limit at the time";
    }
  } catch (error:any) {
    return `Error: ${error.message}`;
  }
};

const CalculusCalculator: React.FC = () => {
  const [operation, setOperation] = useState<string | null>(null);
  const [equation, setEquation] = useState<string>('');
  const [variable, setVariable] = useState<string>('x');
  const [lowerBound, setLowerBound] = useState<string>('');
  const [upperBound, setUpperBound] = useState<string>('');
  const [approach, setApproach] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleOperationSelect = (op: string) => {
    setOperation(op);
    setEquation('');
    setVariable('x');
    setLowerBound('');
    setUpperBound('');
    setApproach('');
    setResult(null);
    setError(null);
  };

  const handleCalculate = () => {
    setError(null);
    try {
      switch (operation) {
        case 'derivative':
          setResult(calculateDerivative(equation, variable));
          break;
        case 'integral':
          if (lowerBound && upperBound) {
            setResult(calculateIntegral(equation, variable, parseFloat(lowerBound), parseFloat(upperBound)));
          } else {
            setResult(calculateIntegral(equation, variable));
          }
          break;
        case 'limit':
          setResult(calculateLimit(equation, variable, approach));
          break;
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Calculus Calculator</h2>
      </CardHeader>
      <CardContent>
        {!operation ? (
          <div className="grid grid-cols-3 gap-2">
            <Button onClick={() => handleOperationSelect('derivative')}>Derivative</Button>
            <Button onClick={() => handleOperationSelect('integral')}>Integral</Button>
            <Button onClick={() => handleOperationSelect('limit')}>Limit</Button>
          </div>
        ) : (
          <>
            <Input
              placeholder="Enter equation"
              value={equation}
              onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEquation(e.target.value)}
              className="mb-2"
            />
            <Input
              placeholder="Variable (default: x)"
              value={variable}
              onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setVariable(e.target.value)}
              className="mb-2"
            />
            {operation === 'integral' && (
              <div className="flex gap-2 mb-2">
                <Input
                  type="number"
                  placeholder="Lower bound (optional)"
                  value={lowerBound}
                  onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setLowerBound(e.target.value)}
                />
                <Input
                  type="number"
                  placeholder="Upper bound (optional)"
                  value={upperBound}
                  onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setUpperBound(e.target.value)}
                />
              </div>
            )}
            {operation === 'limit' && (
              <Input
                placeholder="x approaches"
                value={approach}
                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setApproach(e.target.value)}
                className="mb-2"
              />
            )}
            <Button onClick={handleCalculate} className="w-full mb-2">Calculate</Button>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-2" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            {result && (
              <div className="text-xl font-semibold mt-4 text-gray-900 dark:text-white">
                Result: {result}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CalculusCalculator;