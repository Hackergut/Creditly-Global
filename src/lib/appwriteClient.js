import { Client, Account, Databases, Storage } from "appwrite";

const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const account = new Account(client);
const databases = new Databases(client);
const appwriteStorage = new Storage(client);

// Helper function to get the correct redirect URL
const getRedirectUrl = () => {
  const isProduction = window.location.hostname !== 'localhost'
  const baseUrl = isProduction 
    ? 'https://creditlyglobal.com'
    : window.location.origin
  return `${baseUrl}/auth/callback`
}

// Auth helpers - compatible with existing Supabase interface
export const auth = {
  // Sign up with email
  signUp: async (email, password, userData = {}) => {
    try {
      const user = await account.create(
        'unique()',
        email,
        password,
        userData.name || email
      )
      
      // Create user profile in database
      if (user.$id) {
        await databases.createDocument(
          'your_database_id', // Replace with your database ID
          'profiles', // Replace with your collection ID
          'unique()',
          {
            id: user.$id,
            email: email,
            ...userData
          }
        )
      }
      
      return { data: { user }, error: null }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Sign in with email
  signIn: async (email, password) => {
    try {
      const session = await account.createEmailSession(email, password)
      const user = await account.get()
      return { data: { user, session }, error: null }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Sign in with Google
  signInWithGoogle: async () => {
    try {
      const session = await account.createOAuth2Session(
        'google',
        getRedirectUrl(),
        getRedirectUrl()
      )
      return { data: { session }, error: null }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Sign in with Apple
  signInWithApple: async () => {
    try {
      const session = await account.createOAuth2Session(
        'apple',
        getRedirectUrl(),
        getRedirectUrl()
      )
      return { data: { session }, error: null }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Sign out
  signOut: async () => {
    try {
      await account.deleteSession('current')
      return { error: null }
    } catch (error) {
      return { error }
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const user = await account.get()
      return { user, error: null }
    } catch (error) {
      return { user: null, error }
    }
  },

  // Get current session
  getCurrentSession: async () => {
    try {
      const session = await account.getSession('current')
      return { session, error: null }
    } catch (error) {
      return { session: null, error }
    }
  },

  // Listen to auth changes (Appwrite doesn't have real-time auth, so we'll simulate)
  onAuthStateChange: (callback) => {
    // For now, we'll just call the callback immediately
    // In a real implementation, you might want to use Appwrite's real-time features
    const checkAuth = async () => {
      try {
        const user = await account.get()
        callback('SIGNED_IN', { user })
      } catch (error) {
        callback('SIGNED_OUT', { user: null })
      }
    }
    
    checkAuth()
    
    // Return a subscription object for compatibility
    return {
      data: {
        subscription: {
          unsubscribe: () => {} // No-op for now
        }
      }
    }
  },

  // Reset password
  resetPassword: async (email) => {
    try {
      await account.createRecovery(
        email,
        getRedirectUrl().replace('/auth/callback', '/auth/reset-password')
      )
      return { data: { message: 'Recovery email sent' }, error: null }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Update password
  updatePassword: async (password) => {
    try {
      const user = await account.updatePassword(password)
      return { data: { user }, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }
}

// Database helpers - compatible with existing Supabase interface
export const db = {
  // Generic CRUD operations
  select: (table, columns = '*', filters = {}) => {
    // This is a simplified version - you'll need to adapt based on your Appwrite setup
    return databases.listDocuments('your_database_id', table)
  },

  insert: (table, data) => {
    return databases.createDocument('your_database_id', table, 'unique()', data)
  },

  update: (table, data, filters = {}) => {
    // You'll need to implement this based on your specific needs
    return databases.updateDocument('your_database_id', table, filters.id, data)
  },

  delete: (table, filters = {}) => {
    return databases.deleteDocument('your_database_id', table, filters.id)
  },

  // Specific table operations
  creditRequests: {
    getAll: (userId = null) => {
      let query = databases.listDocuments('your_database_id', 'credit_requests')
      // Add filtering logic here
      return query
    },
    
    getById: (id) => {
      return databases.getDocument('your_database_id', 'credit_requests', id)
    },
    
    create: (data) => {
      return databases.createDocument('your_database_id', 'credit_requests', 'unique()', data)
    },
    
    update: (id, data) => {
      return databases.updateDocument('your_database_id', 'credit_requests', id, data)
    },
    
    delete: (id) => {
      return databases.deleteDocument('your_database_id', 'credit_requests', id)
    }
  },

  users: {
    getProfile: (userId) => {
      return databases.getDocument('your_database_id', 'profiles', userId)
    },
    
    updateProfile: (userId, data) => {
      return databases.updateDocument('your_database_id', 'profiles', userId, data)
    },

    getCurrentUserProfile: async () => {
      try {
        const user = await account.get()
        const profile = await databases.getDocument('your_database_id', 'profiles', user.$id)
        return { profile, error: null }
      } catch (error) {
        return { profile: null, error }
      }
    },

    createProfile: (profileData) => {
      return databases.createDocument('your_database_id', 'profiles', 'unique()', profileData)
    }
  },

  notifications: {
    getAll: (userId) => {
      return databases.listDocuments('your_database_id', 'notifications')
    },
    
    markAsRead: (id) => {
      return databases.updateDocument('your_database_id', 'notifications', id, { read: true })
    }
  }
}

// Storage helpers
export const storage = {
  uploadFile: (bucket, path, file) => {
    return appwriteStorage.createFile(bucket, path, file)
  },

  getPublicUrl: (bucket, path) => {
    return appwriteStorage.getFileView(bucket, path)
  },

  deleteFile: (bucket, path) => {
    return appwriteStorage.deleteFile(bucket, path)
  }
}

export default client 