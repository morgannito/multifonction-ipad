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

### ⏱️ Timers
Gérez plusieurs timers indépendants pour vos différents groupes d'élèves ou activités chronométrées.

**Fonctionnalités :**
- ⏰ Interface horloge circulaire intuitive
- 📌 Épinglez les timers importants en haut de la liste
- 🎯 Préréglages rapides : 1, 3, 5, 10, 15, 20, 30, 45, 60 minutes
- 🔢 Création personnalisée avec durée au choix
- ✏️ Noms personnalisables pour chaque timer (ex: "Groupe A", "Exercice 1")
- ⏸️ Pause et reprise à tout moment
- 🔄 Réinitialisation rapide
- 🔔 Alarme sonore automatique à la fin
- 🎨 Code couleur selon le temps restant :
  - 🔵 **Bleu** : Plus de 50% du temps
  - 🟡 **Jaune** : Entre 20% et 50%
  - 🟠 **Orange** : Moins de 20%
  - 🔴 **Rouge** : Terminé !
- 📊 Affichage simultané de plusieurs timers
- 💾 Gestion automatique de l'état de chaque timer

**Cas d'usage :**
- ✅ Évaluations nationales chronométrées
- ✅ Ateliers par groupes avec temps différents
- ✅ Activités de rotation
- ✅ Examens avec temps dédié par exercice
- ✅ Minuteur pour récréation/pause

**Technologie :** React avec hooks personnalisés et Web Audio API pour l'alarme

### 📊 Timer Bar
Alternative visuelle aux timers circulaires avec affichage en barres de progression.

**Fonctionnalités :**
- 📏 Barres de progression horizontales
- 🎨 Même code couleur que les Timers
- ✏️ Noms modifiables en direct
- ⏯️ Contrôles identiques (Play, Pause, Reset)
- 📊 Affichage minimaliste et clair

### 🎨 Pictogrammes
Affichez visuellement les modalités de travail en classe.

**Catégories disponibles :**
- 👤 **Mode de travail** : Solo, Binôme, Groupe
- 🤫 **Niveau sonore** : Silence, Chuchotements, Discussion
- 🚶 **Déplacements** : Assis, Limités, Libres
- 🙋 **Demande d'aide** : Autonomie, Autorisée, Enseignant seul
- 📚 **Ressources** : Aucune, Livres, Toutes

**Fonctionnalités :**
- 🖥️ Mode plein écran pour projection
- 🎯 Un picto par catégorie
- 🎨 15 pictogrammes au total
- 👀 Interface claire et visuelle

### 🎲 Générateur
Tirage au sort de nombres aléatoires avec animation.

**Fonctionnalités :**
- 🎰 Animation type machine à sous
- 🎯 Préréglages : Dé (1-6), 1-10, 1-20, 1-100
- ⚙️ Configuration min/max personnalisée
- 📜 Historique des 10 derniers tirages
- ⚡ Vitesse de tirage ajustable

**Cas d'usage :**
- Tirage au sort d'élèves (par numéro)
- Jeux pédagogiques avec dés virtuels
- Exercices aléatoires
- Challenges avec nombres mystère

### 📐 Frises
Modèles de frises géométriques reproductibles.

**Motifs disponibles :**
- ⭕ Cercles
- ⬛ Carrés
- 🔺 Triangles
- 🌈 Couleurs (Rouge, Jaune, Bleu)
- 🎨 Formes mixtes
- 🌈 Arc-en-ciel complet

**Fonctionnalités :**
- 🔄 Répétitions ajustables (1-10)
- 📏 Affichage clair pour reproduction
- 🎨 6 motifs prédéfinis
- 📓 Parfait pour activités sur cahier seyes

### 🎒 Affaires
Liste visuelle des objets à apporter en classe.

**Fonctionnalités :**
- 📋 Affichage grand format avec icônes
- ✅ Marquer objets requis/optionnels
- ➕ Ajouter des objets personnalisés
- 🎨 12 icônes disponibles
- 👀 Interface claire pour les élèves

### 👨‍🎓 Élèves
Gestion de classe avec tirage au sort et récompenses.

**Fonctionnalités :**
- 📝 Liste des élèves avec noms
- 🎲 Tirage au sort aléatoire
- ⭐ Système d'étoiles/récompenses
- 💾 Sauvegarde automatique (localStorage)
- ✨ Animation lors du tirage

### 📝 Notes
Prise de notes rapide pour l'enseignant.

**Fonctionnalités :**
- 📌 Notes épinglables en priorité
- ✏️ Édition simple et rapide
- 💾 Sauvegarde automatique locale
- 🗂️ Organisation par importance
- 📄 Sans formatage avancé (simplicité)

### 📓 Cahier Seyes
Cahier virtuel avec lignes Seyes pour l'écriture en classe.

**Fonctionnalités :**
- 📏 Lignes Seyes authentiques (8px avec 4 subdivisions de 2px)
- 📐 Marge rouge optionnelle (80px à gauche)
- ✏️ Zone de texte superposée pour écriture directe
- 🎨 Personnalisation complète :
  - 5 choix de polices (Arial, Times, Verdana, Cursive, Monospace)
  - Taille de police ajustable (20-48px)
  - Couleur de texte personnalisable
  - Opacité des lignes réglable (0-100%)
- 💾 Export en image (PNG)
- 🖨️ Fonction d'impression optimisée
- 📱 Canvas 800x1000px adapté à l'affichage

