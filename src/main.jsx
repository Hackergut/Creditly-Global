import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'
import { validateConfig, getBackendType } from '@/lib/config.js'
import { debugConfig, showConfigError } from '@/lib/debug.js'

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

// Debug configurazione in produzione
if (import.meta.env.PROD) {
  debugConfig()
  
  // Se non c'è backend configurato, mostra errore
  if (!getBackendType()) {
    showConfigError()
  }
}

// Validazione configurazione
if (!validateConfig()) {
  console.error('Configurazione non valida. Controlla le variabili d\'ambiente.')
}

// Log del backend utilizzato
const backendType = getBackendType()
if (backendType) {
  console.log(`Backend configurato: ${backendType}`)
} else {
  console.warn('Nessun backend configurato')
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
) 