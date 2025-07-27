import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingModern.css";
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
  LogIn,
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
  PlayCircle,
  Hexagon,
  ChevronRight,
  ArrowUpRight,
  CreditCard,
  PiggyBank,
  Scale,
  Briefcase
} from "lucide-react";

export default function LandingModern() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  
  const handleLogin = () => {
    navigate('/login');
  };

  const handleNewsletterSignup = (e) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setEmail('');
  };

  const features = [
    {
      icon: Shield,
      title: "Sicurezza Bancaria",
      description: "Dati protetti con crittografia di livello bancario e conformità GDPR",
      color: "bg-blue-500/10 text-blue-400 border-blue-500/20"
    },
    {
      icon: Zap,
      title: "Valutazione in 24h",
      description: "Analisi rapida dei tuoi crediti con risposta garantita entro 24 ore",
      color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
    },
    {
      icon: Users,
      title: "Team di Esperti",
      description: "Commercialisti e consulenti fiscali certificati al tuo servizio",
      color: "bg-purple-500/10 text-purple-400 border-purple-500/20"
    },
    {
      icon: TrendingUp,
      title: "Massimo Rendimento",
      description: "Ottimizziamo ogni centesimo dei tuoi crediti fiscali",
      color: "bg-green-500/10 text-green-400 border-green-500/20"
    },
    {
      icon: Calculator,
      title: "Calcolo Automatico",
      description: "Algoritmi avanzati per il calcolo preciso del valore dei crediti",
      color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
    },
    {
      icon: Globe,
      title: "Rete Nazionale",
      description: "Partner in tutta Italia per supporto locale e consulenza",
      color: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
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
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: Briefcase,
      title: "Crediti IVA",
      description: "Recupero crediti IVA e compensazioni",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: Scale,
      title: "Crediti PA",
      description: "Crediti verso la Pubblica Amministrazione",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: Target,
      title: "Crediti Formazione",
      description: "Crediti per formazione e sviluppo",
      color: "from-orange-400 to-red-500"
    }
  ];

  const testimonials = [
    {
      name: "Marco Rossi",
      role: "CEO, TechStart Srl",
      content: "Creditly Global ha trasformato la gestione dei nostri crediti fiscali. Processo veloce, trasparente e risultati eccellenti.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face"
    },
    {
      name: "Elena Bianchi",
      role: "Amministratore, InnovazioneLab",
      content: "Il team di esperti ha ottimizzato i nostri crediti del 40%. Servizio professionale e consulenza di qualità.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face"
    },
    {
      name: "Giuseppe Verdi",
      role: "Direttore Finanziario, GreenEnergy",
      content: "Piattaforma intuitiva e supporto eccellente. Abbiamo recuperato crediti che pensavamo persi.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1460904577954-8fadb262612c?w=60&h=60&fit=crop&crop=face"
    }
  ];

  const availableCredits = [
    {
      icon: Building,
      title: "Superbonus 110%",
      description: "Riqualificazione energetica e sismica degli edifici",
      value: "€110.000",
      color: "from-green-400 to-emerald-500",
      image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/67b6d113f_9c7a3a5a0b27ce38ef9f99260836aa28.jpg",
      features: ["Detrazione 110%", "Riqualificazione energetica", "Interventi antisismici"]
    },
    {
      icon: Briefcase,
      title: "Crediti IVA",
      description: "Recupero crediti IVA e compensazioni fiscali",
      value: "€50.000",
      color: "from-blue-400 to-cyan-500",
      image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/879f0ee2e_da8d0313a541f6f8d01fe222a636ec68.jpg",
      features: ["Compensazione IVA", "Rimborso crediti", "Gestione automatica"]
    },
    {
      icon: Scale,
      title: "Crediti PA",
      description: "Crediti verso la Pubblica Amministrazione",
      value: "€75.000",
      color: "from-purple-400 to-pink-500",
      image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/a0c0990b7_365f0cd451e2bab46384f0a4b39e42bb.jpg",
      features: ["Crediti commerciali", "Gestione scadenze", "Recupero automatico"]
    },
    {
      icon: Target,
      title: "Crediti Formazione",
      description: "Crediti per formazione e sviluppo del personale",
      value: "€30.000",
      color: "from-orange-400 to-red-500",
      image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/34bdc917e_37ef483d918d011a3a3785f69b253a16.jpg",
      features: ["Formazione continua", "Corsi certificati", "Detrazione fiscale"]
    },
    {
      icon: Calculator,
      title: "Crediti R&D",
      description: "Crediti per ricerca e sviluppo",
      value: "€100.000",
      color: "from-indigo-400 to-purple-500",
      image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/dea350011_6a0d4e02ade464ef7399a3c693fc252a.jpg",
      features: ["Ricerca applicata", "Sviluppo innovativo", "Incentivi fiscali"]
    },
    {
      icon: Euro,
      title: "Crediti Export",
      description: "Crediti per attività di export e internazionalizzazione",
      value: "€60.000",
      color: "from-yellow-400 to-orange-500",
      image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/9d39fb859_10987776589e28fef49d9f79dd525d22.jpg",
      features: ["Promozione export", "Internazionalizzazione", "Supporto commerciale"]
    }
  ];

  return (
    <div className="min-h-screen antialiased overflow-x-hidden text-slate-100 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-400/10 via-transparent to-transparent pointer-events-none"></div>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-400/5 via-transparent to-transparent pointer-events-none"></div>
      
      {/* Navigation */}
      <nav className="relative z-10 max-w-7xl mx-auto px-6 py-6 fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/03d2053c2_JJJJ.png"
              alt="Creditly Global"
              className="w-8 h-8 rounded-lg"
            />
            <span className="text-xl font-semibold tracking-tight">Creditly Global</span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-sm">
            <Button onClick={handleLogin} className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition-all duration-200 hover:scale-105">
              Accedi Ora
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Hero Section */}
          <div className="flex flex-col fade-in justify-center">
            <div className="mb-8">
              <div className="inline-flex items-center space-x-2 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full text-xs font-medium text-green-400 mb-6">
                <Sparkles className="w-3 h-3" />
                <span>Piattaforma Leader in Italia</span>
              </div>
              <h1 className="text-4xl lg:text-5xl leading-tight font-bold tracking-tight mb-6">
                Gestisci i tuoi <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">crediti fiscali</span>
                con semplicità
              </h1>
              <p className="leading-relaxed text-lg text-slate-400 mb-8">
                Ottimizza i tuoi crediti fiscali con la piattaforma più avanzata d'Italia. 
                Analisi automatica, gestione completa e consulenza esperta.
              </p>
              <div className="flex items-center space-x-4">
                <Button onClick={handleLogin} className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition-all duration-200 hover:scale-105 shadow-lg">
                  Accedi Ora
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="flex flex-col justify-center">
            <div className="glass-card rounded-2xl p-8 fade-in fade-in-delay-1">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">€50M+</div>
                  <div className="text-sm text-slate-400">Crediti Processati</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">95%</div>
                  <div className="text-sm text-slate-400">Tasso Approvazione</div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 mb-2">500+</div>
                <div className="text-sm text-slate-400">Aziende Servite</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-16">
        <div className="text-center mb-16 fade-in">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full text-xs font-medium text-blue-400 mb-6">
            <Zap className="w-3 h-3" />
            <span>Caratteristiche Principali</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Perché scegliere <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Creditly Global</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            La piattaforma più avanzata per la gestione dei crediti fiscali in Italia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="glass-card rounded-2xl p-6 fade-in hover:scale-105 transition-all duration-300">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feature.color}`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Credit Types Section */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-16">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Tipi di <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Crediti</span> Supportati
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Gestiamo tutti i principali crediti fiscali italiani
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {creditTypes.map((type, index) => (
            <div key={index} className="glass-card rounded-2xl p-6 fade-in hover:scale-105 transition-all duration-300">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-r ${type.color}`}>
                <type.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{type.title}</h3>
              <p className="text-slate-400 text-sm">{type.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Available Credits Section */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-16">
        <div className="text-center mb-16 fade-in">
          <div className="inline-flex items-center space-x-2 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full text-xs font-medium text-green-400 mb-6">
            <Euro className="w-3 h-3" />
            <span>Crediti Disponibili</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Tipi di <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Crediti</span> Gestiti
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Gestiamo tutti i principali crediti fiscali italiani con analisi automatica e consulenza esperta
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {availableCredits.map((credit, index) => (
            <div key={index} className="glass-card rounded-2xl p-8 flex flex-col fade-in hover:scale-105 transition-all duration-300">
              <div className="relative mb-6">
                <img 
                  src={credit.image} 
                  alt={credit.title}
                  className="w-full h-32 object-cover rounded-xl mb-4"
                />
                <div className={`absolute top-2 right-2 w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r ${credit.color}`}>
                  <credit.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">{credit.title}</h3>
                <p className="text-slate-400 text-sm mb-4">{credit.description}</p>
                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-bold text-green-400">{credit.value}</span>
                  <span className="text-slate-400 ml-2 text-sm">max per intervento</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8 flex-grow">
                {credit.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button onClick={handleLogin} className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition-all duration-200 hover:scale-105">
                Analizza Crediti
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mb-8 fade-in fade-in-delay-4">
          <p className="text-slate-400">
            Non sei sicuro del tipo di credito? <button onClick={handleLogin} className="text-green-400 hover:text-green-300 transition-colors">Contatta i nostri esperti</button> per una consulenza personalizzata.
          </p>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-16">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Cosa dicono i nostri <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">clienti</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="glass-card rounded-2xl p-6 fade-in hover:scale-105 transition-all duration-300">
              <div className="flex items-center mb-4">
                <img src={testimonial.avatar} className="w-12 h-12 rounded-full mr-4" alt={testimonial.name} />
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-xs text-slate-400">{testimonial.role}</p>
                </div>
                <div className="flex text-yellow-400 ml-auto">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-slate-300">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-16">
        <div className="glass-card rounded-2xl p-12 text-center fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Pronto a ottimizzare i tuoi <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">crediti fiscali</span>?
          </h2>
          <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
            Unisciti a oltre 500 aziende che hanno già scelto Creditly Global per la gestione dei loro crediti fiscali.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button onClick={handleLogin} className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition-all duration-200 hover:scale-105 shadow-lg text-lg">
              Accedi Ora
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-800">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/03d2053c2_JJJJ.png"
              alt="Creditly Global"
              className="w-8 h-8 rounded-lg"
            />
            <span className="text-lg font-semibold tracking-tight">Creditly Global</span>
          </div>
          
          <div className="flex space-x-6 text-sm">
            <button onClick={() => navigate('/Contact')} className="text-slate-400 hover:text-white transition-colors">Contatti</button>
            <button onClick={() => navigate('/PrivacyPolicy')} className="text-slate-400 hover:text-white transition-colors">Privacy</button>
            <button onClick={() => navigate('/TermsOfService')} className="text-slate-400 hover:text-white transition-colors">Termini</button>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-slate-800 text-center">
          <p className="text-slate-400 text-sm">© 2024 Creditly Global. Tutti i diritti riservati.</p>
        </div>
      </footer>
    </div>
  );
} 