// Debug utility per verificare la configurazione in produzione
export const debugConfig = () => {
  console.log('🔍 Debug Configurazione:')
  
  // Verifica variabili d'ambiente
  console.log('🔧 Modalità: SIMPLIFIED CLIENT (senza backend)')
  console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL ? '✅ Configurato' : '❌ Mancante')
  console.log('VITE_SUPABASE_ANON_KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY ? '✅ Configurato' : '❌ Mancante')
  console.log('VITE_APPWRITE_ENDPOINT:', import.meta.env.VITE_APPWRITE_ENDPOINT ? '✅ Configurato' : '❌ Mancante')
  console.log('VITE_APPWRITE_PROJECT:', import.meta.env.VITE_APPWRITE_PROJECT ? '✅ Configurato' : '❌ Mancante')
  console.log('VITE_APPWRITE_PLATFORM:', import.meta.env.VITE_APPWRITE_PLATFORM ? '✅ Configurato' : '❌ Mancante')
  
  // Verifica ambiente
  console.log('NODE_ENV:', import.meta.env.MODE)
  console.log('PROD:', import.meta.env.PROD)
  console.log('DEV:', import.meta.env.DEV)
  
  // Verifica URL
  console.log('Current URL:', window.location.href)
  console.log('Hostname:', window.location.hostname)
  
  // Verifica errori comuni
  const errors = []
  
  if (!import.meta.env.VITE_SUPABASE_URL && !import.meta.env.VITE_APPWRITE_ENDPOINT) {
    errors.push('❌ Nessun backend configurato')
  }
  
  if (window.location.hostname === 'localhost' && import.meta.env.PROD) {
    errors.push('⚠️  Ambiente di produzione su localhost')
  }
  
  if (errors.length > 0) {
    console.error('🚨 Errori di configurazione:', errors)
    return false
  }
  
  console.log('✅ Configurazione OK')
  return true
}

// Funzione per mostrare errori all'utente
export const showConfigError = () => {
  const errorDiv = document.createElement('div')
  errorDiv.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: #ef4444;
    color: white;
    padding: 1rem;
    text-align: center;
    z-index: 9999;
    font-family: Arial, sans-serif;
  `
  errorDiv.innerHTML = `
    <strong>⚠️ Errore di Configurazione</strong><br>
    Le variabili d'ambiente non sono configurate correttamente.<br>
    Controlla la console del browser per dettagli.
  `
  document.body.appendChild(errorDiv)
  
  // Rimuovi dopo 10 secondi
  setTimeout(() => {
    if (errorDiv.parentNode) {
      errorDiv.parentNode.removeChild(errorDiv)
    }
  }, 10000)
}

export default debugConfig 