**Cas d'usage :**
- ✅ Créer des feuilles d'exercices personnalisées
- ✅ Modèles de cahier pour écriture
- ✅ Exercices de calligraphie
- ✅ Feuilles lignées imprimables
- ✅ Support pour travaux d'écriture

**Technologie :** Canvas API pour le rendu des lignes Seyes avec textarea overlay

### 🎡 Roue de la Fortune
Roue animée pour tirage au sort visuel et ludique.

**Fonctionnalités :**
- 🎨 Roue personnalisable avec segments de couleurs
- ✏️ Édition des noms de segments en direct
- ➕ Ajout/suppression de segments (minimum 2)
- 🎲 Animation de rotation réaliste avec ralentissement
- 🔊 Sons de cliquetis pendant la rotation (Web Audio API)
- 📜 Historique des 10 derniers tirages
- 🎯 Détection automatique du gagnant
- 🎨 10 couleurs vives prédéfinies

**Cas d'usage :**
- ✅ Tirage au sort d'élèves ou de groupes
- ✅ Choix aléatoire d'activités
- ✅ Jeux pédagogiques
- ✅ Sélection de tâches ou responsabilités

**Technologie :** Canvas API pour le dessin de la roue + animation JavaScript fluide

### 📅 Planning de la Journée
Emploi du temps visuel avec indicateur temps réel.

**Fonctionnalités :**
- 📊 Timeline horizontale de 8h à 17h
- 🎨 8 catégories de matières avec couleurs :
  - Français (bleu), Mathématiques (vert), Histoire/Géo (orange)
  - Sciences (violet), Arts (rose), Sport (rouge)
  - Récréation (vert clair), Autre (gris)
- 🕐 Indicateur "Maintenant" en temps réel (ligne rouge animée)
- ℹ️ Affichage de l'activité en cours et suivante
- ➕ Ajout d'activités personnalisées
- 🗑️ Suppression d'activités au survol
- 📋 Planning par défaut pré-rempli modifiable

**Cas d'usage :**
- ✅ Visualiser l'emploi du temps de la journée
- ✅ Savoir où on en est dans la journée
- ✅ Anticiper la prochaine activité
- ✅ Adapter le planning en temps réel

**Technologie :** React avec mise à jour automatique chaque minute

### 🏆 Système de Points par Équipe
Tableau de scores pour compétitions de classe.

**Fonctionnalités :**
- 👥 4 équipes par défaut (Rouge, Bleue, Verte, Jaune)
- ✏️ Noms d'équipes modifiables
- ➕➖ Boutons +1, +10, -1, -10 pour ajuster les points
- 🔢 Saisie directe du nombre de points
- 📊 Barres de progression animées
- 🥇🥈🥉 Podium des 3 premiers avec médailles
- 🎉 Animation du gagnant avec overlay plein écran
- 💾 Sauvegarde automatique (localStorage)
- 📈 Statistiques : total points, équipe en tête, écart

**Cas d'usage :**
- ✅ Compétitions entre groupes/équipes
- ✅ Système de récompenses collectif
- ✅ Challenges hebdomadaires
- ✅ Motivation et émulation positive

**Technologie :** React avec localStorage + animations CSS

### 👥 Générateur de Groupes
Création automatique de groupes aléatoires.

**Fonctionnalités :**
- 📝 Liste d'élèves personnalisable
- ➕ Ajout individuel ou import multiple (ligne par ligne)
- 🎲 Algorithme de mélange aléatoire (Fisher-Yates)
- ⚙️ Deux modes de génération :
  - Par nombre de groupes (divise équitablement)
  - Par taille de groupe (fixe le nombre d'élèves par groupe)
- 🎨 Chaque groupe a une couleur distincte
- 📋 Affichage en grille avec numérotation
- 💾 Export en fichier TXT
- 💾 Sauvegarde de la liste d'élèves (localStorage)

**Cas d'usage :**
- ✅ Former des groupes de travail aléatoires
- ✅ Éviter les regroupements habituels
- ✅ Créer des binômes rapidement
- ✅ Organisation d'ateliers tournants

**Technologie :** React avec algorithme de mélange aléatoire

### 📱 Générateur de QR Code
Créez rapidement des QR codes à scanner.

**Fonctionnalités :**
- 🔗 **Mode URL** : Sites web, vidéos, formulaires Google...
- 📝 **Mode Texte** : Messages, consignes, codes d'accès...
- 📶 **Mode WiFi** : Connexion automatique au réseau WiFi (SSID, mot de passe, type de sécurité)
- 📏 Taille ajustable (150px à 500px)
- 💾 Téléchargement en PNG
- 🖨️ Impression directe optimisée
- 💡 Exemples d'utilisation intégrés
- 🌐 Génération via API externe (qrserver.com)

**Cas d'usage :**
- ✅ Partager des liens vers ressources pédagogiques
- ✅ Accès rapide aux quiz en ligne (Kahoot, Quizlet...)
- ✅ Connexion au WiFi de la classe
- ✅ Instructions ou consignes d'activités
- ✅ Codes pour jeux pédagogiques

**Technologie :** API externe QR Code + Canvas pour affichage

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

**Version :** 3.0.0
**Dernière mise à jour :** 2025-11-17
**Technologies :** React + TypeScript + Docker + Web Audio API + Canvas API
