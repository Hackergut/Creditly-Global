import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { CreditListing } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ArrowLeft,
  FileText,
  ShoppingCart,
  Search,
  Filter,
  Plus,
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
  TrendingUp,
  Store,
  CheckCircle,
  Shield
} from "lucide-react";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import SimpleBackground from "../components/background/SimpleBackground";

export default function CreditiDisponibili() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  useEffect(() => {
    loadListings();
  }, []);

  const loadListings = async () => {
    try {
      // Filtra solo i crediti di Creditly Global
      const allData = await CreditListing.filter({ status: 'active' }, '-created_date');
      const creditlyData = allData.filter(item => 
        item.seller_company && item.seller_company.includes('Creditly Global')
      );
      
      setListings(creditlyData);
    } catch (error) {
      console.error("Error loading listings:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.description?.toLowerCase().includes(searchTerm.toLowerCase());
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

  const getCreditTypeColor = (type) => {
    const colors = {
      'superbonus_110': 'bg-green-100 text-green-800',
      'credito_imposta_40': 'bg-blue-100 text-blue-800',
      'iva_credito': 'bg-purple-100 text-purple-800',
      'crediti_pa': 'bg-orange-100 text-orange-800',
      'bonus_mezzogiorno': 'bg-pink-100 text-pink-800',
      'formazione_40': 'bg-yellow-100 text-yellow-800',
      'dta': 'bg-indigo-100 text-indigo-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
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

  return (
    <SimpleBackground>
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header con Background */}
          <div className="mb-8 relative overflow-hidden rounded-2xl">
            {/* Background Image with blur effect */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-sm"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
              }}
            />
            
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/60" />
            
            <div className="relative z-10 p-8 md:p-12">
              {/* Header Navigation */}
              <div className="flex items-center space-x-4 mb-8">
                <Link to={createPageUrl("Dashboard")}>
                  <Button variant="outline" size="icon" className="rounded-xl border-white/20 hover:bg-white/10 text-white backdrop-blur-sm">
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                </Link>
                <div className="flex items-center space-x-4 flex-1">
                  <div className="w-16 h-16 bg-[#13E8E9]/20 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm">
                    <FileText className="w-8 h-8 text-[#13E8E9]" />
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">
                      Crediti Disponibili
                    </h1>
                    <p className="text-white/80 mt-1 text-lg">
                      Crediti fiscali verificati e pronti all'acquisto da Creditly Global
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-500/20 text-green-400 border-0 px-4 py-2 backdrop-blur-sm">
                  ✓ Tutti Verificati
                </Badge>
              </div>

              {/* Search and Filters in Hero */}
              <Card className="border-white/20 shadow-xl bg-white/10 backdrop-blur-sm">
                <CardHeader className="p-6 border-b border-white/20">
                  <CardTitle className="text-xl font-semibold text-white flex items-center">
                    <Filter className="w-5 h-5 mr-2" />
                    Cerca tra i Crediti Disponibili
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                      <Input
                        placeholder="Cerca crediti..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm h-12 rounded-xl"
                      />
                    </div>

                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white h-12 rounded-xl">
                        <SelectValue placeholder="Tipo di credito" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tutti i tipi</SelectItem>
                        <SelectItem value="superbonus_110">Superbonus 110%</SelectItem>
                        <SelectItem value="credito_imposta_40">Credito 4.0</SelectItem>
                        <SelectItem value="iva_credito">IVA a credito</SelectItem>
                        <SelectItem value="crediti_pa">Crediti PA</SelectItem>
                        <SelectItem value="bonus_mezzogiorno">Bonus Sud</SelectItem>
                        <SelectItem value="formazione_40">Formazione 4.0</SelectItem>
                        <SelectItem value="dta">DTA</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={priceRange} onValueChange={setPriceRange}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white h-12 rounded-xl">
                        <SelectValue placeholder="Fascia di prezzo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tutte le fasce</SelectItem>
                        <SelectItem value="0-25000">€0 - €25.000</SelectItem>
                        <SelectItem value="25000-50000">€25.000 - €50.000</SelectItem>
                        <SelectItem value="50000-100000">€50.000 - €100.000</SelectItem>
                        <SelectItem value="100000+">€100.000+</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button 
                      variant="outline" 
                      className="border-white/20 hover:bg-white/10 text-white backdrop-blur-sm h-12 rounded-xl"
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedType("all");
                        setPriceRange("all");
                      }}
                    >
                      Reset Filtri
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Crediti Grid - Full Width */}
          <div className="grid gap-6">
            {filteredListings.map((listing) => {
              const IconComponent = getCreditTypeIcon(listing.type);
              return (
                <Card key={listing.id} className="border-white/20 shadow-xl bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="w-12 h-12 bg-[#13E8E9]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-6 h-6 text-[#13E8E9]" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-white text-lg">{listing.title}</h3>
                            <Badge className="bg-green-500/90 text-white border-0 ml-2">
                              ✓ Creditly Global
                            </Badge>
                          </div>
                          <Badge className={`${getCreditTypeColor(listing.type)} border-0 mb-3`}>
                            {getCreditTypeLabel(listing.type)}
                          </Badge>
                          <p className="text-white/80 mb-4">{listing.description}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-white/80">Valore Nominale</span>
                          <span className="font-semibold text-white">€{listing.amount?.toLocaleString('it-IT')}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-white/80">Sconto</span>
                          <span className="font-semibold text-red-400">-{listing.discount_rate}%</span>
                        </div>
                        
                        <div className="flex justify-between items-center pt-2 border-t border-white/20">
                          <span className="text-sm font-medium text-white">Prezzo Finale</span>
                          <span className="text-xl font-bold text-[#13E8E9]">€{listing.final_price?.toLocaleString('it-IT')}</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-white/80">Località</span>
                          <span className="text-white text-sm">{listing.location}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-white/80">Scadenza</span>
                          <span className="text-white text-sm">{format(new Date(listing.expires_at), 'dd MMM yyyy', { locale: it })}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-white/80">Interesse</span>
                          <span className="text-white text-sm">{listing.interested_buyers} acquirenti</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/20">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="icon" className="border-white/20 hover:bg-white/10 text-white backdrop-blur-sm rounded-xl">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="border-white/20 hover:bg-white/10 text-white backdrop-blur-sm rounded-xl">
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="border-white/20 hover:bg-white/10 text-white backdrop-blur-sm rounded-xl">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <Link to={createPageUrl(`AcquistaCrediti?credit_id=${listing.id}`)}>
                        <Button className="bg-[#13E8E9] hover:bg-[#13E8E9]/90 text-[#2c2e43] rounded-xl px-6 py-2">
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Acquista Ora
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredListings.length === 0 && (
            <Card className="border-white/20 shadow-xl bg-white/10 backdrop-blur-sm mt-8">
              <CardContent className="p-12 text-center">
                <AlertCircle className="w-16 h-16 text-white/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  {listings.length === 0 ? "Nessun credito disponibile" : "Nessun credito trovato"}
                </h3>
                <p className="text-white/70 mb-6">
                  {listings.length === 0 
                    ? "Al momento non ci sono crediti disponibili da Creditly Global." 
                    : "Prova a modificare i filtri di ricerca per trovare i crediti che stai cercando."
                  }
                </p>
                {filteredListings.length === 0 && searchTerm === "" && selectedType === "all" && priceRange === "all" ? (
                  <Link to={createPageUrl("MarketplaceCrediti")}>
                    <Button className="bg-[#13E8E9] hover:bg-[#13E8E9]/90 text-[#2c2e43] rounded-xl">
                      <Store className="w-4 h-4 mr-2" />
                      Esplora Marketplace Completo
                    </Button>
                  </Link>
                ) : (
                  <Button 
                    className="bg-[#13E8E9] hover:bg-[#13E8E9]/90 text-[#2c2e43] rounded-xl"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedType("all");
                      setPriceRange("all");
                    }}
                  >
                    Reset Filtri
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </SimpleBackground>
  );
}