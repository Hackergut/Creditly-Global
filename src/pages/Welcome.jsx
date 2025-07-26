
import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  Shield,
  Zap,
  Users,
  TrendingUp,
  CheckCircle,
  Star,
  LogIn,
  Sparkles,
  Globe,
  Calculator,
  Euro,
  Clock,
  Building,
  BarChart3,
  Target,
  FileText,
  Award,
  PlayCircle,
  ChevronRight,
  MapPin // Added MapPin icon
} from "lucide-react";

export default function Welcome() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !loading) {
      navigate('/Dashboard', { replace: true });
    }
  }, [user, loading, navigate]);

  const handleLogin = () => {
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen antialiased overflow-x-hidden text-slate-100 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
      </div>
    );
  }

  const features = [
    {
      icon: Shield,
      title: "Sicurezza Garantita",
      description: "Dati protetti con crittografia bancaria",
      color: "bg-blue-500/10 text-blue-400"
    },
    {
      icon: Zap,
      title: "Velocità Estrema",
      description: "Valutazione in meno di 24 ore",
      color: "bg-yellow-500/10 text-yellow-400"
    },
    {
      icon: Users,
      title: "Esperti Qualificati",
      description: "Team di commercialisti certificati",
      color: "bg-purple-500/10 text-purple-400"
    },
    {
      icon: TrendingUp,
      title: "Massimo Rendimento",
      description: "Ottimizziamo ogni centesimo",
      color: "bg-green-500/10 text-green-400"
    }
  ];

  const stats = [
    { number: "500+", label: "Aziende Servite", icon: Users },
    { number: "€50M+", label: "Crediti Processati", icon: Euro },
    { number: "95%", label: "Tasso Approvazione", icon: CheckCircle },
    { number: "24h", label: "Tempo Risposta", icon: Clock }
  ];

  const creditTypes = [
    {
      icon: Building,
      title: "Superbonus 110%",
      description: "Riqualificazione energetica",
      percentage: "110%",
      color: "bg-green-500/20 border-green-500/30 text-green-300"
    },
    {
      icon: BarChart3,
      title: "Credito 4.0",
      description: "Tecnologie innovative",
      percentage: "40%",
      color: "bg-blue-500/20 border-blue-500/30 text-blue-300"
    },
    {
      icon: FileText,
      title: "Crediti IVA",
      description: "Compensazione IVA",
      percentage: "100%",
      color: "bg-purple-500/20 border-purple-500/30 text-purple-300"
    },
    {
      icon: Target,
      title: "Crediti PA",
      description: "Verso Pubblica Amm.",
      percentage: "Var.",
      color: "bg-orange-500/20 border-orange-500/30 text-orange-300"
    }
  ];

  return (
    <div className="min-h-screen antialiased overflow-x-hidden text-slate-100 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-400/10 via-transparent to-transparent pointer-events-none"></div>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-400/5 via-transparent to-transparent pointer-events-none"></div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
      <header className="py-6 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/03d2053c2_JJJJ.png"
                alt="Creditly Global"
                className="w-8 h-8 rounded-lg"
              />
              <span className="text-xl font-semibold tracking-tight text-white">Creditly Global</span>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                onClick={handleLogin}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-green-500/25"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Accedi Ora
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section con Login Prominente */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div>
              <div className="inline-flex items-center space-x-2 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full text-xs font-medium text-green-400 mb-6">
                <Sparkles className="w-4 h-4" />
                <span>Piattaforma #1 in Italia per Crediti Fiscali</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
                Trasforma i tuoi <br />
                <span className="bg-gradient-to-r from-green-400 to-purple-400 bg-clip-text text-transparent">
                  crediti fiscali
                </span> <br />
                in liquidità immediata
              </h1>

              <p className="text-xl text-slate-400 mb-8 leading-relaxed">
                La piattaforma intelligente per la gestione automatizzata di <strong className="text-white">Superbonus,
                Crediti 4.0, IVA</strong> e molto altro. <span className="text-green-400 font-semibold">Valutazione gratuita in 24 ore.</span>
              </p>

              {/* Benefits List */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-white">✅ Valutazione gratuita e senza impegno</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-white">💰 Liquidità immediata sui tuoi crediti</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-white">🛡️ Sicurezza bancaria e GDPR compliant</span>
                </div>
              </div>
            </div>

            {/* Right Side - Login Card */}
            <div className="relative">
              <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/40 border-2 border-slate-700/60 rounded-2xl shadow-2xl p-2">
                <CardHeader className="text-center pb-8">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <LogIn className="w-8 h-8 text-green-400" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-white mb-2">
                    Accedi alla Piattaforma
                  </CardTitle>
                  <p className="text-slate-400">
                    Entra nel futuro della gestione crediti fiscali
                  </p>
                </CardHeader>

                <CardContent className="px-8 pb-8">
                  <div className="space-y-6">
                    {/* Main Login Button */}
                    <Button
                      onClick={handleLogin}
                      className="w-full bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white h-14 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-green-400/75 hover:brightness-125 border-2 border-green-300/30"
                    >
                      <LogIn className="w-5 h-5 mr-3" />
                      🔥 ACCEDI CON GOOGLE 🔥
                      <ArrowRight className="w-5 h-5 ml-3" />
                    </Button>

                    {/* Divider */}
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-700"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-slate-800/40 text-slate-400">Sicuro e veloce</span>
                      </div>
                    </div>

                    {/* Trust Indicators */}
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="flex flex-col items-center space-y-2">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                          <Shield className="w-5 h-5 text-blue-400" />
                        </div>
                        <span className="text-xs text-slate-400">Sicurezza<br/>Bancaria</span>
                      </div>
                      <div className="flex flex-col items-center space-y-2">
                        <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                          <Award className="w-5 h-5 text-green-400" />
                        </div>
                        <span className="text-xs text-slate-400">GDPR<br/>Compliant</span>
                      </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="text-center pt-4 border-t border-slate-700/50">
                      <p className="text-sm text-slate-400 mb-3">
                        Non hai ancora un account?
                      </p>
                      <Button
                        onClick={handleLogin}
                        variant="outline"
                        className="w-full border-slate-600 text-slate-300 hover:bg-slate-700/30 hover:text-white hover:border-slate-500 transition-all duration-300 rounded-xl h-12 hover:shadow-slate-500/25"
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Registrati Gratis
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-400/20 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-purple-400/10 rounded-full animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-900/30 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              I Numeri Parlano Chiaro
            </h2>
            <p className="text-slate-400 text-lg">
              Oltre 500 aziende si fidano già di noi
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="backdrop-filter backdrop-blur-8px bg-slate-800/20 border border-slate-700/50 rounded-2xl p-6 hover:scale-105 transition-all duration-300">
                    <IconComponent className="w-8 h-8 text-green-400 mx-auto mb-3" />
                    <div className="text-2xl md:text-3xl font-bold text-green-400 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-slate-400 text-sm">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Credit Types Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Tutti i Tipi di <span className="bg-gradient-to-r from-green-400 to-purple-400 bg-clip-text text-transparent">Crediti Fiscali</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Gestiamo ogni tipologia di credito con expertise e tecnologia all'avanguardia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {creditTypes.map((credit, index) => {
              const IconComponent = credit.icon;
              return (
                <Card key={index} className={`${credit.color} border-2 rounded-2xl hover:scale-105 transition-all duration-300 group`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <IconComponent className="w-8 h-8" />
                      <Badge className="bg-white/20 text-white border-0 font-bold">
                        {credit.percentage}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {credit.title}
                    </h3>
                    <p className="text-sm opacity-80 mb-4">
                      {credit.description}
                    </p>
                    <div className="flex items-center text-sm font-medium group-hover:translate-x-1 transition-transform">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-green-400/30 text-green-400 hover:bg-green-400/20 hover:text-green-300 hover:border-green-400/50 transition-all duration-300 hover:scale-105"
                      >
                        Scopri come funziona
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-900/30 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Perché Scegliere <span className="bg-gradient-to-r from-green-400 to-purple-400 bg-clip-text text-transparent">Creditly Global</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              La tecnologia più avanzata incontra l'esperienza di oltre 15 anni nel settore fiscale
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="backdrop-filter backdrop-blur-8px bg-slate-800/20 border border-slate-700/50 rounded-2xl p-6 hover:scale-105 transition-all duration-300 group">
                  <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed text-center">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="backdrop-filter backdrop-blur-8px bg-gradient-to-r from-green-500/10 to-purple-500/10 border border-green-500/20 rounded-2xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Pronto a Trasformare i Tuoi Crediti in <span className="bg-gradient-to-r from-green-400 to-purple-400 bg-clip-text text-transparent">Liquidità</span>?
            </h2>
            <p className="text-xl text-slate-400 mb-8">
              Unisciti a oltre 500 aziende che hanno già scelto Creditly Global
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleLogin}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 text-lg font-medium rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-blue-500/50 hover:brightness-125 border-2 border-blue-300/30"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                🚀 INIZIA LA VALUTAZIONE 🚀
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                className="px-8 py-4 text-lg font-medium rounded-xl border-slate-600 hover:bg-slate-800 text-slate-300 hover:text-white hover:border-slate-500 transition-all duration-200 hover:shadow-slate-500/25"
                onClick={() => window.open('tel:+390612345678')}
              >
                <PlayCircle className="w-5 h-5 mr-2" />
                Richiedi Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
      </div>

      {/* Footer Completo */}
      <footer className="py-8 bg-red-900/80 backdrop-blur-sm border-t border-red-800 relative z-10 mt-auto">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6 mb-6">
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
              <div className="flex space-x-3">
                <a href="https://linkedin.com/company/creditly-global" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="https://twitter.com/creditlyglobal" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-400 transition-colors">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="https://facebook.com/creditlyglobal" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-800 transition-colors">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Servizi */}
            <div>
              <h4 className="font-semibold text-white mb-4">Servizi</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Superbonus 110%</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Credito d'Imposta 4.0</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Crediti IVA</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Crediti verso PA</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Marketplace Crediti</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Consulenza Fiscale</a></li>
              </ul>
            </div>

            {/* Azienda */}
            <div>
              <h4 className="font-semibold text-white mb-4">Azienda</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Chi Siamo</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Il Team</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carriere</a></li>
                <li><a href="#" className="hover:text-white transition-colors">News & Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Certificazioni</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Partnership</a></li>
              </ul>
            </div>

            {/* Supporto */}
            <div>
              <h4 className="font-semibold text-white mb-4">Supporto</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Centro Assistenza</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contattaci</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Guide e Tutorial</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Webinar</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status Servizi</a></li>
              </ul>
            </div>
          </div>

          {/* Contatti e Info Legali */}
          <div className="border-t border-slate-800 pt-6 mb-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Informazioni Societarie */}
              <div>
                <h4 className="font-semibold text-white mb-4">MANAGEMENT E SERVIZI S.R.L.S.</h4>
                <div className="space-y-2 text-sm text-slate-400">
                  <p className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                    Viale Galvano della Volpe 59, 00133 Roma (RM)
                  </p>
                  <p>P.IVA / CF: 17303971000</p>
                  <p>Codice REA: RM-1709794</p>
                  <p>Capitale Sociale: €10.000,00 i.v.</p>
                  <p>PEC: managmenteservizi@pecimprese.it</p>
                </div>
              </div>

              {/* Contatti */}
              <div>
                <h4 className="font-semibold text-white mb-4">Contatti</h4>
                <div className="space-y-2 text-sm text-slate-400">
                  <p className="flex items-center">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2.016 2.016 0 0 0 16 4H4c-.83 0-1.58.5-1.997 1.284z"/>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8.118z"/>
                    </svg>
                    info@creditlyglobal.com
                  </p>
                  <p className="flex items-center">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                    (+39) 06 1234 5678
                  </p>
                  <p className="flex items-center">
                    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    WhatsApp Business
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    Lun - Ven: 9:00 - 18:00 | Sab: 9:00 - 13:00
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Link Legali */}
          <div className="border-t border-slate-800 pt-4 mb-4">
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Termini di Servizio</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Cookie Policy</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Disclaimer</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Informazioni Legali</a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Codice Etico</a>
            </div>
          </div>

          {/* Copyright e Certificazioni */}
          <div className="text-center border-t border-slate-800 pt-4">
            <div className="flex flex-wrap justify-center items-center gap-3 mb-3">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                ISO 27001 Certified
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                GDPR Compliant
              </Badge>
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                SOC 2 Type II
              </Badge>
            </div>

            <p className="text-slate-400 text-sm mb-2">
              © 2024 Creditly Global - MANAGEMENT E SERVIZI S.R.L.S. Tutti i diritti riservati.
            </p>
            <p className="text-slate-500 text-xs mb-2">
              Questo sito è protetto da reCAPTCHA e si applicano la Privacy Policy e i Termini di Servizio di Google.
            </p>

            <div className="flex justify-center items-center mt-2 space-x-3 text-xs text-slate-500">
              <span>Powered by</span>
              <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/03d2053c2_JJJJ.png" alt="CG" className="w-4 h-4 opacity-50" />
              <span>Advanced Technology</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
