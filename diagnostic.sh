#!/bin/bash
# Script de diagnostic rapide pour erreur 502

echo "🔍 Diagnostic Rapide - Erreur 502"
echo "=================================="
echo ""

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. État des conteneurs
echo "📦 État des conteneurs :"
docker ps -a | grep multifonction

echo ""
echo "📊 Logs récents :"
docker logs --tail 50 multifonction-ipad 2>&1 | tail -20

echo ""
echo "🔍 Vérification des fichiers dans le conteneur :"
docker exec multifonction-ipad ls -lh /usr/share/nginx/html/ 2>&1

echo ""
echo "🩺 Test de santé Nginx :"
docker exec multifonction-ipad nginx -t 2>&1

echo ""
echo "🌐 Test de connexion HTTP :"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 2>&1)
if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ OK - HTTP $HTTP_CODE${NC}"
else
    echo -e "${RED}❌ ERREUR - HTTP $HTTP_CODE${NC}"

    if [ "$HTTP_CODE" = "502" ]; then
        echo ""
        echo "🔧 Suggestions pour erreur 502 :"
        echo "   1. Vérifier que le build a réussi : npm run build"
        echo "   2. Rebuild Docker : docker-compose build --no-cache"
        echo "   3. Vérifier les logs : docker-compose logs -f"
        echo "   4. Lire TROUBLESHOOTING.md pour plus d'aide"
    fi
fi

echo ""
echo "📝 Pour plus de détails :"
echo "   docker-compose logs -f"
echo "   ./test-docker.sh"
echo "   cat TROUBLESHOOTING.md"
