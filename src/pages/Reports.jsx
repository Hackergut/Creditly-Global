
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  FileBarChart,
  Download,
  Calendar,
  Filter,
  FileText,
  TrendingUp,
  Users,
  Euro
} from "lucide-react";
import { format, subDays, startOfMonth, endOfMonth, startOfYear, endOfYear } from "date-fns";
import { it } from "date-fns/locale";
import SimpleBackground from "../components/background/SimpleBackground";

export default function Reports() {
  const [loading, setLoading] = useState(true);
  const [reportPeriod, setReportPeriod] = useState("monthly");
  const [reportType, setReportType] = useState("general");
  const [reportData, setReportData] = useState({
    requests: [],
    users: [],
    summary: {}
  });

  useEffect(() => {
    loadReportData();
  }, [reportPeriod, reportType]);

  const loadReportData = async () => {
    setLoading(true);
    try {
      const [requests, users] = await Promise.all([
        CreditRequest.list('-created_date'),
        User.list('-created_date')
      ]);

      // Filtra i dati in base al periodo selezionato
      const now = new Date();
      let startDate, endDate;

      switch (reportPeriod) {
        case 'monthly':
          startDate = startOfMonth(now);
          endDate = endOfMonth(now);
          break;
        case 'quarterly':
          startDate = startOfMonth(subDays(now, 90));
          endDate = endOfMonth(now);
          break;
        case 'yearly':
          startDate = startOfYear(now);
          endDate = endOfYear(now);
          break;
        case 'all': // Added for 'all' period
          startDate = new Date(0); // Start of Unix epoch
          endDate = now;
          break;
        default:
          startDate = new Date(0);
          endDate = now;
      }

      const filteredRequests = requests.filter(r => {
        const date = new Date(r.created_date);
        return date >= startDate && date <= endDate;
      });

      const filteredUsers = users.filter(u => {
        const date = new Date(u.created_date);
        return date >= startDate && date <= endDate;
      });

      // Calcola summary
      const summary = {
        totalRequests: filteredRequests.length,
        totalUsers: filteredUsers.length,
        totalAmount: filteredRequests.reduce((sum, r) => sum + (r.amount || 0), 0),
        approvedRequests: filteredRequests.filter(r => r.status === 'approved').length,
        approvedAmount: filteredRequests
          .filter(r => r.status === 'approved')
          .reduce((sum, r) => sum + (r.amount || 0), 0),
        pendingRequests: filteredRequests.filter(r => r.status === 'submitted' || r.status === 'under_review').length,
        rejectedRequests: filteredRequests.filter(r => r.status === 'rejected').length
      };

      setReportData({
        requests: filteredRequests,
        users: filteredUsers,
        summary
      });
    } catch (error) {
      console.error("Error loading report data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPeriodLabel = () => {
    switch (reportPeriod) {
      case 'monthly': return 'Mensile';
      case 'quarterly': return 'Trimestrale';
      case 'yearly': return 'Annuale';
      case 'all': return 'Totale'; // Label for 'all' period
      default: return 'Generale';
    }
  };

  const exportReport = () => {
    // Placeholder per export report
    console.log("Exporting report...", { reportPeriod, reportType, reportData });
    alert("Funzionalità di export in fase di sviluppo");
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
                <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm">
                  <FileBarChart className="w-8 h-8 text-green-400" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">
                    Report Mensili
                  </h1>
                  <p className="text-white/80 mt-1">
                    Report dettagliati sulle performance e statistiche
                  </p>
                </div>
              </div>
              <Badge className="bg-green-500/20 text-green-400 border-0 px-4 py-2">
                Report {getPeriodLabel()}
              </Badge>
            </div>
          </div>

          {/* Filters */}
          <Card className="border-white/20 shadow-xl bg-white/10 backdrop-blur-sm mb-8">
            <CardHeader className="p-6 border-b border-white/20">
              <CardTitle className="text-xl font-semibold text-white flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filtri Report
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-4 gap-4">
                <Select value={reportPeriod} onValueChange={setReportPeriod}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Periodo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Mensile</SelectItem>
                    <SelectItem value="quarterly">Trimestrale</SelectItem>
                    <SelectItem value="yearly">Annuale</SelectItem>
                    <SelectItem value="all">Tutto</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Tipo Report" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">Generale</SelectItem>
                    <SelectItem value="financial">Finanziario</SelectItem>
                    <SelectItem value="users">Utenti</SelectItem>
                    <SelectItem value="performance">Performance</SelectItem>
                  </SelectContent>
                </Select>

                <Button 
                  onClick={loadReportData}
                  variant="outline" 
                  className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Aggiorna
                </Button>

                <Button 
                  onClick={exportReport}
                  className="bg-[#13E8E9] hover:bg-[#13E8E9]/90 text-[#2c2e43]"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Esporta
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-white/20 shadow-xl bg-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/80 mb-2">Richieste</p>
                    <p className="text-3xl font-bold text-white">{reportData.summary.totalRequests}</p>
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
                    <p className="text-sm font-medium text-white/80 mb-2">Approvate</p>
                    <p className="text-3xl font-bold text-green-400">{reportData.summary.approvedRequests}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/20 shadow-xl bg-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/80 mb-2">Nuovi Utenti</p>
                    <p className="text-3xl font-bold text-purple-400">{reportData.summary.totalUsers}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/20 shadow-xl bg-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/80 mb-2">Valore</p>
                    <p className="text-2xl font-bold text-[#13E8E9]">€{reportData.summary.totalAmount.toLocaleString('it-IT')}</p>
                  </div>
                  <div className="w-12 h-12 bg-[#13E8E9]/20 rounded-xl flex items-center justify-center">
                    <Euro className="w-6 h-6 text-[#13E8E9]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Report */}
          <Card className="border-white/20 shadow-xl bg-white/10 backdrop-blur-sm">
            <CardHeader className="p-6 border-b border-white/20">
              <CardTitle className="text-xl font-semibold text-white">
                Report Dettagliato - {getPeriodLabel()}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Performance Richieste</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-white/80">Tasso di Approvazione</span>
                      <span className="text-white font-semibold">
                        {reportData.summary.totalRequests > 0 
                          ? Math.round((reportData.summary.approvedRequests / reportData.summary.totalRequests) * 100)
                          : 0}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">In Attesa</span>
                      <span className="text-yellow-400 font-semibold">{reportData.summary.pendingRequests}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Rifiutate</span>
                      <span className="text-red-400 font-semibold">{reportData.summary.rejectedRequests}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Valori Finanziari</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-white/80">Importo Totale Richiesto</span>
                      <span className="text-white font-semibold">€{reportData.summary.totalAmount.toLocaleString('it-IT')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Importo Approvato</span>
                      <span className="text-green-400 font-semibold">€{reportData.summary.approvedAmount.toLocaleString('it-IT')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Media per Richiesta</span>
                      <span className="text-white font-semibold">
                        €{reportData.summary.totalRequests > 0 
                          ? Math.round(reportData.summary.totalAmount / reportData.summary.totalRequests).toLocaleString('it-IT')
                          : 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SimpleBackground>
  );
}
