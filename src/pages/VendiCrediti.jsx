
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowLeft,
  Upload,
  Calculator,
  FileText,
  Home,
  Cpu,
  Receipt,
  Building,
  MapPin,
  Star,
  CheckCircle
} from "lucide-react";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import SimpleBackground from "../components/background/SimpleBackground";
import DocumentUpload from "../components/credit/DocumentUpload";

export default function VendiCrediti() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    amount: "",
    discount_rate: "",
    final_price: "",
    description: "",
    location: "",
    expires_at: "",
    documents_complete: false,
    images: []
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    // Calcola prezzo finale quando cambiano amount o discount_rate
    if (formData.amount && formData.discount_rate) {
      const amount = parseFloat(formData.amount);
      const discount = parseFloat(formData.discount_rate);
      const finalPrice = amount * (1 - discount / 100);
      setFormData((prev) => ({ ...prev, final_price: finalPrice.toString() }));
    }
  }, [formData.amount, formData.discount_rate]);

  const loadUser = async () => {
    try {
      const userData = await User.me();
      setUser(userData);
    } catch (error) {
      console.error("Error loading user:", error);
    }
  };

  const creditTypes = [
    { value: "superbonus_110", label: "Superbonus 110%", icon: Home },
    { value: "credito_imposta_40", label: "Credito d'Imposta 4.0", icon: Cpu },
    { value: "iva_credito", label: "IVA a Credito", icon: Receipt },
    { value: "crediti_pa", label: "Crediti verso PA", icon: Building },
    { value: "bonus_mezzogiorno", label: "Bonus Mezzogiorno", icon: MapPin },
    { value: "formazione_40", label: "Formazione 4.0", icon: Star },
    { value: "dta", label: "DTA (Deferred Tax Assets)", icon: FileText }
  ];


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await CreditListing.create({
        ...formData,
        amount: parseFloat(formData.amount),
        discount_rate: parseFloat(formData.discount_rate),
        final_price: parseFloat(formData.final_price),
        seller_company: user.company_name || user.full_name,
        status: "pending",
        verified: false,
        rating: 0,
        views_count: 0,
        interested_buyers: 0
      });

      setSuccess(true);
      setFormData({
        title: "",
        type: "",
        amount: "",
        discount_rate: "",
        final_price: "",
        description: "",
        location: "",
        expires_at: "",
        documents_complete: false,
        images: []
      });
    } catch (error) {
      console.error("Error creating listing:", error);
      alert("Errore nella creazione dell'annuncio. Riprova.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDocumentUpload = (urls) => {
    setFormData((prev) => ({ ...prev, images: urls }));
  };

  if (success) {
    return (
      <SimpleBackground>
        <div className="min-h-screen py-8">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="border-white/20 shadow-xl bg-white/10 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-4">
                  Annuncio Creato con Successo!
                </h2>
                <p className="text-white/80 mb-8">
                  Il tuo credito è stato inserito nel marketplace ed è in attesa di verifica.
                  Riceverai una notifica quando sarà approvato.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to={createPageUrl("MarketplaceCrediti")}>
                    <Button className="bg-[#13E8E9] hover:bg-[#13E8E9]/90 text-[#2c2e43] rounded-xl">
                      Vai al Marketplace
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/5 hover:text-white backdrop-blur-sm rounded-xl"
                    onClick={() => setSuccess(false)}>

                    Crea Altro Annuncio
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SimpleBackground>);

  }

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
              <div className="flex items-center space-x-4 flex-1">
                <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm">
                  <img
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/03d2053c2_JJJJ.png"
                    alt="Creditly Global"
                    className="w-10 h-10 rounded-lg" />

                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">
                    Vendi i Tuoi Crediti
                  </h1>
                  <p className="text-white/80 mt-1">
                    Monetizza i tuoi crediti fiscali nel marketplace
                  </p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Informazioni Base */}
            <Card className="border-white/20 shadow-xl bg-white/10 backdrop-blur-sm">
              <CardHeader className="p-6 border-b border-white/20">
                <CardTitle className="text-xl font-semibold text-white">
                  Informazioni Base
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Titolo Annuncio *
                  </label>
                  <Input
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder="es. Superbonus 110% - Edificio Residenziale Milano"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    required />

                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Tipo di Credito *
                  </label>
                  <Select value={formData.type} onValueChange={(value) => handleChange('type', value)}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Seleziona il tipo di credito" />
                    </SelectTrigger>
                    <SelectContent>
                      {creditTypes.map((type) => {
                        const IconComponent = type.icon;
                        return (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center">
                              <IconComponent className="w-4 h-4 mr-2" />
                              {type.label}
                            </div>
                          </SelectItem>);

                      })}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Descrizione *
                  </label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder="Descrivi dettagliatamente il credito, gli interventi effettuati, la documentazione disponibile..."
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-32"
                    required />

                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Località *
                  </label>
                  <Input
                    value={formData.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    placeholder="es. Milano, Lombardia"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    required />

                </div>
              </CardContent>
            </Card>

            {/* Informazioni Finanziarie */}
            <Card className="border-white/20 shadow-xl bg-white/10 backdrop-blur-sm">
              <CardHeader className="p-6 border-b border-white/20">
                <CardTitle className="text-xl font-semibold text-white flex items-center">
                  <Calculator className="w-5 h-5 mr-2" />
                  Informazioni Finanziarie
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Valore Nominale (€) *
                    </label>
                    <Input
                      type="number"
                      value={formData.amount}
                      onChange={(e) => handleChange('amount', e.target.value)}
                      placeholder="100000"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      required />

                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Percentuale Sconto (%) *
                    </label>
                    <Input
                      type="number"
                      step="0.1"
                      min="0"
                      max="50"
                      value={formData.discount_rate}
                      onChange={(e) => handleChange('discount_rate', e.target.value)}
                      placeholder="15"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      required />

                  </div>
                </div>

                {formData.final_price &&
                <Card className="bg-[#13E8E9]/10 border-[#13E8E9]/30">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-white/80">Prezzo Finale di Vendita:</span>
                        <span className="text-2xl font-bold text-[#13E8E9]">
                          €{parseFloat(formData.final_price).toLocaleString('it-IT')}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                }

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Data di Scadenza *
                  </label>
                  <Input
                    type="date"
                    value={formData.expires_at}
                    onChange={(e) => handleChange('expires_at', e.target.value)}
                    className="bg-white/10 border-white/20 text-white"
                    required />

                </div>
              </CardContent>
            </Card>

            {/* Documenti */}
            <Card className="border-white/20 shadow-xl bg-white/10 backdrop-blur-sm">
              <CardHeader className="p-6 border-b border-white/20">
                <CardTitle className="text-xl font-semibold text-white flex items-center">
                  <Upload className="w-5 h-5 mr-2" />
                  Documenti e Immagini
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <DocumentUpload
                  onUpload={handleDocumentUpload}
                  maxFiles={5}
                  acceptedTypes={['image/*', 'application/pdf']} />


                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.documents_complete}
                    onCheckedChange={(checked) => handleChange('documents_complete', checked)} />

                  <label className="text-sm text-white">
                    Confermo che la documentazione è completa e conforme
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Riepilogo */}
            <Card className="border-white/20 shadow-xl bg-white/10 backdrop-blur-sm">
              <CardHeader className="p-6 border-b border-white/20">
                <CardTitle className="text-xl font-semibold text-white">
                  Riepilogo Annuncio
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/80">Venditore:</span>
                    <span className="text-white font-medium">{user?.company_name || user?.full_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Tipo:</span>
                    <span className="text-white font-medium">
                      {creditTypes.find((t) => t.value === formData.type)?.label || '-'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Valore Nominale:</span>
                    <span className="text-white font-medium">
                      €{formData.amount ? parseFloat(formData.amount).toLocaleString('it-IT') : '-'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Sconto:</span>
                    <span className="text-red-400 font-medium">-{formData.discount_rate || 0}%</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-white/20">
                    <span className="text-white font-medium">Prezzo Finale:</span>
                    <span className="text-[#13E8E9] font-bold text-xl">
                      €{formData.final_price ? parseFloat(formData.final_price).toLocaleString('it-IT') : '-'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex justify-end space-x-4">
              <Link to={createPageUrl("MarketplaceCrediti")}>
                <Button
                  type="button"
                  variant="outline" className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border hover:text-accent-foreground h-10 px-8 py-3 rounded-xl border-white/30 hover:bg-white/20 text-white backdrop-blur-sm bg-[#1a1d2e]/80 hover:border-white/40 transition-all duration-300">


                  Annulla
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={loading}
                className="bg-[#13E8E9] hover:bg-[#13E8E9]/90 text-[#2c2e43] rounded-xl px-8">

                {loading ? "Creazione..." : "Pubblica Annuncio"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </SimpleBackground>);

}
