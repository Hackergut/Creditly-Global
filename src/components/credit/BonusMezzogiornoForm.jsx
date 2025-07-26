
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CreditRequest } from "@/api/entities";
import { ArrowLeft, MapPin, FileText, Building, Zap, Shield } from "lucide-react";
import DocumentUpload from "./DocumentUpload";

export default function BonusMezzogiornoForm({ onBack }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    investment_type: "",
    location: "",
    amount: "",
    company_size: "",
    vat_number: "",
    project_description: "",
    start_date: "",
    end_date: "",
    description: "",
    documents: []
  });

  const investmentTypes = [
    "Impianti produttivi",
    "Macchinari e attrezzature",
    "Ricerca e sviluppo",
    "Formazione del personale",
    "Digitalizzazione",
    "Infrastrutture"
  ];

  const southernRegions = [
    "Abruzzo",
    "Basilicata", 
    "Calabria",
    "Campania",
    "Molise",
    "Puglia",
    "Sardegna",
    "Sicilia"
  ];

  const companySizes = [
    "Micro impresa (< 10 dipendenti)",
    "Piccola impresa (10-49 dipendenti)", 
    "Media impresa (50-249 dipendenti)",
    "Grande impresa (> 250 dipendenti)"
  ];

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
        type: 'bonus_mezzogiorno',
        amount: parseFloat(formData.amount),
        description: formData.description,
        data: formData,
        documents: formData.documents,
        status: 'submitted',
        submitted_date: new Date().toISOString()
      });
      
      window.location.href = "/dashboard?success=request_submitted";
    } catch (error) {
      console.error("Error submitting request:", error);
    }
    
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      {/* Header Card con colori Bonus Mezzogiorno (rosa) */}
      <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl overflow-hidden">
        <div className="relative">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url('https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/9d39fb859_10987776589e28fef49d9f79dd525d22.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          
          {/* Icona minimal per tornare indietro */}
          <Button
            variant="outline"
            size="icon"
            onClick={onBack}
            aria-label="Torna indietro"
            className="absolute top-6 left-6 z-10 rounded-xl border-white/30 hover:bg-white/20 text-white backdrop-blur-sm bg-[#1a1d2e]/80 hover:border-white/40 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          
          <CardContent className="relative p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center space-x-4 flex-1">
                <div className="w-16 h-16 bg-pink-500/20 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm">
                  <MapPin className="w-8 h-8 text-pink-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Bonus Mezzogiorno
                  </h2>
                  <p className="text-lg text-white/90 mb-2">
                    Investimenti nelle regioni del Sud Italia
                  </p>
                  <p className="text-sm text-white/80">
                    Agevolazioni per lo sviluppo economico del Meridione
                  </p>
                </div>
              </div>
              
              {/* Badge dinamico con animazione */}
              <div className="text-right">
                <div className="relative">
                  <div className="absolute inset-0 bg-pink-500/20 blur-xl rounded-full animate-pulse"></div>
                  <Badge className="relative bg-gradient-to-r from-pink-500 to-rose-500 text-white border-0 px-6 py-3 text-lg font-bold shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                      <span>Fino al 45%</span>
                    </div>
                  </Badge>
                </div>
                <p className="text-sm text-white/80 mt-2 font-medium">
                  Dell'investimento effettuato
                </p>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Vantaggi visuali con colori rosa */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl hover:bg-slate-800/40 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-pink-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">Sviluppo territoriale</h3>
            <p className="text-sm text-white/80">Focus sul Meridione</p>
          </CardContent>
        </Card>

        <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl hover:bg-slate-800/40 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-rose-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-rose-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">Incentivi elevati</h3>
            <p className="text-sm text-white/80">Fino al 45% di bonus</p>
          </CardContent>
        </Card>

        <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl hover:bg-slate-800/40 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-fuchsia-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-fuchsia-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">Garanzie statali</h3>
            <p className="text-sm text-white/80">Supporto pubblico</p>
          </CardContent>
        </Card>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Company Information */}
        <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl">
          <CardHeader className="p-6 border-b border-slate-700/50">
            <CardTitle className="flex items-center space-x-3 text-white">
              <div className="w-8 h-8 bg-pink-500/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Building className="w-5 h-5 text-pink-400" />
              </div>
              <span>Dati Aziendali</span>
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
                  Dimensione Aziendale *
                </label>
                <Select
                  value={formData.company_size}
                  onValueChange={(value) => handleInputChange("company_size", value)}
                >
                  <SelectTrigger className="h-12 rounded-xl bg-white/10 border-white/20 text-white backdrop-blur-sm">
                    <SelectValue placeholder="Seleziona dimensione" />
                  </SelectTrigger>
                  <SelectContent>
                    {companySizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Investment Details */}
        <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl">
          <CardHeader className="p-6 border-b border-slate-700/50">
            <CardTitle className="flex items-center space-x-3 text-white">
              <div className="w-8 h-8 bg-rose-500/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <MapPin className="w-5 h-5 text-rose-400" />
              </div>
              <span>Dettagli Investimento</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Tipologia Investimento *
                </label>
                <Select
                  value={formData.investment_type}
                  onValueChange={(value) => handleInputChange("investment_type", value)}
                >
                  <SelectTrigger className="h-12 rounded-xl bg-white/10 border-white/20 text-white backdrop-blur-sm">
                    <SelectValue placeholder="Seleziona tipologia" />
                  </SelectTrigger>
                  <SelectContent>
                    {investmentTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Regione del Sud *
                </label>
                <Select
                  value={formData.location}
                  onValueChange={(value) => handleInputChange("location", value)}
                >
                  <SelectTrigger className="h-12 rounded-xl bg-white/10 border-white/20 text-white backdrop-blur-sm">
                    <SelectValue placeholder="Seleziona regione" />
                  </SelectTrigger>
                  <SelectContent>
                    {southernRegions.map((region) => (
                      <SelectItem key={region} value={region}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Descrizione del Progetto *
              </label>
              <Textarea
                placeholder="Descrivi il progetto di investimento, gli obiettivi e i benefici attesi..."
                value={formData.project_description}
                onChange={(e) => handleInputChange("project_description", e.target.value)}
                className="h-24 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm"
                required
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Importo Investimento *
                </label>
                <Input
                  type="number"
                  placeholder="500000"
                  value={formData.amount}
                  onChange={(e) => handleInputChange("amount", e.target.value)}
                  className="h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Data Inizio Progetto
                </label>
                <Input
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => handleInputChange("start_date", e.target.value)}
                  className="h-12 rounded-xl bg-white/10 border-white/20 text-white backdrop-blur-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Data Fine Prevista
                </label>
                <Input
                  type="date"
                  value={formData.end_date}
                  onChange={(e) => handleInputChange("end_date", e.target.value)}
                  className="h-12 rounded-xl bg-white/10 border-white/20 text-white backdrop-blur-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Note Aggiuntive
              </label>
              <Textarea
                placeholder="Eventuali note aggiuntive sul progetto..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="h-20 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm"
              />
            </div>
          </CardContent>
        </Card>

        {/* Document Upload */}
        <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl">
          <CardHeader className="p-6 border-b border-slate-700/50">
            <CardTitle className="flex items-center space-x-3 text-white">
              <div className="w-8 h-8 bg-fuchsia-500/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <FileText className="w-5 h-5 text-fuchsia-400" />
              </div>
              <span>Documenti Richiesti</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <DocumentUpload
              onDocumentsChange={handleDocumentsChange}
              acceptedTypes={[".pdf", ".jpg", ".jpeg", ".png"]}
              requiredDocs={[
                "Business plan del progetto",
                "Studio di fattibilità tecnica",
                "Preventivi dettagliati",
                "Bilanci degli ultimi 3 anni", 
                "Documentazione localizzazione investimento"
              ]}
            />
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex justify-end space-x-4 pt-6">
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
            disabled={loading || !formData.investment_type || !formData.amount}
            className="bg-pink-600 hover:bg-pink-700 px-8 py-3 rounded-xl text-white shadow-lg"
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
