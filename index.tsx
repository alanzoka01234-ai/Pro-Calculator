
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/**
 * Main entry point for the React application.
 * Using a direct, standard initialization flow for production reliability.
 */
const mount = () => {
  const container = document.getElementById('root');
  if (!container) {
    console.error("Target container #root not found.");
    return;
  }

  try {
    const root = ReactDOM.createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Failed to render React application:", error);
    // Ensure visibility even on render failure
    const loader = document.getElementById('root-loading');
    if (loader) loader.classList.add('loading-hidden');
  }
};

// Mount immediately if the DOM is already parsed, or wait for the event.
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  mount();
} else {
  document.addEventListener('DOMContentLoaded', mount);
}
