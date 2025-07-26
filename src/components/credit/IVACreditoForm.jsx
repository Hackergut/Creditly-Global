
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CreditRequest } from "@/api/entities";
import { ArrowLeft, Receipt, FileText, Calendar, Zap, Shield, Clock } from "lucide-react";
import DocumentUpload from "./DocumentUpload";

export default function IVACreditoForm({ onBack }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    tax_period: "",
    iva_balance: "",
    amount: "",
    vat_number: "",
    compensation_type: "",
    description: "",
    documents: []
  });

  const compensationTypes = [
    "Rimborso IVA trimestrale",
    "Compensazione orizzontale",
    "Compensazione verticale",
    "Rimborso annuale",
    "Credito speciale COVID-19"
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
        type: 'iva_credito',
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
      {/* Header Card con colori IVA (viola) */}
      <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl overflow-hidden">
        <div className="relative">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url('https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/879f0ee2e_da8d0313a541f6f8d01fe222a636ec68.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />

          {/* Icona minimal per tornare indietro - Uniform style applied here */}
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
                <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm">
                  <Receipt className="w-8 h-8 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    IVA a credito
                  </h2>
                  <p className="text-lg text-white/90 mb-2">
                    Compensazioni e rimborsi IVA verso l'Erario
                  </p>
                  <p className="text-sm text-white/80">
                    Gestione professionale dei crediti IVA aziendali
                  </p>
                </div>
              </div>

              {/* Badge dinamico con animazione */}
              <div className="text-right">
                <div className="relative">
                  <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full animate-pulse"></div>
                  <Badge className="relative bg-gradient-to-r from-purple-500 to-violet-500 text-white border-0 px-6 py-3 text-lg font-bold shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                      <span>Importo Variabile</span>
                    </div>
                  </Badge>
                </div>
                <p className="text-sm text-white/80 mt-2 font-medium">
                  In base al credito IVA
                </p>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Vantaggi visuali con colori viola */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl hover:bg-slate-800/40 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Receipt className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">Gestione IVA</h3>
            <p className="text-sm text-white/80">Compensazioni professionali</p>
          </CardContent>
        </Card>

        <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl hover:bg-slate-800/40 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">Rimborso rapido</h3>
            <p className="text-sm text-white/80">Liquidità immediata</p>
          </CardContent>
        </Card>

        <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl hover:bg-slate-800/40 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-pink-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">Tempi ridotti</h3>
            <p className="text-sm text-white/80">Processo semplificato</p>
          </CardContent>
        </Card>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Tax Information */}
        <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl">
          <CardHeader className="p-6 border-b border-slate-700/50">
            <CardTitle className="flex items-center space-x-3 text-white">
              <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Calendar className="w-5 h-5 text-indigo-400" />
              </div>
              <span>Periodo Fiscale</span>
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
                  Periodo di Riferimento *
                </label>
                <Input
                  type="text"
                  placeholder="Es. 1° Trimestre 2024"
                  value={formData.tax_period}
                  onChange={(e) => handleInputChange("tax_period", e.target.value)}
                  className="h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* IVA Details */}
        <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl">
          <CardHeader className="p-6 border-b border-slate-700/50">
            <CardTitle className="flex items-center space-x-3 text-white">
              <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Receipt className="w-5 h-5 text-purple-400" />
              </div>
              <span>Dettagli IVA a Credito</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Tipo di Compensazione/Rimborso *
              </label>
              <Select
                value={formData.compensation_type}
                onValueChange={(value) => handleInputChange("compensation_type", value)}
              >
                <SelectTrigger className="h-12 rounded-xl bg-white/10 border-white/20 text-white backdrop-blur-sm">
                  <SelectValue placeholder="Seleziona tipo" />
                </SelectTrigger>
                <SelectContent>
                  {compensationTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Bilancio IVA del Periodo *
                </label>
                <Input
                  type="number"
                  placeholder="-15000"
                  value={formData.iva_balance}
                  onChange={(e) => handleInputChange("iva_balance", e.target.value)}
                  className="h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm"
                  required
                />
                <p className="text-xs text-white/50 mt-1">
                  Inserire valore negativo per credito
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Importo Credito Richiesto *
                </label>
                <Input
                  type="number"
                  placeholder="15000"
                  value={formData.amount}
                  onChange={(e) => handleInputChange("amount", e.target.value)}
                  className="h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Descrizione e Note
              </label>
              <Textarea
                placeholder="Descrivi la situazione IVA, le operazioni che hanno generato il credito e le motivazioni della richiesta..."
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
              <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <FileText className="w-5 h-5 text-orange-400" />
              </div>
              <span>Documenti Richiesti</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <DocumentUpload
              onDocumentsChange={handleDocumentsChange}
              acceptedTypes={[".pdf", ".xlsx", ".xls"]}
              requiredDocs={[
                "Dichiarazione IVA del periodo",
                "Registri IVA (acquisti e vendite)",
                "Liquidazioni IVA periodiche",
                "F24 dei versamenti effettuati",
                "Bilancio di verifica contabile"
              ]}
            />
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex justify-end space-x-4 pt-6">
          {/* "Indietro" button - Uniform style applied here */}
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
            disabled={loading || !formData.compensation_type || !formData.amount}
            className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-xl text-white shadow-lg"
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
