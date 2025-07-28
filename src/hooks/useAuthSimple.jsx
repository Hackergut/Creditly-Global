import { useState, useEffect, createContext, useContext } from 'react'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false) // Cambiato a false per test
  const [session, setSession] = useState(null)

  useEffect(() => {
    // Simula un breve caricamento
    const timer = setTimeout(() => {
      setLoading(false)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const signIn = async (email, password) => {
    console.log('Mock sign in:', email)
    return { data: { user: { id: 'mock-user', email } }, error: null }
  }

  const signUp = async (email, password, userData = {}) => {
    console.log('Mock sign up:', email)
    return { data: { user: { id: 'mock-user', email } }, error: null }
  }

  const signInWithGoogle = async () => {
    console.log('Mock Google sign in')
    return { data: { user: { id: 'mock-user' } }, error: null }
  }

  const signInWithApple = async () => {
    console.log('Mock Apple sign in')
    return { data: { user: { id: 'mock-user' } }, error: null }
  }

  const signOut = async () => {
    console.log('Mock sign out')
    return { error: null }
  }

  const resetPassword = async (email) => {
    console.log('Mock reset password:', email)
    return { data: { message: 'Email sent' }, error: null }
  }

  const updatePassword = async (password) => {
    console.log('Mock update password')
    return { data: { user: { id: 'mock-user' } }, error: null }
  }

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signInWithApple,
    signOut,
    resetPassword,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 