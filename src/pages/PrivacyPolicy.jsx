import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Eye, Lock, Database, UserCheck, Mail } from "lucide-react";
import SimpleBackground from "../components/background/SimpleBackground";

export default function PrivacyPolicy() {
  return (
    <SimpleBackground>
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <Link to={createPageUrl("Dashboard")}>
                <Button variant="outline" size="icon" className="rounded-xl border-white/30 hover:bg-white/20 text-white backdrop-blur-sm bg-[#1a1d2e]/80 hover:border-white/40 transition-all duration-300">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Privacy Policy
                </h1>
                <p className="text-white/80 mt-1">
                  Come proteggiamo e utilizziamo i tuoi dati personali
                </p>
              </div>
            </div>
          </div>

          {/* Header Card */}
          <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl mb-8">
            <CardHeader className="p-8 text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-400" />
              </div>
              <CardTitle className="text-2xl font-bold text-white mb-2">
                La tua privacy è importante per noi
              </CardTitle>
              <p className="text-white/80 text-lg">
                Ultimo aggiornamento: 15 Dicembre 2024
              </p>
            </CardHeader>
          </Card>

          <div className="space-y-8">
            {/* Introduzione */}
            <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl">
              <CardHeader className="p-6 border-b border-slate-700/50">
                <CardTitle className="flex items-center space-x-3 text-white">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Eye className="w-5 h-5 text-green-400" />
                  </div>
                  <span>1. Introduzione</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4 text-white/90">
                <p>
                  Creditly Global ("noi", "nostro" o "la Società") rispetta la privacy dei propri utenti 
                  e si impegna a proteggere le informazioni personali che ci vengono fornite.
                </p>
                <p>
                  Questa Privacy Policy descrive come raccogliamo, utilizziamo, conserviamo e proteggiamo 
                  le tue informazioni quando utilizzi la nostra piattaforma per la gestione dei crediti fiscali.
                </p>
              </CardContent>
            </Card>

            {/* Dati Raccolti */}
            <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl">
              <CardHeader className="p-6 border-b border-slate-700/50">
                <CardTitle className="flex items-center space-x-3 text-white">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Database className="w-5 h-5 text-blue-400" />
                  </div>
                  <span>2. Dati che Raccogliamo</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4 text-white/90">
                <div className="space-y-3">
                  <h4 className="font-semibold text-white">2.1 Dati di Registrazione</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Nome e cognome</li>
                    <li>Indirizzo email</li>
                    <li>Numero di telefono</li>
                    <li>Ragione sociale dell'azienda</li>
                    <li>Partita IVA e Codice Fiscale</li>
                    <li>Indirizzo sede legale</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-white">2.2 Dati delle Richieste di Credito</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Documenti fiscali e contabili</li>
                    <li>Informazioni sui progetti finanziati</li>
                    <li>Fatture e preventivi</li>
                    <li>Certificazioni tecniche</li>
                    <li>Corrispondenza con enti pubblici</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-white">2.3 Dati di Utilizzo</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Indirizzo IP</li>
                    <li>Informazioni sul browser e dispositivo</li>
                    <li>Pagine visitate e tempo di permanenza</li>
                    <li>Azioni eseguite sulla piattaforma</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Come Utilizziamo i Dati */}
            <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl">
              <CardHeader className="p-6 border-b border-slate-700/50">
                <CardTitle className="flex items-center space-x-3 text-white">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-purple-400" />
                  </div>
                  <span>3. Come Utilizziamo i Tuoi Dati</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4 text-white/90">
                <p>Utilizziamo le tue informazioni per:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Fornire i nostri servizi:</strong> Elaborare le richieste di credito, valutare i documenti, facilitare le transazioni</li>
                  <li><strong>Comunicazioni:</strong> Inviarti aggiornamenti sulle tue richieste, notifiche importanti, newsletter</li>
                  <li><strong>Compliance:</strong> Rispettare gli obblighi legali e normativi</li>
                  <li><strong>Miglioramento del servizio:</strong> Analizzare l'utilizzo per migliorare la piattaforma</li>
                  <li><strong>Sicurezza:</strong> Prevenire frodi e proteggere la piattaforma</li>
                  <li><strong>Marketing:</strong> Con il tuo consenso, inviarti offerte personalizzate</li>
                </ul>
              </CardContent>
            </Card>

            {/* Condivisione Dati */}
            <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl">
              <CardHeader className="p-6 border-b border-slate-700/50">
                <CardTitle className="flex items-center space-x-3 text-white">
                  <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <Lock className="w-5 h-5 text-orange-400" />
                  </div>
                  <span>4. Condivisione dei Dati</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4 text-white/90">
                <p>Possiamo condividere i tuoi dati con:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Partner commerciali:</strong> Per facilitare le transazioni di crediti</li>
                  <li><strong>Fornitori di servizi:</strong> Che ci aiutano a operare la piattaforma</li>
                  <li><strong>Autorità competenti:</strong> Quando richiesto dalla legge</li>
                  <li><strong>Consulenti professionali:</strong> Avvocati, commercialisti, revisori</li>
                </ul>
                <p className="font-semibold text-white">
                  Non vendiamo mai i tuoi dati personali a terze parti per scopi di marketing.
                </p>
              </CardContent>
            </Card>

            {/* Sicurezza */}
            <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl">
              <CardHeader className="p-6 border-b border-slate-700/50">
                <CardTitle className="flex items-center space-x-3 text-white">
                  <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-red-400" />
                  </div>
                  <span>5. Sicurezza dei Dati</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4 text-white/90">
                <p>Implementiamo misure di sicurezza avanzate per proteggere i tuoi dati:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Crittografia SSL/TLS per tutte le comunicazioni</li>
                  <li>Autenticazione a due fattori (2FA)</li>
                  <li>Backup regolari e sicuri</li>
                  <li>Monitoraggio continuo per attività sospette</li>
                  <li>Accesso limitato ai dati su base "need-to-know"</li>
                  <li>Formazione continua del personale sulla sicurezza</li>
                </ul>
              </CardContent>
            </Card>

            {/* Diritti dell'Utente */}
            <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl">
              <CardHeader className="p-6 border-b border-slate-700/50">
                <CardTitle className="flex items-center space-x-3 text-white">
                  <div className="w-8 h-8 bg-teal-500/20 rounded-lg flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-teal-400" />
                  </div>
                  <span>6. I Tuoi Diritti</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4 text-white/90">
                <p>Secondo il GDPR, hai diritto a:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Accesso:</strong> Richiedere una copia dei tuoi dati personali</li>
                  <li><strong>Rettifica:</strong> Correggere dati inesatti o incompleti</li>
                  <li><strong>Cancellazione:</strong> Richiedere la cancellazione dei tuoi dati</li>
                  <li><strong>Portabilità:</strong> Ricevere i tuoi dati in formato strutturato</li>
                  <li><strong>Opposizione:</strong> Opporti al trattamento per scopi di marketing</li>
                  <li><strong>Limitazione:</strong> Richiedere la limitazione del trattamento</li>
                </ul>
                <p className="mt-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <strong>Come esercitare i tuoi diritti:</strong> Contattaci all'indirizzo 
                  <a href="mailto:privacy@creditlyglobal.com" className="text-blue-400 hover:text-blue-300 ml-1">
                    privacy@creditlyglobal.com
                  </a>
                </p>
              </CardContent>
            </Card>

            {/* Conservazione Dati */}
            <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl">
              <CardHeader className="p-6 border-b border-slate-700/50">
                <CardTitle className="flex items-center space-x-3 text-white">
                  <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                    <Database className="w-5 h-5 text-yellow-400" />
                  </div>
                  <span>7. Conservazione dei Dati</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4 text-white/90">
                <p>Conserviamo i tuoi dati per il tempo necessario a:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Fornire i nostri servizi</li>
                  <li>Rispettare gli obblighi legali (tipicamente 10 anni per i documenti fiscali)</li>
                  <li>Risolvere dispute legali</li>
                  <li>Migliorare i nostri servizi (dati anonimizzati)</li>
                </ul>
                <p className="mt-4 font-semibold text-white">
                  Dopo questo periodo, i dati vengono cancellati o anonimizzati in modo sicuro.
                </p>
              </CardContent>
            </Card>

            {/* Cookie */}
            <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl">
              <CardHeader className="p-6 border-b border-slate-700/50">
                <CardTitle className="flex items-center space-x-3 text-white">
                  <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                    <Eye className="w-5 h-5 text-indigo-400" />
                  </div>
                  <span>8. Cookie e Tecnologie Simili</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4 text-white/90">
                <p>Utilizziamo cookie per:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Cookie essenziali:</strong> Per il funzionamento della piattaforma</li>
                  <li><strong>Cookie analitici:</strong> Per comprendere come utilizzi il sito</li>
                  <li><strong>Cookie di marketing:</strong> Per personalizzare la tua esperienza</li>
                </ul>
                <p className="mt-4 p-4 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                  Puoi gestire le tue preferenze sui cookie nelle impostazioni del tuo browser.
                </p>
              </CardContent>
            </Card>

            {/* Contatti */}
            <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl">
              <CardHeader className="p-6 border-b border-slate-700/50">
                <CardTitle className="flex items-center space-x-3 text-white">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-green-400" />
                  </div>
                  <span>9. Contattaci</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4 text-white/90">
                <p>Per domande su questa Privacy Policy o sui tuoi dati, contattaci:</p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> privacy@creditlyglobal.com</p>
                  <p><strong>Telefono:</strong> +39 02 1234 5678</p>
                  <p><strong>Indirizzo:</strong> Via Roma 123, 20100 Milano (MI)</p>
                  <p><strong>Data Protection Officer:</strong> dpo@creditlyglobal.com</p>
                </div>
              </CardContent>
            </Card>

            {/* Modifiche */}
            <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl">
              <CardHeader className="p-6 border-b border-slate-700/50">
                <CardTitle className="flex items-center space-x-3 text-white">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-purple-400" />
                  </div>
                  <span>10. Modifiche alla Privacy Policy</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4 text-white/90">
                <p>
                  Ci riserviamo il diritto di aggiornare questa Privacy Policy. 
                  Ti informeremo di eventuali modifiche sostanziali tramite:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Notifica via email</li>
                  <li>Banner sulla piattaforma</li>
                  <li>Aggiornamento della data di "ultimo aggiornamento"</li>
                </ul>
                <p className="mt-4 font-semibold text-white">
                  Ti consigliamo di rivedere periodicamente questa pagina per rimanere informato 
                  su come proteggiamo le tue informazioni.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Footer con data */}
          <div className="mt-8 text-center">
            <p className="text-white/60 text-sm">
              Questa Privacy Policy è stata aggiornata il 15 Dicembre 2024
            </p>
          </div>
        </div>
      </div>
    </SimpleBackground>
  );
}