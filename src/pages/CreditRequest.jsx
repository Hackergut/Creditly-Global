
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import SimpleBackground from "../components/background/SimpleBackground";

import SuperbonusForm from "../components/credit/SuperbonusForm";
import Credito40Form from "../components/credit/Credito40Form";
import IVACreditoForm from "../components/credit/IVACreditoForm";
import CreditiPAForm from "../components/credit/CreditiPAForm";
import ACEForm from "../components/credit/ACEForm";
import Formazione40Form from "../components/credit/Formazione40Form";
import RicercaSviluppoForm from "../components/credit/RicercaSviluppoForm";
import BonusMezzogiornoForm from "../components/credit/BonusMezzogiornoForm";
import DTAForm from "../components/credit/DTAForm"; // Import the new DTAForm component

export default function CreditRequest() {
  const [selectedType, setSelectedType] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const typeFromUrl = params.get('type');
    if (typeFromUrl) {
      setSelectedType(typeFromUrl);
    }
  }, [location.search]);

  // Funzione per tornare alla selezione del tipo di credito
  const handleBackToSelection = () => {
    setSelectedType(null);
    // Rimuovi il parametro type dall'URL
    const url = new URL(window.location);
    url.searchParams.delete('type');
    window.history.replaceState({}, '', url.pathname);
  };

  // Funzione per selezionare un tipo di credito
  const handleSelectType = (type) => {
    setSelectedType(type);
    // Aggiungi il parametro type all'URL
    const url = new URL(window.location);
    url.searchParams.set('type', type);
    window.history.pushState({}, '', url.toString());
  };

  const renderForm = () => {
    switch (selectedType) {
      case 'superbonus_110':
        return <SuperbonusForm onBack={handleBackToSelection} />;
      case 'credito_imposta_40':
        return <Credito40Form onBack={handleBackToSelection} />;
      case 'iva_credito':
        return <IVACreditoForm onBack={handleBackToSelection} />;
      case 'crediti_pa':
        return <CreditiPAForm onBack={handleBackToSelection} />;
      case 'ace':
        return <ACEForm onBack={handleBackToSelection} />;
      case 'formazione_40':
        return <Formazione40Form onBack={handleBackToSelection} />;
      case 'ricerca_sviluppo':
        return <RicercaSviluppoForm onBack={handleBackToSelection} />;
      case 'bonus_mezzogiorno':
        return <BonusMezzogiornoForm onBack={handleBackToSelection} />;
      case 'dta': // Add the new case for DTA
        return <DTAForm onBack={handleBackToSelection} />;
      default:
        return (
          <div className="text-center p-8">
            <p className="text-white">Reindirizzamento al marketplace...</p>
          </div>);

    }
  };

  // Effetto per reindirizzamento automatico se nessun tipo è selezionato
  useEffect(() => {
    if (!selectedType) {
      // Timeout per evitare problemi di rendering
      const timer = setTimeout(() => {
        window.location.href = createPageUrl("MarketplaceCrediti") + "#compra";
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [selectedType]);

  return (
    <SimpleBackground>
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <Link to={createPageUrl("MarketplaceCrediti")}>
                <Button variant="outline" size="icon" className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border hover:text-accent-foreground h-10 w-10 rounded-xl border-white/30 hover:bg-white/20 text-white backdrop-blur-sm bg-[#1a1d2e]/80 hover:border-white/40 transition-all duration-300">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Compila la Richiesta
                </h1>
                <p className="text-white/80 mt-1">
                  Inserisci tutti i dettagli richiesti per la valutazione
                </p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          {renderForm()}
        </div>
      </div>
    </SimpleBackground>);

}
