
import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { User } from "@/api/entities";
import { CreditRequest } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Plus,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Euro,
  Calendar,
  ArrowRight,
  Bell,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Users,
  BarChart3,
  FileBarChart,
  ShoppingCart,
  LifeBuoy, // New import for SupportCenter
  Settings, // New import for Settings
  Shield, // New import for Privacy Policy
  Mail // New import for Contact
} from "lucide-react";
import { format } from "date-fns";
import { it } from "date-fns/locale";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [allRequests, setAllRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [stats, setStats] = useState({
    total: 0,
    pending: 0, // This now represents 'Richieste Attive' (submitted or under_review)
    approved: 0,
    rejected: 0,
    totalAmount: 0,
    approvedAmount: 0,
    averageTime: 0 // New stat
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const userData = await User.me();
      setUser(userData);

      let requestsData;
      if (userData.role === 'admin') {
        // Admin vede tutte le richieste
        requestsData = await CreditRequest.list('-created_date');
      } else {
        // Utente vede solo le sue richieste
        requestsData = await CreditRequest.filter({ created_by: userData.email }, '-created_date');
      }

      setRequests(requestsData);
      setAllRequests(requestsData);

      // Calculate stats
      const totalRequests = requestsData.length;
      const pendingRequests = requestsData.filter((r) => r.status === 'submitted' || r.status === 'under_review').length;
      const approvedRequests = requestsData.filter((r) => r.status === 'approved').length;
      const rejectedRequests = requestsData.filter((r) => r.status === 'rejected').length;
      const totalAmountSum = requestsData.reduce((sum, r) => sum + (r.amount || 0), 0);
      const approvedAmountSum = requestsData.filter((r) => r.status === 'approved').reduce((sum, r) => sum + (r.amount || 0), 0);

      // Calculate average time for approved requests
      let totalReviewTime = 0;
      let approvedRequestsWithReviewDate = 0;
      requestsData.filter((r) => r.status === 'approved' && r.reviewed_date && r.created_date).forEach((r) => {
        const created = new Date(r.created_date);
        const reviewed = new Date(r.reviewed_date);
        if (reviewed > created) {// Ensure reviewed date is after created date
          totalReviewTime += reviewed.getTime() - created.getTime();
          approvedRequestsWithReviewDate++;
        }
      });
      const averageTimeInDays = approvedRequestsWithReviewDate > 0 ? Math.round(totalReviewTime / (1000 * 60 * 60 * 24 * approvedRequestsWithReviewDate)) : 0;

      const statsData = {
        total: totalRequests,
        pending: pendingRequests,
        approved: approvedRequests,
        rejected: rejectedRequests,
        totalAmount: totalAmountSum,
        approvedAmount: approvedAmountSum,
        averageTime: averageTimeInDays
      };
      setStats(statsData);

    } catch (error) {
      console.error("Error loading data:", error);
      setError("Errore nel caricamento dei dati. Riprova più tardi.");
    } finally {
      setLoading(false);
    }
  };

  // Filtering logic ottimizzata con useMemo
  const filteredRequests = useMemo(() => {
    let filtered = allRequests;

    if (searchTerm) {
      filtered = filtered.filter((request) =>
      getCreditTypeLabel(request.type).toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.amount?.toString().includes(searchTerm)
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((request) => request.status === statusFilter);
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((request) => request.type === typeFilter);
    }

    return filtered;
  }, [searchTerm, statusFilter, typeFilter, allRequests]);

  // Update requests when filters change
  useEffect(() => {
    setRequests(filteredRequests);
  }, [filteredRequests]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      draft: { label: "Bozza", color: "bg-slate-700/50 text-slate-300 border-0" },
      submitted: { label: "Inviata", color: "bg-blue-500/20 text-blue-300 border-0" },
      under_review: { label: "In Revisione", color: "bg-amber-500/20 text-amber-300 border-0" },
      approved: { label: "Approvata", color: "bg-green-500/20 text-green-300 border-0" },
      rejected: { label: "Rifiutata", color: "bg-red-500/20 text-red-300 border-0" },
      completed: { label: "Completata", color: "bg-emerald-500/20 text-emerald-300 border-0" }
    };

    const config = statusConfig[status] || statusConfig.draft;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getCreditTypeLabel = (type) => {
    const types = {
      superbonus_110: "Superbonus 110%",
      credito_imposta_40: "Credito d'imposta 4.0",
      iva_credito: "IVA a credito",
      crediti_pa: "Crediti verso PA",
      ace: "ACE",
      formazione_40: "Formazione 4.0",
      ricerca_sviluppo: "Ricerca e Sviluppo",
      bonus_mezzogiorno: "Bonus Mezzogiorno",
      dta: "DTA"
    };
    return types[type] || type;
  };

  const handleUpdateStatus = async (requestId, newStatus) => {
    try {
      await CreditRequest.update(requestId, {
        status: newStatus,
        reviewed_date: new Date().toISOString()
      });
      loadData(); // Reload data
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Loading ottimizzato
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400 mx-auto mb-4"></div>
          <p className="text-white">Caricamento dashboard...</p>
        </div>
      </div>);

  }

  // Error ottimizzato
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-slate-700/50 shadow-xl bg-slate-800/20 backdrop-blur-8px">
          <CardContent className="p-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-white">Errore</h3>
            <p className="text-slate-400 mb-4">{error}</p>
            <Button onClick={loadData} className="bg-green-500 hover:bg-green-600 text-white">
              Riprova
            </Button>
          </CardContent>
        </Card>
      </div>);

  }

  // Check if user needs onboarding
  if (!user?.onboarding_completed) {
    window.location.href = createPageUrl("Onboarding");
    return null;
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Dashboard
              </h1>
              <p className="text-white/80 text-lg">
                Benvenuto, {user?.company_name || user?.full_name || "Utente"}
              </p>
            </div>
            <Link to={createPageUrl("CreditRequest")}>
              <Button className="bg-[#13E8E9] hover:bg-[#13E8E9]/90 text-[#2c2e43] px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
                <Plus className="w-5 h-5 mr-2" />
                Nuova Richiesta
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl p-6 hover:scale-105 transition-all duration-300 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-300 mb-2">Richieste Attive</p>
                <p className="text-2xl font-bold text-white">{stats.pending}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/25 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <FileText className="w-6 h-6 text-blue-300" />
              </div>
            </div>
          </div>

          <div className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl p-6 hover:scale-105 transition-all duration-300 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-300 mb-2">Importo Totale</p>
                <p className="text-2xl font-bold text-green-300">€{stats.totalAmount.toLocaleString('it-IT')}</p>
              </div>
              <div className="w-12 h-12 bg-green-500/25 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <TrendingUp className="w-6 h-6 text-green-300" />
              </div>
            </div>
          </div>

          <div className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl p-6 hover:scale-105 transition-all duration-300 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-300 mb-2">Approvazioni</p>
                <p className="text-2xl font-bold text-orange-300">{stats.approved}</p>
              </div>
              <div className="w-12 h-12 bg-orange-500/25 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <CheckCircle className="w-6 h-6 text-orange-300" />
              </div>
            </div>
          </div>

          <div className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl p-6 hover:scale-105 transition-all duration-300 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-300 mb-2">Tempo Medio</p>
                <p className="text-2xl font-bold text-purple-300">{stats.averageTime} giorni</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/25 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Clock className="w-6 h-6 text-purple-300" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Search and Filters - Dark Mode */}
            <div className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl p-6 mb-8 shadow-xl">
              <div className="flex items-center space-x-2 mb-4">
                <Search className="w-5 h-5 text-green-300" />
                <h3 className="text-lg font-semibold text-white">Cerca e Filtra</h3>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <Input
                  placeholder="Cerca richieste..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 rounded-lg focus:border-green-400" />

                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-slate-800/50 border-slate-600/50 text-white rounded-lg focus:border-green-400">
                    <SelectValue placeholder="Filtra per stato" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="all" className="text-white hover:bg-slate-700">Tutti gli stati</SelectItem>
                    <SelectItem value="draft" className="text-white hover:bg-slate-700">Bozze</SelectItem>
                    <SelectItem value="submitted" className="text-white hover:bg-slate-700">Inviate</SelectItem>
                    <SelectItem value="under_review" className="text-white hover:bg-slate-700">In Revisione</SelectItem>
                    <SelectItem value="approved" className="text-white hover:bg-slate-700">Approvate</SelectItem>
                    <SelectItem value="rejected" className="text-white hover:bg-slate-700">Rifiutate</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="bg-slate-800/50 border-slate-600/50 text-white rounded-lg focus:border-green-400">
                    <SelectValue placeholder="Filtra per tipo" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="all" className="text-white hover:bg-slate-700">Tutti i tipi</SelectItem>
                    <SelectItem value="superbonus_110" className="text-white hover:bg-slate-700">Superbonus 110%</SelectItem>
                    <SelectItem value="credito_imposta_40" className="text-white hover:bg-slate-700">Credito 4.0</SelectItem>
                    <SelectItem value="iva_credito" className="text-white hover:bg-slate-700">IVA a Credito</SelectItem>
                    <SelectItem value="crediti_pa" className="text-white hover:bg-slate-700">Crediti PA</SelectItem>
                    <SelectItem value="dta" className="text-white hover:bg-slate-700">DTA</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                  setTypeFilter("all");
                }}
                variant="outline" className="bg-slate-800 text-slate-50 px-4 py-2 text-sm font-medium disabled:opacity- inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-80 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border h-10 border-slate-600 hover:bg-slate-700 hover:text-white rounded-lg">


                Reset Filtri
              </Button>
            </div>

            {/* Enhanced Requests List */}
            <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl">
              <CardHeader className="p-6 border-b border-slate-700/50">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold text-white">
                    {user?.role === 'admin' ? 'Tutte le Richieste' : 'Le Mie Richieste'}
                    <Badge className="ml-2 bg-green-500/20 text-green-400 border-0">
                      {requests.length}
                    </Badge>
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="bg-slate-800 text-slate-50 px-4 py-2 text-sm font-medium disabled:opacity- inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-80 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border h-10 border-slate-600 hover:bg-slate-700 hover:text-white rounded-lg">
                      <Download className="w-4 h-4 mr-1" />
                      Esporta
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0"> {/* p-0 here to allow inner grid/cards to define their own padding */}
                {requests.length === 0 ?
                <div className="text-center p-8">
                    <FileText className="w-12 h-12 text-slate-400/50 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2 text-white">
                      {searchTerm || statusFilter !== "all" || typeFilter !== "all" ?
                    "Nessuna richiesta trovata" :
                    "Nessuna richiesta ancora"
                    }
                    </h3>
                    <p className="text-slate-400 mb-4">
                      {searchTerm || statusFilter !== "all" || typeFilter !== "all" ?
                    "Prova a modificare i filtri di ricerca" :
                    "Inizia creando la tua prima richiesta di credito"
                    }
                    </p>
                    {!searchTerm && statusFilter === "all" && typeFilter === "all" &&
                  <Link to={createPageUrl("CreditRequest")}>
                        <Button className="bg-gradient-to-r from-green-500 to-green-600 text-white font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200">
                          <Plus className="w-4 h-4 mr-2" />
                          Crea Richiesta
                        </Button>
                      </Link>
                  }
                  </div> :

                <div className="grid gap-6 p-6"> {/* Request Cards - Luminosità aumentata, each item is a card */}
                    {filteredRequests.map((request) =>
                  <div key={request.id} className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl hover:scale-[1.02] transition-all duration-300 overflow-hidden shadow-xl">
                        <div className="p-6"> {/* Inner padding for the card content */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3 flex-1">
                              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                <FileText className="w-5 h-5 text-green-400" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-white truncate">
                                  {getCreditTypeLabel(request.type)}
                                </h4>
                                <div className="flex items-center space-x-2 text-sm text-slate-400">
                                  <span>€{request.amount?.toLocaleString('it-IT')}</span>
                                  <span>•</span>
                                  <span>{format(new Date(request.created_date), 'dd MMM yyyy', { locale: it })}</span>
                                  {user?.role === 'admin' &&
                              <>
                                      <span>•</span>
                                      <span className="truncate">{request.created_by}</span>
                                    </>
                              }
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              {getStatusBadge(request.status)}
                              <div className="flex space-x-1">
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800/20">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                {user?.role === 'admin' &&
                            <Select onValueChange={(value) => handleUpdateStatus(request.id, value)}>
                                    <SelectTrigger className="w-8 h-8 border-0 bg-transparent text-slate-400 hover:text-white hover:bg-slate-800/20">
                                      <Edit className="w-4 h-4" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-900/95 backdrop-blur-sm border-slate-700">
                                      <SelectItem value="under_review" className="text-white hover:bg-slate-800">Metti in Revisione</SelectItem>
                                      <SelectItem value="approved" className="text-white hover:bg-slate-800">Approva</SelectItem>
                                      <SelectItem value="rejected" className="text-white hover:bg-slate-800">Rifiuta</SelectItem>
                                    </SelectContent>
                                  </Select>
                            }
                              </div>
                            </div>
                          </div>

                          {request.description &&
                      <p className="text-sm text-slate-400/70 mb-3 line-clamp-2">
                              {request.description.substring(0, 100)}...
                            </p>
                      }

                          {request.status === 'under_review' &&
                      <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Progresso revisione</span>
                                <span className="font-medium text-white">75%</span>
                              </div>
                              <Progress value={75} className="h-2" indicatorColor="bg-green-500" />
                            </div>
                      }
                        </div>
                      </div>
                  )}
                  </div>
                }
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl">
              <CardHeader className="p-6 border-b border-slate-700/50">
                <CardTitle className="text-lg font-semibold text-white">Azioni Rapide</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                <Link to={createPageUrl("MarketplaceCrediti")} className="block">
                  <Button variant="outline" className="w-full justify-start h-12 rounded-lg border-slate-600 hover:bg-slate-700 text-slate-300 hover:text-white bg-slate-800/50">
                    <ShoppingCart className="w-5 h-5 mr-3" />
                    Marketplace Crediti
                  </Button>
                </Link>

                <Link to={createPageUrl("VendiCrediti")} className="block">
                  <Button variant="outline" className="w-full justify-start h-12 rounded-lg border-slate-600 hover:bg-slate-700 text-slate-300 hover:text-white bg-slate-800/50">
                    <Plus className="w-5 h-5 mr-3" />
                    Vendi i Tuoi Crediti
                  </Button>
                </Link>

                {user?.role === 'admin' && (
                  <>
                    <Link to={createPageUrl("UserManagement")} className="block">
                      <Button variant="outline" className="w-full justify-start h-12 rounded-lg border-slate-600 hover:bg-slate-700 text-slate-300 hover:text-white bg-slate-800/50">
                        <Users className="w-5 h-5 mr-3" />
                        Gestione Utenti
                      </Button>
                    </Link>
                    <Link to={createPageUrl("Analytics")} className="block">
                      <Button variant="outline" className="w-full justify-start h-12 rounded-lg border-slate-600 hover:bg-slate-700 text-slate-300 hover:text-white bg-slate-800/50">
                        <BarChart3 className="w-5 h-5 mr-3" />
                        Analytics
                      </Button>
                    </Link>
                    <Link to={createPageUrl("Reports")} className="block">
                      <Button variant="outline" className="w-full justify-start h-12 rounded-lg border-slate-600 hover:bg-slate-700 text-slate-300 hover:text-white bg-slate-800/50">
                        <FileBarChart className="w-5 h-5 mr-3" />
                        Report Mensili
                      </Button>
                    </Link>
                  </>
                )}
              </CardContent>
            </div>
          </div>
        </div>
      </div>
    </div>);
}
