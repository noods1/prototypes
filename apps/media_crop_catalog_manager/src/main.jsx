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

// Wait for DOM to be ready and log for debugging
console.log('main.jsx loaded, looking for root element...');
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Root element not found!');
  document.body.innerHTML = '<div style="padding: 20px; color: red;">Error: Root element not found!</div>';
} else {
  console.log('Root element found, attempting to render...');
  try {
    const root = ReactDOM.createRoot(rootElement);
    console.log('React root created, rendering App...');
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
    console.log('App rendered successfully!');
  } catch (error) {
    console.error('Error rendering app:', error);
    rootElement.innerHTML = `
      <div style="padding: 20px; font-family: sans-serif; color: red;">
        <h1>Error loading app</h1>
        <p><strong>Error:</strong> ${error.message}</p>
        <pre style="background: #f5f5f5; padding: 10px; overflow: auto;">${error.stack}</pre>
      </div>
    `;
  }
}
