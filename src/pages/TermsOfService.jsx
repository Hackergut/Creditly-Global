import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft } from 'lucide-react';
import SimpleBackground from '../components/background/SimpleBackground';

export default function TermsOfService() {
  return (
    <SimpleBackground>
      <div className="min-h-screen py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-8">
              <Link to={createPageUrl("Dashboard")}>
                <Button variant="outline" size="icon" className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border hover:text-accent-foreground h-10 w-10 rounded-xl border-white/30 hover:bg-white/20 text-white backdrop-blur-sm bg-[#1a1d2e]/80 hover:border-white/40 transition-all duration-300">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-white">Termini di Servizio</h1>
                <p className="text-white/70 mt-1">Ultimo aggiornamento: 25 Luglio 2024</p>
              </div>
          </div>
          
          <Card className="border-white/20 shadow-xl bg-white/10 backdrop-blur-sm">
            <CardContent className="p-6 md:p-8 space-y-6 text-white/80 prose prose-invert max-w-none">
              <h2 className="text-white">1. Accettazione dei Termini</h2>
              <p>Utilizzando la piattaforma Creditly Global ("Piattaforma"), accetti di essere vincolato da questi Termini di Servizio ("Termini"). Se non sei d'accordo con questi Termini, non puoi utilizzare la Piattaforma. Questi Termini sono stipulati tra te e MANAGEMENT E SERVIZI S.R.L.S.</p>
              
              <h2 className="text-white">2. Descrizione del Servizio</h2>
              <p>Creditly Global fornisce una piattaforma software per la gestione automatizzata e la consulenza relativa ai crediti fiscali aziendali. I servizi non costituiscono consulenza legale o fiscale definitiva, che deve essere ottenuta da professionisti qualificati.</p>
              
              <h2 className="text-white">3. Obblighi dell'Utente</h2>
              <p>L'utente si impegna a:</p>
              <ul className="list-disc pl-6">
                <li>Fornire informazioni veritiere, accurate e complete durante la registrazione e l'utilizzo della Piattaforma.</li>
                <li>Mantenere la sicurezza delle proprie credenziali di accesso.</li>
                <li>Utilizzare la Piattaforma in conformità con le leggi vigenti.</li>
                <li>Non caricare documenti o dati illeciti, falsi o che violino i diritti di terzi.</li>
              </ul>

              <h2 className="text-white">4. Limitazione di Responsabilità</h2>
              <p>MANAGEMENT E SERVIZI S.R.L.S. non sarà responsabile per eventuali danni diretti o indiretti derivanti dall'uso o dall'impossibilità di usare la Piattaforma. La correttezza dei dati inseriti e la decisione finale sulla gestione dei crediti restano responsabilità dell'utente e dei suoi consulenti.</p>

              <h2 className="text-white">5. Proprietà Intellettuale</h2>
              <p>Tutti i contenuti, i marchi e il software presenti sulla Piattaforma sono di proprietà esclusiva di MANAGEMENT E SERVIZI S.R.L.S. e sono protetti dalle leggi sul diritto d'autore e sulla proprietà intellettuale.</p>

              <h2 className="text-white">6. Modifiche ai Termini</h2>
              <p>Ci riserviamo il diritto di modificare questi Termini in qualsiasi momento. Le modifiche saranno efficaci dalla loro pubblicazione sulla Piattaforma. L'uso continuato della Piattaforma dopo tali modifiche costituisce accettazione dei nuovi Termini.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </SimpleBackground>);

}