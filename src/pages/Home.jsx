import React, { useState, useEffect } from "react";
import { User } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Shield,
  Zap,
  Users,
  TrendingUp,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const userData = await User.me();
      if (userData) {
        // Se autenticato, reindirizza alla dashboard
        window.location.href = "/dashboard";
        return;
      }
    } catch (error) {
      // Non autenticato, mostra la homepage
      console.log("Showing public homepage");
    }
    setLoading(false);
  };

  const handleLogin = async () => {
    try {
      await User.login();
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#2c2e43] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#13E8E9]"></div>
      </div>
    );
  }

  const features = [
    {
      icon: Shield,
      title: "Sicurezza Garantita",
      description: "Protezione di livello bancario per i tuoi dati"
    },
    {
      icon: Zap,
      title: "Velocità Estrema",
      description: "Processamento in meno di 24 ore"
    },
    {
      icon: Users,
      title: "Esperti Qualificati",
      description: "Team di specialisti certificati"
    },
    {
      icon: TrendingUp,
      title: "Massimo Rendimento",
      description: "Ottimizzazione di ogni centesimo"
    }
  ];

  const stats = [
    { number: "500+", label: "Aziende Servite" },
    { number: "€50M+", label: "Crediti Processati" },
    { number: "95%", label: "Tasso di Approvazione" },
    { number: "24h", label: "Tempo di Risposta" }
  ];

  return (
    <div className="min-h-screen bg-[#2c2e43] text-white">
      {/* Header semplice */}
      <header className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/379bf8499_CREDITLYGLOBALIOIOI.png"
              alt="Creditly Global"
              className="h-12 w-auto"
            />
            <Button
              onClick={handleLogin}
              className="bg-[#13E8E9] hover:bg-[#13E8E9]/90 text-[#2c2e43] px-6 py-2 rounded-lg font-semibold"
            >
              Accedi / Registrati
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Trasforma i tuoi <br />
            <span className="text-[#13E8E9]">crediti fiscali</span> <br />
            in liquidità immediata
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-4xl mx-auto">
            La piattaforma intelligente per la gestione automatizzata di Superbonus, 
            Crediti 4.0, IVA e molto altro. <strong>Valutazione gratuita in 24 ore.</strong>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              onClick={handleLogin}
              size="lg"
              className="bg-[#13E8E9] hover:bg-[#13E8E9]/90 text-[#2c2e43] px-8 py-4 text-lg font-semibold rounded-xl"
            >
              Inizia Gratis
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#13E8E9] mb-2">
                  {stat.number}
                </div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Perché scegliere Creditly Global?</h2>
            <p className="text-xl text-white/80">Tecnologia avanzata e team di esperti certificati</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/10 border-white/20">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-[#13E8E9]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-[#13E8E9]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                  <p className="text-white/80">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Pronto a sbloccare i tuoi crediti fiscali?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Unisciti a centinaia di aziende che hanno già trasformato i loro crediti in liquidità
          </p>
          <Button
            onClick={handleLogin}
            size="lg"
            className="bg-[#13E8E9] hover:bg-[#13E8E9]/90 text-[#2c2e43] px-8 py-4 text-lg font-semibold rounded-xl"
          >
            Inizia la Valutazione Gratuita
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl font-bold mb-4">MANAGEMENT E SERVIZI S.R.L.S.</h3>
          <div className="grid md:grid-cols-3 gap-4 text-white/70 mb-6">
            <div className="flex items-center justify-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Roma, Italia</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>P.IVA: 17303971000</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>info@creditlyglobal.com</span>
            </div>
          </div>
          <p className="text-white/60">© 2024 Creditly Global. Tutti i diritti riservati.</p>
        </div>
      </footer>
    </div>
  );
}