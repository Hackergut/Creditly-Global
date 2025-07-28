// Configurazione centralizzata per le variabili d'ambiente
export const config = {
  // Supabase
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  },
  
  // Appwrite
  appwrite: {
    endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT,
    projectId: import.meta.env.VITE_APPWRITE_PROJECT,
    platform: import.meta.env.VITE_APPWRITE_PLATFORM,
  },
  
  // Ambiente
  isProduction: import.meta.env.PROD,
  isDevelopment: import.meta.env.DEV,
  
  // URL di base
  baseUrl: import.meta.env.PROD 
    ? 'https://creditlyglobal.com'
    : window.location.origin,
}

// Verifica configurazione
export const validateConfig = () => {
  const errors = []
  
  // Verifica se almeno uno dei backend è configurato
  const hasSupabase = config.supabase.url && config.supabase.anonKey
  const hasAppwrite = config.appwrite.endpoint && config.appwrite.projectId
  
  if (!hasSupabase && !hasAppwrite) {
    errors.push('Nessun backend configurato. Configura Supabase o Appwrite.')
  }
  
  if (errors.length > 0) {
    console.error('Errori di configurazione:', errors)
    return false
  }
  
  return true
}

// Determina quale backend usare
export const getBackendType = () => {
  if (config.appwrite.endpoint && config.appwrite.projectId) {
    return 'appwrite'
  }
  if (config.supabase.url && config.supabase.anonKey) {
    return 'supabase'
  }
  return null
}

export default config 