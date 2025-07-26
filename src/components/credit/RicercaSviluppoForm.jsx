
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Lightbulb, FileText, Microscope, Zap, Shield } from "lucide-react";
import DocumentUpload from "./DocumentUpload";

export default function RicercaSviluppoForm({ onBack }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    project_title: "",
    project_type: "",
    research_area: "",
    amount: "",
    project_duration: "",
    personnel_cost: "",
    equipment_cost: "",
    external_cost: "",
    description: "",
    documents: []
  });

  const projectTypes = [
    "Ricerca industriale",
    "Sviluppo sperimentale",
    "Ricerca di base",
    "Attività di innovazione",
    "Studi di fattibilità tecnica"
  ];

  const researchAreas = [
    "Tecnologie dell'informazione e comunicazione",
    "Biotecnologie e scienze della vita",
    "Nanotecnologie e materiali avanzati",
    "Energia e ambiente",
    "Trasporti e mobilità",
    "Manifatturiero avanzato",
    "Altro"
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
        type: 'ricerca_sviluppo',
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
      {/* New Card for the unified back button */}
      <Card className="border-white/20 shadow-xl bg-white/10 backdrop-blur-sm">
        <CardHeader className="border-b border-white/20 p-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={onBack}
              className="rounded-xl border-white/30 hover:bg-white/20 text-white backdrop-blur-sm bg-[#1a1d2e]/80 hover:border-white/40 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Header Card con colori Ricerca e Sviluppo (giallo) - now without the absolute back button */}
      <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl overflow-hidden">
        <div className="relative">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url('https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/dea350011_6a0d4e02ade464ef7399a3c693fc252a.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          
          <CardContent className="relative p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center space-x-4 flex-1">
                <div className="w-16 h-16 bg-yellow-500/20 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm">
                  <Lightbulb className="w-8 h-8 text-yellow-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Ricerca e Sviluppo
                  </h2>
                  <p className="text-lg text-white/90 mb-2">
                    Crediti per attività di ricerca industriale
                  </p>
                  <p className="text-sm text-white/80">
                    Incentivi per l'innovazione e lo sviluppo tecnologico
                  </p>
                </div>
              </div>
              
              {/* Badge dinamico con animazione */}
              <div className="text-right">
                <div className="relative">
                  <div className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full animate-pulse"></div>
                  <Badge className="relative bg-gradient-to-r from-yellow-500 to-amber-500 text-white border-0 px-6 py-3 text-lg font-bold shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                      <span>Fino al 50%</span>
                    </div>
                  </Badge>
                </div>
                <p className="text-sm text-white/80 mt-2 font-medium">
                  Delle spese sostenute
                </p>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Vantaggi visuali con colori giallo/amber */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl hover:bg-slate-800/40 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="w-6 h-6 text-yellow-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">Innovazione</h3>
            <p className="text-sm text-white/80">Sviluppo tecnologico</p>
          </CardContent>
        </Card>

        <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl hover:bg-slate-800/40 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Microscope className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">Ricerca avanzata</h3>
            <p className="text-sm text-white/80">Progetti industriali</p>
          </CardContent>
        </Card>

        <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl hover:bg-slate-800/40 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-orange-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">Credito immediato</h3>
            <p className="text-sm text-white/80">Utilizzo diretto</p>
          </CardContent>
        </Card>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Project Information */}
        <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl">
          <CardHeader className="p-6 border-b border-slate-700/50">
            <CardTitle className="flex items-center space-x-3 text-white">
              <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Microscope className="w-5 h-5 text-yellow-400" />
              </div>
              <span>Informazioni Progetto</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Titolo del Progetto *
              </label>
              <Input
                type="text"
                placeholder="Es. Sviluppo di un nuovo sistema di intelligenza artificiale per..."
                value={formData.project_title}
                onChange={(e) => handleInputChange("project_title", e.target.value)}
                className="h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Tipologia Progetto *
                </label>
                <Select
                  value={formData.project_type}
                  onValueChange={(value) => handleInputChange("project_type", value)}
                >
                  <SelectTrigger className="h-12 rounded-xl bg-white/10 border-white/20 text-white backdrop-blur-sm">
                    <SelectValue placeholder="Seleziona tipologia" />
                  </SelectTrigger>
                  <SelectContent>
                    {projectTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Area di Ricerca *
                </label>
                <Select
                  value={formData.research_area}
                  onValueChange={(value) => handleInputChange("research_area", value)}
                >
                  <SelectTrigger className="h-12 rounded-xl bg-white/10 border-white/20 text-white backdrop-blur-sm">
                    <SelectValue placeholder="Seleziona area" />
                  </SelectTrigger>
                  <SelectContent>
                    {researchAreas.map((area) => (
                      <SelectItem key={area} value={area}>
                        {area}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Descrizione Dettagliata del Progetto *
              </label>
              <Textarea
                placeholder="Descrivi obiettivi, metodologie, risultati attesi e impatto innovativo del progetto di ricerca..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="h-32 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Durata Progetto (mesi) *
              </label>
              <Input
                type="number"
                placeholder="12"
                value={formData.project_duration}
                onChange={(e) => handleInputChange("project_duration", e.target.value)}
                className="h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Cost Breakdown */}
        <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl">
          <CardHeader className="p-6 border-b border-slate-700/50">
            <CardTitle className="flex items-center space-x-3 text-white">
              <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Lightbulb className="w-5 h-5 text-amber-400" />
              </div>
              <span>Ripartizione Costi</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Costi Personale *
                </label>
                <Input
                  type="number"
                  placeholder="50000"
                  value={formData.personnel_cost}
                  onChange={(e) => handleInputChange("personnel_cost", e.target.value)}
                  className="h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Costi Strumentazione
                </label>
                <Input
                  type="number"
                  placeholder="20000"
                  value={formData.equipment_cost}
                  onChange={(e) => handleInputChange("equipment_cost", e.target.value)}
                  className="h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Costi Esterni
                </label>
                <Input
                  type="number"
                  placeholder="10000"
                  value={formData.external_cost}
                  onChange={(e) => handleInputChange("external_cost", e.target.value)}
                  className="h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Importo Totale Progetto *
              </label>
              <Input
                type="number"
                placeholder="80000"
                value={formData.amount}
                onChange={(e) => handleInputChange("amount", e.target.value)}
                className="h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm"
                required
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
              acceptedTypes={[".pdf", ".doc", ".docx"]}
              requiredDocs={[
                "Progetto tecnico dettagliato",
                "Piano finanziario del progetto",
                "CV del personale coinvolto",
                "Preventivi per strumentazione",
                "Accordi con partner esterni"
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
            disabled={loading || !formData.project_type || !formData.amount}
            className="bg-yellow-600 hover:bg-yellow-700 px-8 py-3 rounded-xl text-white shadow-lg"
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
