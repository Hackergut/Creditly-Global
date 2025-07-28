// Client semplificato per testare senza backend
export const simpleAuth = {
  // Mock user per test
  getCurrentUser: async () => {
    return { user: null, error: null }
  },

  getCurrentSession: async () => {
    return { session: null, error: null }
  },

  onAuthStateChange: (callback) => {
    // Simula auth state change
    callback('SIGNED_OUT', { user: null })
    return {
      data: {
        subscription: {
          unsubscribe: () => {}
        }
      }
    }
  },

  signIn: async (email, password) => {
    console.log('Mock sign in:', email)
    return { data: { user: { id: 'mock-user', email } }, error: null }
  },

  signUp: async (email, password) => {
    console.log('Mock sign up:', email)
    return { data: { user: { id: 'mock-user', email } }, error: null }
  },

  signOut: async () => {
    console.log('Mock sign out')
    return { error: null }
  }
}

export const simpleDb = {
  select: () => ({ data: [], error: null }),
  insert: () => ({ data: null, error: null }),
  update: () => ({ data: null, error: null }),
  delete: () => ({ data: null, error: null }),
  
  creditRequests: {
    getAll: () => ({ data: [], error: null }),
    getById: () => ({ data: null, error: null }),
    create: () => ({ data: null, error: null }),
    update: () => ({ data: null, error: null }),
    delete: () => ({ data: null, error: null })
  },

  users: {
    getProfile: () => ({ profile: null, error: null }),
    updateProfile: () => ({ data: null, error: null }),
    getCurrentUserProfile: () => ({ profile: null, error: null }),
    createProfile: () => ({ data: null, error: null })
  },

  notifications: {
    getAll: () => ({ data: [], error: null }),
    markAsRead: () => ({ data: null, error: null })
  }
}

export const simpleStorage = {
  uploadFile: () => ({ data: null, error: null }),
  getPublicUrl: () => ({ data: { publicUrl: '' }, error: null }),
  deleteFile: () => ({ data: null, error: null })
}

// Esporta per compatibilità
export const auth = simpleAuth
export const db = simpleDb
export const storage = simpleStorage 