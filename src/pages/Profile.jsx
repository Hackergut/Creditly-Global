
import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { ProfileForm } from "@/components/ProfileForm";
import { 
  ArrowLeft, 
  Sparkles
} from "lucide-react";

export default function Profile() {
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
          </div>
        </div>

        {/* Profile Form */}
        <div className="flex justify-center">
          <ProfileForm />
        </div>
      </div>
    </div>
  );
}
