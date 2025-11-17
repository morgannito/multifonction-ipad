# 🐛 Guide de Dépannage - Erreur 502

## Diagnostic Rapide

### Option 1 : Script Automatique de Diagnostic

```bash
chmod +x test-docker.sh
./test-docker.sh
```

Ce script va :
- ✅ Vérifier Docker
- ✅ Tester le build local
- ✅ Builder l'image Docker
- ✅ Démarrer le conteneur
- ✅ Diagnostiquer l'erreur 502

### Option 2 : Diagnostic Manuel

#### 1. Vérifier les logs Docker

```bash
# Logs du conteneur
docker-compose logs -f

# Ou si vous utilisez docker run :
docker logs multifonction-ipad
```

#### 2. Vérifier l'état du conteneur

```bash
docker ps -a
```

Si le conteneur est en statut "Exited", il y a un problème de démarrage.

#### 3. Vérifier les fichiers dans le conteneur

```bash
# Se connecter au conteneur
docker exec -it multifonction-ipad sh

# Vérifier que les fichiers sont présents
ls -la /usr/share/nginx/html/

# Devrait afficher :
# index.html
# assets/
# vite.svg

# Quitter le conteneur
exit
```

#### 4. Tester la configuration Nginx

```bash
docker exec multifonction-ipad nginx -t
```

## Solutions Courantes

### Solution 1 : Rebuild Complet

```bash
# Arrêter tout
docker-compose down

# Nettoyer les images
docker system prune -a

# Rebuild sans cache
docker-compose build --no-cache

# Redémarrer
docker-compose up -d
```

### Solution 2 : Vérifier le Build Local

```bash
# Supprimer node_modules et dist
rm -rf node_modules dist

# Réinstaller
npm install

# Tester le build local
npm run build

# Vérifier que dist/index.html existe
ls -la dist/

# Si le build local fonctionne, rebuild Docker
docker-compose build --no-cache
docker-compose up -d
```

### Solution 3 : Utiliser Vite en Mode Preview

Si Docker ne fonctionne pas, utilisez Vite directement :

```bash
npm install
npm run build
npm run preview
```

Puis accédez à http://localhost:4173

### Solution 4 : Mode Développement sans Docker

```bash
npm install
npm run dev
```

Accès sur http://localhost:3000 (avec hot-reload)

### Solution 5 : Vérifier les Permissions

Sur Linux, si vous avez des problèmes de permissions :

```bash
# Changer le propriétaire
sudo chown -R $USER:$USER .

# Rebuild
docker-compose build --no-cache
docker-compose up -d
```

### Solution 6 : Désactiver le Build Cache

Modifiez le `Dockerfile` pour forcer npm à réinstaller :

```dockerfile
# Dans le Dockerfile, ligne 10, remplacer:
RUN npm ci
# Par:
RUN npm install --legacy-peer-deps
```

## Erreurs Spécifiques

### Erreur : "upstream prematurely closed connection"

**Cause :** Nginx essaie de se connecter à un backend qui n'existe pas.

**Solution :** C'est une application statique, pas besoin de backend. Vérifiez que `nginx.conf` ne contient pas de `proxy_pass`.

### Erreur : "No such file or directory: /usr/share/nginx/html/index.html"

**Cause :** Les fichiers n'ont pas été copiés correctement.

**Solution :**
```bash
# Vérifier que le build fonctionne
npm run build
ls -la dist/

# Si dist/ est vide, il y a un problème de build
# Vérifier les erreurs avec :
npm run build 2>&1 | tee build.log
```

### Erreur : "Permission denied"

**Cause :** Problèmes de permissions Docker.

**Solution :**
```bash
# Sur Linux, ajouter votre user au groupe docker
sudo usermod -aG docker $USER

# Se déconnecter et reconnecter
# Ou :
newgrp docker
```

## Configuration Alternative : Sans Docker

Si Docker ne fonctionne vraiment pas, servez directement avec Node.js :

### Créer un serveur simple

Créez `server.js` :

```javascript
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Servir les fichiers statiques
app.use(express.static('dist'));

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});
```

Ajoutez dans `package.json` :
```json
{
  "dependencies": {
    "express": "^4.18.2"
  },
  "scripts": {
    "serve": "npm run build && node server.js"
  }
}
```

Puis lancez :
```bash
npm install express
npm run serve
```

## Vérification Post-Déploiement

### Test de Connexion

```bash
# Depuis le serveur
curl http://localhost:3000

# Depuis un autre appareil sur le réseau
curl http://[IP-DU-SERVEUR]:3000
```

### Test du Microphone

1. Ouvrir l'application dans le navigateur
2. Aller sur le Sonomètre
3. Cliquer sur "Démarrer"
4. Autoriser l'accès au microphone
5. Parler près du micro → Les décibels doivent augmenter

## Logs Utiles

### Voir les logs Nginx en temps réel

```bash
docker exec -it multifonction-ipad tail -f /var/log/nginx/access.log /var/log/nginx/error.log
```

### Voir les processus dans le conteneur

```bash
docker exec -it multifonction-ipad ps aux
```

### Tester les ports

```bash
# Vérifier que le port 3000 est ouvert
netstat -tulpn | grep 3000

# Ou avec ss
ss -tulpn | grep 3000
```

## Besoin d'Aide ?

Si rien ne fonctionne, ouvrez une issue avec :

1. **Sortie de** : `docker-compose logs`
2. **Sortie de** : `docker exec multifonction-ipad ls -la /usr/share/nginx/html/`
3. **Sortie de** : `npm run build`
4. **Votre OS** : Windows/Mac/Linux
5. **Version Docker** : `docker --version`

---

**Note :** La plupart des erreurs 502 viennent d'un build qui échoue silencieusement ou de fichiers qui ne sont pas copiés dans l'image Docker.
