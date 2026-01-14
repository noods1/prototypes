import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Suppress errors from browser extensions
window.addEventListener('error', (event) => {
  if (event.filename?.includes('moz-extension://') || 
      event.filename?.includes('chrome-extension://') ||
      event.message?.includes('moz-extension://') ||
      event.message?.includes('chrome-extension://')) {
    event.preventDefault();
    return;
  }
}, true);

// Suppress unhandled promise rejections from extensions
window.addEventListener('unhandledrejection', (event) => {
  const errorString = String(event.reason || '');
  if (errorString.includes('moz-extension://') || 
      errorString.includes('chrome-extension://')) {
    event.preventDefault();
    return;
  }
});

// Wait for DOM to be ready
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Root element not found!');
} else {
  try {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
  } catch (error) {
    console.error('Error rendering app:', error);
    rootElement.innerHTML = `
      <div style="padding: 20px; font-family: sans-serif;">
        <h1>Error loading app</h1>
        <p>${error.message}</p>
        <pre>${error.stack}</pre>
      </div>
    `;
  }
}
