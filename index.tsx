
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/**
 * Initializes the React application.
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
    
    console.debug("React render initiated.");
  } catch (err) {
    console.error("Initialization failure:", err);
    const overlay = document.getElementById('error-overlay');
    if (overlay) {
      overlay.style.display = 'block';
      overlay.innerHTML += `<p><strong>React Initialization Failed:</strong> ${err instanceof Error ? err.message : String(err)}</p>`;
    }
  }
};

// Mount when ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApplication);
} else {
  mountApplication();
}
