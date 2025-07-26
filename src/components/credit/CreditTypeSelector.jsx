
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Cpu, 
  Receipt, 
  Building, 
  TrendingUp, 
  GraduationCap, 
  Lightbulb, 
  MapPin,
  ArrowRight,
  Euro,
  Clock,
  FileText, // Added FileText import for DTA
  ShoppingCart // Added ShoppingCart import for the new button
} from "lucide-react";
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function CreditTypeSelector({ onSelectType }) {
  const creditTypes = [
    {
      id: 'superbonus_110',
      title: 'Superbonus 110%',
      description: 'Riqualificazione energetica e sismica degli edifici',
      icon: Home,
      color: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-700',
      amount: 'Fino a €96.000',
      time: '15-30 giorni',
      image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/67b6d113f_9c7a3a5a0b27ce38ef9f99260836aa28.jpg'
    },
    {
      id: 'credito_imposta_40',
      title: 'Credito d\'imposta 4.0',
      description: 'Investimenti in beni strumentali tecnologici 4.0',
      icon: Cpu,
      color: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700',
      amount: 'Fino al 40%',
      time: '10-20 giorni',
      image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/8a4a6ef5f_robotic.jpg'
    },
    {
      id: 'iva_credito',
      title: 'IVA a credito',
      description: 'Compensazioni e rimborsi IVA verso l\'Erario',
      icon: Receipt,
      color: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900 dark:text-purple-200 dark:border-purple-700',
      amount: 'Variabile',
      time: '5-15 giorni',
      image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/879f0ee2e_da8d0313a541f6f8d01fe222a636ec68.jpg'
    },
    {
      id: 'crediti_pa',
      title: 'Crediti verso PA',
      description: 'Fatture verso enti pubblici e amministrazioni',
      icon: Building,
      color: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900 dark:text-orange-200 dark:border-orange-700',
      amount: 'Variabile',
      time: '20-45 giorni',
      image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/a0c0990b7_365f0cd451e2bab46384f0a4b39e42bb.jpg'
    },
    {
      id: 'ace',
      title: 'ACE (Aiuto Crescita Economica)',
      description: 'Deduzione per incremento capitale proprio',
      icon: TrendingUp,
      color: 'bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900 dark:text-indigo-200 dark:border-indigo-700',
      amount: 'Fino al 3.5%',
      time: '15-25 giorni',
      image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/45e6d7dd2_monnthre.jpg'
    },
    {
      id: 'formazione_40',
      title: 'Formazione 4.0',
      description: 'Spese per formazione del personale dipendente',
      icon: GraduationCap,
      color: 'bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-900 dark:text-teal-200 dark:border-teal-700',
      amount: 'Fino al 50%',
      time: '10-20 giorni',
      image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/34bdc917e_37ef483d918d011a3a3785f69b253a16.jpg'
    },
    {
      id: 'ricerca_sviluppo',
      title: 'Ricerca e Sviluppo',
      description: 'Crediti per attività di ricerca industriale',
      icon: Lightbulb,
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700',
      amount: 'Fino al 50%',
      time: '15-30 giorni',
      image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/dea350011_6a0d4e02ade464ef7399a3c693fc252a.jpg'
    },
    {
      id: 'bonus_mezzogiorno',
      title: 'Bonus Mezzogiorno',
      description: 'Investimenti nelle regioni del Sud Italia',
      icon: MapPin,
      color: 'bg-pink-100 text-pink-800 border-pink-200 dark:bg-pink-900 dark:text-pink-200 dark:border-pink-700',
      amount: 'Fino al 45%',
      time: '20-35 giorni',
      image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/9d39fb859_10987776589e28fef49d9f79dd525d22.jpg'
    },
    {
      id: 'dta',
      title: 'DTA (Deferred Tax Assets)',
      description: 'Attività fiscali differite e imposte anticipate',
      icon: FileText,
      color: 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:border-slate-700',
      amount: 'Variabile',
      time: '25-40 giorni',
      image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/52156d1c9_17d312159d1a5be61b88bb3ac8dab849.jpg'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Intro Section */}
      <Card className="border-white/20 shadow-xl bg-white/10 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-white">
            Quale credito vuoi richiedere oggi?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Seleziona la tipologia più adatta alle tue esigenze. I nostri esperti ti guideranno attraverso tutto il processo.
          </p>
        </CardContent>
      </Card>

      {/* Credit Types Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {creditTypes.map((type, index) => (
          <div
            key={index}
            onClick={() => onSelectType(type.id)}
            className="group cursor-pointer"
          >
            <Card className="h-full border-white/20 shadow-xl bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 group-hover:scale-105">
              {type.image && (
                <div className="h-40 overflow-hidden rounded-t-xl">
                  <img 
                    src={type.image} 
                    alt={type.title}
                    className="w-full h-full object-cover transition-transform duration-500"
                  />
                </div>
              )}
              
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-[#13E8E9]/20 rounded-xl flex items-center justify-center">
                      <type.icon className="w-6 h-6 text-[#13E8E9]" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-white group-hover:text-[#13E8E9] transition-colors">
                        {type.title}
                      </CardTitle>
                      <Badge className={`${type.color} border mt-1`}>
                        {type.id.replace(/_/g, ' ')}
                      </Badge>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/70 group-hover:text-[#13E8E9] transition-colors" />
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-white/80 mb-4 text-sm leading-relaxed">
                  {type.description}
                </p>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1 text-[#13E8E9]">
                    <Euro className="w-4 h-4" />
                    <span className="font-medium">{type.amount}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-blue-400">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">{type.time}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <Card className="border-white/20 shadow-xl bg-white/10 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          <h3 className="text-xl font-semibold mb-4 text-white">
            Preferisci acquistare crediti già disponibili?
          </h3>
          <p className="text-white/80 mb-6">
            Esplora il nostro marketplace di crediti fiscali verificati e pronti per l'acquisto immediato.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl('CreditiDisponibili')}>
              <button className="bg-[#13E8E9] hover:bg-[#13E8E9]/90 text-[#2c2e43] px-6 py-3 rounded-xl font-medium transition-colors">
                <ShoppingCart className="w-4 h-4 mr-2 inline" />
                Crediti Disponibili
              </button>
            </Link>
            <Link to={createPageUrl('Contact')}>
              <button className="border border-white/30 text-white hover:bg-white/10 px-6 py-3 rounded-xl font-medium transition-colors backdrop-blur-sm">
                Consulenza Gratuita
              </button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
