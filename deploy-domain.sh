#!/bin/bash

# Script per deploy su Appwrite con dominio personalizzato
echo "🚀 Deploy su creditlyglobal.com..."

# Colori per output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Build del progetto
echo "📦 Building del progetto..."
npm run build

# Verifica che il build sia andato a buon fine
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Errore durante il build${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build completato con successo${NC}"

# Verifica che la cartella dist esista
if [ ! -d "dist" ]; then
    echo -e "${RED}❌ Cartella dist non trovata${NC}"
    exit 1
fi

# Verifica file essenziali
echo "🔍 Verifica file essenziali..."
if [ ! -f "dist/index.html" ]; then
    echo -e "${RED}❌ index.html non trovato in dist${NC}"
    exit 1
fi

if [ ! -f "dist/_redirects" ]; then
    echo -e "${YELLOW}⚠️  File _redirects non trovato - il routing potrebbe non funzionare${NC}"
fi

echo -e "${GREEN}✅ File essenziali verificati${NC}"

# Controlla variabili d'ambiente
echo "🔧 Verifica configurazione..."

# Controlla se le variabili d'ambiente sono configurate
if [ -z "$VITE_SUPABASE_URL" ] && [ -z "$VITE_APPWRITE_ENDPOINT" ]; then
    echo -e "${YELLOW}⚠️  Attenzione: Nessuna variabile d'ambiente configurata${NC}"
    echo "   Configura una delle seguenti opzioni:"
    echo "   - VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY"
    echo "   - VITE_APPWRITE_ENDPOINT e VITE_APPWRITE_PROJECT_ID"
else
    echo -e "${GREEN}✅ Variabili d'ambiente configurate${NC}"
fi

# Informazioni per il deploy
echo ""
echo -e "${GREEN}🎉 Progetto pronto per il deploy!${NC}"
echo ""
echo "📁 File da caricare: ./dist"
echo "🌐 Dominio: https://creditlyglobal.com"
echo ""
echo "📋 Passi per il deploy:"
echo "1. Vai su Appwrite Console"
echo "2. Seleziona il tuo progetto"
echo "3. Vai su 'Functions' o 'Websites'"
echo "4. Carica la cartella 'dist' completa"
echo "5. Verifica che il routing SPA sia configurato"
echo ""
echo "🔍 Dopo il deploy, testa:"
echo "- https://creditlyglobal.com"
echo "- Controlla la console del browser per errori"
echo "- Testa la navigazione tra le pagine"
echo ""
echo -e "${YELLOW}💡 Suggerimento: Se vedi una schermata bianca, controlla la console del browser${NC}" 