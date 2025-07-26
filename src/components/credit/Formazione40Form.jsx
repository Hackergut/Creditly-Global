
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, GraduationCap, FileText, Users } from "lucide-react";
import DocumentUpload from "./DocumentUpload";

export default function Formazione40Form({ onBack }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    company_name: "",
    course_duration: "",
    training_entity: "",
    course_cost: "",
    amount: "",
    participants_count: "",
    course_description: "",
    description: "",
    documents: []
  });

  const trainingEntities = [
    "Università pubbliche o private",
    "Istituti di ricerca",
    "Organismi di formazione accreditati",
    "Digital Innovation Hub",
    "Competence Center",
    "Centri di trasferimento tecnologico"
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
        type: 'formazione_40',
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
      {/* New Card for the back button, as per outline */}
      <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl">
        <CardHeader className="border-b border-slate-700/50 p-6">
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

      {/* Header Card con colori Formazione 4.0 (teal) */}
      <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl overflow-hidden">
        <div className="relative">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url('https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/34bdc917e_37ef483d918d011a3a3785f69b253a16.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          
          {/* Removed old absolute positioned back button as it's now handled by the new card */}
          
          <CardContent className="relative p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center space-x-4 flex-1">
                <div className="w-16 h-16 bg-teal-500/20 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm">
                  <GraduationCap className="w-8 h-8 text-teal-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Formazione 4.0
                  </h2>
                  <p className="text-lg text-white/90 mb-2">
                    Spese per formazione del personale dipendente
                  </p>
                  <p className="text-sm text-white/80">
                    Credito d'imposta per la formazione tecnologica avanzata
                  </p>
                </div>
              </div>
              
              {/* Badge dinamico con animazione */}
              <div className="text-right">
                <div className="relative">
                  <div className="absolute inset-0 bg-teal-500/20 blur-xl rounded-full animate-pulse"></div>
                  <Badge className="relative bg-gradient-to-r from-teal-500 to-cyan-500 text-white border-0 px-6 py-3 text-lg font-bold shadow-2xl hover:shadow-teal-500/25 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                      <span>Fino al 50%</span>
                    </div>
                  </Badge>
                </div>
                <p className="text-sm text-white/80 mt-2 font-medium">
                  Del costo della formazione
                </p>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Vantaggi visuali con colori teal */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl hover:bg-slate-800/40 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-6 h-6 text-teal-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">Formazione avanzata</h3>
            <p className="text-sm text-white/80">Competenze digitali 4.0</p>
          </CardContent>
        </Card>

        <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl hover:bg-slate-800/40 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">Team qualificato</h3>
            <p className="text-sm text-white/80">Personale formato</p>
          </CardContent>
        </Card>

        <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl hover:bg-slate-800/40 transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">Credito immediato</h3>
            <p className="text-sm text-white/80">Beneficio diretto</p>
          </CardContent>
        </Card>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Company Information */}
        <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl">
          <CardHeader className="p-6 border-b border-slate-700/50">
            <CardTitle className="flex items-center space-x-3 text-white">
              <div className="w-8 h-8 bg-teal-500/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Users className="w-5 h-5 text-teal-400" />
              </div>
              <span>Dati Aziendali</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Nome Azienda *
              </label>
              <Input
                type="text"
                placeholder="Es. Rossi Industries S.r.l."
                value={formData.company_name}
                onChange={(e) => handleInputChange("company_name", e.target.value)}
                className="h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Numero Dipendenti Partecipanti *
              </label>
              <Input
                type="number"
                placeholder="15"
                value={formData.participants_count}
                onChange={(e) => handleInputChange("participants_count", e.target.value)}
                className="h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Training Details */}
        <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl">
          <CardHeader className="p-6 border-b border-slate-700/50">
            <CardTitle className="flex items-center space-x-3 text-white">
              <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <GraduationCap className="w-5 h-5 text-cyan-400" />
              </div>
              <span>Dettagli Corso di Formazione</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Ente di Formazione *
              </label>
              <Select
                value={formData.training_entity}
                onValueChange={(value) => handleInputChange("training_entity", value)}
              >
                <SelectTrigger className="h-12 rounded-xl bg-white/10 border-white/20 text-white backdrop-blur-sm">
                  <SelectValue placeholder="Seleziona ente" />
                </SelectTrigger>
                <SelectContent>
                  {trainingEntities.map((entity) => (
                    <SelectItem key={entity} value={entity}>
                      {entity}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Descrizione del Corso *
              </label>
              <Textarea
                placeholder="Descrivi il programma formativo, le competenze sviluppate e come si collega alle tecnologie 4.0..."
                value={formData.course_description}
                onChange={(e) => handleInputChange("course_description", e.target.value)}
                className="h-24 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Durata Corso (ore) *
                </label>
                <Input
                  type="number"
                  placeholder="40"
                  value={formData.course_duration}
                  onChange={(e) => handleInputChange("course_duration", e.target.value)}
                  className="h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Costo Totale Corso *
                </label>
                <Input
                  type="number"
                  placeholder="25000"
                  value={formData.course_cost}
                  onChange={(e) => handleInputChange("course_cost", e.target.value)}
                  className="h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Importo Credito Richiesto *
              </label>
              <Input
                type="number"
                placeholder="12500"
                value={formData.amount}
                onChange={(e) => handleInputChange("amount", e.target.value)}
                className="h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm"
                required
              />
              <p className="text-xs text-white/50 mt-1">
                Massimo 50% del costo del corso
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Note Aggiuntive
              </label>
              <Textarea
                placeholder="Eventuali note aggiuntive sul corso di formazione..."
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
              <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <FileText className="w-5 h-5 text-emerald-400" />
              </div>
              <span>Documenti Richiesti</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <DocumentUpload
              onDocumentsChange={handleDocumentsChange}
              acceptedTypes={[".pdf", ".jpg", ".jpeg", ".png"]}
              requiredDocs={[
                "Contratto con ente di formazione",
                "Programma dettagliato del corso",
                "Attestati di partecipazione",
                "Fatture del corso di formazione",
                "Lista nominativa partecipanti"
              ]}
            />
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex justify-end space-x-4 pt-6">
          {/* Back button updated to match the new uniform style */}
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
            disabled={loading || !formData.training_entity || !formData.amount}
            className="bg-teal-600 hover:bg-teal-700 px-8 py-3 rounded-xl text-white shadow-lg"
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
