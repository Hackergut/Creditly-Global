import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabaseClient'
import { Loader2 } from 'lucide-react'

export default function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Auth callback error:', error)
          navigate('/login?error=auth_failed')
          return
        }

        if (data.session) {
          // Successfully authenticated
          navigate('/dashboard')
        } else {
          // No session found
          navigate('/login?error=no_session')
        }
      } catch (error) {
        console.error('Unexpected error during auth callback:', error)
        navigate('/login?error=unexpected')
      }
    }

    handleAuthCallback()
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin text-green-400 mx-auto mb-4" />
        <p className="text-slate-400">Completamento autenticazione...</p>
      </div>
    </div>
  )
} 