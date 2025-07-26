
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Added Link
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  ArrowRight,
  ArrowLeft,
  Building,
  MapPin,
  User as UserIcon,
  CheckCircle
} from "lucide-react";
import SimpleBackground from "@/components/SimpleBackground"; // Assumed path for SimpleBackground

export default function Onboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    company_name: "",
    vat_number: "",
    tax_code: "",
    phone: "",
    address: "",
    city: "",
    postal_code: "",
    region: "",
    legal_representative: ""
  });

  const regions = [
    "Abruzzo", "Basilicata", "Calabria", "Campania", "Emilia-Romagna",
    "Friuli-Venezia Giulia", "Lazio", "Liguria", "Lombardia", "Marche",
    "Molise", "Piemonte", "Puglia", "Sardegna", "Sicilia", "Toscana",
    "Trentino-Alto Adige", "Umbria", "Valle d'Aosta", "Veneto"
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      await User.updateMyUserData({
        ...formData,
        onboarding_completed: true
      });
      window.location.href = createPageUrl("Dashboard"); // Maiuscolo
    } catch (error) {
      console.error("Error completing onboarding:", error);
    }
    setLoading(false);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.company_name && formData.vat_number && formData.tax_code;
      case 2:
        return formData.address && formData.city && formData.postal_code && formData.region;
      case 3:
        return formData.legal_representative && formData.phone;
      default:
        return false;
    }
  };

  const steps = [
    {
      title: "Dati Aziendali",
      description: "Informazioni base della tua azienda",
      icon: Building
    },
    {
      title: "Sede Legale",
      description: "Indirizzo e dettagli geografici",
      icon: MapPin
    },
    {
      title: "Referente Legale",
      description: "Rappresentante e contatti",
      icon: UserIcon
    }
  ];

  return (
    <SimpleBackground>
      <div
        className="min-h-screen py-12 text-white" // Updated text color to white for dark background
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-start mb-6">
              <Link to={createPageUrl("Welcome")}>
                <Button variant="outline" size="icon" className="rounded-xl border-white/30 hover:bg-white/20 text-white backdrop-blur-sm bg-[#1a1d2e]/80 hover:border-white/40 transition-all duration-300">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center justify-center space-x-3 mb-6">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/03d2053c2_JJJJ.png"
                alt="Creditly Global"
                className="h-10 w-auto"
              />
              <span className="text-2xl font-bold">
                Creditly Global
              </span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-white"> {/* Updated text color to white */}
              Completa il tuo profilo aziendale
            </h1>
            <p className="text-xl text-gray-300"> {/* Updated text color for secondary info */}
              Ci servono alcune informazioni per personalizzare la tua esperienza
            </p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-300"> {/* Updated text color for secondary info */}
                Passo {currentStep} di 3
              </span>
              <span className="text-sm font-medium text-gray-300"> {/* Updated text color for secondary info */}
                {Math.round((currentStep / 3) * 100)}% completato
              </span>
            </div>
            <Progress value={(currentStep / 3) * 100} className="h-2" />
          </div>

          {/* Steps Navigation */}
          <div className="flex justify-center mb-12">
            <div className="flex space-x-8">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    index + 1 <= currentStep
                      ? "bg-[#D7263D] text-white"
                      : "bg-[#1E425F] text-gray-300" // Updated background and text color for inactive steps
                  }`}>
                    {index + 1 < currentStep ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-white"> {/* Updated text color to white */}
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-300">{step.description}</p> {/* Updated text color for secondary info */}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <Card className="max-w-2xl mx-auto shadow-2xl rounded-2xl bg-[#032038] border border-[#1E425F]"> {/* Updated background and border colors */}
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold text-white"> {/* Updated text color to white */}
                {steps[currentStep - 1].title}
              </CardTitle>
              <p className="text-gray-300"> {/* Updated text color for secondary info */}
                {steps[currentStep - 1].description}
              </p>
            </CardHeader>

            <CardContent className="px-8 pb-8">
              {/* Step 1: Company Info */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2"> {/* Updated text color to white */}
                      Nome Azienda *
                    </label>
                    <Input
                      type="text"
                      placeholder="Es. Rossi & Associati S.r.l."
                      value={formData.company_name}
                      onChange={(e) => handleInputChange("company_name", e.target.value)}
                      className="h-12 rounded-xl bg-[#02182B] border-[#1E425F] placeholder:text-gray-400 text-white" // Updated bg, border, placeholder, text colors
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2"> {/* Updated text color to white */}
                        Partita IVA *
                      </label>
                      <Input
                        type="text"
                        placeholder="12345678901"
                        value={formData.vat_number}
                        onChange={(e) => handleInputChange("vat_number", e.target.value)}
                        className="h-12 rounded-xl bg-[#02182B] border-[#1E425F] placeholder:text-gray-400 text-white" // Updated bg, border, placeholder, text colors
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2"> {/* Updated text color to white */}
                        Codice Fiscale *
                      </label>
                      <Input
                        type="text"
                        placeholder="12345678901"
                        value={formData.tax_code}
                        onChange={(e) => handleInputChange("tax_code", e.target.value)}
                        className="h-12 rounded-xl bg-[#02182B] border-[#1E425F] placeholder:text-gray-400 text-white" // Updated bg, border, placeholder, text colors
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Address */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2"> {/* Updated text color to white */}
                      Indirizzo Completo *
                    </label>
                    <Input
                      type="text"
                      placeholder="Via Roma, 123"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className="h-12 rounded-xl bg-[#02182B] border-[#1E425F] placeholder:text-gray-400 text-white" // Updated bg, border, placeholder, text colors
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2"> {/* Updated text color to white */}
                        Città *
                      </label>
                      <Input
                        type="text"
                        placeholder="Milano"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        className="h-12 rounded-xl bg-[#02182B] border-[#1E425F] placeholder:text-gray-400 text-white" // Updated bg, border, placeholder, text colors
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2"> {/* Updated text color to white */}
                        CAP *
                      </label>
                      <Input
                        type="text"
                        placeholder="20100"
                        value={formData.postal_code}
                        onChange={(e) => handleInputChange("postal_code", e.target.value)}
                        className="h-12 rounded-xl bg-[#02182B] border-[#1E425F] placeholder:text-gray-400 text-white" // Updated bg, border, placeholder, text colors
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2"> {/* Updated text color to white */}
                        Regione *
                      </label>
                      <Select
                        value={formData.region}
                        onValueChange={(value) => handleInputChange("region", value)}
                      >
                        <SelectTrigger className="h-12 rounded-xl bg-[#02182B] border-[#1E425F] text-white"> {/* Updated bg, border, text colors */}
                          <SelectValue placeholder="Seleziona regione" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#032038] text-white border-[#1E425F]"> {/* Updated bg, text, border colors */}
                          {regions.map((region) => (
                            <SelectItem key={region} value={region} className="text-white"> {/* Updated text color for items */}
                              {region}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Legal Representative */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2"> {/* Updated text color to white */}
                      Rappresentante Legale *
                    </label>
                    <Input
                      type="text"
                      placeholder="Mario Rossi"
                      value={formData.legal_representative}
                      onChange={(e) => handleInputChange("legal_representative", e.target.value)}
                      className="h-12 rounded-xl bg-[#02182B] border-[#1E425F] placeholder:text-gray-400 text-white" // Updated bg, border, placeholder, text colors
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2"> {/* Updated text color to white */}
                      Telefono *
                    </label>
                    <Input
                      type="tel"
                      placeholder="+39 123 456 7890"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="h-12 rounded-xl bg-[#02182B] border-[#1E425F] placeholder:text-gray-400 text-white" // Updated bg, border, placeholder, text colors
                    />
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-8 border-t border-[#1E425F]"> {/* Updated border color */}
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="px-6 py-3 rounded-xl border-[#1E425F] hover:bg-[#1E425F] text-white bg-[#032038]" // Updated border, hover bg, text, bg colors
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Indietro
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={!isStepValid() || loading}
                  className="bg-[#D7263D] hover:bg-[#D7263D]/90 text-white px-6 py-3 rounded-xl"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      {currentStep === 3 ? "Completa" : "Avanti"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SimpleBackground>
  );
}
