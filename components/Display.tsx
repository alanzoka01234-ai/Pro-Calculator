
import React from 'react';
import { Theme } from '../types';

interface DisplayProps {
  value: string;
  expression: string;
  theme: Theme;
}

const Display: React.FC<DisplayProps> = ({ value, expression, theme }) => {
  const isDark = theme === 'dark';
  const exprClass = isDark ? 'text-indigo-400/80' : 'text-indigo-600/80';
  const valClass = isDark ? 'text-white' : 'text-slate-900';
  const glowClass = isDark ? 'drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]' : '';

  return (
    <div className={`flex-1 flex flex-col items-end justify-end px-4 py-8 break-all relative z-10 overflow-hidden`}>
      <div className={`text-2xl sm:text-3xl font-medium ${exprClass} transition-all duration-300 min-h-[2rem] mb-4 tracking-wide`}>
        {expression}
      </div>
      <div className={`text-7xl sm:text-9xl font-normal ${valClass} ${glowClass} tracking-tight transition-all duration-200 text-right w-full ${value.length > 10 ? 'text-4xl sm:text-6xl' : value.length > 7 ? 'text-5xl sm:text-7xl' : ''}`}>
        {value}
      </div>
    </div>
  );
};

export default Display;
