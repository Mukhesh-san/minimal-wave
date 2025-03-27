
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const CalculatorApp: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.');
      setWaitingForSecondOperand(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clearDisplay = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (firstOperand: number, secondOperand: number, operator: string) => {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  };

  const performCalculation = () => {
    if (firstOperand === null || operator === null) {
      return;
    }

    const inputValue = parseFloat(display);
    const result = calculate(firstOperand, inputValue, operator);
    setDisplay(String(result));
    setFirstOperand(result);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  return (
    <div className="w-full max-w-xs mx-auto border border-border rounded-lg shadow-sm bg-card p-4">
      <div className="p-2 mb-2 text-right bg-secondary rounded-md text-xl h-12 flex items-center justify-end font-mono">
        {display}
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        <Button variant="outline" onClick={clearDisplay} className="col-span-2">
          Clear
        </Button>
        <Button variant="outline" onClick={() => handleOperator('/')}>
          ÷
        </Button>
        <Button variant="outline" onClick={() => handleOperator('*')}>
          ×
        </Button>
        
        {[7, 8, 9].map(num => (
          <Button key={num} variant="secondary" onClick={() => inputDigit(num.toString())}>
            {num}
          </Button>
        ))}
        <Button variant="outline" onClick={() => handleOperator('-')}>
          -
        </Button>
        
        {[4, 5, 6].map(num => (
          <Button key={num} variant="secondary" onClick={() => inputDigit(num.toString())}>
            {num}
          </Button>
        ))}
        <Button variant="outline" onClick={() => handleOperator('+')}>
          +
        </Button>
        
        {[1, 2, 3].map(num => (
          <Button key={num} variant="secondary" onClick={() => inputDigit(num.toString())}>
            {num}
          </Button>
        ))}
        <Button variant="default" onClick={performCalculation} className="row-span-2">
          =
        </Button>
        
        <Button variant="secondary" onClick={() => inputDigit('0')} className="col-span-2">
          0
        </Button>
        <Button variant="secondary" onClick={inputDecimal}>
          .
        </Button>
      </div>
    </div>
  );
};

export default CalculatorApp;
