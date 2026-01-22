
import React, { useState } from 'react';
import Calculator from './components/Calculator';
import { Theme } from './types';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('dark');

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const bgClass = theme === 'dark' ? 'neon-bg' : 'neon-bg-light';

  return (
    <main className={`relative w-screen h-screen overflow-hidden transition-colors duration-500`}>
      {/* Animated Neon Gradient Background Layer */}
      <div className={`fixed inset-0 pointer-events-none transition-all duration-700 ${bgClass}`}></div>
      
      {/* Dark Overlay for better contrast in dark mode */}
      <div className={`fixed inset-0 pointer-events-none transition-opacity duration-700 ${theme === 'dark' ? 'bg-black/40 opacity-100' : 'opacity-0'}`}></div>

      <div className="relative z-10 w-full h-full">
        <Calculator theme={theme} onToggleTheme={toggleTheme} />
      </div>
    </main>
  );
};

export default App;
