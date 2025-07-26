
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Building, FileText, Hash, Zap, Shield, Clock } from "lucide-react";
import DocumentUpload from "./DocumentUpload";

export default function CreditiPAForm({ onBack }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    entity_name: "",
    cig_code: "",
    cup_code: "",
    amount: "",
    invoice_number: "",
    invoice_date: "",
    service_description: "",
    payment_terms: "",
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
        type: 'crediti_pa',
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
      {/* Header Card con colori Crediti PA (arancione) */}
      <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl overflow-hidden">
        <div className="relative">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url('https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/a0c0990b7_365f0cd451e2bab46384f0a4b39e42bb.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          
          {/* Icona minimal per tornare indietro - Applica il nuovo stile */}
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
                <div className="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm">
                  <Building className="w-8 h-8 text-orange-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Crediti verso PA
                  </h2>
                  <p className="text-lg text-white/90 mb-2">
                    Fatture verso enti pubblici e amministrazioni
                  </p>
                  <p className="text-sm text-white/80">
                    Monetizzazione rapida dei crediti verso la Pubblica Amministrazione
                  </p>
                </div>
              </div>
              
              {/* Badge dinamico con animazione */}
              <div className="text-right">
                <div className="relative">
                  <div className="absolute inset-0 bg-orange-500/20 blur-xl rounded-full animate-pulse"></div>
                  <Badge className="relative bg-gradient-to-r from-orange-500 to-amber-500 text-white border-0 px-6 py-3 text-lg font-bold shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                      <span>Importo Variabile</span>
                    </div>
                  </Badge>
                </div>
                <p className="text-sm text-white/80 mt-2 font-medium">
                  In base alla fattura
                </p>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Vantaggi visuali con colori arancione */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl hover:bg-slate-800/40 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Building className="w-6 h-6 text-orange-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">Enti Pubblici</h3>
            <p className="text-sm text-white/80">Specializzati in PA</p>
          </CardContent>
        </Card>

        <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl hover:bg-slate-800/40 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">Liquidità rapida</h3>
            <p className="text-sm text-white/80">Monetizzazione veloce</p>
          </CardContent>
        </Card>

        <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl hover:bg-slate-800/40 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-red-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">Sicurezza garantita</h3>
            <p className="text-sm text-white/80">Crediti certi PA</p>
          </CardContent>
        </Card>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Public Entity Information */}
        <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl">
          <CardHeader className="p-6 border-b border-slate-700/50">
            <CardTitle className="flex items-center space-x-3 text-white">
              <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Building className="w-5 h-5 text-orange-400" />
              </div>
              <span>Ente Pubblico</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Nome Ente/Amministrazione *
              </label>
              <Input
                type="text"
                placeholder="Es. Comune di Roma, ASL Lazio 1, Ministero..."
                value={formData.entity_name}
                onChange={(e) => handleInputChange("entity_name", e.target.value)}
                className="h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Codice CIG
                </label>
                <Input
                  type="text"
                  placeholder="Es. Z123456789"
                  value={formData.cig_code}
                  onChange={(e) => handleInputChange("cig_code", e.target.value)}
                  className="h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm"
                />
                <p className="text-xs text-white/50 mt-1">
                  Codice Identificativo Gara (se applicabile)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Codice CUP
                </label>
                <Input
                  type="text"
                  placeholder="Es. B12345678901234567"
                  value={formData.cup_code}
                  onChange={(e) => handleInputChange("cup_code", e.target.value)}
                  className="h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm"
                />
                <p className="text-xs text-white/50 mt-1">
                  Codice Unico di Progetto (se applicabile)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Invoice Details */}
        <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl">
          <CardHeader className="p-6 border-b border-slate-700/50">
            <CardTitle className="flex items-center space-x-3 text-white">
              <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Hash className="w-5 h-5 text-amber-400" />
              </div>
              <span>Dettagli Fattura</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="grid md:grid-cols-3 gap-6">
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

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Data Fattura *
                </label>
                <Input
                  type="date"
                  value={formData.invoice_date}
                  onChange={(e) => handleInputChange("invoice_date", e.target.value)}
                  className="h-12 rounded-xl bg-white/10 border-white/20 text-white backdrop-blur-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Importo Fattura *
                </label>
                <Input
                  type="number"
                  placeholder="25000"
                  value={formData.amount}
                  onChange={(e) => handleInputChange("amount", e.target.value)}
                  className="h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Descrizione Servizio/Fornitura *
              </label>
              <Textarea
                placeholder="Descrivi dettagliatamente il servizio prestato o la fornitura effettuata..."
                value={formData.service_description}
                onChange={(e) => handleInputChange("service_description", e.target.value)}
                className="h-24 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Termini di Pagamento
              </label>
              <Input
                type="text"
                placeholder="Es. 30 giorni data fattura"
                value={formData.payment_terms}
                onChange={(e) => handleInputChange("payment_terms", e.target.value)}
                className="h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Note Aggiuntive
              </label>
              <Textarea
                placeholder="Eventuali note aggiuntive sulla fornitura o problematiche di pagamento..."
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
              <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <FileText className="w-5 h-5 text-red-400" />
              </div>
              <span>Documenti Richiesti</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <DocumentUpload
              onDocumentsChange={handleDocumentsChange}
              acceptedTypes={[".pdf", ".xml", ".p7m"]}
              requiredDocs={[
                "Fattura elettronica XML",
                "Copia contratto/ordine",
                "Documento di trasporto (se applicabile)",
                "Certificato di esecuzione lavori",
                "Corrispondenza con l'ente"
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
            // Applica il nuovo stile uniforme al pulsante "Indietro"
            className="px-8 py-3 rounded-xl border-white/30 hover:bg-white/20 text-white backdrop-blur-sm bg-[#1a1d2e]/80 hover:border-white/40 transition-all duration-300"
          >
            Indietro
          </Button>
          <Button
            type="submit"
            disabled={loading || !formData.entity_name || !formData.amount}
            className="bg-orange-600 hover:bg-orange-700 px-8 py-3 rounded-xl text-white shadow-lg"
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
