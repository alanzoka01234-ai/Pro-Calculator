
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
      console.error("Critical DOM Element Missing: Could not find '#root' target.");
      return;
    }

    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    console.debug("React render initiated.");
  } catch (err) {
    // We log but don't block. ErrorBoundary in App.tsx handles runtime failures.
    console.error("Mounting failure:", err);
  }
};

// Mount when ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApplication);
} else {
  mountApplication();
}
