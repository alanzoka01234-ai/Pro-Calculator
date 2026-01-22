
import React, { useState, useEffect, useCallback } from 'react';
import Display from './Display';
import CalculatorButton from './CalculatorButton';
import { ButtonType, Theme } from '../types';

interface CalculatorProps {
  theme: Theme;
  onToggleTheme: () => void;
}

const Calculator: React.FC<CalculatorProps> = ({ theme, onToggleTheme }) => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [isNewCalculation, setIsNewCalculation] = useState(true);
  
  // Easter egg states
  const [fiveCount, setFiveCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const vibrate = () => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(10);
      } catch (e) {
        // Silently fail if vibration is blocked or unsupported
      }
    }
  };

  const handleNumber = useCallback((num: string) => {
    vibrate();
    
    // Easter egg logic: track consecutive '5's
    if (num === '5') {
      setFiveCount(prev => {
        const next = prev + 1;
        if (next === 5) {
          setShowEasterEgg(true);
          return 0; // Reset after trigger
        }
        return next;
      });
    } else {
      setFiveCount(0);
    }

    if (isNewCalculation) {
      setDisplay(num);
      setIsNewCalculation(false);
    } else {
      setDisplay(prev => (prev === '0' ? num : prev + num));
    }
  }, [isNewCalculation]);

  const handleOperator = useCallback((op: string) => {
    vibrate();
    setFiveCount(0); // Reset easter egg counter on operator
    const symbolMap: Record<string, string> = {
      '/': '÷',
      '*': '×',
      '-': '−',
      '+': '+'
    };
    const opSymbol = symbolMap[op] || op;
    const lastChar = expression.trim().slice(-1);
    const operators = ['÷', '×', '−', '+'];
    
    if (isNewCalculation) {
      setExpression(display + ' ' + opSymbol + ' ');
      setIsNewCalculation(false);
    } else {
      if (operators.includes(lastChar)) {
        setExpression(prev => prev.slice(0, -2) + opSymbol + ' ');
      } else {
        setExpression(prev => prev + display + ' ' + opSymbol + ' ');
      }
    }
    setDisplay('0');
  }, [display, expression, isNewCalculation]);

  const handleClear = useCallback(() => {
    vibrate();
    setFiveCount(0);
    setDisplay('0');
    setExpression('');
    setIsNewCalculation(true);
  }, []);

  const handleBackspace = useCallback(() => {
    vibrate();
    setFiveCount(0);
    if (isNewCalculation) return;
    setDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
  }, [isNewCalculation]);

  const handleDecimal = useCallback(() => {
    vibrate();
    setFiveCount(0);
    if (isNewCalculation) {
      setDisplay('0.');
      setIsNewCalculation(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(prev => prev + '.');
    }
  }, [display, isNewCalculation]);

  const calculate = useCallback(() => {
    vibrate();
    setFiveCount(0);
    if (isNewCalculation) return;

    let fullExpression = expression + display;
    
    try {
      const jsExpression = fullExpression
        .replace(/÷/g, '/')
        .replace(/×/g, '*')
        .replace(/−/g, '-');

      const sanitized = jsExpression.replace(/[^-0-9/*+.]/g, '');
      
      if (sanitized.includes('/0')) {
        setDisplay('Error');
        setExpression('');
        setIsNewCalculation(true);
        return;
      }

      const result = new Function(`return ${sanitized}`)();
      const formattedResult = Number.isInteger(result) 
        ? result.toString() 
        : parseFloat(result.toFixed(8)).toString();

      setDisplay(formattedResult);
      setExpression('');
      setIsNewCalculation(true);
    } catch (error) {
      setDisplay('Error');
      setExpression('');
      setIsNewCalculation(true);
    }
  }, [display, expression, isNewCalculation]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') handleNumber(e.key);
      if (['+', '-', '*', '/'].includes(e.key)) handleOperator(e.key);
      if (e.key === 'Enter' || e.key === '=') calculate();
      if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') handleClear();
      if (e.key === 'Backspace') handleBackspace();
      if (e.key === '.') handleDecimal();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNumber, handleOperator, calculate, handleClear, handleBackspace, handleDecimal]);

  const containerBg = theme === 'dark' ? 'bg-slate-950/60' : 'bg-white/50';
  const glowClass = theme === 'dark' ? 'neon-glow-dark' : 'neon-glow-light';

  return (
    <div className={`glass-container w-full h-full p-6 sm:p-12 flex flex-col gap-4 relative overflow-hidden ${containerBg} border-none ${glowClass}`}>
      
      {/* Dynamic Glow Accents */}
      <div className={`absolute -top-48 -left-48 w-96 h-96 rounded-full blur-[120px] pointer-events-none transition-opacity duration-700 ${theme === 'dark' ? 'bg-indigo-500/20' : 'bg-indigo-300/10'}`}></div>
      <div className={`absolute -bottom-48 -right-48 w-96 h-96 rounded-full blur-[120px] pointer-events-none transition-opacity duration-700 ${theme === 'dark' ? 'bg-pink-500/15' : 'bg-pink-300/10'}`}></div>

      <div className="flex justify-between items-center px-2 shrink-0">
        <div className={`w-16 h-1.5 rounded-full ${theme === 'dark' ? 'bg-white/10' : 'bg-black/5'}`}></div>
        <button 
          onClick={onToggleTheme}
          className={`p-3 rounded-full transition-all duration-300 group ${theme === 'dark' ? 'bg-white/5 text-yellow-400 hover:bg-white/10' : 'bg-black/5 text-slate-700 hover:bg-black/10'}`}
        >
          {theme === 'dark' ? (
            <svg className="drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66a8,8,0,0,0,11.32-11.32l-16-16a8,8,0,0,0-11.32,11.32Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM197.66,69.66l16-16a8,8,0,0,0-11.32-11.32l-16,16a8,8,0,0,0,11.32,11.32Zm0,116.68a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM240,120H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16ZM40,120H16a8,8,0,0,0,0,16H40a8,8,0,0,0,0-16Zm96,96v24a8,8,0,0,1-16,0V216a8,8,0,0,1,16,0Z"></path></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.11,104.11,0,1,0,129.8,129.8A8,8,0,0,0,233.54,142.23ZM128,216a88.13,88.13,0,0,1-72.76-137.66,104.11,104.11,0,0,0,126.42,126.42A87.59,87.59,0,0,1,128,216Z"></path></svg>
          )}
        </button>
      </div>

      <Display 
        value={display} 
        expression={expression} 
        theme={theme}
      />

      <div className={`w-full h-[1px] mb-4 transition-colors duration-500 shrink-0 ${theme === 'dark' ? 'bg-gradient-to-r from-transparent via-white/20 to-transparent' : 'bg-gradient-to-r from-transparent via-black/10 to-transparent'}`}></div>

      <div className="flex-1 grid grid-cols-4 gap-4 sm:gap-6 pb-6 max-h-[60%]">
        <CalculatorButton label="C" onClick={handleClear} type={ButtonType.ACTION} theme={theme} />
        <CalculatorButton label="⌫" onClick={handleBackspace} type={ButtonType.ACTION} theme={theme} />
        <CalculatorButton label="÷" onClick={() => handleOperator('/')} type={ButtonType.OPERATOR} theme={theme} />
        <CalculatorButton label="×" onClick={() => handleOperator('*')} type={ButtonType.OPERATOR} theme={theme} />

        <CalculatorButton label="7" onClick={() => handleNumber('7')} type={ButtonType.NUMBER} theme={theme} />
        <CalculatorButton label="8" onClick={() => handleNumber('8')} type={ButtonType.NUMBER} theme={theme} />
        <CalculatorButton label="9" onClick={() => handleNumber('9')} type={ButtonType.NUMBER} theme={theme} />
        <CalculatorButton label="−" onClick={() => handleOperator('-')} type={ButtonType.OPERATOR} theme={theme} />

        <CalculatorButton label="4" onClick={() => handleNumber('4')} type={ButtonType.NUMBER} theme={theme} />
        <CalculatorButton label="5" onClick={() => handleNumber('5')} type={ButtonType.NUMBER} theme={theme} />
        <CalculatorButton label="6" onClick={() => handleNumber('6')} type={ButtonType.NUMBER} theme={theme} />
        <CalculatorButton label="+" onClick={() => handleOperator('+')} type={ButtonType.OPERATOR} theme={theme} />

        <CalculatorButton label="1" onClick={() => handleNumber('1')} type={ButtonType.NUMBER} theme={theme} />
        <CalculatorButton label="2" onClick={() => handleNumber('2')} type={ButtonType.NUMBER} theme={theme} />
        <CalculatorButton label="3" onClick={() => handleNumber('3')} type={ButtonType.NUMBER} theme={theme} />
        <CalculatorButton label="=" onClick={calculate} type={ButtonType.EQUALS} theme={theme} />
        
        <CalculatorButton label="0" onClick={() => handleNumber('0')} type={ButtonType.NUMBER} className="col-span-2 !aspect-auto" theme={theme} />
        <CalculatorButton label="." onClick={handleDecimal} type={ButtonType.NUMBER} theme={theme} />
      </div>

      {/* Easter Egg Video Modal */}
      {showEasterEgg && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md transition-all duration-500">
          <div className={`relative w-full max-w-sm aspect-[9/16] rounded-3xl overflow-hidden border-2 shadow-2xl ${theme === 'dark' ? 'border-white/20' : 'border-black/10'}`}>
            <button 
              onClick={() => setShowEasterEgg(false)}
              className="absolute top-4 right-4 z-[110] p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>
            </button>
            <video 
              className="w-full h-full object-cover"
              src="input_file_0.mp4"
              autoPlay
              controls
              loop
              playsInline
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Calculator;
