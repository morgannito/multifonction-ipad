# 📱 Multi-Fonction iPad

Application web multi-fonctions pour iPad regroupant plusieurs petites applications utiles en classe. Accessible via navigateur web, fonctionne sur tous les appareils !

## ✨ Pourquoi cette application ?

- ✅ **Pas d'installation** : Fonctionne directement dans Safari sur iPad
- 🚀 **Déploiement facile** : Un seul conteneur Docker pour toute la classe
- 🌐 **Multi-plateforme** : iPad, tablettes Android, ordinateurs
- 🔒 **Sécurisé** : Les données audio ne quittent jamais l'appareil
- 🎨 **Interface moderne** : Design adapté aux tablettes

## 🎯 Mini-Applications Disponibles

### 🔊 Sonomètre
Outil pour mesurer le niveau sonore en classe en temps réel.

**Fonctionnalités :**
- 📊 Mesure en décibels (dB) en temps réel avec haute sensibilité
- 🎨 Indicateur visuel avec code couleur :
  - 🟢 **Vert** : Calme (< 40 dB) - Silence ou chuchotements
  - 🟡 **Jaune** : Modéré (40-65 dB) - Conversation normale
  - 🔴 **Rouge** : Bruyant (> 65 dB) - Trop de bruit !
- 📈 Barre de progression animée ultra-réactive
- ⏯️ Boutons démarrer/arrêter intuitifs
- 🎛️ Amplification du signal (x2.5) pour meilleure détection
- 📚 Guide pédagogique des niveaux sonores

**Technologie :** Utilise la Web Audio API avec calcul RMS logarithmique pour une mesure précise

## 📋 Prérequis

### Pour le déploiement (enseignant)
- Docker et Docker Compose installés
- Connexion réseau locale (WiFi)

### Pour l'utilisation (élèves)
- iPad, tablette ou ordinateur
- Navigateur web moderne (Safari, Chrome, Firefox)
- Connexion au même réseau WiFi

## 🚀 Installation et Déploiement

### Option 1 : Docker Compose (Recommandé)

```bash
# 1. Cloner le projet
git clone <url-du-repo>
cd multifonction-ipad

# 2. Lancer l'application en production
docker-compose up -d

# 3. Accéder à l'application
# Ouvrir http://localhost:3000 sur l'ordinateur serveur
# Ou http://<IP-du-serveur>:3000 depuis les iPads
```

**Arrêter l'application :**
```bash
docker-compose down
```

### Option 2 : Docker seul

```bash
# Build de l'image
docker build -t multifonction-ipad .

# Lancer le conteneur
docker run -d -p 3000:80 --name multifonction-ipad multifonction-ipad

# Arrêter le conteneur
docker stop multifonction-ipad
docker rm multifonction-ipad
```

### Option 3 : Développement local

```bash
# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev

# Accéder à http://localhost:3000
```

**Mode développement avec Docker :**
```bash
docker-compose --profile dev up
# Accès sur http://localhost:3001 avec hot-reload
```

## 📱 Utilisation en Classe

### Configuration Initiale (Enseignant)

1. **Démarrer le serveur** sur un ordinateur ou Raspberry Pi
   ```bash
   docker-compose up -d
   ```

2. **Trouver l'adresse IP** du serveur
   ```bash
   # Sur Linux/Mac
   ifconfig | grep "inet "

   # Sur Windows
   ipconfig
   ```
   Exemple : `192.168.1.100`

3. **Partager l'URL** avec les élèves
   - URL : `http://192.168.1.100:3000`
   - Ou créer un QR code pour faciliter l'accès

### Utilisation par les Élèves

1. **Ouvrir Safari** (ou autre navigateur) sur l'iPad
2. **Entrer l'URL** fournie par l'enseignant
3. **Ajouter à l'écran d'accueil** (optionnel) :
   - Appuyer sur le bouton "Partager"
   - Sélectionner "Sur l'écran d'accueil"
4. **Sélectionner "Sonomètre"** dans le menu
5. **Autoriser l'accès au microphone** quand demandé
6. **Appuyer sur "Démarrer"** pour mesurer le bruit

## 🏗️ Structure du Projet

```
multifonction-ipad/
├── src/
│   ├── main.tsx                 # Point d'entrée React
│   ├── App.tsx                  # Composant principal
│   ├── App.css                  # Styles globaux de l'app
│   ├── index.css                # Styles de base
│   ├── components/
│   │   ├── Sidebar.tsx          # Menu de navigation
│   │   ├── Sidebar.css
│   │   └── SoundMeter/
│   │       ├── SoundMeter.tsx   # Interface du sonomètre
│   │       └── SoundMeter.css   # Styles du sonomètre
│   └── hooks/
│       └── useAudioMeter.ts     # Hook Web Audio API
├── public/                      # Assets statiques
├── Dockerfile                   # Configuration Docker
├── docker-compose.yml           # Orchestration Docker
├── nginx.conf                   # Configuration Nginx
├── vite.config.ts               # Configuration Vite
├── tsconfig.json                # Configuration TypeScript
└── package.json                 # Dépendances NPM
```

## 🛠️ Technologies Utilisées

### Frontend
- **React 18** : Bibliothèque UI
- **TypeScript** : Typage statique
- **Vite** : Build tool ultra-rapide
- **Web Audio API** : Accès au microphone
- **CSS3** : Styles modernes avec animations

### Infrastructure
- **Docker** : Containerisation
- **Nginx** : Serveur web en production
- **Node.js 20** : Runtime pour le build

## ➕ Ajouter une Nouvelle Mini-Application

