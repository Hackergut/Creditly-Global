
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { User } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Users,
  Search,
  Filter,
  UserPlus,
  Edit,
  Trash2,
  Mail,
  Phone,
  Building,
  Shield,
  Crown
} from "lucide-react";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import SimpleBackground from "../components/background/SimpleBackground";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const allUsers = await User.list('-created_date');
      setUsers(allUsers);
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user =>
    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.company_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const getRoleBadge = (role) => {
    if (role === 'admin') {
      return <Badge className="bg-red-100 text-red-800 border-0"><Crown className="w-3 h-3 mr-1" />Admin</Badge>;
    }
    return <Badge className="bg-blue-100 text-blue-800 border-0"><Shield className="w-3 h-3 mr-1" />Utente</Badge>;
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
                <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm">
                  <img
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/03d2053c2_JJJJ.png"
                    alt="Creditly Global"
                    className="w-8 h-8 rounded-lg"
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">
                    Gestione Utenti
                  </h1>
                  <p className="text-white/80 mt-1">
                    Amministra tutti gli utenti della piattaforma
                  </p>
                </div>
              </div>
              <Badge className="bg-blue-500/20 text-blue-400 border-0 px-4 py-2">
                {users.length} Utenti
              </Badge>
            </div>
          </div>

          {/* Search and Actions */}
          <Card className="border-white/20 shadow-xl bg-white/10 backdrop-blur-sm mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 justify-between">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                  <Input
                    placeholder="Cerca utenti per nome, email o azienda..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 backdrop-blur-sm h-12 rounded-xl"
                  />
                </div>
                <Button 
                  variant="outline" 
                  className="border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white hover:border-slate-600 bg-slate-900/50 backdrop-blur-sm rounded-xl px-6 transition-all duration-300"
                  onClick={() => {
                    setSearchTerm("");
                  }}
                >
                  Reset Filtri
                </Button>
                <Button className="bg-[#13E8E9] hover:bg-[#13E8E9]/90 text-[#2c2e43] rounded-xl px-6">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Invita Utente
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Users List */}
          <Card className="border-white/20 shadow-xl bg-white/10 backdrop-blur-sm">
            <CardHeader className="p-6 border-b border-white/20">
              <CardTitle className="text-xl font-semibold text-white">
                Tutti gli Utenti ({filteredUsers.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {filteredUsers.length === 0 ? (
                <div className="text-center p-8">
                  <Users className="w-12 h-12 text-white/50 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2 text-white">
                    {searchTerm ? "Nessun utente trovato" : "Nessun utente registrato"}
                  </h3>
                  <p className="text-white/80">
                    {searchTerm ? "Prova a modificare i termini di ricerca" : "Gli utenti registrati appariranno qui"}
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-white/20">
                  {filteredUsers.map((user) => (
                    <div key={user.id} className="p-6 hover:bg-white/5 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 flex-1">
                          <Avatar className="w-12 h-12 border-2 border-white/20">
                            <AvatarImage src={user.profile_image} alt={user.full_name} />
                            <AvatarFallback className="bg-[#13E8E9]/20 text-[#13E8E9] font-semibold">
                              {getInitials(user.full_name)}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-3 mb-1">
                              <h3 className="font-semibold text-white truncate">
                                {user.full_name || "Nome non specificato"}
                              </h3>
                              {getRoleBadge(user.role)}
                            </div>
                            
                            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-white/70">
                              <div className="flex items-center space-x-1">
                                <Mail className="w-3 h-3" />
                                <span className="truncate">{user.email}</span>
                              </div>
                              
                              {user.company_name && (
                                <div className="flex items-center space-x-1">
                                  <Building className="w-3 h-3" />
                                  <span className="truncate">{user.company_name}</span>
                                </div>
                              )}
                              
                              {user.phone && (
                                <div className="flex items-center space-x-1">
                                  <Phone className="w-3 h-3" />
                                  <span>{user.phone}</span>
                                </div>
                              )}
                            </div>
                            
                            <div className="text-xs text-white/60 mt-1">
                              Registrato il {format(new Date(user.created_date), 'dd MMM yyyy', { locale: it })}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-white/70 hover:text-red-400 hover:bg-red-500/10">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </SimpleBackground>
  );
}
