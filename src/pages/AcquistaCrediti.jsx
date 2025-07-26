
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  ShoppingCart,
  Euro,
  Shield,
  FileText,
  Home,
  Cpu,
  Receipt,
  Building,
  MapPin,
  Star,
  CheckCircle,
  AlertCircle,
  Calendar,
  User as UserIcon,
  Phone,
  Mail,
  CreditCard,
  Banknote
} from "lucide-react";
import { format } from "date-fns";
import { it } from "date-fns/locale"; // Corrected import syntax for 'it'
import SimpleBackground from "../components/background/SimpleBackground";

export default function AcquistaCrediti() {
  const [user, setUser] = useState(null);
  const [creditListing, setCreditListing] = useState(null);
  const [loading, setLoading] = useState(true); // For initial data load
  const [isSubmitting, setIsSubmitting] = useState(false); // Renamed 'submitting' to 'isSubmitting' for clarity
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null); // Added state for handling submission errors
  const location = useLocation();
  
  const [formData, setFormData] = useState({ // Renamed 'purchaseData' to 'formData'
    payment_method: "",
    buyer_notes: "",
    terms_accepted: false,
    privacy_accepted: false,
    due_diligence_accepted: false
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const userData = await User.me();
      setUser(userData);

      // Ottieni ID del credito dall'URL
      const params = new URLSearchParams(location.search);
      const creditId = params.get('credit_id');
      
      if (creditId) {
        const listings = await CreditListing.list();
        const listing = listings.find(l => l.id === creditId);
        setCreditListing(listing);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCreditTypeIcon = (type) => {
    const icons = {
      'superbonus_110': Home,
      'credito_imposta_40': Cpu,
      'iva_credito': Receipt,
      'crediti_pa': Building,
      'bonus_mezzogiorno': MapPin,
      'formazione_40': Star,
      'dta': FileText
    };
    return icons[type] || Receipt;
  };

  const getCreditTypeLabel = (type) => {
    const labels = {
      'superbonus_110': 'Superbonus 110%',
      'credito_imposta_40': 'Credito 4.0',
      'iva_credito': 'IVA a credito',
      'crediti_pa': 'Crediti PA',
      'bonus_mezzogiorno': 'Bonus Sud',
      'formazione_40': 'Formazione 4.0',
      'dta': 'DTA'
    };
    return labels[type] || type;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ // Updated to setFormData
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Changed from setLoading(true)
    setError(null); // Clear any previous errors

    try {
      // Crea la richiesta di acquisto
      const purchaseRequest = await PurchaseRequest.create({
        ...formData, // Spreads payment_method, buyer_notes, terms_accepted, privacy_accepted, due_diligence_accepted
        credit_listing_id: creditListing.id, // Using creditListing.id for direct access
        buyer_email: user.email,
        offer_amount: creditListing.final_price,
        buyer_company: user.company_name, // Include buyer company from user data
        buyer_vat: user.vat_number, // Include buyer VAT from user data
        status: 'pending' // Initial status for the purchase request
      });

      // TODO: Implementare invio email di conferma con Supabase

      setSuccess(true);
      // Reset only the actual form inputs that are user-editable
      setFormData({
        payment_method: "",
        buyer_notes: "",
        terms_accepted: false,
        privacy_accepted: false,
        due_diligence_accepted: false
      });

    } catch (err) { // Changed variable name to 'err' to avoid conflict with 'error' state
      console.error("Error submitting purchase request:", err);
      setError("Errore nell'invio della richiesta. Riprova più tardi."); // Set error message
    } finally {
      setIsSubmitting(false); // Changed from setLoading(false)
    }
  };

  const isFormValid = () => {
    return formData.payment_method && // Updated to formData
           formData.terms_accepted && 
           formData.privacy_accepted && 
           formData.due_diligence_accepted;
  };

  if (loading) {
    return (
      <SimpleBackground>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#13E8E9]"></div>
        </div>
      </SimpleBackground>
    );
  }

  if (!creditListing) {
    return (
      <SimpleBackground>
        <div className="min-h-screen py-8">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="border-white/20 shadow-xl bg-white/10 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-4">
                  Credito non trovato
                </h2>
                <p className="text-white/80 mb-8">
                  Il credito che stai cercando di acquistare non esiste o non è più disponibile.
                </p>
                <Link to={createPageUrl("MarketplaceCrediti")}>
                  <Button className="bg-[#13E8E9] hover:bg-[#13E8E9]/90 text-[#2c2e43] rounded-xl">
                    Torna al Marketplace
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </SimpleBackground>
    );
  }

  if (success) {
    return (
      <SimpleBackground>
        <div className="min-h-screen py-8">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="border-white/20 shadow-xl bg-white/10 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-4">
                  Richiesta di Acquisto Inviata!
                </h2>
                <p className="text-white/80 mb-8">
                  La tua richiesta di acquisto è stata inviata al venditore. 
                  Riceverai una notifica quando sarà processata dal nostro team.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to={createPageUrl("MarketplaceCrediti")}>
                    <Button className="bg-[#13E8E9] hover:bg-[#13E8E9]/90 text-[#2c2e43] rounded-xl">
                      Torna al Marketplace
                    </Button>
                  </Link>
                  <Link to={createPageUrl("Dashboard")}>
                    <Button 
                      variant="outline" 
                      className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm rounded-xl"
                    >
                      Vai alla Dashboard
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SimpleBackground>
    );
  }

  const IconComponent = getCreditTypeIcon(creditListing.type);

  return (
    <SimpleBackground>
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <Link to={createPageUrl("MarketplaceCrediti")}>
                <Button variant="outline" size="icon" className="rounded-xl border-white/20 hover:bg-white/10 text-white backdrop-blur-sm">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <div className="flex items-center space-x-4 flex-1">
                <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm">
                  <ShoppingCart className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">
                    Acquista Credito
                  </h1>
                  <p className="text-white/80 mt-1">
                    Completa l'acquisto del credito fiscale selezionato
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Credit Details - Sidebar */}
            <div className="lg:col-span-1">
              <Card className="border-white/20 shadow-xl bg-white/10 backdrop-blur-sm sticky top-8">
                <CardHeader className="p-6 border-b border-white/20">
                  <CardTitle className="text-lg font-semibold text-white flex items-center">
                    <IconComponent className="w-5 h-5 mr-2" />
                    Dettagli Credito
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  {creditListing.images && creditListing.images.length > 0 && (
                    <div className="aspect-video rounded-lg overflow-hidden mb-4">
                      <img 
                        src={creditListing.images[0]} 
                        alt={creditListing.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div>
                    <h3 className="font-semibold text-white mb-2">{creditListing.title}</h3>
                    <Badge className="bg-green-100 text-green-800 border-0 mb-3">
                      {getCreditTypeLabel(creditListing.type)}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/80">Valore Nominale:</span>
                      <span className="text-white font-medium">€{creditListing.amount?.toLocaleString('it-IT')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Sconto:</span>
                      <span className="text-red-400 font-medium">-{creditListing.discount_rate}%</span>
                    </div>
                    <Separator className="bg-white/20" />
                    <div className="flex justify-between">
                      <span className="text-white font-medium">Prezzo Finale:</span>
                      <span className="text-[#13E8E9] font-bold text-xl">€{creditListing.final_price?.toLocaleString('it-IT')}</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-white/20">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Venditore:</span>
                      <span className="text-white">{creditListing.seller_company}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Località:</span>
                      <span className="text-white">{creditListing.location}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Scadenza:</span>
                      <span className="text-white">
                        {format(new Date(creditListing.expires_at), 'dd MMM yyyy', { locale: it })}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Purchase Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Buyer Information */}
                <Card className="border-white/20 shadow-xl bg-white/10 backdrop-blur-sm">
                  <CardHeader className="p-6 border-b border-white/20">
                    <CardTitle className="text-xl font-semibold text-white flex items-center">
                      <UserIcon className="w-5 h-5 mr-2" />
                      Informazioni Acquirente
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Nome Completo
                        </label>
                        <Input
                          value={user?.full_name || ''}
                          disabled
                          className="bg-white/5 border-white/20 text-white/70"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Email
                        </label>
                        <Input
                          value={user?.email || ''}
                          disabled
                          className="bg-white/5 border-white/20 text-white/70"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Azienda
                        </label>
                        <Input
                          value={user?.company_name || ''}
                          disabled
                          className="bg-white/5 border-white/20 text-white/70"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          P.IVA
                        </label>
                        <Input
                          value={user?.vat_number || ''}
                          disabled
                          className="bg-white/5 border-white/20 text-white/70"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card className="border-white/20 shadow-xl bg-white/10 backdrop-blur-sm">
                  <CardHeader className="p-6 border-b border-white/20">
                    <CardTitle className="text-xl font-semibold text-white flex items-center">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Metodo di Pagamento
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="grid gap-4">
                      <div className="flex items-center space-x-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5 transition-colors">
                        <input
                          type="radio"
                          name="payment_method"
                          value="bank_transfer"
                          checked={formData.payment_method === 'bank_transfer'} // Updated to formData
                          onChange={(e) => handleInputChange('payment_method', e.target.value)}
                          className="text-[#13E8E9]"
                        />
                        <Banknote className="w-5 h-5 text-white/70" />
                        <div>
                          <p className="text-white font-medium">Bonifico Bancario</p>
                          <p className="text-white/70 text-sm">Pagamento sicuro tramite bonifico</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border border-white/20 rounded-lg cursor-pointer hover:bg-white/5 transition-colors">
                        <input
                          type="radio"
                          name="payment_method"
                          value="escrow"
                          checked={formData.payment_method === 'escrow'} // Updated to formData
                          onChange={(e) => handleInputChange('payment_method', e.target.value)}
                          className="text-[#13E8E9]"
                        />
                        <Shield className="w-5 h-5 text-white/70" />
                        <div>
                          <p className="text-white font-medium">Deposito Fiduciario</p>
                          <p className="text-white/70 text-sm">Massima sicurezza con garanzia escrow</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Additional Notes */}
                <Card className="border-white/20 shadow-xl bg-white/10 backdrop-blur-sm">
                  <CardHeader className="p-6 border-b border-white/20">
                    <CardTitle className="text-xl font-semibold text-white flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Note Aggiuntive
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <Textarea
                      placeholder="Inserisci eventuali richieste specifiche o note per il venditore..."
                      value={formData.buyer_notes} // Updated to formData
                      onChange={(e) => handleInputChange('buyer_notes', e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-24"
                    />
                  </CardContent>
                </Card>

                {/* Terms and Conditions */}
                <Card className="border-white/20 shadow-xl bg-white/10 backdrop-blur-sm">
                  <CardHeader className="p-6 border-b border-white/20">
                    <CardTitle className="text-xl font-semibold text-white flex items-center">
                      <Shield className="w-5 h-5 mr-2" />
                      Accettazione Termini
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        checked={formData.terms_accepted} // Updated to formData
                        onCheckedChange={(checked) => handleInputChange('terms_accepted', checked)}
                        className="mt-1"
                      />
                      <label className="text-sm text-white leading-relaxed">
                        Accetto i <Link to={createPageUrl("TermsOfService")} className="text-[#13E8E9] hover:underline">Termini e Condizioni</Link> per l'acquisto di crediti fiscali attraverso la piattaforma Creditly Global.
                      </label>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Checkbox
                        checked={formData.privacy_accepted} // Updated to formData
                        onCheckedChange={(checked) => handleInputChange('privacy_accepted', checked)}
                        className="mt-1"
                      />
                      <label className="text-sm text-white leading-relaxed">
                        Accetto l'<Link to={createPageUrl("PrivacyPolicy")} className="text-[#13E8E9] hover:underline">Informativa sulla Privacy</Link> e autorizzo il trattamento dei miei dati personali.
                      </label>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Checkbox
                        checked={formData.due_diligence_accepted} // Updated to formData
                        onCheckedChange={(checked) => handleInputChange('due_diligence_accepted', checked)}
                        className="mt-1"
                      />
                      <label className="text-sm text-white leading-relaxed">
                        Dichiaro di aver effettuato le necessarie verifiche di due diligence sul credito fiscale e di essere consapevole dei rischi connessi all'operazione.
                      </label>
                    </div>
                  </CardContent>
                </Card>

                {error && ( // Display error message if present
                  <div className="text-red-400 text-sm text-center mt-4">
                    {error}
                  </div>
                )}

                {/* Submit */}
                <div className="flex justify-end space-x-4">
                  <Link to={createPageUrl("MarketplaceCrediti")}>
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm rounded-xl px-8"
                    >
                      Annulla
                    </Button>
                  </Link>
                  <Button 
                    type="submit" 
                    disabled={!isFormValid() || isSubmitting} // Updated to isSubmitting
                    className="bg-[#13E8E9] hover:bg-[#13E8E9]/90 text-[#2c2e43] rounded-xl px-8 py-3"
                  >
                    {isSubmitting ? ( // Updated to isSubmitting
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#2c2e43]"></div>
                        <span>Elaborazione...</span>
                      </div>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Conferma Acquisto
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </SimpleBackground>
  );
}
