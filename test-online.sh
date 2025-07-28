#!/bin/bash

# Script per testare il sito online dopo il deploy
echo "🌐 Test del sito dopo deploy: https://www.creditlyglobal.com"

# Colori per output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test 1: Verifica che il sito risponda
echo -e "${BLUE}🔍 Test 1: Verifica risposta HTTP...${NC}"
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://www.creditlyglobal.com)

if [ "$HTTP_STATUS" = "200" ]; then
    echo -e "${GREEN}✅ Sito risponde correttamente (HTTP $HTTP_STATUS)${NC}"
else
    echo -e "${RED}❌ Sito non risponde correttamente (HTTP $HTTP_STATUS)${NC}"
    exit 1
fi

# Test 2: Verifica contenuto HTML
echo -e "${BLUE}🔍 Test 2: Verifica contenuto HTML...${NC}"
HTML_CONTENT=$(curl -s https://www.creditlyglobal.com | head -5)

if echo "$HTML_CONTENT" | grep -q "Creditly Global"; then
    echo -e "${GREEN}✅ Contenuto HTML corretto${NC}"
else
    echo -e "${YELLOW}⚠️  Contenuto HTML potrebbe non essere corretto${NC}"
fi

# Test 3: Verifica JavaScript
echo -e "${BLUE}🔍 Test 3: Verifica JavaScript...${NC}"
JS_FILES=$(curl -s https://www.creditlyglobal.com | grep -o 'src="/assets/[^"]*\.js"' | head -3)

if [ ! -z "$JS_FILES" ]; then
    echo -e "${GREEN}✅ File JavaScript trovati${NC}"
    echo "$JS_FILES" | while read -r js_file; do
        echo "   - $js_file"
    done
else
    echo -e "${YELLOW}⚠️  File JavaScript non trovati${NC}"
fi

# Test 4: Verifica CSS
echo -e "${BLUE}🔍 Test 4: Verifica CSS...${NC}"
CSS_FILES=$(curl -s https://www.creditlyglobal.com | grep -o 'href="/assets/[^"]*\.css"' | head -3)

if [ ! -z "$CSS_FILES" ]; then
    echo -e "${GREEN}✅ File CSS trovati${NC}"
    echo "$CSS_FILES" | while read -r css_file; do
        echo "   - $css_file"
    done
else
    echo -e "${YELLOW}⚠️  File CSS non trovati${NC}"
fi

echo ""
echo -e "${GREEN}🎉 Test completati!${NC}"
echo ""
echo "📋 Prossimi passi:"
echo "1. Apri https://www.creditlyglobal.com nel browser"
echo "2. Premi F12 per aprire DevTools"
echo "3. Vai su 'Console' e cerca:"
echo ""
echo "   🔧 Modalità: SIMPLIFIED CLIENT (senza backend)"
echo "   ✅ Configurazione OK"
echo "   Backend configurato: simplified"
echo ""
echo "4. Se vedi questi messaggi, il sito funziona!"
echo "5. Se vedi errori, controlla la console per dettagli"
echo ""
echo "🎯 Risultato atteso:"
echo "- Sito che si carica senza schermata bianca"
echo "- Console senza errori JavaScript"
echo "- Landing page visibile" 