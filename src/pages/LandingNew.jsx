import React, { useState, useEffect } from "react";
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
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Globe,
  Calculator,
  FileText,
  Award,
  Clock,
  Euro,
  Building,
  BarChart3,
  Target,
  Lightbulb,
  HeartHandshake,
  MessageCircle,
  Bot
} from "lucide-react";

export default function LandingNew() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  
  const handleLogin = () => {
    navigate('/login');
  };

  const handleNewsletterSignup = (e) => {
    e.preventDefault();
    // TODO: Implementare signup newsletter
    console.log("Newsletter signup:", email);
    setEmail('');
  };

  const features = [
    {
      icon: Shield,
      title: "Sicurezza Bancaria",
      description: "Dati protetti con crittografia di livello bancario e conformità GDPR",
      color: "bg-blue-500/10 text-blue-400"
    },
    {
      icon: Zap,
      title: "Valutazione in 24h",
      description: "Analisi rapida dei tuoi crediti con risposta garantita entro 24 ore",
      color: "bg-yellow-500/10 text-yellow-400"
    },
    {
      icon: Users,
      title: "Team di Esperti",
      description: "Commercialisti e consulenti fiscali certificati al tuo servizio",
      color: "bg-purple-500/10 text-purple-400"
    },
    {
      icon: TrendingUp,
      title: "Massimo Rendimento",
      description: "Ottimizziamo ogni centesimo dei tuoi crediti fiscali",
      color: "bg-green-500/10 text-green-400"
    },
    {
      icon: Calculator,
      title: "Calcolo Automatico",
      description: "Algoritmi avanzati per il calcolo preciso del valore dei crediti",
      color: "bg-cyan-500/10 text-cyan-400"
    },
    {
      icon: Globe,
      title: "Rete Nazionale",
      description: "Partner in tutta Italia per supporto locale e consulenza",
      color: "bg-indigo-500/10 text-indigo-400"
    },
    {
      icon: MessageCircle,
      title: "Canale Telegram Live",
      description: "Connessione diretta al canale dedicato per aggiornamenti in tempo reale",
      color: "bg-teal-500/10 text-teal-400"
    },
    {
      icon: Bot,
      title: "Chatbot AI H24",
      description: "Assistenza intelligente integrata nel sistema, disponibile 24 ore su 24",
      color: "bg-pink-500/10 text-pink-400"
    }
  ];

  const stats = [
    { number: "500+", label: "Aziende Servite", icon: Users },
    { number: "€50M+", label: "Crediti Processati", icon: Euro },
    { number: "95%", label: "Tasso Approvazione", icon: CheckCircle },
    { number: "24h", label: "Tempo Risposta", icon: Clock },
  ];

  const creditTypes = [
    {
      icon: Building,
      title: "Superbonus 110%",
      description: "Riqualificazione energetica e sismica",
      percentage: "110%",
      color: "bg-green-500/20 border-green-500/30 text-green-300"
    },
    {
      icon: BarChart3,
      title: "Credito d'Imposta 4.0",
      description: "Investimenti in tecnologie innovative",
      percentage: "40%",
      color: "bg-blue-500/20 border-blue-500/30 text-blue-300"
    },
    {
      icon: FileText,
      title: "Crediti IVA",
      description: "Compensazione e rimborsi IVA",
      percentage: "100%",
      color: "bg-purple-500/20 border-purple-500/30 text-purple-300"
    },
    {
      icon: Target,
      title: "Crediti verso PA",
      description: "Crediti verso Pubblica Amministrazione",
      percentage: "Variabile",
      color: "bg-orange-500/20 border-orange-500/30 text-orange-300"
    }
  ];

  const testimonials = [
    {
      name: "Marco Rossi",
      company: "Ediltech S.r.l.",
      text: "Grazie a Creditly Global abbiamo recuperato oltre €2M di Superbonus in soli 15 giorni. Servizio impeccabile!",
      rating: 5,
      avatar: "MR"
    },
    {
      name: "Giulia Ferrari",
      company: "Innovazione 4.0 S.p.A.",
      text: "La piattaforma è intuitiva e il supporto eccezionale. Hanno gestito tutti i nostri crediti Industria 4.0 con professionalità.",
      rating: 5,
      avatar: "GF"
    },
    {
      name: "Andrea Bianchi",
      company: "Costruzioni Alpha",
      text: "Esperienza fantastica. Team competente e processi digitalizzati che fanno la differenza. Consiglio vivamente!",
      rating: 5,
      avatar: "AB"
    }
  ];

  return (
    <div className="min-h-screen antialiased overflow-x-hidden text-slate-100 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-400/15 via-transparent to-transparent pointer-events-none"></div>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-400/10 via-transparent to-transparent pointer-events-none"></div>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400/8 via-transparent to-transparent pointer-events-none"></div>
      {/* Header */}
      <header className="py-6 relative z-10 sticky top-0 backdrop-blur-sm bg-slate-900/80">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/112a3b250_CGNEWWWWW.png"
                alt="Creditly Global"
                className="w-10 h-10 rounded-lg"
              />
              <div>
                <span className="text-2xl font-bold tracking-tight text-white">Creditly Global</span>
                <p className="text-xs text-slate-400 hidden sm:block">La piattaforma leader per i crediti fiscali</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex items-center space-x-6">
                <a href="#servizi" className="text-slate-300 hover:text-white transition-colors">Servizi</a>
                <a href="#come-funziona" className="text-slate-300 hover:text-white transition-colors">Come Funziona</a>
                <a href="#testimonianze" className="text-slate-300 hover:text-white transition-colors">Testimonianze</a>
                <a href="#contatti" className="text-slate-300 hover:text-white transition-colors">Contatti</a>
              </nav>
              <Button
                onClick={handleLogin}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 hover:scale-105 shadow-lg"
              >
                Inizia Gratis
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </header>
      {/* Hero Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center space-x-2 bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-full text-sm font-medium text-green-400 mb-8">
            <Award className="w-4 h-4" />
            <span>Piattaforma #1 in Italia per Crediti Fiscali</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-8">
            Trasforma i tuoi <br />
            <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              crediti fiscali
            </span> <br />
            in liquidità immediata
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 mb-10 max-w-4xl mx-auto leading-relaxed">
            La piattaforma intelligente per la gestione automatizzata di <strong className="text-white">Superbonus, 
            Crediti 4.0, IVA</strong> e molto altro. <span className="text-green-400 font-semibold">Valutazione gratuita in 24 ore.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              onClick={handleLogin}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 text-lg font-medium rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 hover:scale-105 shadow-lg"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Richiedi Valutazione Gratuita
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="backdrop-filter backdrop-blur-12px bg-slate-800/40 border-2 border-slate-600/70 rounded-2xl p-6 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-300 mb-2">{stat.label}</p>
                      <p className="text-2xl font-bold text-white">{stat.number}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-500/25 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <IconComponent className="w-6 h-6 text-green-300" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Credit Types Section */}
      <section id="servizi" className="py-20 bg-slate-900/30 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Tutti i Tipi di <span className="bg-gradient-to-r from-green-400 to-purple-400 bg-clip-text text-transparent">Crediti Fiscali</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Gestiamo ogni tipologia di credito fiscale con la massima professionalità e competenza
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {creditTypes.map((credit, index) => {
              const IconComponent = credit.icon;
              return (
                <Card key={index} className={`backdrop-filter backdrop-blur-12px bg-slate-800/35 border-2 ${credit.color.split(' ')[1]} rounded-2xl hover:scale-105 transition-all duration-300 group hover:shadow-2xl`}>
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 ${credit.color.split(' ')[0]} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {credit.title}
                    </h3>
                    <p className="text-slate-400 text-sm mb-4">
                      {credit.description}
                    </p>
                    <Badge className={`${credit.color} border-0 font-bold`}>
                      Fino al {credit.percentage}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Perché Scegliere <span className="bg-gradient-to-r from-green-400 to-purple-400 bg-clip-text text-transparent">Creditly Global</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              La tecnologia più avanzata incontra l'esperienza di oltre 15 anni nel settore fiscale
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="backdrop-filter backdrop-blur-12px bg-slate-800/35 border-2 border-slate-600/60 rounded-2xl p-8 hover:scale-105 transition-all duration-300 group hover:shadow-2xl">
                  <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* How it Works Section */}
      <section id="come-funziona" className="py-20 bg-slate-900/30 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Come <span className="bg-gradient-to-r from-green-400 to-purple-400 bg-clip-text text-transparent">Funziona</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Un processo semplice e veloce per massimizzare il valore dei tuoi crediti fiscali
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="backdrop-filter backdrop-blur-8px bg-slate-800/20 border border-slate-700/50 rounded-2xl p-8 text-center relative">
              <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Carica Documenti
              </h3>
              <p className="text-slate-400">
                Carica i tuoi documenti fiscali sulla nostra piattaforma sicura in pochi click
              </p>
              <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 hidden md:block">
                <ArrowRight className="w-8 h-8 text-green-400" />
              </div>
            </div>
            <div className="backdrop-filter backdrop-blur-8px bg-slate-800/20 border border-slate-700/50 rounded-2xl p-8 text-center relative">
              <div className="w-16 h-16 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Analisi Automatica
              </h3>
              <p className="text-slate-400">
                I nostri algoritmi analizzano i tuoi crediti e forniscono una valutazione accurata in 24h
              </p>
              <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 hidden md:block">
                <ArrowRight className="w-8 h-8 text-blue-400" />
              </div>
            </div>
            <div className="backdrop-filter backdrop-blur-8px bg-slate-800/20 border border-slate-700/50 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Liquidità Immediata
              </h3>
              <p className="text-slate-400">
                Ottieni liquidità immediata vendendo i tuoi crediti al miglior prezzo di mercato
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section id="testimonianze" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Cosa Dicono i <span className="bg-gradient-to-r from-green-400 to-purple-400 bg-clip-text text-transparent">Nostri Clienti</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Oltre 500 aziende si fidano di Creditly Global per i loro crediti fiscali
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="backdrop-filter backdrop-blur-8px bg-slate-800/20 border border-slate-700/50 rounded-2xl">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mr-4">
                      <span className="text-green-400 font-bold">{testimonial.avatar}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{testimonial.name}</h4>
                      <p className="text-slate-400 text-sm">{testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Live Communication Section */}
      <section className="py-20 bg-gradient-to-r from-teal-500/10 to-pink-500/10 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Comunicazione <span className="bg-gradient-to-r from-teal-400 to-pink-400 bg-clip-text text-transparent">Live H24</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Resta sempre connesso con il nostro team e ricevi assistenza immediata quando ne hai bisogno
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Telegram Channel */}
            <div className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-teal-500/30 rounded-2xl p-8 hover:scale-105 transition-all duration-300 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center mb-4">
                    <MessageCircle className="w-8 h-8 text-teal-400 mr-3" />
                    <h3 className="text-2xl font-bold text-white">Canale Telegram Dedicato</h3>
                  </div>
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    Unisciti al nostro canale Telegram ufficiale per ricevere aggiornamenti in tempo reale su:
                  </p>
                  <ul className="space-y-2 text-slate-400 mb-6">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-teal-400 mr-2" />
                      Novità normative e fiscali
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-teal-400 mr-2" />
                      Opportunità di mercato
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-teal-400 mr-2" />
                      Consigli da esperti
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-teal-400 mr-2" />
                      Notifiche personalizzate
                    </li>
                  </ul>
                </div>
              </div>
              <Button
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-3 font-medium rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all duration-200 hover:scale-105 shadow-lg"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Unisciti al Canale
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
            
            {/* AI Chatbot */}
            <div className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-pink-500/30 rounded-2xl p-8 hover:scale-105 transition-all duration-300 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center mb-4">
                    <Bot className="w-8 h-8 text-pink-400 mr-3" />
                    <h3 className="text-2xl font-bold text-white">Chatbot AI Integrato</h3>
                  </div>
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    Assistenza intelligente disponibile 24 ore su 24, 7 giorni su 7:
                  </p>
                  <ul className="space-y-2 text-slate-400 mb-6">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-pink-400 mr-2" />
                      Risposte immediate a domande frequenti
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-pink-400 mr-2" />
                      Calcoli automatici dei crediti
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-pink-400 mr-2" />
                      Guida passo-passo ai processi
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-pink-400 mr-2" />
                      Connessione diretta con esperti
                    </li>
                  </ul>
                </div>
              </div>
              <Button
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-3 font-medium rounded-xl hover:from-pink-600 hover:to-pink-700 transition-all duration-200 hover:scale-105 shadow-lg"
              >
                <Bot className="w-5 h-5 mr-2" />
                Prova il Chatbot
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-500/10 to-purple-500/10 relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="backdrop-filter backdrop-blur-8px bg-slate-800/30 border border-green-500/20 rounded-2xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Pronto a Trasformare i Tuoi Crediti in <span className="bg-gradient-to-r from-green-400 to-purple-400 bg-clip-text text-transparent">Liquidità</span>?
            </h2>
            <p className="text-xl text-slate-400 mb-8">
              Unisciti a oltre 500 aziende che hanno già scelto Creditly Global per massimizzare i loro crediti fiscali
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                onClick={handleLogin}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 text-lg font-medium rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 hover:scale-105 shadow-lg"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Inizia la Valutazione Gratuita
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
            {/* Newsletter Signup */}
            <div className="border-t border-slate-700/50 pt-8">
              <h3 className="text-lg font-semibold text-white mb-4">
                Rimani aggiornato sulle novità fiscali
              </h3>
              <form onSubmit={handleNewsletterSignup} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="La tua email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 rounded-lg"
                  required
                />
                <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 rounded-lg">
                  Iscriviti
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer id="contatti" className="py-20 bg-slate-900/60 backdrop-blur-md border-t border-slate-700/50 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-4 mb-8">
                <div className="relative">
                  <img
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/112a3b250_CGNEWWWWW.png"
                    alt="Creditly Global"
                    className="w-16 h-16 rounded-xl shadow-lg"
                  />
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-purple-500/20 rounded-xl blur-sm"></div>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">Creditly Global</h3>
                  <p className="text-green-400 font-medium">Piattaforma Leader Italia</p>
                </div>
              </div>
              <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-2xl">
                La piattaforma leader in Italia per la gestione e monetizzazione dei crediti fiscali. 
                Trasformiamo la complessità fiscale in opportunità di liquidità immediata.
              </p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-green-400" />
                  <span className="text-slate-300 font-medium">info@creditlyglobal.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-green-400" />
                  <span className="text-slate-300 font-medium">+39 02 1234 5678</span>
                </div>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="lg:col-span-1">
              <h4 className="text-xl font-bold text-white mb-6">I Nostri Numeri</h4>
              <div className="space-y-4">
                <div className="backdrop-filter backdrop-blur-8px bg-slate-800/30 border border-slate-700/50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Aziende Servite</span>
                    <span className="text-2xl font-bold text-green-400">500+</span>
                  </div>
                </div>
                <div className="backdrop-filter backdrop-blur-8px bg-slate-800/30 border border-slate-700/50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Crediti Processati</span>
                    <span className="text-2xl font-bold text-green-400">€50M+</span>
                  </div>
                </div>
                <div className="backdrop-filter backdrop-blur-8px bg-slate-800/30 border border-slate-700/50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Tasso Approvazione</span>
                    <span className="text-2xl font-bold text-green-400">95%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-700/50 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-slate-400 mb-4 md:mb-0">
                © 2024 Creditly Global. Tutti i diritti riservati.
              </p>
              <div className="flex items-center space-x-6">
                <span className="text-slate-400">P.IVA: 12345678901</span>
                <span className="text-slate-400">|</span>
                <span className="text-slate-400">Privacy Policy</span>
                <span className="text-slate-400">|</span>
                <span className="text-slate-400">Termini di Servizio</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 