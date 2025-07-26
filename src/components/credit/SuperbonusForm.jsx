
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { CreditRequest } from "@/api/entities";
import { ArrowLeft, Home, Zap, Shield, FileText, Calendar } from "lucide-react";
import DocumentUpload from "./DocumentUpload";

export default function SuperbonusForm({ onBack }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    building_type: "",
    intervention_type: "",
    amount: "",
    tax_code: "",
    property_address: "",
    start_date: "",
    end_date: "",
    description: "",
    has_permits: false,
    has_technical_reports: false,
    documents: []
  });

  const buildingTypes = [
    "Condominio",
    "Unità abitativa indipendente",
    "Villetta a schiera",
    "Appartamento in edificio",
    "Casa bifamiliare"
  ];

  const interventionTypes = [
    "Isolamento termico (cappotto)",
    "Sostituzione impianti di climatizzazione",
    "Interventi antisismici",
    "Installazione pannelli solari",
    "Sostituzione infissi",
    "Interventi combinati"
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDocumentsChange = (documents) => {
    setFormData((prev) => ({
      ...prev,
      documents
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await CreditRequest.create({
        type: 'superbonus_110',
        amount: parseFloat(formData.amount),
        description: formData.description,
        data: formData,
        documents: formData.documents,
        status: 'submitted',
        submitted_date: new Date().toISOString()
      });

      // Redirect to dashboard with success message
      window.location.href = "/Dashboard?success=request_submitted";
    } catch (error) {
      console.error("Error submitting request:", error);
    }

    setLoading(false);
  };

  return (
    <div className="space-y-8">
      {/* Header Card con colori Superbonus (verde) */}
      <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl overflow-hidden">
        <div className="relative">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url('https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/67b6d113f_9c7a3a5a0b27ce38ef9f99260836aa28.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          
          {/* Icona minimal per tornare indietro - Uniformed style */}
          <Button
            variant="outline"
            size="icon"
            onClick={onBack}
            className="absolute top-6 left-6 rounded-xl border-white/30 hover:bg-white/20 text-white backdrop-blur-sm bg-[#1a1d2e]/80 hover:border-white/40 transition-all duration-300"
            aria-label="Torna indietro"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          
          <CardContent className="relative p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center space-x-4 flex-1">
                <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm">
                  <Home className="w-8 h-8 text-green-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Superbonus 110%
                  </h2>
                  <p className="text-lg text-white/90 mb-2">
                    Riqualificazione energetica e sismica
                  </p>
                  <p className="text-sm text-white/80">
                    Detrazione fiscale del 110% per interventi di efficientamento energetico
                  </p>
                </div>
              </div>
              
              {/* Badge dinamico con animazione */}
              <div className="text-right">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full animate-pulse"></div>
                  <Badge className="relative bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 px-6 py-3 text-lg font-bold shadow-2xl hover:shadow-green-500/25 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                      <span>Fino a €96.000</span>
                    </div>
                  </Badge>
                </div>
                <p className="text-sm text-white/80 mt-2 font-medium">
                  Detrazione massima per unità
                </p>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Vantaggi visuali con colori verdi */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl hover:bg-slate-800/40 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">110% di detrazione</h3>
            <p className="text-sm text-white/80">Recuperi più di quanto spendi</p>
          </CardContent>
        </Card>

        <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl hover:bg-slate-800/40 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">Cessione del credito</h3>
            <p className="text-sm text-white/80">Nessun anticipo necessario</p>
          </CardContent>
        </Card>

        <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl hover:bg-slate-800/40 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">Gestione completa</h3>
            <p className="text-sm text-white/80">Seguiamo tutto l'iter</p>
          </CardContent>
        </Card>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Building Information */}
        <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl">
          <CardHeader className="p-6 border-b border-slate-700/50">
            <CardTitle className="flex items-center space-x-3 text-white">
              <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Home className="w-5 h-5 text-green-400" />
              </div>
              <span>Informazioni Immobile</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Tipologia Immobile *
                </label>
                <Select
                  value={formData.building_type}
                  onValueChange={(value) => handleInputChange("building_type", value)}
                >
                  <SelectTrigger className="h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm">
                    <SelectValue placeholder="Seleziona tipologia" />
                  </SelectTrigger>
                  <SelectContent>
                    {buildingTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Codice Fiscale Immobile *
                </label>
                <Input
                  type="text"
                  placeholder="RSSMRA80A01H501Z"
                  value={formData.tax_code}
                  onChange={(e) => handleInputChange("tax_code", e.target.value)}
                  className="h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Indirizzo Immobile *
              </label>
              <Input
                type="text"
                placeholder="Via Roma, 123 - 20100 Milano (MI)"
                value={formData.property_address}
                onChange={(e) => handleInputChange("property_address", e.target.value)}
                className="h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Intervention Details */}
        <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl">
          <CardHeader className="p-6 border-b border-slate-700/50">
            <CardTitle className="flex items-center space-x-3 text-white">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Zap className="w-5 h-5 text-blue-400" />
              </div>
              <span>Dettagli Intervento</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Tipo di Intervento *
              </label>
              <Select
                value={formData.intervention_type}
                onValueChange={(value) => handleInputChange("intervention_type", value)}
              >
                <SelectTrigger className="h-12 rounded-xl bg-white/10 border-white/20 text-white backdrop-blur-sm">
                  <SelectValue placeholder="Seleziona intervento" />
                </SelectTrigger>
                <SelectContent>
                  {interventionTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Importo Intervento *
                </label>
                <Input
                  type="number"
                  placeholder="50000"
                  value={formData.amount}
                  onChange={(e) => handleInputChange("amount", e.target.value)}
                  className="h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Data Inizio Lavori
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
                Descrizione Dettagliata
              </label>
              <Textarea
                placeholder="Descrivi gli interventi previsti, i materiali utilizzati e gli obiettivi di efficientamento..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="h-24 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm"
              />
            </div>
          </CardContent>
        </Card>

        {/* Requirements Check */}
        <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl">
          <CardHeader className="p-6 border-b border-slate-700/50">
            <CardTitle className="flex items-center space-x-3 text-white">
              <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Shield className="w-5 h-5 text-purple-400" />
              </div>
              <span>Requisiti e Conformità</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="permits"
                checked={formData.has_permits}
                onCheckedChange={(checked) => handleInputChange("has_permits", checked)}
                className="border-white/30"
              />
              <label htmlFor="permits" className="text-sm font-medium text-white">
                Sono in possesso di tutti i permessi edilizi necessari
              </label>
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox
                id="reports"
                checked={formData.has_technical_reports}
                onCheckedChange={(checked) => handleInputChange("has_technical_reports", checked)}
                className="border-white/30"
              />
              <label htmlFor="reports" className="text-sm font-medium text-white">
                Ho le relazioni tecniche di asseverazione
              </label>
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
                "Visura catastale aggiornata",
                "Planimetrie dell'immobile",
                "Preventivi dettagliati",
                "Asseverazioni tecniche",
                "Permessi edilizi"
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
            aria-label="Indietro"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <Button
            type="submit"
            disabled={loading || !formData.building_type || !formData.amount}
            className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-xl text-white shadow-lg"
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
