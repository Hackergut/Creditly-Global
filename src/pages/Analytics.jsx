
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { CreditRequest } from "@/api/entities";
import { User } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  FileText,
  Euro,
  Calendar,
  PieChart,
  Activity
} from "lucide-react";
import { format, subDays, startOfMonth, endOfMonth } from "date-fns";
import { it } from "date-fns/locale";
import SimpleBackground from "../components/background/SimpleBackground";

export default function Analytics() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRequests: 0,
    totalUsers: 0,
    totalAmount: 0,
    approvedAmount: 0,
    monthlyGrowth: 0,
    statusDistribution: {},
    typeDistribution: {},
    monthlyTrend: []
  });

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const [requests, users] = await Promise.all([
        CreditRequest.list('-created_date'),
        User.list('-created_date')
      ]);

      // Calcola statistiche generali
      const totalAmount = requests.reduce((sum, r) => sum + (r.amount || 0), 0);
      const approvedAmount = requests
        .filter(r => r.status === 'approved')
        .reduce((sum, r) => sum + (r.amount || 0), 0);

      // Distribuzione per status
      const statusDistribution = requests.reduce((acc, r) => {
        acc[r.status] = (acc[r.status] || 0) + 1;
        return acc;
      }, {});

      // Distribuzione per tipo
      const typeDistribution = requests.reduce((acc, r) => {
        acc[r.type] = (acc[r.type] || 0) + 1;
        return acc;
      }, {});

      // Growth mensile
      const currentMonth = requests.filter(r => {
        const date = new Date(r.created_date);
        const now = new Date();
        return date >= startOfMonth(now) && date <= endOfMonth(now);
      }).length;

      const lastMonth = requests.filter(r => {
        const date = new Date(r.created_date);
        const lastMonthStart = startOfMonth(subDays(new Date(), 30));
        const lastMonthEnd = endOfMonth(subDays(new Date(), 30));
        return date >= lastMonthStart && date <= lastMonthEnd;
      }).length;

      const monthlyGrowth = lastMonth > 0 ? ((currentMonth - lastMonth) / lastMonth) * 100 : 0;

      setStats({
        totalRequests: requests.length,
        totalUsers: users.length,
        totalAmount,
        approvedAmount,
        monthlyGrowth,
        statusDistribution,
        typeDistribution,
        monthlyTrend: [] // Placeholder per grafici futuri
      });
    } catch (error) {
      console.error("Error loading analytics:", error);
    } finally {
      setLoading(false);
    }
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
      bonus_mezzogiorno: "Bonus Mezzogiorno"
    };
    return types[type] || type;
  };

  const getStatusLabel = (status) => {
    const statuses = {
      draft: "Bozze",
      submitted: "Inviate", 
      under_review: "In Revisione",
      approved: "Approvate",
      rejected: "Rifiutate",
      completed: "Completate"
    };
    return statuses[status] || status;
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
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <Link to={createPageUrl("Dashboard")}>
                <Button variant="outline" size="icon" className="rounded-xl border-white/30 hover:bg-white/20 text-white backdrop-blur-sm bg-[#1a1d2e]/80 hover:border-white/40 transition-all duration-300">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <div className="flex items-center space-x-4 flex-1">
                <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm">
                  <BarChart3 className="w-8 h-8 text-purple-400" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">
                    Analytics
                  </h1>
                  <p className="text-white/80 mt-1">
                    Analisi dettagliata delle performance della piattaforma
                  </p>
                </div>
              </div>
              <Badge className="bg-purple-500/20 text-purple-400 border-0 px-4 py-2">
                Dashboard Completa
              </Badge>
            </div>
          </div>

          {/* Main Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-white/20 shadow-xl bg-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/80 mb-2">Richieste Totali</p>
                    <p className="text-3xl font-bold text-white">{stats.totalRequests}</p>
                    {stats.monthlyGrowth > 0 ? (
                      <p className="text-green-400 text-sm flex items-center">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        +{stats.monthlyGrowth.toFixed(1)}%
                      </p>
                    ) : (
                      <p className="text-red-400 text-sm flex items-center">
                        <TrendingDown className="w-4 h-4 mr-1" />
                        {stats.monthlyGrowth.toFixed(1)}%
                      </p>
                    )}
                  </div>
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/20 shadow-xl bg-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/80 mb-2">Utenti Attivi</p>
                    <p className="text-3xl font-bold text-white">{stats.totalUsers}</p>
                    <p className="text-white/60 text-sm">Registrati</p>
                  </div>
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/20 shadow-xl bg-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/80 mb-2">Valore Totale</p>
                    <p className="text-2xl font-bold text-white">€{stats.totalAmount.toLocaleString('it-IT')}</p>
                    <p className="text-white/60 text-sm">Richiesto</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                    <Euro className="w-6 h-6 text-yellow-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/20 shadow-xl bg-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/80 mb-2">Valore Approvato</p>
                    <p className="text-2xl font-bold text-[#13E8E9]">€{stats.approvedAmount.toLocaleString('it-IT')}</p>
                    <p className="text-white/60 text-sm">
                      {stats.totalAmount > 0 ? Math.round((stats.approvedAmount / stats.totalAmount) * 100) : 0}% del totale
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-[#13E8E9]/20 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-[#13E8E9]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Status Distribution */}
            <Card className="border-white/20 shadow-xl bg-white/10 backdrop-blur-sm">
              <CardHeader className="p-6 border-b border-white/20">
                <CardTitle className="text-xl font-semibold text-white flex items-center">
                  <PieChart className="w-5 h-5 mr-2" />
                  Distribuzione per Status
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {Object.entries(stats.statusDistribution).map(([status, count]) => (
                    <div key={status} className="flex items-center justify-between">
                      <span className="text-white font-medium">{getStatusLabel(status)}</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-20 bg-white/20 rounded-full h-2">
                          <div 
                            className="bg-[#13E8E9] h-2 rounded-full"
                            style={{ width: `${(count / stats.totalRequests) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-white/80 text-sm w-8">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Type Distribution */}
            <Card className="border-white/20 shadow-xl bg-white/10 backdrop-blur-sm">
              <CardHeader className="p-6 border-b border-white/20">
                <CardTitle className="text-xl font-semibold text-white flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Distribuzione per Tipo
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {Object.entries(stats.typeDistribution).map(([type, count]) => (
                    <div key={type} className="flex items-center justify-between">
                      <span className="text-white font-medium text-sm">{getCreditTypeLabel(type)}</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-20 bg-white/20 rounded-full h-2">
                          <div 
                            className="bg-purple-400 h-2 rounded-full"
                            style={{ width: `${(count / stats.totalRequests) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-white/80 text-sm w-8">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SimpleBackground>
  );
}
