
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CreditRequest } from "@/api/entities";
import { ArrowLeft, FileText, Building, Zap, Shield, Upload, CheckCircle } from "lucide-react";
import DocumentUpload from "./DocumentUpload";

export default function DTAForm({ onBack }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    company_name: "",
    vat_number: "",
    tax_code: "",
    loss_years: "",
    total_losses: "",
    dta_amount: "",
    accounting_method: "",
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
        type: 'dta',
        amount: parseFloat(formData.dta_amount),
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
      {/* Header Card con colori DTA (grigio/slate) - Stesso stile di Credito 4.0 */}
      <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl overflow-hidden">
        <div className="relative">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url('https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/2dccc0162_78c9f6831938cbbb038d0d708f47ac32.jpg')`,
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
                <div className="w-16 h-16 bg-slate-500/20 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm">
                  <FileText className="w-8 h-8 text-slate-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    DTA (Deferred Tax Assets)
                  </h2>
                  <p className="text-lg text-white/90 mb-2">
                    Attività fiscali differite da perdite fiscali
                  </p>
                  <p className="text-sm text-white/80">
                    Trasforma le perdite fiscali pregresse in crediti utilizzabili
                  </p>
                </div>
              </div>
              
              {/* Badge dinamico con animazione */}
              <div className="text-right">
                <div className="relative">
                  <div className="absolute inset-0 bg-slate-500/20 blur-xl rounded-full animate-pulse"></div>
                  <Badge className="relative bg-gradient-to-r from-slate-500 to-gray-500 text-white border-0 px-6 py-3 text-lg font-bold shadow-2xl hover:shadow-slate-500/25 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                      <span>Variabile</span>
                    </div>
                  </Badge>
                </div>
                <p className="text-sm text-white/80 mt-2 font-medium">
                  Basato sulle perdite
                </p>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Vantaggi visuali con colori grigi */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl hover:bg-slate-800/40 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-slate-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6 text-slate-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">Perdite fiscali</h3>
            <p className="text-sm text-white/80">Trasforma in crediti</p>
          </CardContent>
        </Card>

        <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl hover:bg-slate-800/40 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gray-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">Liquidità immediata</h3>
            <p className="text-sm text-white/80">Monetizzazione veloce</p>
          </CardContent>
        </Card>

        <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl hover:bg-slate-800/40 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-zinc-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-zinc-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">Gestione professionale</h3>
            <p className="text-sm text-white/80">Iter semplificato</p>
          </CardContent>
        </Card>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Company Information */}
        <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl">
          <CardHeader className="p-6 border-b border-slate-700/50">
            <CardTitle className="flex items-center space-x-3 text-white">
              <div className="w-8 h-8 bg-slate-500/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Building className="w-5 h-5 text-slate-400" />
              </div>
              <span>Dati Azienda</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Ragione Sociale *
              </label>
              <Input
                type="text"
                placeholder="Nome dell'azienda"
                value={formData.company_name}
                onChange={(e) => handleInputChange("company_name", e.target.value)}
                className="h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm"
                required
              />
            </div>

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
                  Codice Fiscale *
                </label>
                <Input
                  type="text"
                  placeholder="ABCDEF12G34H567I"
                  value={formData.tax_code}
                  onChange={(e) => handleInputChange("tax_code", e.target.value)}
                  className="h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* DTA Details */}
        <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl">
          <CardHeader className="p-6 border-b border-slate-700/50">
            <CardTitle className="flex items-center space-x-3 text-white">
              <div className="w-8 h-8 bg-gray-500/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <FileText className="w-5 h-5 text-gray-400" />
              </div>
              <span>Dettagli delle Perdite Fiscali</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Anni di Perdite *
                </label>
                <Input
                  type="text"
                  placeholder="es. 2020, 2021, 2022"
                  value={formData.loss_years}
                  onChange={(e) => handleInputChange("loss_years", e.target.value)}
                  className="h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Totale Perdite Fiscali *
                </label>
                <Input
                  type="number"
                  placeholder="500000"
                  value={formData.total_losses}
                  onChange={(e) => handleInputChange("total_losses", e.target.value)}
                  className="h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Valore DTA Stimato *
                </label>
                <Input
                  type="number"
                  placeholder="120000"
                  value={formData.dta_amount}
                  onChange={(e) => handleInputChange("dta_amount", e.target.value)}
                  className="h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Metodo Contabile *
                </label>
                <Select
                  value={formData.accounting_method}
                  onValueChange={(value) => handleInputChange("accounting_method", value)}
                >
                  <SelectTrigger className="h-12 rounded-xl bg-white/10 border-white/20 text-white backdrop-blur-sm">
                    <SelectValue placeholder="Seleziona metodo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ordinario">Regime Ordinario</SelectItem>
                    <SelectItem value="consolidato">Consolidato Fiscale</SelectItem>
                    <SelectItem value="trasparenza">Trasparenza Fiscale</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Note Aggiuntive
              </label>
              <Textarea
                placeholder="Eventuali dettagli aggiuntivi sulle perdite fiscali..."
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
              <div className="w-8 h-8 bg-zinc-500/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Upload className="w-5 h-5 text-zinc-400" />
              </div>
              <span>Documenti Richiesti</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <DocumentUpload
              onDocumentsChange={handleDocumentsChange}
              acceptedTypes={[".pdf", ".jpg", ".jpeg", ".png"]}
              requiredDocs={[
                "Dichiarazioni dei redditi con perdite",
                "Bilanci degli esercizi in perdita",
                "Prospetto di riconciliazione fiscale",
                "Relazione della società di revisione",
                "Documentazione contabile di supporto"
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
            disabled={loading || !formData.company_name || !formData.dta_amount}
            className="bg-slate-600 hover:bg-slate-700 px-8 py-3 rounded-xl text-white shadow-lg"
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
