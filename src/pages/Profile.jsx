
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { User } from "@/api/entities";
import { UploadFile } from "@/api/integrations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  User as UserIcon, 
  Camera, 
  Mail, 
  Phone, 
  Building, 
  MapPin,
  Edit3,
  Check,
  X,
  Sparkles
} from "lucide-react";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    company_name: "",
    vat_number: "",
    tax_code: "",
    address: "",
    city: "",
    postal_code: "",
    region: "",
    legal_representative: "",
    profile_image: ""
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await User.me();
      setUser(userData);
      setFormData({
        full_name: userData.full_name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        company_name: userData.company_name || "",
        vat_number: userData.vat_number || "",
        tax_code: userData.tax_code || "",
        address: userData.address || "",
        city: userData.city || "",
        postal_code: userData.postal_code || "",
        region: userData.region || "",
        legal_representative: userData.legal_representative || "",
        profile_image: userData.profile_image || ""
      });
    } catch (error) {
      console.error("Error loading user data:", error);
    }
    setLoading(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const { file_url } = await UploadFile({ file });
      setFormData(prev => ({
        ...prev,
        profile_image: file_url
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
    setUploading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await User.updateMyUserData(formData);
      setUser(prev => ({ ...prev, ...formData }));
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving user data:", error);
    }
    setSaving(false);
  };

  const handleCancel = () => {
    setFormData({
      full_name: user.full_name || "",
      email: user.email || "",
      phone: user.phone || "",
      company_name: user.company_name || "",
      vat_number: user.vat_number || "",
      tax_code: user.tax_code || "",
      address: user.address || "",
      city: user.city || "",
      postal_code: user.postal_code || "",
      region: user.region || "",
      legal_representative: user.legal_representative || "",
      profile_image: user.profile_image || ""
    });
    setIsEditing(false);
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#13E8E9]"></div>
      </div>
    );
  }

  return (
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
              <div className="w-16 h-16 bg-[#13E8E9]/20 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm border border-white/20">
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/03d2053c2_JJJJ.png"
                  alt="Creditly Global"
                  className="w-10 h-10 rounded-lg"
                />
              </div>
              <div>
                <div className="inline-flex items-center space-x-2 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full text-xs font-medium text-green-400 mb-2">
                  <Sparkles className="w-3 h-3" />
                  <span>Profilo Utente</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  Il mio Profilo
                </h1>
                <p className="text-white/80 mt-2 text-lg">
                  Gestisci le tue informazioni personali e aziendali
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-[#13E8E9] hover:bg-[#13E8E9]/90 text-[#2c2e43] font-semibold rounded-xl px-6 py-3"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Modifica Profilo
                </Button>
              ) : (
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    className="border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white hover:border-slate-600 bg-slate-900/50 backdrop-blur-sm transition-all duration-300 rounded-xl"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Annulla
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-[#13E8E9] hover:bg-[#13E8E9]/90 text-[#2c2e43] font-semibold rounded-xl px-6 py-3"
                  >
                    {saving ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#2c2e43] mr-2"></div>
                    ) : (
                      <Check className="w-4 h-4 mr-2" />
                    )}
                    Salva
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Image Section */}
          <div className="lg:col-span-1">
            <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl">
              <CardHeader className="p-6 border-b border-slate-700/50">
                <CardTitle className="text-xl font-semibold text-white">
                  Foto Profilo
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 text-center">
                <div className="relative inline-block mb-6">
                  <Avatar className="w-32 h-32 mx-auto border-4 border-white/20">
                    <AvatarImage src={formData.profile_image} alt="Profile" />
                    <AvatarFallback className="text-2xl font-bold bg-[#13E8E9]/20 text-[#13E8E9]">
                      {getInitials(formData.full_name)}
                    </AvatarFallback>
                  </Avatar>
                  
                  {isEditing && (
                    <div className="absolute bottom-0 right-0">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="profile-image"
                      />
                      <label
                        htmlFor="profile-image"
                        className="flex items-center justify-center w-10 h-10 bg-[#13E8E9] text-[#2c2e43] rounded-full cursor-pointer hover:bg-[#13E8E9]/90 transition-colors"
                      >
                        {uploading ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#2c2e43]"></div>
                        ) : (
                          <Camera className="w-4 h-4" />
                        )}
                      </label>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-white">
                    {formData.full_name || "Nome non specificato"}
                  </h3>
                  <p className="text-white/70">
                    {formData.company_name || "Azienda non specificata"}
                  </p>
                  <Badge className="bg-[#13E8E9]/20 text-[#13E8E9] border-0">
                    {user.role === 'admin' ? 'Amministratore' : 'Utente'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl">
              <CardHeader className="p-6 border-b border-slate-700/50">
                <CardTitle className="flex items-center space-x-2">
                  <UserIcon className="w-5 h-5 text-white/70" />
                  <span className="text-white">Informazioni Personali</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Nome Completo
                    </label>
                    <Input
                      value={formData.full_name}
                      onChange={(e) => handleInputChange("full_name", e.target.value)}
                      disabled={!isEditing}
                      className="bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 disabled:opacity-60"
                      placeholder="Mario Rossi"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <Input
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        disabled={true}
                        className="pl-10 bg-slate-800/30 border-slate-600/30 text-slate-400 placeholder:text-slate-500 disabled:opacity-60"
                        placeholder="mario.rossi@email.com"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Telefono
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      disabled={!isEditing}
                      className="pl-10 bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 disabled:opacity-60"
                      placeholder="+39 123 456 7890"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Company Information */}
            <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl">
              <CardHeader className="p-6 border-b border-slate-700/50">
                <CardTitle className="flex items-center space-x-2">
                  <Building className="w-5 h-5 text-white/70" />
                  <span className="text-white">Informazioni Aziendali</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Nome Azienda
                  </label>
                  <Input
                    value={formData.company_name}
                    onChange={(e) => handleInputChange("company_name", e.target.value)}
                    disabled={!isEditing}
                    className="bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 disabled:opacity-60"
                    placeholder="Rossi & Associati S.r.l."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Partita IVA
                    </label>
                    <Input
                      value={formData.vat_number}
                      onChange={(e) => handleInputChange("vat_number", e.target.value)}
                      disabled={!isEditing}
                      className="bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 disabled:opacity-60"
                      placeholder="12345678901"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Codice Fiscale
                    </label>
                    <Input
                      value={formData.tax_code}
                      onChange={(e) => handleInputChange("tax_code", e.target.value)}
                      disabled={!isEditing}
                      className="bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 disabled:opacity-60"
                      placeholder="12345678901"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Rappresentante Legale
                  </label>
                  <Input
                    value={formData.legal_representative}
                    onChange={(e) => handleInputChange("legal_representative", e.target.value)}
                    disabled={!isEditing}
                    className="bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 disabled:opacity-60"
                    placeholder="Mario Rossi"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Address Information */}
            <Card className="backdrop-filter backdrop-blur-12px bg-slate-800/30 border-2 border-slate-700/60 rounded-2xl shadow-xl">
              <CardHeader className="p-6 border-b border-slate-700/50">
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-white/70" />
                  <span className="text-white">Indirizzo</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Indirizzo Completo
                  </label>
                  <Input
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    disabled={!isEditing}
                    className="bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 disabled:opacity-60"
                    placeholder="Via Roma, 123"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Città
                    </label>
                    <Input
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      disabled={!isEditing}
                      className="bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 disabled:opacity-60"
                      placeholder="Milano"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      CAP
                    </label>
                    <Input
                      value={formData.postal_code}
                      onChange={(e) => handleInputChange("postal_code", e.target.value)}
                      disabled={!isEditing}
                      className="bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 disabled:opacity-60"
                      placeholder="20100"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Regione
                    </label>
                    <Input
                      value={formData.region}
                      onChange={(e) => handleInputChange("region", e.target.value)}
                      disabled={!isEditing}
                      className="bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 disabled:opacity-60"
                      placeholder="Lombardia"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
