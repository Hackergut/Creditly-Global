
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { User } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, 
  Settings as SettingsIcon,
  Bell,
  Shield,
  Palette,
  Globe,
  Download,
  Trash2,
  Eye,
  EyeOff,
  Save,
  AlertTriangle
} from "lucide-react";
import SimpleBackground from "../components/background/SimpleBackground";

export default function Settings() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    // Notifiche
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    requestUpdates: true,
    
    // Privacy
    profileVisibility: 'private',
    dataSharing: false,
    analyticsTracking: true,
    
    // Interfaccia
    theme: 'dark',
    language: 'it',
    compactMode: false,
    
    // Account
    twoFactorAuth: false,
    sessionTimeout: '24h'
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await User.me();
      setUser(userData);
      
      // Carica impostazioni salvate dall'utente se esistono
      if (userData.settings) {
        setSettings(prev => ({ ...prev, ...userData.settings }));
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
    setLoading(false);
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      await User.updateMyUserData({ settings });
      // Mostra feedback di successo
    } catch (error) {
      console.error("Error saving settings:", error);
    }
    setSaving(false);
  };

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  if (loading) {
    return (
      <SimpleBackground>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#13E8E9]"></div>
        </div>
      </SimpleBackground>
    );
  }

  return (
    <SimpleBackground>
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <Link to={createPageUrl("Dashboard")}>
                <Button variant="outline" size="icon" className="rounded-xl border-white/30 hover:bg-white/20 text-white backdrop-blur-sm bg-[#1a1d2e]/80 hover:border-white/40 transition-all duration-300">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm">
                  <SettingsIcon className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">
                    Impostazioni
                  </h1>
                  <p className="text-white/80 mt-1">
                    Personalizza la tua esperienza
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Notifiche - Dark Mode */}
            <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl">
              <CardHeader className="p-6 border-b border-slate-700/50">
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-white/70" />
                  <span className="text-white">Notifiche</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">Email di notifica</h4>
                    <p className="text-sm text-white/70">Ricevi aggiornamenti via email</p>
                  </div>
                  <Switch 
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                    className="data-[state=checked]:bg-[#13E8E9]"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">Notifiche push</h4>
                    <p className="text-sm text-white/70">Notifiche desktop in tempo reale</p>
                  </div>
                  <Switch 
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
                    className="data-[state=checked]:bg-[#13E8E9]"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">Aggiornamenti richieste</h4>
                    <p className="text-sm text-white/70">Notifiche sui tuoi crediti</p>
                  </div>
                  <Switch 
                    checked={settings.requestUpdates}
                    onCheckedChange={(checked) => handleSettingChange('requestUpdates', checked)}
                    className="data-[state=checked]:bg-[#13E8E9]"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">Email marketing</h4>
                    <p className="text-sm text-white/70">Newsletter e offerte speciali</p>
                  </div>
                  <Switch 
                    checked={settings.marketingEmails}
                    onCheckedChange={(checked) => handleSettingChange('marketingEmails', checked)}
                    className="data-[state=checked]:bg-[#13E8E9]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Privacy e Sicurezza - Dark Mode */}
            <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl">
              <CardHeader className="p-6 border-b border-slate-700/50">
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-white/70" />
                  <span className="text-white">Privacy e Sicurezza</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Visibilità profilo
                  </label>
                  <Select value={settings.profileVisibility} onValueChange={(value) => handleSettingChange('profileVisibility', value)}>
                    <SelectTrigger className="bg-slate-800/50 border-slate-600/50 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem value="public" className="text-white hover:bg-slate-700">Pubblico</SelectItem>
                      <SelectItem value="private" className="text-white hover:bg-slate-700">Privato</SelectItem>
                      <SelectItem value="contacts" className="text-white hover:bg-slate-700">Solo contatti</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">Autenticazione a due fattori</h4>
                    <p className="text-sm text-white/70">Sicurezza aggiuntiva per il tuo account</p>
                  </div>
                  <Switch 
                    checked={settings.twoFactorAuth}
                    onCheckedChange={(checked) => handleSettingChange('twoFactorAuth', checked)}
                    className="data-[state=checked]:bg-[#13E8E9]"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">Condivisione dati</h4>
                    <p className="text-sm text-white/70">Condividi dati anonimi per migliorare il servizio</p>
                  </div>
                  <Switch 
                    checked={settings.dataSharing}
                    onCheckedChange={(checked) => handleSettingChange('dataSharing', checked)}
                    className="data-[state=checked]:bg-[#13E8E9]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Timeout sessione
                  </label>
                  <Select value={settings.sessionTimeout} onValueChange={(value) => handleSettingChange('sessionTimeout', value)}>
                    <SelectTrigger className="bg-slate-800/50 border-slate-600/50 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem value="1h" className="text-white hover:bg-slate-700">1 ora</SelectItem>
                      <SelectItem value="24h" className="text-white hover:bg-slate-700">24 ore</SelectItem>
                      <SelectItem value="7d" className="text-white hover:bg-slate-700">7 giorni</SelectItem>
                      <SelectItem value="30d" className="text-white hover:bg-slate-700">30 giorni</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Interfaccia */}
            <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl">
              <CardHeader className="p-6 border-b border-slate-700/50">
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="w-5 h-5 text-white/70" />
                  <span className="text-white">Interfaccia</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Tema
                  </label>
                  <Select value={settings.theme} onValueChange={(value) => handleSettingChange('theme', value)}>
                    <SelectTrigger className="bg-slate-800/50 border-slate-600/50 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem value="dark" className="text-white hover:bg-slate-700">Scuro</SelectItem>
                      <SelectItem value="light" className="text-white hover:bg-slate-700">Chiaro</SelectItem>
                      <SelectItem value="auto" className="text-white hover:bg-slate-700">Automatico</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Lingua
                  </label>
                  <Select value={settings.language} onValueChange={(value) => handleSettingChange('language', value)}>
                    <SelectTrigger className="bg-slate-800/50 border-slate-600/50 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem value="it" className="text-white hover:bg-slate-700">Italiano</SelectItem>
                      <SelectItem value="en" className="text-white hover:bg-slate-700">English</SelectItem>
                      <SelectItem value="es" className="text-white hover:bg-slate-700">Español</SelectItem>
                      <SelectItem value="fr" className="text-white hover:bg-slate-700">Français</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">Modalità compatta</h4>
                    <p className="text-sm text-white/70">Riduci spaziatura e dimensioni</p>
                  </div>
                  <Switch 
                    checked={settings.compactMode}
                    onCheckedChange={(checked) => handleSettingChange('compactMode', checked)}
                    className="data-[state=checked]:bg-[#13E8E9]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Zona Pericolosa */}
            <Card className="backdrop-filter backdrop-blur-12px bg-red-900/20 border-2 border-red-700/40 rounded-2xl shadow-xl">
              <CardHeader className="p-6 border-b border-red-700/30">
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <span className="text-white">Zona Pericolosa</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">Scarica i tuoi dati</h4>
                    <p className="text-sm text-white/70">Esporta tutti i tuoi dati personali</p>
                  </div>
                  <Button variant="outline" className="border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:text-blue-300">
                    <Download className="w-4 h-4 mr-2" />
                    Scarica
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">Elimina account</h4>
                    <p className="text-sm text-white/70">Cancella permanentemente il tuo account</p>
                  </div>
                  <Button variant="outline" className="border-red-600 text-red-400 hover:bg-red-600/10 hover:text-red-300">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Elimina
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Salva Impostazioni */}
            <div className="flex justify-end">
              <Button 
                onClick={handleSaveSettings}
                disabled={saving}
                className="bg-[#13E8E9] hover:bg-[#13E8E9]/90 text-[#2c2e43] px-8 py-3 rounded-xl font-semibold"
              >
                {saving ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#2c2e43] mr-2"></div>
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Salva Impostazioni
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SimpleBackground>
  );
}
