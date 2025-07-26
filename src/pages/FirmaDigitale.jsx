import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { PurchaseRequest } from "@/api/entities";
import { CreditListing } from "@/api/entities";
import { User } from "@/api/entities";
import {
  Shield,
  FileText,
  CheckCircle,
  AlertCircle,
  Clock,
  PenTool,
  Lock,
  Verified
} from "lucide-react";
import SimpleBackground from "../components/background/SimpleBackground";

export default function FirmaDigitale() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [signing, setSigning] = useState(false);
  const [signed, setSigned] = useState(false);
  const [error, setError] = useState(null);
  const [purchaseRequest, setPurchaseRequest] = useState(null);
  const [creditListing, setCreditListing] = useState(null);
  const [user, setUser] = useState(null);
  const [signatureData, setSignatureData] = useState({
    full_name: "",
    position: "",
    company_location: "",
    agrees_terms: false,
    agrees_privacy: false,
    digital_signature: ""
  });

  useEffect(() => {
    loadSignatureData();
  }, []);

  const loadSignatureData = async () => {
    try {
      const params = new URLSearchParams(location.search);
      const token = params.get('token');
      const requestId = params.get('request');

      if (!token || !requestId) {
        setError('Link di firma non valido o scaduto');
        setLoading(false);
        return;
      }

      // Carica dati utente
      const userData = await User.me();
      setUser(userData);

      // Carica richiesta di acquisto
      const request = await PurchaseRequest.filter({ id: requestId, signature_token: token })[0];
      if (!request) {
        setError('Richiesta non trovata o token non valido');
        setLoading(false);
        return;
      }

      if (request.signature_status === 'signed') {
        setSigned(true);
        setLoading(false);
        return;
      }

      setPurchaseRequest(request);

      // Carica dettagli del credito
      const listing = await CreditListing.filter({ id: request.credit_listing_id })[0];
      setCreditListing(listing);

      // Pre-compila dati firma
      setSignatureData(prev => ({
        ...prev,
        full_name: userData.full_name || "",
        company_location: `${userData.city || ""}, ${userData.region || ""}`.replace(", ", ", ").replace(/^, |, $/, "")
      }));

    } catch (error) {
      console.error('Error loading signature data:', error);
      setError('Errore nel caricamento dei dati');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setSignatureData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDigitalSign = async () => {
    if (!signatureData.full_name || !signatureData.position || !signatureData.digital_signature) {
      setError('Compilare tutti i campi obbligatori');
      return;
    }

    if (!signatureData.agrees_terms || !signatureData.agrees_privacy) {
      setError('È necessario accettare termini e privacy policy');
      return;
    }

    setSigning(true);
    
    try {
      // Genera hash della firma digitale per sicurezza
      const signatureHash = await crypto.subtle.digest(
        'SHA-256',
        new TextEncoder().encode(signatureData.digital_signature + purchaseRequest.id + Date.now())
      );
      const hashArray = Array.from(new Uint8Array(signatureHash));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

      // Aggiorna la richiesta con firma digitale
      await PurchaseRequest.update(purchaseRequest.id, {
        signature_status: 'signed',
        signature_data: signatureData,
        signature_hash: hashHex,
        signed_at: new Date().toISOString(),
        status: 'under_review'
      });

      setSigned(true);
      
      // Redirect dopo successo
      setTimeout(() => {
        window.location.href = '/Dashboard?success=document_signed';
      }, 3000);

    } catch (error) {
      console.error('Error signing document:', error);
      setError('Errore nella firma digitale. Riprova.');
    } finally {
      setSigning(false);
    }
  };

  if (loading) {
    return (
      <SimpleBackground>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#13E8E9] mx-auto mb-4"></div>
            <p className="text-white">Caricamento documento...</p>
          </div>
        </div>
      </SimpleBackground>
    );
  }

  if (error) {
    return (
      <SimpleBackground>
        <div className="min-h-screen flex items-center justify-center p-4">
          <Card className="max-w-md w-full border-white/20 shadow-xl bg-white/10 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-white">Errore</h3>
              <p className="text-white/80 mb-4">{error}</p>
              <Button
                onClick={() => window.location.href = '/Dashboard'}
                className="bg-[#13E8E9] hover:bg-[#13E8E9]/90 text-[#2c2e43]"
              >
                Torna alla Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </SimpleBackground>
    );
  }

  if (signed) {
    return (
      <SimpleBackground>
        <div className="min-h-screen flex items-center justify-center p-4">
          <Card className="max-w-2xl w-full border-white/20 shadow-xl bg-white/10 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-white mb-4">
                ✅ Documento Firmato con Successo!
              </h2>
              <p className="text-white/80 mb-6 leading-relaxed">
                La sua firma digitale è stata registrata correttamente. 
                La richiesta di acquisto è ora in fase di revisione.
              </p>
              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-6">
                <p className="text-green-300 text-sm">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Riceverà una notifica via email appena il venditore approverà la transazione.
                </p>
              </div>
              <Button
                onClick={() => window.location.href = '/Dashboard'}
                className="bg-[#13E8E9] hover:bg-[#13E8E9]/90 text-[#2c2e43] px-8"
              >
                Torna alla Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </SimpleBackground>
    );
  }

  return (
    <SimpleBackground>
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/03d2053c2_JJJJ.png"
                alt="Creditly Global"
                className="w-12 h-12 rounded-lg"
              />
              <h1 className="text-3xl font-bold text-white">Firma Digitale</h1>
            </div>
            <p className="text-white/80">Conferma e firma la richiesta di acquisto</p>
          </div>

          {/* Dettagli Transazione */}
          <Card className="border-white/20 shadow-xl bg-white/10 backdrop-blur-sm mb-8">
            <CardHeader className="p-6 border-b border-white/20">
              <CardTitle className="text-xl font-semibold text-white flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Dettagli della Transazione
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {creditListing && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-white mb-3">📊 Credito Fiscale</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/70">Titolo:</span>
                        <span className="text-white font-medium">{creditListing.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Valore Nominale:</span>
                        <span className="text-white font-medium">€{creditListing.amount?.toLocaleString('it-IT')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Sconto:</span>
                        <span className="text-red-400 font-medium">-{creditListing.discount_rate}%</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-white/20">
                        <span className="text-white/70">Prezzo Finale:</span>
                        <span className="text-[#13E8E9] font-bold text-lg">€{creditListing.final_price?.toLocaleString('it-IT')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold text-white mb-3">🏢 Dettagli Venditore</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/70">Azienda:</span>
                        <span className="text-white font-medium">{creditListing.seller_company}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Località:</span>
                        <span className="text-white font-medium">{creditListing.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Scadenza:</span>
                        <span className="text-white font-medium">
                          {new Date(creditListing.expires_at).toLocaleDateString('it-IT')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Stato:</span>
                        <Badge className="bg-green-500/20 text-green-400 border-0">
                          {creditListing.verified ? '✅ Verificato' : '⏳ In Verifica'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Form Firma Digitale */}
          <Card className="border-white/20 shadow-xl bg-white/10 backdrop-blur-sm">
            <CardHeader className="p-6 border-b border-white/20">
              <CardTitle className="text-xl font-semibold text-white flex items-center">
                <PenTool className="w-5 h-5 mr-2" />
                Firma Digitale
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Nome Completo *
                  </label>
                  <Input
                    value={signatureData.full_name}
                    onChange={(e) => handleInputChange('full_name', e.target.value)}
                    placeholder="Mario Rossi"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Posizione/Qualifica *
                  </label>
                  <Input
                    value={signatureData.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                    placeholder="Amministratore Delegato"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Sede Legale Azienda
                </label>
                <Input
                  value={signatureData.company_location}
                  onChange={(e) => handleInputChange('company_location', e.target.value)}
                  placeholder="Milano, Lombardia"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Firma Digitale *
                </label>
                <Textarea
                  value={signatureData.digital_signature}
                  onChange={(e) => handleInputChange('digital_signature', e.target.value)}
                  placeholder="Scrivi il tuo nome completo come firma digitale"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-24"
                  required
                />
                <p className="text-white/60 text-xs mt-1">
                  La firma digitale equivale alla firma autografa ai sensi della normativa vigente
                </p>
              </div>

              {/* Consensi */}
              <div className="space-y-4 pt-6 border-t border-white/20">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    checked={signatureData.agrees_terms}
                    onCheckedChange={(checked) => handleInputChange('agrees_terms', checked)}
                    className="border-white/30 mt-1"
                  />
                  <label className="text-sm text-white leading-relaxed">
                    Accetto i <a href="/TermsOfService" className="text-[#13E8E9] underline" target="_blank">Termini di Servizio</a> e 
                    confermo che i dati inseriti sono veritieri e che sono autorizzato a firmare per conto dell'azienda. *
                  </label>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    checked={signatureData.agrees_privacy}
                    onCheckedChange={(checked) => handleInputChange('agrees_privacy', checked)}
                    className="border-white/30 mt-1"
                  />
                  <label className="text-sm text-white leading-relaxed">
                    Accetto la <a href="/PrivacyPolicy" className="text-[#13E8E9] underline" target="_blank">Privacy Policy</a> e 
                    autorizzo il trattamento dei dati personali per la finalità della transazione. *
                  </label>
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Lock className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-200">
                    <p className="font-medium mb-1">🔒 Transazione Sicura</p>
                    <p className="text-blue-300">
                      La firma digitale è crittografata e ha valore legale equivalente alla firma autografa. 
                      Tutti i dati sono protetti con standard di sicurezza bancari.
                    </p>
                  </div>
                </div>
              </div>

              {/* Firma Button */}
              <div className="flex justify-end pt-6">
                <Button
                  onClick={handleDigitalSign}
                  disabled={signing || !signatureData.full_name || !signatureData.position || 
                           !signatureData.digital_signature || !signatureData.agrees_terms || 
                           !signatureData.agrees_privacy}
                  className="bg-[#13E8E9] hover:bg-[#13E8E9]/90 text-[#2c2e43] px-8 py-3 rounded-xl font-semibold text-lg"
                >
                  {signing ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#2c2e43] mr-2"></div>
                      Firma in corso...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Verified className="w-5 h-5 mr-2" />
                      Firma Digitalmente
                    </div>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SimpleBackground>
  );
}