
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/**
 * Initializes the React application with safety checks.
 * This prevents the white screen issue by catching mounting errors early.
 */
const mountApplication = () => {
  try {
    const rootElement = document.getElementById('root');
    if (!rootElement) {
      throw new Error("Critical DOM Element Missing: Could not find '#root' target.");
    }

    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    // Smooth transition from HTML loading state to React app
    const loader = document.getElementById('root-loading');
    if (loader) {
      loader.style.transition = 'opacity 0.5s ease-out';
      loader.style.opacity = '0';
      setTimeout(() => {
        if (loader.parentNode) loader.parentNode.removeChild(loader);
      }, 500);
    }
    
    console.debug("Application mounted successfully.");
  } catch (err) {
    console.error("Initialization failure:", err);
    const overlay = document.getElementById('error-overlay');
    if (overlay) {
      overlay.style.display = 'block';
      overlay.innerHTML += `<p><strong>React Initialization Failed:</strong> ${err instanceof Error ? err.message : String(err)}</p>`;
    }
  }
};

// Check for DOM readiness to ensure root element is available
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApplication);
} else {
  mountApplication();
}
