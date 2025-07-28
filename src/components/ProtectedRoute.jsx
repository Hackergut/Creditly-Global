import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuthSimple'
import { Loader2 } from 'lucide-react'

export const ProtectedRoute = ({ children, redirectTo = '/login' }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-green-400 mx-auto mb-4" />
          <p className="text-slate-400">Caricamento...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    // Redirect to login with return url
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  return children
}

export const PublicRoute = ({ children, redirectTo = '/dashboard' }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-green-400 mx-auto mb-4" />
          <p className="text-slate-400">Caricamento...</p>
        </div>
      </div>
    )
  }

  if (user) {
    // Redirect authenticated users away from public routes
    return <Navigate to={redirectTo} replace />
  }

  return children
} 