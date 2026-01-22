
import React, { useState, useEffect } from 'react';
import Calculator from './components/Calculator';
import ErrorBoundary from './components/ErrorBoundary';
import { Theme } from './types';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    // Hide loading screen as soon as the main App component is mounted and ready.
    const loader = document.getElementById('root-loading');
    if (loader) {
      loader.classList.add('loading-hidden');
    }
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const bgClass = theme === 'dark' ? 'neon-bg' : 'neon-bg-light';

  return (
    <ErrorBoundary>
      <main className="relative w-screen h-screen overflow-hidden transition-colors duration-500">
        {/* Animated Neon Gradient Background Layer */}
        <div className={`fixed inset-0 pointer-events-none transition-all duration-700 ${bgClass}`}></div>
        
        {/* Dark Overlay for better contrast in dark mode */}
        <div className={`fixed inset-0 pointer-events-none transition-opacity duration-700 ${theme === 'dark' ? 'bg-black/40 opacity-100' : 'opacity-0'}`}></div>

        <div className="relative z-10 w-full h-full">
          <Calculator theme={theme} onToggleTheme={toggleTheme} />
        </div>
      </main>
    </ErrorBoundary>
  );
};

export default App;
