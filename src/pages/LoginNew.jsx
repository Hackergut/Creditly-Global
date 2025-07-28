import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  LogIn,
  ArrowRight,
  CheckCircle,
  Loader2
} from 'lucide-react'
import { Client, Account } from 'appwrite'

export default function LoginNew() {
  console.log('LoginNew component is rendering'); // Debug log
  
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Create Appwrite client
  const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1')
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID || '68868bc500216e6ce4e5');

  const account = new Account(client);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    console.log('Attempting to send OTP to:', phone);
    
    try {
      // Validate phone number format
      if (!phone.startsWith('+')) {
        throw new Error('Il numero di telefono deve iniziare con il prefisso internazionale (es: +39)');
      }
      
      // Appwrite SMS OTP
      await account.createPhoneSession('unique()', phone);
      setStep(2);
      setSuccess('Codice inviato! Controlla il tuo SMS.');
    } catch (err) {
      console.error('Appwrite error:', err);
      setError(err.message || 'Errore durante l\'invio del codice.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      await account.updatePhoneSession('current', otp);
      setSuccess('Login effettuato!');
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (err) {
      setError('Codice OTP non valido.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Appwrite Google OAuth
      await account.createOAuth2Session(
        'google',
        `${window.location.origin}/dashboard`,
        `${window.location.origin}/login`
      );
    } catch (err) {
      console.error('Google OAuth error:', err);
      setError('Errore durante il login con Google.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen antialiased overflow-x-hidden text-slate-100 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md relative z-10">
        <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/40 border-2 border-slate-700/60 rounded-2xl shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogIn className="w-8 h-8 text-green-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-white mb-2">
              Accedi a Creditly Global
            </CardTitle>
            <p className="text-slate-400">
              Scegli il metodo di accesso preferito
            </p>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            {error && (
              <Alert className="mb-6 border-red-500/20 bg-red-500/10 text-red-400">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert className="mb-6 border-green-500/20 bg-green-500/10 text-green-400">
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}
            
            {/* Google OAuth Button */}
            <Button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              variant="outline"
              className="w-full border-slate-600 text-slate-300 hover:bg-slate-700/30 hover:text-white hover:border-slate-500 transition-all duration-300 rounded-xl h-12 mb-6"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continua con Google
            </Button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-slate-800/40 text-slate-400">oppure</span>
              </div>
            </div>

            {/* SMS OTP Section */}
            {step === 1 && (
              <form onSubmit={handleSendOtp} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-slate-300">
                    Numero di telefono
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+39 333 1234567"
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-green-500 focus:ring-green-500/20"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white h-12 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <LogIn className="w-5 h-5 mr-2" />}
                  Invia codice SMS
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </form>
            )}
            {step === 2 && (
              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="otp" className="text-sm font-medium text-slate-300">
                    Codice OTP ricevuto via SMS
                  </label>
                  <Input
                    id="otp"
                    type="text"
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                    placeholder="Inserisci il codice"
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-green-500 focus:ring-green-500/20"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white h-12 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <CheckCircle className="w-5 h-5 mr-2" />}
                  Verifica codice
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <div className="text-center mt-4">
                  <button type="button" onClick={() => setStep(1)} className="text-green-400 hover:text-green-300 font-medium transition-colors text-sm">
                    Cambia numero
                  </button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 