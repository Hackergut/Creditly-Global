import React from "react";
import { User } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap } from "lucide-react";

export function LoginForm() {
  const handleLogin = async () => {
    try {
      await User.login();
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="bg-[#F7FAFC] dark:bg-[#1A202C] rounded-lg p-4 border border-[#E5EDF2] dark:border-[#2D3748]">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#13E8E9]/10 rounded-full flex items-center justify-center">
              <Shield className="w-4 h-4 text-[#13E8E9]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#02182B] dark:text-white">
                Accesso Sicuro
              </p>
              <p className="text-xs text-[#4A5568] dark:text-[#A0ADB8]">
                Autenticazione Google OAuth
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#F0FFF4] dark:bg-[#0D1B0F] rounded-lg p-4 border border-[#9AE6B4] dark:border-[#276749]">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <Zap className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#02182B] dark:text-white">
                Accesso Immediato
              </p>
              <p className="text-xs text-[#4A5568] dark:text-[#A0ADB8]">
                Nessuna registrazione richiesta
              </p>
            </div>
          </div>
        </div>
      </div>

      <Button
        onClick={handleLogin}
        className="w-full bg-[#13E8E9] hover:bg-[#13E8E9]/90 text-[#2c2e43] py-3 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
      >
        Accedi con Google
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>

      <div className="text-center pt-2">
        <p className="text-xs text-[#4A5568] dark:text-[#A0ADB8]">
          Accedendo accetti i nostri{" "}
          <a href="#" className="text-[#13E8E9] hover:underline">
            Termini di Servizio
          </a>{" "}
          e la{" "}
          <a href="#" className="text-[#13E8E9] hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}