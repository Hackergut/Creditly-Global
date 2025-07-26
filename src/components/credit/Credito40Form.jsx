import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CreditRequest } from "@/api/entities";
import { ArrowLeft, Cpu, FileText, Building, Zap, Shield } from "lucide-react";
import DocumentUpload from "./DocumentUpload";

export default function Credito40Form({ onBack }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    asset_category: "",
    asset_description: "",
    amount: "",
    vat_number: "",
    purchase_date: "",
    supplier: "",
    invoice_number: "",
    description: "",
    documents: []
  });

  const assetCategories = [
    "Macchine utensili e sistemi per la realizzazione di prodotti",
    "Sistemi per l'assicurazione della qualità e della sostenibilità",
    "Dispositivi per l'interazione uomo-macchina",
    "Sistemi di monitoraggio e controllo",
    "Componentistica intelligente per l'automazione",
    "Soluzioni logistiche automatizzate"
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
        type: 'credito_imposta_40',
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
      {/* Header Card con colori Credito 4.0 (blu) */}
      <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl overflow-hidden">
        <div className="relative">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url('https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/8a4a6ef5f_robotic.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          
          {/* Icona minimal per tornare indietro */}
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
                <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm">
                  <Cpu className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Credito d'imposta 4.0
                  </h2>
                  <p className="text-lg text-white/90 mb-2">
                    Investimenti in beni strumentali tecnologici
                  </p>
                  <p className="text-sm text-white/80">
                    Credito d'imposta per investimenti in tecnologie digitali avanzate
                  </p>
                </div>
              </div>
              
              {/* Badge dinamico con animazione */}
              <div className="text-right">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full animate-pulse"></div>
                  <Badge className="relative bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-0 px-6 py-3 text-lg font-bold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                      <span>Fino al 40%</span>
                    </div>
                  </Badge>
                </div>
                <p className="text-sm text-white/80 mt-2 font-medium">
                  Dell'investimento qualificato
                </p>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Vantaggi visuali con colori blu */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl hover:bg-slate-800/40 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Cpu className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">Tecnologie 4.0</h3>
            <p className="text-sm text-white/80">Beni strumentali digitali</p>
          </CardContent>
        </Card>

        <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl hover:bg-slate-800/40 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">Credito immediato</h3>
            <p className="text-sm text-white/80">Utilizzabile subito</p>
          </CardContent>
        </Card>

        <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl hover:bg-slate-800/40 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">Controlli semplificati</h3>
            <p className="text-sm text-white/80">Iter amministrativo snello</p>
          </CardContent>
        </Card>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Company Information */}
        <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl">
          <CardHeader className="p-6 border-b border-slate-700/50">
            <CardTitle className="flex items-center space-x-3 text-white">
              <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Building className="w-5 h-5 text-indigo-400" />
              </div>
              <span>Dati Aziendali</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
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
          </CardContent>
        </Card>

        {/* Asset Information */}
        <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl">
          <CardHeader className="p-6 border-b border-slate-700/50">
            <CardTitle className="flex items-center space-x-3 text-white">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Cpu className="w-5 h-5 text-blue-400" />
              </div>
              <span>Informazioni Bene Strumentale</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Categoria Bene *
              </label>
              <Select
                value={formData.asset_category}
                onValueChange={(value) => handleInputChange("asset_category", value)}
              >
                <SelectTrigger className="h-12 rounded-xl bg-white/10 border-white/20 text-white backdrop-blur-sm">
                  <SelectValue placeholder="Seleziona categoria" />
                </SelectTrigger>
                <SelectContent>
                  {assetCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Descrizione Dettagliata del Bene *
              </label>
              <Textarea
                placeholder="Descrivi il bene strumentale acquistato, le sue caratteristiche tecniche e funzionalità 4.0..."
                value={formData.asset_description}
                onChange={(e) => handleInputChange("asset_description", e.target.value)}
                className="h-24 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Importo Investimento *
                </label>
                <Input
                  type="number"
                  placeholder="100000"
                  value={formData.amount}
                  onChange={(e) => handleInputChange("amount", e.target.value)}
                  className="h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Data Acquisto *
                </label>
                <Input
                  type="date"
                  value={formData.purchase_date}
                  onChange={(e) => handleInputChange("purchase_date", e.target.value)}
                  className="h-12 rounded-xl bg-white/10 border-white/20 text-white backdrop-blur-sm"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Fornitore *
                </label>
                <Input
                  type="text"
                  placeholder="Nome dell'azienda fornitrice"
                  value={formData.supplier}
                  onChange={(e) => handleInputChange("supplier", e.target.value)}
                  className="h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Numero Fattura *
                </label>
                <Input
                  type="text"
                  placeholder="FT001/2024"
                  value={formData.invoice_number}
                  onChange={(e) => handleInputChange("invoice_number", e.target.value)}
                  className="h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Note Aggiuntive
              </label>
              <Textarea
                placeholder="Eventuali note aggiuntive sull'investimento..."
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
              <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <FileText className="w-5 h-5 text-orange-400" />
              </div>
              <span>Documenti Richiesti</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <DocumentUpload
              onDocumentsChange={handleDocumentsChange}
              acceptedTypes={[".pdf", ".jpg", ".jpeg", ".png"]}
              requiredDocs={[
                "Fattura di acquisto del bene",
                "Scheda tecnica del prodotto",
                "Certificazione 4.0 del bene",
                "Perizia tecnica di interconnessione",
                "Dichiarazione del fornitore"
              ]}
            />
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex justify-end space-x-4 pt-6">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={onBack}
            className="rounded-xl border-white/30 hover:bg-white/20 text-white backdrop-blur-sm bg-[#1a1d2e]/80 hover:border-white/40 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <Button
            type="submit"
            disabled={loading || !formData.asset_category || !formData.amount}
            className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl text-white shadow-lg"
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