
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ArrowLeft,
  ShoppingCart,
  Search,
  Filter,
  TrendingUp,
  Euro,
  Calendar,
  Building,
  Home,
  Cpu,
  Receipt,
  MapPin,
  Star,
  Eye,
  Heart,
  Share2,
  AlertCircle,
  FileText,
  Plus,
  CheckCircle,
  Shield,
  ArrowRight,
  Zap,
  Lightbulb,
  GraduationCap,
  Sparkles
} from "lucide-react";
import { format } from "date-fns";
import { it } from "date-fns/locale";

export default function MarketplaceCrediti() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [activeTab, setActiveTab] = useState("compra");
  const [stats, setStats] = useState({
    totalVolume: 0,
    averageDiscount: 0,
    activeSellers: 0,
    averageTime: 0
  });

  useEffect(() => {
    loadListings();
  }, []);

  const loadListings = async () => {
    try {
      const data = await CreditListing.filter({ status: 'active' }, '-created_date');
      setListings(data);

      // Calcola statistiche reali
      if (data.length > 0) {
        const totalVolume = data.reduce((sum, item) => sum + (item.amount || 0), 0);
        const totalDiscount = data.reduce((sum, item) => sum + (item.discount_rate || 0), 0);
        const uniqueSellers = new Set(data.map((item) => item.seller_company)).size;

        setStats({
          totalVolume,
          averageDiscount: data.length > 0 ? (totalDiscount / data.length).toFixed(1) : 0,
          activeSellers: uniqueSellers,
          averageTime: 7
        });
      } else {
        setStats({
          totalVolume: 0,
          averageDiscount: 0,
          activeSellers: 0,
          averageTime: 0
        });
      }
    } catch (error) {
      console.error("Error loading listings:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredListings = listings.filter((listing) => {
    const matchesSearch = !searchTerm ||
      listing.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.seller_company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getCreditTypeLabel(listing.type).toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = selectedType === "all" || listing.type === selectedType;

    let matchesPrice = true;
    if (priceRange !== "all") {
      const price = listing.final_price || 0;
      switch (priceRange) {
        case "0-25000":
          matchesPrice = price <= 25000;
          break;
        case "25000-50000":
          matchesPrice = price > 25000 && price <= 50000;
          break;
        case "50000-100000":
          matchesPrice = price > 50000 && price <= 100000;
          break;
        case "100000+":
          matchesPrice = price > 100000;
          break;
      }
    }

    return matchesSearch && matchesType && matchesPrice;
  });

  // Funzione per gestire la ricerca
  const handleSearch = () => {
    // Scorri automaticamente alla sezione dei risultati
    const resultsSection = document.getElementById('search-results');
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Gestisci Enter nella barra di ricerca
  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Crediti disponibili per acquisto
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
      description: 'Attività fiscali differite da perdite fiscali',
      icon: FileText,
      color: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700',
      amount: 'Variabile',
      time: '30-45 giorni',
      image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/2dccc0162_78c9f6831938cbbb038d0d708f47ac32.jpg'
    }
  ];


  const getCreditTypeIcon = (type) => {
    const icons = {
      'superbonus_110': Home,
      'credito_imposta_40': Cpu,
      'iva_credito': Receipt,
      'crediti_pa': Building,
      'bonus_mezzogiorno': MapPin,
      'formazione_40': GraduationCap,
      'dta': FileText,
      'ace': TrendingUp,
      'ricerca_sviluppo': Lightbulb
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
      'dta': 'DTA',
      'ace': 'ACE',
      'ricerca_sviluppo': 'Ricerca e Sviluppo'
    };
    return labels[type] || type;
  };

  const getCreditTypeColor = (type) => {
    const colors = {
      'superbonus_110': 'bg-green-100 text-green-800',
      'credito_imposta_40': 'bg-blue-100 text-blue-800',
      'iva_credito': 'bg-purple-100 text-purple-800',
      'crediti_pa': 'bg-orange-100 text-orange-800',
      'bonus_mezzogiorno': 'bg-pink-100 text-pink-800',
      'formazione_40': 'bg-teal-100 text-teal-800',
      'dta': 'bg-gray-100 text-gray-800',
      'ace': 'bg-indigo-100 text-indigo-800',
      'ricerca_sviluppo': 'bg-yellow-100 text-yellow-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
      </div>);

  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header con stile moderno della Dashboard */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center space-x-2 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full text-xs font-medium text-green-400 mb-4">
                <Sparkles className="w-3 h-3" />
                <span>Marketplace</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
                Marketplace Crediti
              </h1>
              <p className="text-slate-400 text-lg">
                Acquista e vendi crediti fiscali in modo sicuro e trasparente
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <Badge className="bg-green-500/20 text-green-400 border-0 px-4 py-2 text-sm font-semibold">
                {listings.length} Crediti Disponibili
              </Badge>
            </div>
          </div>
        </div>

        {/* Comandi Principali con luminosità aumentata */}
        <div className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl p-6 mb-8 shadow-xl">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setActiveTab("compra")}
              className={`px-8 py-3 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg ${activeTab === "compra" ?
                "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700" :
                "bg-slate-800 text-slate-300 border border-slate-600 hover:bg-slate-700 hover:text-white"}`
              }>

              <ShoppingCart className="w-5 h-5 mr-2" />
              Compra Crediti
            </Button>

            <Button
              onClick={() => setActiveTab("vendi")}
              className={`px-8 py-3 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg ${activeTab === "vendi" ?
                "bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700" :
                "bg-slate-800 text-slate-300 border border-slate-600 hover:bg-slate-700 hover:text-white"}`
              }>

              <Plus className="w-5 h-5 mr-2" />
              Vendi Crediti
            </Button>
          </div>
        </div>

        {/* Barra di Ricerca con luminosità aumentata */}
        {activeTab === "compra" &&
          <div className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl p-6 mb-8 shadow-xl">
            <div className="flex items-center space-x-2 mb-4">
              <Search className="w-5 h-5 text-green-300" />
              <h3 className="text-lg font-semibold text-white">Trova il Credito Perfetto</h3>
            </div>
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Cerca crediti, località, aziende..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleSearchKeyPress}
                  className="pl-12 pr-4 bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 text-lg h-14 rounded-xl hover:border-slate-500 focus:border-green-400 transition-colors" />

              </div>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="bg-slate-800/50 border-slate-600/50 text-white h-14 rounded-xl hover:border-slate-500 focus:border-green-400 transition-colors">
                  <SelectValue placeholder="Tipo di credito" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900/95 backdrop-blur-sm border-slate-700">
                  <SelectItem value="all" className="text-white hover:bg-slate-800">Tutti i tipi</SelectItem>
                  {creditTypes.map((type) =>
                    <SelectItem key={type.id} value={type.id} className="text-white hover:bg-slate-800">
                      {type.title}
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>

              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="bg-slate-800/50 border-slate-600/50 text-white h-14 rounded-xl hover:border-slate-500 focus:border-green-400 transition-colors">
                  <SelectValue placeholder="Fascia di prezzo" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900/95 backdrop-blur-sm border-slate-700">
                  <SelectItem value="all" className="text-white hover:bg-slate-800">Tutte le fasce</SelectItem>
                  <SelectItem value="0-25000" className="text-white hover:bg-slate-800">€0 - €25.000</SelectItem>
                  <SelectItem value="25000-50000" className="text-white hover:bg-slate-800">€25.000 - €50.000</SelectItem>
                  <SelectItem value="50000-100000" className="text-white hover:bg-slate-800">€50.000 - €100.000</SelectItem>
                  <SelectItem value="100000+" className="text-white hover:bg-slate-800">€100.000+</SelectItem>
                </SelectContent>
              </Select>

              <Button
                onClick={handleSearch}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-xl h-14">
                <Search className="w-4 h-4 mr-2" />
                Cerca
              </Button>

              <Button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedType("all");
                  setPriceRange("all");
                }}
                variant="outline" className="bg-slate-800 text-slate-50 px-4 py-2 text-sm font-medium disabled:opacity- inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-80 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border h-10 border-slate-600 hover:bg-slate-700 hover:text-white rounded-lg">


                Reset
              </Button>
            </div>

            {/* Risultati di ricerca in tempo reale */}
            {searchTerm &&
              <div className="mt-4 text-sm text-slate-400">
                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full border border-green-500/30">
                  {filteredListings.length} risultati per "{searchTerm}"
                </span>
              </div>
            }
          </div>
        }

        {/* Market Stats con luminosità aumentata */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl p-6 hover:scale-105 transition-all duration-300 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-300 mb-2">Volume Totale</p>
                <p className="text-2xl font-bold text-white">€{stats.totalVolume.toLocaleString('it-IT')}</p>
              </div>
              <div className="w-12 h-12 bg-green-500/25 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <TrendingUp className="w-6 h-6 text-green-300" />
              </div>
            </div>
          </div>

          <div className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl p-6 hover:scale-105 transition-all duration-300 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-300 mb-2">Sconto Medio</p>
                <p className="text-2xl font-bold text-green-300">{stats.averageDiscount}%</p>
              </div>
              <div className="w-12 h-12 bg-green-500/25 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Euro className="w-6 h-6 text-green-300" />
              </div>
            </div>
          </div>

          <div className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl p-6 hover:scale-105 transition-all duration-300 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-300 mb-2">Venditori Attivi</p>
                <p className="text-2xl font-bold text-blue-300">{stats.activeSellers}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/25 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Building className="w-6 h-6 text-blue-300" />
              </div>
            </div>
          </div>

          <div className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl p-6 hover:scale-105 transition-all duration-300 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-300 mb-2">Tempo Medio</p>
                <p className="text-2xl font-bold text-orange-300">{stats.averageTime} giorni</p>
              </div>
              <div className="w-12 h-12 bg-orange-500/25 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Calendar className="w-6 h-6 text-orange-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Contenuto Tabs */}
        <div className="w-full">
          {/* Tab Compra */}
          {activeTab === "compra" &&
            <div className="space-y-8">
              {/* Lista Crediti con ID per scroll */}
              <div id="search-results" className="grid gap-6">
                {filteredListings.length > 0 ?
                  <>
                    {/* Header risultati */}
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold text-white">
                        Crediti Disponibili
                      </h2>
                      <Badge className="bg-slate-800/50 text-white border-0 px-4 py-2">
                        {filteredListings.length} {filteredListings.length === 1 ? 'Credito' : 'Crediti'}
                      </Badge>
                    </div>

                    {/* Lista crediti con luminosità aumentata */}
                    {filteredListings.map((listing) => {
                      const IconComponent = getCreditTypeIcon(listing.type);
                      return (
                        <div key={listing.id} className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl hover:scale-[1.02] transition-all duration-300 overflow-hidden shadow-xl">
                          {listing.images && listing.images.length > 0 &&
                            <div className="h-48 overflow-hidden relative">
                              <img
                                src={listing.images[0]}
                                alt={listing.title}
                                className="w-full h-full object-cover" />

                              <div className="absolute top-4 left-4">
                                <Badge className={`${getCreditTypeColor(listing.type)} border-0`}>
                                  <IconComponent className="w-3 h-3 mr-1" />
                                  {getCreditTypeLabel(listing.type)}
                                </Badge>
                              </div>
                              <div className="absolute top-4 right-4 flex space-x-2">
                                {listing.verified &&
                                  <Badge className="bg-green-500/90 text-white border-0">
                                    Verificato
                                  </Badge>
                                }
                                <Button variant="ghost" size="icon" className="bg-slate-800/50 hover:bg-slate-800/70 text-white backdrop-blur-sm">
                                  <Heart className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          }

                          <div className="p-6">
                            <h3 className="font-semibold text-white mb-2 line-clamp-2">
                              {listing.title}
                            </h3>

                            <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                              {listing.description}
                            </p>

                            <div className="space-y-3 mb-4">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-400">Valore Nominale</span>
                                <span className="font-semibold text-white">€{listing.amount?.toLocaleString('it-IT')}</span>
                              </div>

                              <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-400">Sconto</span>
                                <span className="font-semibold text-red-400">-{listing.discount_rate}%</span>
                              </div>

                              <div className="flex justify-between items-center pt-2 border-t border-slate-700/50">
                                <span className="text-sm font-medium text-white">Prezzo Finale</span>
                                <span className="text-xl font-bold text-green-400">€{listing.final_price?.toLocaleString('it-IT')}</span>
                              </div>
                            </div>

                            <div className="space-y-2 mb-4">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-400">Venditore</span>
                                <span className="text-white">{listing.seller_company}</span>
                              </div>

                              <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-400">Scadenza</span>
                                <span className="text-white">{format(new Date(listing.expires_at), 'dd MMM yyyy', { locale: it })}</span>
                              </div>
                            </div>

                            <div className="flex space-x-2">
                              <Link to={createPageUrl(`AcquistaCrediti?credit_id=${listing.id}`)} className="flex-1">
                                <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl">
                                  <ShoppingCart className="w-4 h-4 mr-2" />
                                  Acquista Ora
                                </Button>
                              </Link>
                              <Button variant="outline" size="icon" className="border-slate-600 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="icon" className="border-slate-600 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl">
                                <Share2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>);

                    })}
                  </> : (

                    /* Messaggio quando non ci sono risultati di ricerca */
                    searchTerm &&
                    <div className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl">
                      <div className="p-12 text-center">
                        <Search className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">
                          Nessun risultato trovato
                        </h3>
                        <p className="text-slate-400 mb-6">
                          Non abbiamo trovato crediti che corrispondono alla tua ricerca "{searchTerm}".
                        </p>
                        <Button
                          onClick={() => {
                            setSearchTerm("");
                            setSelectedType("all");
                            setPriceRange("all");
                          }}
                          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl">

                          Mostra tutti i crediti
                        </Button>
                      </div>
                    </div>)

                }
              </div>

              {/* Sezione Crediti Su Richiesta con glass effect */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">Richiedi Nuovo Credito</h2>
                  <Badge className="bg-blue-500/20 text-blue-400 border-0 px-3 py-1">
                    Su Misura
                  </Badge>
                </div>

                <div className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl mb-8 shadow-xl">
                  <div className="p-8 text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">
                      Quale credito vuoi richiedere oggi?
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto mb-8">
                      Seleziona la tipologia più adatta alle tue esigenze. I nostri esperti ti guideranno attraverso tutto il processo.
                    </p>
                  </div>
                </div>

                {/* Credit Types Grid con glass effect */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {creditTypes.map((type, index) =>
                    <Link key={index} to={createPageUrl(`CreditRequest?type=${type.id}`)}>
                      <div className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl h-full hover:scale-105 transition-all duration-300 group cursor-pointer overflow-hidden shadow-xl">
                        {type.image &&
                          <div className="h-40 overflow-hidden">
                            <img
                              src={type.image}
                              alt={type.title}
                              className="w-full h-full object-cover transition-transform duration-500" />

                          </div>
                        }

                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-green-500/25 rounded-xl flex items-center justify-center">
                                <type.icon className="w-6 h-6 text-green-400" />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-white group-hover:text-green-400 transition-colors">
                                  {type.title}
                                </h3>
                                <Badge className={`${type.color} border mt-1`}>
                                  {type.id.replace(/_/g, ' ')}
                                </Badge>
                              </div>
                            </div>
                            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-green-400 transition-colors" />
                          </div>

                          <p className="text-slate-400 mb-4 text-sm leading-relaxed">
                            {type.description}
                          </p>

                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-1 text-green-400">
                              <Euro className="w-4 h-4" />
                              <span className="font-medium">{type.amount}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-blue-400">
                              <Calendar className="w-4 h-4" />
                              <span className="font-medium">{type.time}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )}
                </div>

                {/* Action Buttons con glass effect */}
                <div className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl">
                  <div className="p-8 text-center">
                    <h3 className="text-xl font-semibold mb-4 text-white">
                      Hai bisogno di supporto?
                    </h3>
                    <p className="text-slate-400 mb-6">
                      I nostri esperti sono qui per aiutarti a trovare il credito più adatto alle tue esigenze.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link to={createPageUrl('Contact')}>
                        <Button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary hover:bg-primary/90 h-10 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-medium transition-colors">
                          Consulenza Gratuita
                        </Button>
                      </Link>
                      <Link to={createPageUrl('SupportCenter')}>
                        <Button variant="outline" className="bg-slate-800 text-slate-50 px-4 py-2 text-sm font-medium disabled:opacity- inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-80 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border h-10 border-slate-600 hover:bg-slate-700 hover:text-white rounded-lg">
                          Centro Assistenza
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }

          {/* Tab Vendi con glass effect */}
          {activeTab === "vendi" &&
            <div className="space-y-8">
              {/* Widget Vendita Principale */}
              <div className="backdrop-filter backdrop-blur-12px bg-gradient-to-br from-green-500/15 to-green-600/15 border-2 border-green-500/25 rounded-2xl overflow-hidden relative hover:scale-[1.02] transition-all duration-300 shadow-xl">
                <div className="p-8 text-center text-white">
                  <div className="w-20 h-20 bg-green-500/25 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Plus className="w-10 h-10 text-green-400" />
                  </div>

                  <h2 className="text-2xl font-bold mb-4">
                    Vendi i Tuoi Crediti
                  </h2>

                  <p className="text-slate-300 mb-6 leading-relaxed">
                    Monetizza i tuoi crediti fiscali nel marketplace più grande d'Italia. Valutazione gratuita e trasparente.
                  </p>

                  <div className="space-y-3 mb-8 text-sm">
                    <div className="flex items-center justify-center space-x-2">
                      <CheckCircle className="w-5 h-5" />
                      <span>Valutazione gratuita in 24 ore</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <Shield className="w-5 h-5" />
                      <span>Transazioni sicure e garantite</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <TrendingUp className="w-5 h-5" />
                      <span>Migliori prezzi di mercato</span>
                    </div>
                  </div>

                  <Link to={createPageUrl("VendiCrediti")}>
                    <Button className="w-full bg-white hover:bg-slate-100 text-slate-900 font-semibold rounded-xl py-4 mb-4">
                      <Plus className="w-5 h-5 mr-2" />
                      Inizia a Vendere
                    </Button>
                  </Link>

                  <div className="grid grid-cols-3 gap-4 text-center text-sm pt-4 border-t border-white/30">
                    <div>
                      <div className="font-bold text-lg">€50M+</div>
                      <div className="text-white/80">Processati</div>
                    </div>
                    <div>
                      <div className="font-bold text-lg">500+</div>
                      <div className="text-white/80">Clienti</div>
                    </div>
                    <div>
                      <div className="font-bold text-lg">24h</div>
                      <div className="text-white/80">Risposta</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Come Funziona con glass effect */}
              <div className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl">
                <div className="p-6 border-b border-slate-700/50">
                  <h3 className="text-xl font-semibold text-white flex items-center">
                    <Lightbulb className="w-5 h-5 mr-2" />
                    Come Funziona
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-green-500/25 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-green-400 font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Carica i Documenti</h4>
                        <p className="text-slate-400 text-sm">Invia la documentazione del tuo credito per la valutazione gratuita.</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-green-500/25 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-green-400 font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Ricevi l'Offerta</h4>
                        <p className="text-slate-400 text-sm">I nostri esperti analizzano il credito e ti propongono il miglior prezzo.</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-green-500/25 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-green-400 font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Concludi la Vendita</h4>
                        <p className="text-slate-400 text-sm">Accetta l'offerta e ricevi il pagamento in modo sicuro e rapido.</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-700/50">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-slate-800/30 rounded-lg p-4">
                        <div className="text-2xl font-bold text-green-400">95%</div>
                        <div className="text-xs text-slate-400">Tasso di Successo</div>
                      </div>
                      <div className="bg-slate-800/30 rounded-lg p-4">
                        <div className="text-2xl font-bold text-green-400">48h</div>
                        <div className="text-xs text-slate-400">Tempo Medio</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tipi di Crediti Accettati con glass effect */}
              <div className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl">
                <div className="p-6 border-b border-slate-700/50">
                  <h3 className="text-xl font-semibold text-white">Tipi di Crediti che Accettiamo</h3>
                </div>
                <div className="p-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {creditTypes.slice(0, 8).map((type, index) =>
                      <div key={index} className="bg-slate-800/20 rounded-lg p-4 text-center hover:bg-slate-800/30 transition-all duration-300">
                        <div className="w-12 h-12 bg-green-500/25 rounded-lg flex items-center justify-center mx-auto mb-3">
                          <type.icon className="w-6 h-6 text-green-400" />
                        </div>
                        <h4 className="font-semibold text-white text-sm mb-1">{type.title}</h4>
                        <p className="text-slate-400 text-xs">{type.amount}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* FAQ or Support Section con glass effect */}
              <div className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl">
                <div className="p-8 text-center">
                  <h3 className="text-xl font-semibold mb-4 text-white">
                    Hai domande sulla vendita?
                  </h3>
                  <p className="text-slate-400 mb-6">
                    Il nostro team è sempre disponibile per rispondere ai tuoi dubbi e guidarti nel processo.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to={createPageUrl('Contact')}>
                      <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-medium">
                        Contatta un Esperto
                      </Button>
                    </Link>
                    <Link to={createPageUrl('SupportCenter')}>
                      <Button variant="outline" className="bg-slate-800 text-slate-50 px-4 py-2 text-sm font-medium disabled:opacity- inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-80 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border h-10 border-slate-600 hover:bg-slate-700 hover:text-white rounded-lg">
                        FAQ Vendita
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>);
}
