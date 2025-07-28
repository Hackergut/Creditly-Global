#!/bin/bash

# Script per testare il sito online
echo "🌐 Test del sito: https://www.creditlyglobal.com"

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

# Test 3: Verifica meta tags
echo -e "${BLUE}🔍 Test 3: Verifica meta tags...${NC}"
META_URL=$(curl -s https://www.creditlyglobal.com | grep -o 'property="og:url" content="[^"]*"' | cut -d'"' -f4)

if [ "$META_URL" = "https://www.creditlyglobal.com/" ]; then
    echo -e "${GREEN}✅ Meta tags aggiornati correttamente${NC}"
else
    echo -e "${YELLOW}⚠️  Meta tags potrebbero non essere aggiornati${NC}"
fi

# Test 4: Verifica SSL
echo -e "${BLUE}🔍 Test 4: Verifica certificato SSL...${NC}"
SSL_CHECK=$(curl -s -I https://www.creditlyglobal.com 2>&1 | grep -c "SSL")

if [ "$SSL_CHECK" = "0" ]; then
    echo -e "${GREEN}✅ Certificato SSL valido${NC}"
else
    echo -e "${RED}❌ Problema con certificato SSL${NC}"
fi

echo ""
echo -e "${GREEN}🎉 Test completati!${NC}"
echo ""
echo "📋 Prossimi passi:"
echo "1. Apri https://www.creditlyglobal.com nel browser"
echo "2. Premi F12 per aprire DevTools"
echo "3. Vai su 'Console' e controlla per errori"
echo "4. Se vedi una schermata bianca, configura le variabili d'ambiente"
echo ""
echo "📖 Guida completa: CONFIGURA_VARIABILI.md" 