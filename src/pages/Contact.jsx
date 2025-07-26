
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Mail, Phone, MapPin, Building, ArrowLeft, Send, Clock, MessageSquare, Users, Headphones } from 'lucide-react';
import SimpleBackground from '../components/background/SimpleBackground';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success', 'error', or null

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      // Simulate API call
      console.log('Sending message:', formData);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate success or failure
      if (Math.random() > 0.1) {// 90% success rate
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

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
                  <div className="inline-flex items-center space-x-2 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full text-xs font-medium text-green-400 mb-2">
                    <MessageSquare className="w-3 h-3" />
                    <span>Supporto Clienti</span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Contattaci
                  </h1>
                  <p className="text-white/90 mt-2 text-lg">
                    Siamo qui per aiutarti con qualsiasi domanda
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl p-6 hover:scale-105 transition-all duration-300 shadow-xl text-center">
              <div className="w-12 h-12 bg-blue-500/25 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-blue-300" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">24h</div>
              <div className="text-sm text-slate-300">Tempo di Risposta</div>
            </div>

            <div className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl p-6 hover:scale-105 transition-all duration-300 shadow-xl text-center">
              <div className="w-12 h-12 bg-green-500/25 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-green-300" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">1.500+</div>
              <div className="text-sm text-slate-300">Clienti Soddisfatti</div>
            </div>

            <div className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl p-6 hover:scale-105 transition-all duration-300 shadow-xl text-center">
              <div className="w-12 h-12 bg-purple-500/25 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Headphones className="w-6 h-6 text-purple-300" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">97%</div>
              <div className="text-sm text-slate-300">Soddisfazione</div>
            </div>

            <div className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl p-6 hover:scale-105 transition-all duration-300 shadow-xl text-center">
              <div className="w-12 h-12 bg-orange-500/25 rounded-xl flex items-center justify-center mx-auto mb-3">
                <MessageSquare className="w-6 h-6 text-orange-300" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">5.000+</div>
              <div className="text-sm text-slate-300">Richieste Risolte</div>
            </div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl">
              <CardHeader className="p-6 border-b border-slate-700/50">
                <CardTitle className="text-white text-xl">Invia un Messaggio</CardTitle>
                <p className="text-white/70">Ti risponderemo entro 24 ore lavorative</p>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-white mb-2">Nome Completo *</label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Mario Rossi"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm h-12 rounded-xl hover:border-white/40 focus:border-[#13E8E9] transition-colors" />

                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white mb-2">Email Aziendale *</label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="mario@azienda.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm h-12 rounded-xl hover:border-white/40 focus:border-[#13E8E9] transition-colors" />

                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">Oggetto *</label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="Richiesta informazioni su Superbonus 110%"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm h-12 rounded-xl hover:border-white/40 focus:border-[#13E8E9] transition-colors" />

                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white mb-2">Messaggio *</label>
                    <Textarea
                      id="message"
                      placeholder="Descrivi dettagliatamente la tua richiesta o domanda. Più informazioni fornisci, più accurata sarà la nostra risposta."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={6}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm rounded-xl hover:border-white/40 focus:border-[#13E8E9] transition-colors resize-none" />

                  </div>
                  
                  <Button
                    type="button"
                    onClick={() => {
                      setFormData({
                        name: '',
                        email: '',
                        subject: '',
                        message: ''
                      });
                      setStatus(null); // Clear status messages on reset
                    }}
                    variant="outline"
                    className="w-full border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white hover:border-slate-600 bg-slate-900/50 backdrop-blur-sm transition-all duration-300 h-12 rounded-xl font-semibold">

                    Reset Campi
                  </Button>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-[#13E8E9] to-[#0ea5e9] hover:from-[#0ea5e9] hover:to-[#13E8E9] text-white h-12 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg">

                    {loading ?
                    <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                        Invio in corso...
                      </div> :

                    <span className="flex items-center justify-center">
                        <Send className="w-5 h-5 mr-2" />
                        Invia Messaggio
                      </span>
                    }
                  </Button>

                  {status === 'success' &&
                  <div className="p-4 bg-green-500/20 border border-green-500/40 rounded-xl">
                      <p className="text-green-300 text-center font-medium">✅ Messaggio inviato con successo! Ti risponderemo entro 24 ore.</p>
                    </div>
                  }
                  {status === 'error' &&
                  <div className="p-4 bg-red-500/20 border border-red-500/40 rounded-xl">
                      <p className="text-red-300 text-center font-medium">❌ Errore durante l'invio. Riprova più tardi o contattaci direttamente.</p>
                    </div>
                  }
                </form>
              </CardContent>
            </Card>

            {/* Contact Info e Other Methods */}
            <div className="space-y-6">
              {/* Contact Info */}
              <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl">
                <CardHeader className="p-6 border-b border-slate-700/50">
                  <CardTitle className="text-white text-xl">Informazioni di Contatto</CardTitle>
                  <p className="text-white/70">I nostri recapiti principali</p>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Building className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">MANAGEMENT E SERVIZI S.R.L.S.</h3>
                      <p className="text-sm text-white/80">P.IVA / CF: 17303971000</p>
                      <p className="text-sm text-white/80">REA: RM-1709794</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Sede Legale</h4>
                      <p className="text-sm text-white/80">Viale Galvano della Volpe 59</p>
                      <p className="text-sm text-white/80">00133 ROMA (RM)</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Email</h4>
                      <p className="text-sm text-white/80">info@creditlyglobal.com</p>
                      <p className="text-sm text-white/80">managmenteservizi@pecimprese.it</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-orange-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Telefono</h4>
                      <p className="text-sm text-white/80">(+39) 06 12345678</p>
                      <p className="text-xs text-white/60">Lun-Ven 9:00-18:00</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl">
                <CardHeader className="p-6 border-b border-slate-700/50">
                  <CardTitle className="text-white text-xl">Altri Metodi di Contatto</CardTitle>
                  <p className="text-white/70">Scegli il canale più adatto alle tue esigenze</p>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <Link to={createPageUrl("SupportCenter")} className="block">
                    <Button variant="outline" className="w-full justify-start h-14 rounded-xl border-slate-600 hover:bg-slate-700/30 text-white bg-slate-700/20 transition-all duration-300 hover:scale-105">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mr-3">
                        <Headphones className="w-5 h-5 text-blue-400" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold">Centro Assistenza</div>
                        <div className="text-sm text-white/70">FAQ e guide complete</div>
                      </div>
                    </Button>
                  </Link>

                  <Button
                    variant="outline"
                    className="w-full justify-start h-14 rounded-xl border-slate-600 hover:bg-slate-700/30 text-white bg-slate-700/20 transition-all duration-300 hover:scale-105"
                    onClick={() => window.open('https://wa.me/390612345678', '_blank')}>

                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mr-3">
                      <MessageSquare className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">WhatsApp Business</div>
                      <div className="text-sm text-white/70">Chat diretta con i nostri esperti</div>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start h-14 rounded-xl border-slate-600 hover:bg-slate-700/30 text-white bg-slate-700/20 transition-all duration-300 hover:scale-105"
                    onClick={() => window.open('tel:+390612345678')}>

                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mr-3">
                      <Phone className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">Chiamata Diretta</div>
                      <div className="text-sm text-white/70">Supporto telefonico immediato</div>
                    </div>
                  </Button>
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card className="bg-black/20 backdrop-blur-lg backdrop-saturate-150 \nborder border-white/10 \nrounded-2xl shadow-lg \ntext-white/80 px-6 py-4\n">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Phone className="w-6 h-6 text-red-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Assistenza Urgente</h3>
                    <p className="text-slate-700 mb-4 text-sm">Per questioni urgenti che richiedono attenzione immediata

                    </p>
                    <Button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl h-12 font-semibold transition-all duration-300 hover:scale-105">
                      <Phone className="w-4 h-4 mr-2" />
                      Chiamata Urgente
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </SimpleBackground>);

}
