import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'

// Global error handler
window.addEventListener('error', (event) => {
  // Ignore storage intelligence errors
  if (event.message && event.message.includes('storage-intelligence')) {
    event.preventDefault();
    return false;
  }
});

// Global unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  // Ignore storage intelligence errors
  if (event.reason && event.reason.toString().includes('storage-intelligence')) {
    event.preventDefault();
    return false;
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
) 