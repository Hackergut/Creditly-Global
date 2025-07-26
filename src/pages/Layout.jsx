

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { User } from "@/api/entities";
import {
  Menu,
  X as CloseIcon, // Renamed X to CloseIcon as per outline
  Home,
  FileText,
  User as UserIcon,
  Bell,
  Settings,
  LogOut,
  ChevronDown,
  BookOpen,
  ShoppingCart,
  Shield,
  Mail,
  LifeBuoy,
  LayoutDashboard, // New icon from outline
  BarChart2,     // New icon from outline
  Users,         // New icon from outline
  HelpCircle,    // New icon from outline
  TrendingUp,    // New icon from outline
  MessageSquare, // New icon from outline
  CreditCard     // New icon from outline
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // New import from outline
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import FloatingChatbot from '@/components/chatbot/FloatingChatbot';

const navigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: Home
  },
  {
    title: "Marketplace",
    url: createPageUrl("MarketplaceCrediti"),
    icon: ShoppingCart
  },
  {
    title: "Guida ai Crediti",
    url: createPageUrl("GuidaCrediti"),
    icon: BookOpen
  }
];

// Componente separato per PublicHomepage
const PublicHomepage = React.memo(() => {
  const handleLogin = async () => {
    try {
      // Redirect to the specific login URL for external access
      window.location.href = "https://creditlyglobal.com/login?from_url=https://creditlyglobal.com/&app_id=688200a6c0a000b269dd75a1";
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen antialiased overflow-x-hidden text-slate-100 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-400/10 via-transparent to-transparent pointer-events-none"></div>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-400/5 via-transparent to-transparent pointer-events-none"></div>

      {/* Navigation */}
      <nav className="relative z-10 max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/03d2053c2_JJJJ.png"
              alt="Creditly Global"
              className="w-8 h-8 rounded-lg"
            />
            <span className="text-xl font-semibold tracking-tight text-white">Creditly Global</span>
          </div>
          <Button
            onClick={handleLogin}
            className="bg-white text-slate-900 px-4 py-2 rounded-lg font-medium hover:bg-slate-100 transition-all duration-200 hover:scale-105"
          >
            Accedi / Registrati
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full text-xs font-medium text-green-400 mb-6">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>Piattaforma #1 per Crediti Fiscali</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Trasforma i tuoi <br />
            <span className="bg-gradient-to-r from-green-400 to-purple-400 bg-clip-text text-transparent">crediti fiscali</span> <br />
            in liquidità immediata
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
            La piattaforma intelligente per la gestione automatizzata di Superbonus,
            Crediti 4.0, IVA e molto altro. Valutazione gratuita in 24 ore.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleLogin}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 hover:scale-105 shadow-lg"
            >
              Inizia Gratis
            </Button>
            <Button
              variant="outline"
              className="border border-slate-600 text-slate-300 px-6 py-3 rounded-lg font-medium hover:border-slate-500 hover:text-white transition-all duration-200"
            >
              Scopri Come Funziona
            </Button>
          </div>
        </div>
      </section>

      {/* Footer Completo per PublicHomepage */}
      <footer className="py-16 bg-slate-900/80 backdrop-blur-sm border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Logo e Descrizione */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/03d2053c2_JJJJ.png"
                  alt="Creditly Global"
                  className="w-10 h-10 rounded-lg"
                />
                <span className="text-xl font-bold text-white">Creditly Global</span>
              </div>
              <p className="text-slate-400 text-sm mb-4">
                La piattaforma leader per la gestione e monetizzazione dei crediti fiscali in Italia.
              </p>
            </div>

            {/* Servizi */}
            <div>
              <h4 className="font-semibold text-white mb-4">Servizi</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Superbonus 110%</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Credito d'Imposta 4.0</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Crediti IVA</a></li>
                <li><Link to={createPageUrl("MarketplaceCrediti")} className="hover:text-white transition-colors">Marketplace Crediti</Link></li>
              </ul>
            </div>

            {/* Azienda */}
            <div>
              <h4 className="font-semibold text-white mb-4">Azienda</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Chi Siamo</a></li>
                <li><Link to={createPageUrl("Contact")} className="hover:text-white transition-colors">Contattaci</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Carriere</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Partnership</a></li>
              </ul>
            </div>

            {/* Supporto */}
            <div>
              <h4 className="font-semibold text-white mb-4">Supporto</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to={createPageUrl("SupportCenter")} className="hover:text-white transition-colors">Centro Assistenza</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><Link to={createPageUrl("GuidaCrediti")} className="hover:text-white transition-colors">Guide</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>

          {/* Info Legali Ridotte */}
          <div className="border-t border-slate-800 pt-6 text-center">
            <p className="text-slate-400 text-sm mb-2">
              © 2024 Creditly Global. Tutti i diritti riservati.
            </p>
            <p className="text-slate-500 text-xs">
              MANAGEMENT E SERVIZI S.R.L.S. • P.IVA 17303971000 • REA: RM-1709794
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
});

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (location.pathname.includes('/login')) {
      const urlParams = new URLSearchParams(location.search);
      const fromUrl = urlParams.get('from_url');

      if (fromUrl && (fromUrl.includes('creditlyglobal.com') || fromUrl === 'https://creditlyglobal.com/' || fromUrl === 'https://creditlyglobal.com')) {
        setIsLoading(false);
        return;
      }
    }

    loadUser();
  }, [location]);

  const loadUser = async () => {
    try {
      const userData = await User.me();
      setUser(userData);
    } catch (error) {
      console.log("User not authenticated");
    }
    setIsLoading(false);
  };

  const handleLogout = async () => {
    try {
      await User.logout();
      window.location.href = createPageUrl("Welcome");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
      </div>
    );
  }

  // Gestione redirect per login dal dominio
  if (location.pathname.includes('/login')) {
    const urlParams = new URLSearchParams(location.search);
    const fromUrl = urlParams.get('from_url');

    if (fromUrl && (fromUrl.includes('creditlyglobal.com') || fromUrl === 'https://creditlyglobal.com/' || fromUrl === 'https://creditlyglobal.com')) {
      // Redirect to Welcome page che ora è la nostra landing/login page
      window.location.href = createPageUrl("Welcome");
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
        </div>
      );
    }
  }

  if (user && location.pathname.includes('/login')) {
    window.location.href = createPageUrl("Dashboard");
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
      </div>
    );
  }

  if (user && location.pathname.includes('/welcome')) {
    window.location.href = createPageUrl("Dashboard");
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
      </div>
    );
  }

  if (!user && !location.pathname.includes('/welcome') && !location.pathname.includes('/onboarding') && !location.pathname.includes('/login')) {
    window.location.href = createPageUrl("Welcome");
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
      </div>
    );
  }

  if (location.pathname.includes('/welcome')) {
    return <PublicHomepage />;
  }

  return (
    <div className="min-h-screen antialiased overflow-x-hidden text-slate-100 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-400/10 via-transparent to-transparent pointer-events-none"></div>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-400/5 via-transparent to-transparent pointer-events-none"></div>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-filter backdrop-blur-8px bg-slate-900/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link
              to={createPageUrl("Dashboard")}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/03d2053c2_JJJJ.png"
                alt="Creditly Global"
                className="w-8 h-8 rounded-lg"
              />
              <span className="text-xl font-semibold tracking-tight text-white">Creditly Global</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {user && navigationItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.url}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === item.url
                      ? "bg-green-500/10 text-green-400 border border-green-500/20"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.title}</span>
                </Link>
              ))}
            </nav>

            {/* User Menu */}
            {user ? (
              <div className="flex items-center space-x-2">
                {/* Notifications */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg"
                >
                  <Bell className="w-5 h-5" />
                </Button>

                {/* User Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2 hover:bg-slate-800/50 text-slate-300 hover:text-white rounded-lg"
                    >
                      <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                        <UserIcon className="w-4 h-4 text-green-400" />
                      </div>
                      <span className="hidden sm:inline text-sm font-medium max-w-32 truncate">
                        {user.company_name || user.full_name || "Utente"}
                      </span>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-slate-900/95 backdrop-blur-sm border-slate-700">
                    <div className="px-3 py-2">
                      <p className="text-sm font-medium text-white truncate">{user.full_name}</p>
                      <p className="text-xs text-slate-400 truncate">{user.email}</p>
                    </div>
                    <DropdownMenuSeparator className="bg-slate-700" />
                    <DropdownMenuItem className="focus:bg-slate-800 text-slate-300 hover:text-white">
                      <Link to={createPageUrl("Profile")} className="flex items-center w-full">
                        <UserIcon className="w-4 h-4 mr-2" />
                        Profilo
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="focus:bg-slate-800 text-slate-300 hover:text-white">
                      <Link to={createPageUrl("Settings")} className="flex items-center w-full">
                        <Settings className="w-4 h-4 mr-2" />
                        Impostazioni
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-slate-700" />
                    <DropdownMenuItem className="focus:bg-slate-800 text-slate-300 hover:text-white">
                      <Link to={createPageUrl("PrivacyPolicy")} className="flex items-center w-full">
                        <Shield className="w-4 h-4 mr-2" />
                        Privacy Policy
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="focus:bg-slate-800 text-slate-300 hover:text-white">
                      <Link to={createPageUrl("TermsOfService")} className="flex items-center w-full">
                        <FileText className="w-4 h-4 mr-2" />
                        Termini di Servizio
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="focus:bg-slate-800 text-slate-300 hover:text-white">
                      <Link to={createPageUrl("Contact")} className="flex items-center w-full">
                        <Mail className="w-4 h-4 mr-2" />
                        Contattaci
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="focus:bg-slate-800 text-slate-300 hover:text-white">
                      <Link to={createPageUrl("SupportCenter")} className="flex items-center w-full">
                        <LifeBuoy className="w-4 h-4 mr-2" />
                        Centro Assistenza
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-slate-700" />
                    <DropdownMenuItem onClick={handleLogout} className="focus:bg-red-900/20 text-red-400 hover:text-red-300">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Mobile Menu Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden hover:bg-slate-800/50 text-slate-400 hover:text-white rounded-lg"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <CloseIcon className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => window.location.href = createPageUrl("Welcome")}
                className="bg-[#13E8E9] text-[#2c2e43] px-4 py-2 rounded-lg font-medium hover:bg-[#13E8E9]/90 transition-all duration-200 hover:scale-105"
              >
                Accedi
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && user && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-sm border-t border-slate-800">
            <div className="px-6 py-3 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.url}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === item.url
                      ? "bg-green-500/10 text-green-400"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.title}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer Principale App */}
      <footer className="bg-slate-900/50 backdrop-blur-sm border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/03d2053c2_JJJJ.png"
                alt="Creditly Global"
                className="w-6 h-6 rounded"
              />
              <div className="text-sm text-slate-400">
                © 2024 Creditly Global. Tutti i diritti riservati.
              </div>
            </div>
            <div className="flex space-x-6 text-sm text-slate-400">
              <Link to={createPageUrl("PrivacyPolicy")} className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link to={createPageUrl("TermsOfService")} className="hover:text-white transition-colors">
                Termini
              </Link>
              <Link to={createPageUrl("Contact")} className="hover:text-white transition-colors">
                Contatti
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Chatbot - Solo per utenti autenticati */}
      {user && <FloatingChatbot />}
    </div>
  );
}

