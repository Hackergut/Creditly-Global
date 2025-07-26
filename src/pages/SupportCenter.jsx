
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { LifeBuoy, Mail, Phone, ArrowLeft, Search, ChevronDown, HelpCircle, ArrowRight, LayoutList, CreditCard, FileText, Handshake, Receipt, ScrollText, Briefcase } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import SimpleBackground from '../components/background/SimpleBackground';

export default function SupportCenter() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openFAQ, setOpenFAQ] = useState(null);
  // Add state for status and type filters, as implied by the reset button's onClick
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const faqs = [
  {
    question: 'Come posso richiedere un credito?',
    answer: 'Per richiedere un credito, vai alla pagina "Richiedi Credito", seleziona la tipologia di credito più adatta e compila il modulo con tutte le informazioni e i documenti richiesti.',
    category: 'Credito e Finanziamenti'
  },
  {
    question: 'Quali sono i tempi di approvazione?',
    answer: 'I tempi di approvazione variano a seconda del tipo di credito. In genere, le richieste vengono processate entro 15-30 giorni. Puoi monitorare lo stato della tua richiesta dalla Dashboard.',
    category: 'Procedura di Richiesta'
  },
  {
    question: 'Quali documenti sono necessari?',
    answer: 'I documenti necessari dipendono dal tipo di credito. Ogni modulo di richiesta elenca specificamente i documenti richiesti, come visure catastali, fatture, bilanci, ecc.',
    category: 'Documentazione'
  },
  {
    question: 'Come posso contattare il supporto diretto?',
    answer: 'Puoi contattare il nostro team di supporto tramite la pagina "Contatti", utilizzando il form apposito, oppure scrivendo una mail a supporto@creditly.global.',
    category: 'Supporto Clienti'
  },
  {
    question: 'Posso richiedere più di un credito contemporaneamente?',
    answer: 'Sì, è possibile richiedere più crediti contemporaneamente, ma ogni richiesta sarà valutata individualmente e potrebbe richiedere documentazione separata.',
    category: 'Credito e Finanziamenti'
  },
  {
    question: 'Cosa succede se la mia richiesta viene rifiutata?',
    answer: 'In caso di rifiuto, ti forniremo una motivazione e, se possibile, suggerimenti su come migliorare una futura richiesta o alternative disponibili.',
    category: 'Procedura di Richiesta'
  },
  {
    question: 'C\'è un limite massimo all\'importo richiedibile?',
    answer: 'Il limite massimo dipende dal tipo di credito e dalla tua capacità finanziaria. Maggiori dettagli sono disponibili nelle schede prodotto di ogni credito.',
    category: 'Credito e Finanziamenti'
  }];


  const quickActions = [
  { icon: FileText, title: 'Invia una richiesta', description: 'Avvia una nuova pratica', color: 'bg-[#13E8E9]/20 text-[#13E8E9]' },
  { icon: Receipt, title: 'Stato richieste', description: 'Controlla l\'avanzamento', color: 'bg-indigo-500/20 text-indigo-400' },
  { icon: Handshake, title: 'Parla con un consulente', description: 'Ottieni supporto personalizzato', color: 'bg-green-500/20 text-green-400' },
  { icon: LifeBuoy, title: 'Domande Frequenti', description: 'Trova risposte rapide', color: 'bg-amber-500/20 text-amber-400' }];


  const faqCategories = [
  { icon: CreditCard, title: 'Credito e Finanziamenti', description: 'Domande su prestiti, mutui e finanziamenti.', count: faqs.filter((f) => f.category === 'Credito e Finanziamenti').length, color: 'bg-[#13E8E9]/20 text-[#13E8E9]' },
  { icon: ScrollText, title: 'Procedura di Richiesta', description: 'Passaggi per richiedere, monitorare e ottenere.', count: faqs.filter((f) => f.category === 'Procedura di Richiesta').length, color: 'bg-purple-500/20 text-purple-400' },
  { icon: Briefcase, title: 'Documentazione', description: 'Tutto sui documenti necessari.', count: faqs.filter((f) => f.category === 'Documentazione').length, color: 'bg-rose-500/20 text-rose-400' },
  { icon: LayoutList, title: 'Supporto Clienti', description: 'Come contattarci e ottenere aiuto.', count: faqs.filter((f) => f.category === 'Supporto Clienti').length, color: 'bg-emerald-500/20 text-emerald-400' }];


  const filteredFAQs = faqs.filter((faq) =>
  faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
  faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SimpleBackground>
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <Link to={createPageUrl("Dashboard")}>
                <Button variant="outline" size="icon" className="rounded-xl border-white/30 hover:bg-white/20 text-white backdrop-blur-sm bg-[#1a1d2e]/80 hover:border-white/40 transition-all duration-300">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-[#13E8E9]/20 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm border border-white/20">
                  <img
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/03d2053c2_JJJJ.png"
                    alt="Creditly Global"
                    className="w-10 h-10 rounded-lg"
                  />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Centro Assistenza
                  </h1>
                  <p className="text-white/90 mt-2 text-lg">
                    Trova le risposte alle tue domande
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar con luminosità aumentata */}
          <Card className="border-2 border-slate-700/60 shadow-xl bg-slate-800/30 backdrop-filter backdrop-blur-12px mb-8">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Cerca nelle domande frequenti..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 text-lg h-14 bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm" />

              </div>
              {/* Reset Filtri button */}
              <div className="mt-4 flex justify-end">
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                    setTypeFilter("all");
                  }}
                  variant="outline"
                  className="border-slate-700 text-slate-400 hover:bg-slate-800/50 hover:text-white hover:border-slate-600 bg-slate-900/50 backdrop-blur-sm transition-all duration-300">
                  Reset Filtri
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions con luminosità aumentata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {quickActions.map((action, index) =>
            <Card key={index} className="border-2 border-slate-700/60 shadow-xl bg-slate-800/30 backdrop-filter backdrop-blur-12px hover:bg-slate-800/40 transition-all duration-300 group cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <action.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{action.title}</h3>
                  <p className="text-white/70 text-sm">{action.description}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* FAQ Categories con luminosità aumentata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {faqCategories.map((category, index) => (
              <Card key={index} className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl hover:bg-slate-800/40 transition-all duration-300 group">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center`}>
                      <category.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{category.title}</h3>
                      <Badge className="bg-white/20 text-white/70 border-0 text-xs">
                        {category.count} FAQ
                      </Badge>
                    </div>
                  </div>
                  <p className="text-white/70 text-sm mb-4 flex-grow">{category.description}</p>
                  {category.title === 'Credito e Finanziamenti' ? (
                    <Link to={createPageUrl("MarketplaceCrediti")}>
                      <Button
                        variant="outline"
                        size="sm" 
                        className="w-full border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white hover:border-slate-600 bg-slate-900/50 backdrop-blur-sm transition-all duration-300 h-10 px-4 py-2 rounded-lg mt-auto"
                      >
                        Esplora
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  ) : category.title === 'Procedura di Richiesta' ? (
                    <Link to={createPageUrl("Dashboard")}>
                      <Button
                        variant="outline"
                        size="sm" 
                        className="w-full border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white hover:border-slate-600 bg-slate-900/50 backdrop-blur-sm transition-all duration-300 h-10 px-4 py-2 rounded-lg mt-auto"
                      >
                        Esplora
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  ) : category.title === 'Documentazione' ? (
                    <Link to={createPageUrl("GuidaCrediti")}>
                      <Button
                        variant="outline"
                        size="sm" 
                        className="w-full border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white hover:border-slate-600 bg-slate-900/50 backdrop-blur-sm transition-all duration-300 h-10 px-4 py-2 rounded-lg mt-auto"
                      >
                        Esplora
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  ) : (
                    <Link to={createPageUrl("Contact")}>
                      <Button
                        variant="outline"
                        size="sm" 
                        className="w-full border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white hover:border-slate-600 bg-slate-900/50 backdrop-blur-sm transition-all duration-300 h-10 px-4 py-2 rounded-lg mt-auto"
                      >
                        Esplora
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ Section con luminosità aumentata */}
          <Card className="border-2 border-slate-700/60 shadow-xl bg-slate-800/30 backdrop-filter backdrop-blur-12px mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <HelpCircle className="w-6 h-6 mr-2" />
                Domande Frequenti
              </CardTitle>
              <p className="text-white/70">Le risposte alle domande più comuni</p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {filteredFAQs.length > 0 ?
                filteredFAQs.map((faq, index) =>
                <Card key={index} className="border-white/20 bg-white/5 backdrop-blur-sm">
                      <CardContent className="p-0">
                        <Button
                      variant="ghost"
                      className="w-full p-4 justify-between hover:bg-white/5 text-white"
                      onClick={() => setOpenFAQ(openFAQ === index ? null : index)}>

                          <span className="text-left font-medium">{faq.question}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${openFAQ === index ? 'rotate-180' : ''}`} />
                        </Button>
                        {openFAQ === index &&
                    <div className="px-4 pb-4 text-white/80 leading-relaxed">
                            {faq.answer}
                          </div>
                    }
                      </CardContent>
                    </Card>
                ) :

                <p className="text-white/70 text-center">Nessuna domanda frequente trovata per "{searchTerm}".</p>
                }
              </div>
            </CardContent>
          </Card>

          {/* Contact Support con luminosità aumentata */}
          <Card className="border-2 border-slate-700/60 shadow-xl bg-slate-800/30 backdrop-filter backdrop-blur-12px">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-semibold text-white mb-4">
                Non hai trovato quello che cerchi?
              </h3>
              <p className="text-white/80 mb-6">
                Il nostro team di supporto è qui per aiutarti con qualsiasi domanda
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={createPageUrl("Contact")}>
                  <Button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary hover:bg-primary/90 h-10 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-medium transition-colors">
                    <Mail className="w-4 h-4 mr-2" />
                    Contatta il Supporto
                  </Button>
                </Link>
                <Button variant="outline" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border bg-slate-800 text-slate-300 hover:text-slate-100 hover:bg-slate-700 border-slate-700 backdrop-blur-sm h-10 px-4 py-2\n">
                  <Phone className="w-4 h-4 mr-2" />
                  Chiamaci
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SimpleBackground>);

}
