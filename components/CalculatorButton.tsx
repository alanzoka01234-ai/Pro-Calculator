
import React, { useState } from 'react';
import { ButtonType, Theme } from '../types';

interface CalculatorButtonProps {
  label: string;
  onClick: () => void;
  type: ButtonType;
  className?: string;
  theme: Theme;
}

const CalculatorButton: React.FC<CalculatorButtonProps> = ({ label, onClick, type, className = '', theme }) => {
  const isDark = theme === 'dark';
  const [isPressed, setIsPressed] = useState(false);

  const getBaseStyles = () => {
    switch (type) {
      case ButtonType.OPERATOR:
        return isDark 
          ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
          : 'bg-indigo-50 text-indigo-600 border-indigo-100';
      case ButtonType.ACTION:
        return isDark 
          ? 'bg-orange-500/10 text-orange-400 border-orange-500/20'
          : 'bg-orange-50 text-orange-600 border-orange-100';
      case ButtonType.EQUALS:
        return isDark
          ? 'bg-indigo-600/90 text-white border-transparent'
          : 'bg-indigo-600 text-white border-transparent';
      case ButtonType.NUMBER:
      default:
        return isDark 
          ? 'bg-white/5 text-white/90 border-white/5'
          : 'bg-white text-slate-800 border-slate-100/50';
    }
  };

  const getGlowStyles = () => {
    if (!isDark) return '';
    switch (type) {
      case ButtonType.OPERATOR:
        return 'drop-shadow-[0_0_8px_rgba(129,140,248,0.4)]';
      case ButtonType.ACTION:
        return 'drop-shadow-[0_0_8px_rgba(251,146,60,0.4)]';
      case ButtonType.EQUALS:
        return 'shadow-[0_0_15px_rgba(79,70,229,0.5)]';
      default:
        return '';
    }
  };

  const pressEffects = isPressed 
    ? 'scale-[0.92] brightness-150' 
    : 'sm:hover:brightness-125 active:scale-[0.94]';

  return (
    <button
      onPointerDown={() => setIsPressed(true)}
      onPointerUp={() => setIsPressed(false)}
      onPointerCancel={() => setIsPressed(false)}
      onPointerLeave={() => setIsPressed(false)}
      onClick={(e) => {
        onClick();
        e.currentTarget.blur();
      }}
      className={`
        ${getBaseStyles()}
        ${getGlowStyles()}
        ${pressEffects}
        ${className}
        w-full h-full min-h-[64px] rounded-2xl sm:rounded-3xl flex items-center justify-center text-3xl sm:text-4xl font-medium
        transition-all duration-200 ease-out
        border
        outline-none
        select-none
        touch-manipulation
        cursor-pointer
        relative
        overflow-hidden
        ${!isDark ? 'shadow-sm' : ''}
      `}
    >
      {/* Subtle button reflection */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none"></div>
      <span className="relative z-10">{label}</span>
    </button>
  );
};

export default CalculatorButton;
