#!/bin/bash

echo "🚀 Test Rapido - Sito Online"
echo "================================"

# Test rapido del sito
echo "📡 Controllo sito..."
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://www.creditlyglobal.com)

if [ "$HTTP_STATUS" = "200" ]; then
    echo "✅ Sito risponde (HTTP $HTTP_STATUS)"
else
    echo "❌ Sito non risponde (HTTP $HTTP_STATUS)"
    exit 1
fi

# Controlla JavaScript
echo "🔍 Controllo JavaScript..."
JS_FILE=$(curl -s https://www.creditlyglobal.com | grep -o 'src="/assets/[^"]*\.js"' | head -1)
if [ ! -z "$JS_FILE" ]; then
    echo "✅ JavaScript trovato: $JS_FILE"
else
    echo "❌ JavaScript non trovato"
fi

# Controlla CSS
echo "🎨 Controllo CSS..."
CSS_FILE=$(curl -s https://www.creditlyglobal.com | grep -o 'href="/assets/[^"]*\.css"' | head -1)
if [ ! -z "$CSS_FILE" ]; then
    echo "✅ CSS trovato: $CSS_FILE"
else
    echo "❌ CSS non trovato"
fi

echo ""
echo "🎯 PROSSIMI PASSI:"
echo "1. Apri https://www.creditlyglobal.com"
echo "2. Premi F12 (DevTools)"
echo "3. Vai su 'Console'"
echo "4. Cerca: '🔧 Modalità: SIMPLIFIED CLIENT'"
echo ""
echo "📋 RISULTATO ATTESO:"
echo "- Sito che si carica senza schermata bianca"
echo "- Console con messaggi di debug"
echo "- Landing page visibile"
echo ""
echo "🔍 Se vedi errori, copiali e condividili!" 