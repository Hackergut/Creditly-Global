// Versione semplificata per testare senza backend
import { auth, db, storage } from './simpleClient.js'

// Per compatibilità, esporta ancora 'supabase'
export const supabase = {
  auth: auth
}

// Auth helpers - usa il client semplificato
export { auth, db, storage }

export default supabase 