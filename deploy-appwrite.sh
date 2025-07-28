#!/bin/bash

# Script per deploy su Appwrite
echo "🚀 Iniziando deploy su Appwrite..."

# Build del progetto
echo "📦 Building del progetto..."
npm run build

# Verifica che il build sia andato a buon fine
if [ $? -ne 0 ]; then
    echo "❌ Errore durante il build"
    exit 1
fi

echo "✅ Build completato con successo"

# Controlla se le variabili d'ambiente sono configurate
if [ -z "$VITE_APPWRITE_ENDPOINT" ] || [ -z "$VITE_APPWRITE_PROJECT_ID" ]; then
    echo "⚠️  Attenzione: Le variabili d'ambiente per Appwrite non sono configurate"
    echo "   Configura VITE_APPWRITE_ENDPOINT e VITE_APPWRITE_PROJECT_ID"
    echo "   Oppure usa le variabili per Supabase: VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY"
fi

echo "🎉 Progetto pronto per il deploy!"
echo "📁 I file sono in: ./dist"
echo "🔗 Carica la cartella 'dist' su Appwrite" 