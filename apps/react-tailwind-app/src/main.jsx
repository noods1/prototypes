import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
