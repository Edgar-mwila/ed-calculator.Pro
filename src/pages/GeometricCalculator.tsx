import React, { useState } from 'react';
import CalcButton from '../components/calcButton';

interface ShapeInput {
  [key: string]: number;
}

const shapes = {
  '2D': ['Square', 'Rectangle', 'Circle', 'Triangle'],
  '3D': ['Cube', 'Sphere', 'Cylinder', 'Cone']
};

const GeometricCalculator: React.FC = () => {
  const [dimension, setDimension] = useState<'2D' | '3D' | null>(null);
  const [shape, setShape] = useState<string | null>(null);
  const [inputs, setInputs] = useState<ShapeInput>({});
  const [result, setResult] = useState<string | null>(null);

  const handleDimensionSelect = (dim: '2D' | '3D') => {
    setDimension(dim);
    setShape(null);
    setInputs({});
    setResult(null);
  };

  const handleShapeSelect = (selectedShape: string) => {
    setShape(selectedShape);
    setInputs({});
    setResult(null);
  };

  const handleInputChange = (key: string, value: string) => {
    setInputs(prev => ({ ...prev, [key]: parseFloat(value) || 0 }));
  };

  const calculateResult = () => {
    let calculatedResult = 0;
    switch (shape) {
      case 'Square':
        calculatedResult = inputs.side ** 2;
        setResult(`Area: ${calculatedResult}`);
        break;
      case 'Rectangle':
        calculatedResult = inputs.length * inputs.width;
        setResult(`Area: ${calculatedResult}`);
        break;
      case 'Circle':
        calculatedResult = Math.PI * (inputs.radius ** 2);
        setResult(`Area: ${calculatedResult.toFixed(2)}`);
        break;
      case 'Triangle':
        calculatedResult = 0.5 * inputs.base * inputs.height;
        setResult(`Area: ${calculatedResult}`);
        break;
      case 'Cube':
        calculatedResult = inputs.side ** 3;
        setResult(`Volume: ${calculatedResult}`);
        break;
      case 'Sphere':
        calculatedResult = (4/3) * Math.PI * (inputs.radius ** 3);
        setResult(`Volume: ${calculatedResult.toFixed(2)}`);
        break;
      case 'Cylinder':
        calculatedResult = Math.PI * (inputs.radius ** 2) * inputs.height;
        setResult(`Volume: ${calculatedResult.toFixed(2)}`);
        break;
      case 'Cone':
        calculatedResult = (1/3) * Math.PI * (inputs.radius ** 2) * inputs.height;
        setResult(`Volume: ${calculatedResult.toFixed(2)}`);
        break;
    }
  };

  const renderInputFields = () => {
    switch (shape) {
      case 'Square':
      case 'Cube':
        return (
          <input
            type="number"
            placeholder="Side length"
            onChange={(e) => handleInputChange('side', e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
        );
      case 'Rectangle':
        return (
          <>
            <input
              type="number"
              placeholder="Length"
              onChange={(e) => handleInputChange('length', e.target.value)}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="number"
              placeholder="Width"
              onChange={(e) => handleInputChange('width', e.target.value)}
              className="w-full p-2 mb-2 border rounded"
            />
          </>
        );
      case 'Circle':
      case 'Sphere':
        return (
          <input
            type="number"
            placeholder="Radius"
            onChange={(e) => handleInputChange('radius', e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
        );
      case 'Triangle':
        return (
          <>
            <input
              type="number"
              placeholder="Base"
              onChange={(e) => handleInputChange('base', e.target.value)}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="number"
              placeholder="Height"
              onChange={(e) => handleInputChange('height', e.target.value)}
              className="w-full p-2 mb-2 border rounded"
            />
          </>
        );
      case 'Cylinder':
      case 'Cone':
        return (
          <>
            <input
              type="number"
              placeholder="Radius"
              onChange={(e) => handleInputChange('radius', e.target.value)}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="number"
              placeholder="Height"
              onChange={(e) => handleInputChange('height', e.target.value)}
              className="w-full p-2 mb-2 border rounded"
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-calc w-full max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Geometric Calculator</h2>
      {!dimension ? (
        <div className="grid grid-cols-2 gap-2">
          <CalcButton value="2D" onClick={() => handleDimensionSelect('2D')} />
          <CalcButton value="3D" onClick={() => handleDimensionSelect('3D')} />
        </div>
      ) : !shape ? (
        <div className="grid grid-cols-2 gap-2">
          {shapes[dimension].map(s => (
            <CalcButton key={s} value={s} onClick={() => handleShapeSelect(s)} />
          ))}
        </div>
      ) : (
        <>
          <div className="mb-4">
            {renderInputFields()}
          </div>
          <CalcButton value="Calculate" onClick={calculateResult} className="w-full mb-2" />
          {result && (
            <div className="text-xl font-semibold text-gray-900 dark:text-white mt-4">
              {result}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GeometricCalculator;