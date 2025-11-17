#!/bin/bash

echo "🔍 Diagnostic Docker pour Multi-Fonction iPad"
echo "=============================================="
echo ""

# 1. Vérifier que Docker fonctionne
echo "1️⃣ Vérification de Docker..."
if ! command -v docker &> /dev/null; then
    echo "❌ Docker n'est pas installé ou pas dans le PATH"
    exit 1
fi
echo "✅ Docker est disponible: $(docker --version)"
echo ""

# 2. Arrêter les anciens conteneurs
echo "2️⃣ Arrêt des anciens conteneurs..."
docker-compose down 2>/dev/null || true
docker rm -f multifonction-ipad 2>/dev/null || true
echo "✅ Nettoyage effectué"
echo ""

# 3. Test du build local
echo "3️⃣ Test du build local (sans Docker)..."
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
fi

echo "🔨 Build de l'application..."
npm run build

if [ -d "dist" ] && [ -f "dist/index.html" ]; then
    echo "✅ Build local réussi !"
    echo "   Fichiers générés dans dist/ :"
    ls -lh dist/
else
    echo "❌ Le build local a échoué - dist/index.html n'existe pas"
    exit 1
fi
echo ""

# 4. Build de l'image Docker avec logs verbeux
echo "4️⃣ Build de l'image Docker..."
docker build -t multifonction-ipad-test . --no-cache --progress=plain

if [ $? -ne 0 ]; then
    echo "❌ Le build Docker a échoué"
    exit 1
fi
echo "✅ Image Docker créée"
echo ""

# 5. Lancer le conteneur
echo "5️⃣ Lancement du conteneur..."
docker run -d -p 3000:80 --name multifonction-ipad-test multifonction-ipad-test

if [ $? -ne 0 ]; then
    echo "❌ Le conteneur n'a pas pu démarrer"
    exit 1
fi
echo "✅ Conteneur démarré"
echo ""

# 6. Attendre que nginx démarre
echo "6️⃣ Attente du démarrage de Nginx (5 secondes)..."
sleep 5

# 7. Vérifier les logs
echo "7️⃣ Logs du conteneur:"
echo "---"
docker logs multifonction-ipad-test
echo "---"
echo ""

# 8. Vérifier que les fichiers sont présents dans le conteneur
echo "8️⃣ Vérification des fichiers dans le conteneur..."
docker exec multifonction-ipad-test ls -la /usr/share/nginx/html/
echo ""

# 9. Test HTTP
echo "9️⃣ Test de connexion HTTP..."
sleep 2
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000)

if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ L'application répond correctement (HTTP $HTTP_CODE)"
    echo ""
    echo "🎉 SUCCÈS ! L'application est accessible sur:"
    echo "   http://localhost:3000"
    echo ""
    echo "Pour arrêter le test:"
    echo "   docker stop multifonction-ipad-test"
    echo "   docker rm multifonction-ipad-test"
elif [ "$HTTP_CODE" = "502" ]; then
    echo "❌ Erreur 502 Bad Gateway"
    echo ""
    echo "Diagnostic détaillé:"
    echo "---"
    docker exec multifonction-ipad-test nginx -t
    echo "---"
    echo ""
    echo "Contenu de /usr/share/nginx/html/:"
    docker exec multifonction-ipad-test find /usr/share/nginx/html/ -type f
else
    echo "❌ Erreur HTTP $HTTP_CODE"
    echo ""
    echo "Logs Nginx:"
    docker exec multifonction-ipad-test cat /var/log/nginx/error.log
fi

echo ""
echo "Pour voir les logs en temps réel:"
echo "   docker logs -f multifonction-ipad-test"