1. **Créer le composant** dans `src/components/NomApp/`
   ```tsx
   // src/components/Timer/Timer.tsx
   export function Timer() {
     return <div>Mon Timer</div>
   }
   ```

2. **Ajouter dans App.tsx** :
   ```tsx
   const apps: AppInfo[] = [
     // ... apps existantes
     {
       id: 'timer',
       name: 'Minuteur',
       icon: '⏱️',
       description: 'Chronomètre pour la classe',
     },
   ]

   // Dans renderApp()
   case 'timer':
     return <Timer />
   ```

3. **L'app apparaît automatiquement** dans le menu !

## 🎨 Personnalisation

### Changer les seuils du sonomètre

Modifier dans `src/hooks/useAudioMeter.ts:27` :
```typescript
const updateNoiseLevel = useCallback((db: number) => {
  if (db < 40) {          // ← Seuil calme (défaut: 40 dB)
    setNoiseLevel('quiet')
  } else if (db < 65) {   // ← Seuil modéré (défaut: 65 dB)
    setNoiseLevel('moderate')
  } else {
    setNoiseLevel('loud')
  }
}, [])
```

### Ajuster la sensibilité du sonomètre

Modifier dans `src/hooks/useAudioMeter.ts:93` :
```typescript
// Changer l'amplification (défaut: 2.5)
gainNode.gain.value = 3.0 // Plus sensible
// ou
gainNode.gain.value = 2.0 // Moins sensible

// Changer la réactivité (défaut: 0.3)
analyser.smoothingTimeConstant = 0.2 // Plus réactif
// ou
analyser.smoothingTimeConstant = 0.5 // Plus lisse
```

### Personnaliser les couleurs

Modifier dans `src/index.css:17-21` :
```css
:root {
  --success: #22c55e;  /* Vert - Calme */
  --warning: #eab308;  /* Jaune - Modéré */
  --danger: #ef4444;   /* Rouge - Bruyant */
}
```

### Changer le port

Modifier dans `docker-compose.yml:9` :
```yaml
ports:
  - "8080:80"  # Port externe:Port interne
```

## 🔐 Sécurité et Permissions

### Permissions Navigateur
- **Microphone** : Nécessaire pour le sonomètre
- Les permissions sont demandées au premier clic sur "Démarrer"
- Les données audio sont traitées localement (jamais envoyées au serveur)

### HTTPS (Recommandé pour production)
Pour un déploiement public, utilisez HTTPS :

```bash
# Avec Let's Encrypt et un reverse proxy (Traefik, Nginx Proxy Manager)
# Ou avec Caddy qui gère automatiquement les certificats
```

**Note :** Le microphone nécessite HTTPS sauf sur localhost

## 🐛 Dépannage

### Le microphone ne fonctionne pas sur iPad

1. **Vérifier les permissions Safari** :
   - Réglages > Safari > Microphone
   - Autoriser l'accès au microphone

2. **Utiliser HTTPS** (pour déploiement distant) :
   - Les navigateurs bloquent l'accès micro sur HTTP (sauf localhost)
   - Mettre en place un certificat SSL

3. **Recharger la page** :
   - Appuyer sur "Démarrer"
   - Accepter la demande de permission

### L'application ne se charge pas

1. **Vérifier que Docker tourne** :
   ```bash
   docker ps
   ```

2. **Vérifier les logs** :
   ```bash
   docker-compose logs -f
   ```

3. **Vérifier l'IP et le port** :
   - Tester sur le serveur : `curl http://localhost:3000`
   - Vérifier le firewall

### Erreur de build Docker

1. **Nettoyer les images** :
   ```bash
   docker-compose down
   docker system prune -a
   ```

2. **Rebuild complet** :
   ```bash
   docker-compose build --no-cache
   docker-compose up -d
   ```

## 📊 Performance

- **Taille de l'image Docker** : ~25 MB (nginx:alpine)
- **Temps de build** : ~2-3 minutes
- **Latence audio** : ~100ms (mise à jour 10x/seconde)
- **Compatible** : iPad Air 2 et supérieur, tous navigateurs modernes

## 🌟 Idées de Mini-Apps Futures

- ⏱️ **Chronomètre / Minuteur** : Pour les activités chronométrées
- 📝 **Tableau blanc collaboratif** : Dessiner ensemble
- 🎲 **Générateur aléatoire** : Tirage au sort d'élèves
- 📊 **Suivi de présence** : Appel rapide avec QR codes
- 🎯 **Système de points** : Gamification par équipe
- 📅 **Planning visuel** : Emploi du temps de la journée
- 🎨 **Roue de la fortune** : Choix aléatoire visuel
- 📱 **QR Code Generator** : Créer des QR codes rapidement
- 🧮 **Calculatrice scientifique** : Pour les maths
- 📏 **Outils de géométrie** : Rapporteur, règle virtuelle

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour ajouter une mini-app :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/nouvelle-app`)
3. Commit (`git commit -m 'Ajout de la nouvelle app'`)
4. Push (`git push origin feature/nouvelle-app`)
5. Ouvrir une Pull Request

## 📝 Licence

Ce projet est un outil éducatif libre d'utilisation pour les enseignants et les écoles.

## 📞 Support

- 🐛 **Bugs** : Ouvrir une issue sur GitHub
- 💡 **Suggestions** : Proposer vos idées via les issues
- 📧 **Contact** : [Votre email ou lien de contact]

## 🙏 Remerciements

Merci aux enseignants qui testent et améliorent cet outil pédagogique !

---

**Version :** 1.0.0
**Dernière mise à jour :** 2025-11-17
**Technologies :** React + TypeScript + Docker + Web Audio API
