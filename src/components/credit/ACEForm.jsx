
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TrendingUp, FileText, PieChart, Zap, Shield, Clock } from "lucide-react";
import DocumentUpload from "./DocumentUpload";

export default function ACEForm({ onBack }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    ace_amount: "",
    equity_variation: "",
    reference_year: "",
    amount: "",
    vat_number: "",
    description: "",
    documents: []
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDocumentsChange = (documents) => {
    setFormData(prev => ({
      ...prev,
      documents
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await CreditRequest.create({
        type: 'ace',
        amount: parseFloat(formData.amount),
        description: formData.description,
        data: formData,
        documents: formData.documents,
        status: 'submitted',
        submitted_date: new Date().toISOString()
      });
      
      window.location.href = "/Dashboard?success=request_submitted";
    } catch (error) {
      console.error("Error submitting request:", error);
    }
    
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      {/* Header Card con colori ACE (indaco) */}
      <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl overflow-hidden">
        <div className="relative">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url('https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/45e6d7dd2_monnthre.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          
          {/* Icona minimal per tornare indietro */}
          {/* Applied uniform style to this back button */}
          <Button
            variant="outline"
            size="icon"
            onClick={onBack}
            className="absolute top-6 left-6 rounded-xl border-white/30 hover:bg-white/20 text-white backdrop-blur-sm bg-[#1a1d2e]/80 hover:border-white/40 transition-all duration-300 z-10"
            aria-label="Torna indietro"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          
          <CardContent className="relative p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center space-x-4 flex-1">
                <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm">
                  <TrendingUp className="w-8 h-8 text-indigo-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    ACE (Aiuto Crescita Economica)
                  </h2>
                  <p className="text-lg text-white/90 mb-2">
                    Deduzione per incremento capitale proprio
                  </p>
                  <p className="text-sm text-white/80">
                    Agevolazione fiscale per l'aumento del patrimonio netto
                  </p>
                </div>
              </div>
              
              {/* Badge dinamico con animazione */}
              <div className="text-right">
                <div className="relative">
                  <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full animate-pulse"></div>
                  <Badge className="relative bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-0 px-6 py-3 text-lg font-bold shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                      <span>Fino al 3.5%</span>
                    </div>
                  </Badge>
                </div>
                <p className="text-sm text-white/80 mt-2 font-medium">
                  Del patrimonio incrementato
                </p>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Vantaggi visuali con colori indaco */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl hover:bg-slate-800/40 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">Crescita economica</h3>
            <p className="text-sm text-white/80">Incentiva l'aumento del capitale</p>
          </CardContent>
        </Card>

        <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl hover:bg-slate-800/40 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">Deduzione immediata</h3>
            <p className="text-sm text-white/80">Vantaggio fiscale diretto</p>
          </CardContent>
        </Card>

        <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl hover:bg-slate-800/40 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-violet-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-violet-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">Stabilità patrimoniale</h3>
            <p className="text-sm text-white/80">Rafforza la struttura finanziaria</p>
          </CardContent>
        </Card>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Company Data */}
        <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl">
          <CardHeader className="p-6 border-b border-slate-700/50">
            <CardTitle className="flex items-center space-x-3 text-white">
              <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <PieChart className="w-5 h-5 text-indigo-400" />
              </div>
              <span>Dati Societari</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Partita IVA *
                </label>
                <Input
                  type="text"
                  placeholder="12345678901"
                  value={formData.vat_number}
                  onChange={(e) => handleInputChange("vat_number", e.target.value)}
                  className="h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Anno di Riferimento *
                </label>
                <Input
                  type="number"
                  placeholder="2024"
                  min="2020"
                  max="2025"
                  value={formData.reference_year}
                  onChange={(e) => handleInputChange("reference_year", e.target.value)}
                  className="h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ACE Calculation */}
        <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl">
          <CardHeader className="p-6 border-b border-slate-700/50">
            <CardTitle className="flex items-center space-x-3 text-white">
              <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <TrendingUp className="w-5 h-5 text-purple-400" />
              </div>
              <span>Calcolo ACE</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Variazione Patrimonio Netto *
                </label>
                <Input
                  type="number"
                  placeholder="100000"
                  value={formData.equity_variation}
                  onChange={(e) => handleInputChange("equity_variation", e.target.value)}
                  className="h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm"
                  required
                />
                <p className="text-xs text-white/50 mt-1">
                  Incremento del patrimonio netto rispetto all'anno precedente
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Importo ACE Calcolato *
                </label>
                <Input
                  type="number"
                  placeholder="3500"
                  value={formData.ace_amount}
                  onChange={(e) => handleInputChange("ace_amount", e.target.value)}
                  className="h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm"
                  required
                />
                <p className="text-xs text-white/50 mt-1">
                  Importo della deduzione ACE applicabile
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Valore Credito Richiesto *
              </label>
              <Input
                type="number"
                placeholder="3500"
                value={formData.amount}
                onChange={(e) => handleInputChange("amount", e.target.value)}
                className="h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Descrizione e Calcoli
              </label>
              <Textarea
                placeholder="Descrivi la composizione del patrimonio netto, gli incrementi registrati e i calcoli effettuati per determinare l'ACE..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="h-24 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm"
              />
            </div>
          </CardContent>
        </Card>

        {/* Document Upload */}
        <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl">
          <CardHeader className="p-6 border-b border-slate-700/50">
            <CardTitle className="flex items-center space-x-3 text-white">
              <div className="w-8 h-8 bg-violet-500/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <FileText className="w-5 h-5 text-violet-400" />
              </div>
              <span>Documenti Richiesti</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <DocumentUpload
              onDocumentsChange={handleDocumentsChange}
              acceptedTypes={[".pdf", ".xlsx", ".xls"]}
              requiredDocs={[
                "Bilancio dell'anno di riferimento",
                "Bilancio dell'anno precedente",
                "Nota integrativa al bilancio",
                "Calcolo dettagliato ACE",
                "Prospetto variazioni patrimonio netto"
              ]}
            />
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex justify-end space-x-4 pt-6">
          {/* Applied uniform style to this back button */}
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="px-8 py-3 rounded-xl border-white/30 hover:bg-white/20 text-white backdrop-blur-sm bg-[#1a1d2e]/80 hover:border-white/40 transition-all duration-300"
          >
            Indietro
          </Button>
          <Button
            type="submit"
            disabled={loading || !formData.ace_amount || !formData.amount}
            className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-xl text-white shadow-lg"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Invio...
              </div>
            ) : (
              "Invia Richiesta"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
