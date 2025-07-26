import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  db: {
    schema: 'public'
  }
})

// Auth helpers
export const auth = {
  // Sign up with email
  signUp: async (email, password, userData = {}) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    })
    return { data, error }
  },

  // Sign in with email
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  // Sign in with Google
  signInWithGoogle: async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
    return { data, error }
  },

  // Sign in with Apple
  signInWithApple: async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
    return { data, error }
  },

  // Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Get current user
  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  // Get current session
  getCurrentSession: async () => {
    const { data: { session }, error } = await supabase.auth.getSession()
    return { session, error }
  },

  // Listen to auth changes
  onAuthStateChange: (callback) => {
    return supabase.auth.onAuthStateChange(callback)
  },

  // Reset password
  resetPassword: async (email) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`
    })
    return { data, error }
  },

  // Update password
  updatePassword: async (password) => {
    const { data, error } = await supabase.auth.updateUser({
      password
    })
    return { data, error }
  }
}

// Database helpers
export const db = {
  // Generic CRUD operations
  select: (table, columns = '*', filters = {}) => {
    let query = supabase.from(table).select(columns)
    
    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value)
    })
    
    return query
  },

  insert: (table, data) => {
    return supabase.from(table).insert(data)
  },

  update: (table, data, filters = {}) => {
    let query = supabase.from(table).update(data)
    
    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value)
    })
    
    return query
  },

  delete: (table, filters = {}) => {
    let query = supabase.from(table).delete()
    
    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value)
    })
    
    return query
  },

  // Specific table operations
  creditRequests: {
    getAll: (userId = null) => {
      let query = supabase.from('credit_requests').select('*')
      if (userId) query = query.eq('user_id', userId)
      return query
    },
    
    getById: (id) => {
      return supabase.from('credit_requests').select('*').eq('id', id).single()
    },
    
    create: (data) => {
      return supabase.from('credit_requests').insert(data)
    },
    
    update: (id, data) => {
      return supabase.from('credit_requests').update(data).eq('id', id)
    },
    
    delete: (id) => {
      return supabase.from('credit_requests').delete().eq('id', id)
    }
  },

  users: {
    getProfile: (userId) => {
      return supabase.from('profiles').select('*').eq('id', userId).single()
    },
    
    updateProfile: (userId, data) => {
      return supabase.from('profiles').update(data).eq('id', userId)
    }
  },

  notifications: {
    getAll: (userId) => {
      return supabase.from('notifications').select('*').eq('user_id', userId).order('created_at', { ascending: false })
    },
    
    markAsRead: (id) => {
      return supabase.from('notifications').update({ read: true }).eq('id', id)
    }
  }
}

// Storage helpers
export const storage = {
  uploadFile: (bucket, path, file) => {
    return supabase.storage.from(bucket).upload(path, file)
  },

  getPublicUrl: (bucket, path) => {
    return supabase.storage.from(bucket).getPublicUrl(path)
  },

  deleteFile: (bucket, path) => {
    return supabase.storage.from(bucket).remove([path])
  }
}

export default supabase 