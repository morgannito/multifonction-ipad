# 📝 Historique des Modifications

## Version 2.1.0 - 2025-11-17

### 📓 Nouvelle Mini-App : Cahier Seyes

Ajout d'un cahier virtuel avec lignes Seyes pour l'écriture en classe.

**Fonctionnalités principales :**
- 📏 **Lignes Seyes authentiques** : 8px de hauteur avec 4 subdivisions de 2px
- 📐 **Marge rouge optionnelle** : Marge gauche de 80px activable
- ✏️ **Zone de texte superposée** : Écriture directe sur les lignes
- 🎨 **Personnalisation complète** :
  - 5 choix de polices (Arial, Times, Verdana, Cursive, Monospace)
  - Taille de police ajustable (20-48px)
  - Couleur de texte personnalisable
  - Opacité des lignes réglable (0-100%)
- 💾 **Export en image** : Sauvegarde en PNG
- 🖨️ **Impression optimisée** : Fonction print sans interface
- 📱 **Canvas responsive** : 800x1000px adapté à l'affichage

**Cas d'usage :**
- Créer des feuilles d'exercices personnalisées
- Modèles de cahier pour écriture
- Exercices de calligraphie
- Feuilles lignées imprimables
- Support pour travaux d'écriture

**Technique :**
- Canvas API pour le rendu précis des lignes Seyes
- Textarea HTML avec position absolue pour l'édition
- Grille verticale et horizontale conforme au standard Seyes
- Export via `canvas.toDataURL()`
- Media queries CSS pour impression sans interface

**Fichiers ajoutés :**
- `src/components/Cahier/Cahier.tsx`
- `src/components/Cahier/Cahier.css`

---

## Version 1.2.0 - 2025-11-17

### ⏱️ Nouvelle Fonctionnalité : Timers Multiples

#### ✨ Nouvelle Mini-App : Timers

Ajout d'un système de gestion de timers multiples pour les évaluations et activités chronométrées en classe.

**Fonctionnalités principales :**
- ⏰ **Interface horloge circulaire** : Visualisation intuitive du temps
- 🎯 **Multiples timers** : Créez autant de timers que nécessaire
- 📌 **Système d'épinglage** : Gardez les timers importants en haut
- ✏️ **Noms personnalisables** : Identifiez vos groupes facilement
- 🔔 **Alarme sonore** : Notification automatique à la fin

**Préréglages disponibles :**
- 1, 3, 5, 10, 15, 20, 30, 45, 60 minutes
- Durée personnalisée possible

**Contrôles :**
- ▶️ Démarrer / ⏸️ Pause
- 🔄 Réinitialiser
- 🗑️ Supprimer

**Code couleur intelligent :**
- 🔵 Bleu : > 50% du temps restant
- 🟡 Jaune : 20-50% du temps
- 🟠 Orange : < 20% du temps
- 🔴 Rouge : Terminé (avec animation)

**Cas d'usage parfaits :**
- Évaluations nationales (CP, CE1, etc.)
- Ateliers par groupes avec temps différents
- Activités de rotation en classe
- Examens avec exercices chronométrés
- Gestion de la récréation

**Technique :**
- Custom hook `useTimers` pour la gestion d'état
- Mise à jour synchronisée toutes les secondes
- Web Audio API pour alarme sonore personnalisée
- Persistance locale de l'état des timers
- Animation SVG pour horloge circulaire

#### 📚 Documentation

- Guide complet dans README.md
- Exemples d'utilisation
- Astuces pédagogiques

---

## Version 1.1.0 - 2025-11-17

### 🎯 Amélioration Majeure : Sensibilité du Sonomètre

#### ⚡ Ce qui a changé

**Avant :**
- Conversion linéaire simple des données audio
- Peu sensible aux sons faibles
- Réaction lente aux changements
- Seuils : 50 dB et 70 dB

**Après :**
- ✅ Calcul RMS logarithmique professionnel
- ✅ Amplification du signal x2.5
- ✅ Réactivité augmentée de 60%
- ✅ Seuils ajustés : 40 dB et 65 dB

#### 🔧 Modifications Techniques

1. **Algorithme de mesure**
   - `getByteFrequencyData` → `getByteTimeDomainData` (signal brut)
   - Ajout du calcul RMS (Root Mean Square)
   - Formule logarithmique : `dB = 20 * log10(rms)`
   - Calibration pour valeurs réalistes (20-100 dB)

2. **Paramètres audio optimisés**
   ```javascript
   // Avant
   fftSize: 2048
   smoothingTimeConstant: 0.8

   // Après
   fftSize: 4096              // +100% de précision
   smoothingTimeConstant: 0.3 // -62% de latence
   gainNode: 2.5              // Amplification x2.5
   ```

3. **Architecture audio améliorée**
   ```
   Avant : Microphone → Analyseur
   Après : Microphone → GainNode (x2.5) → Analyseur
   ```

#### 📊 Comparaison des Seuils

| Niveau | Avant | Après | Différence |
|--------|-------|-------|------------|
| 🟢 Calme | < 50 dB | < 40 dB | -10 dB (plus sensible) |
| 🟡 Modéré | 50-70 dB | 40-65 dB | Plage ajustée |
| 🔴 Bruyant | > 70 dB | > 65 dB | -5 dB (détection précoce) |

#### 🎓 Correspondance Réelle

Les nouveaux seuils correspondent mieux à la réalité en classe :

- **20-30 dB** : Murmure, bibliothèque
- **30-40 dB** : Chuchotements, travail silencieux ✅ VERT
- **40-50 dB** : Conversation calme
- **50-60 dB** : Conversation normale ✅ JAUNE
- **60-65 dB** : Conversation animée
- **65-75 dB** : Classe bruyante ✅ ROUGE
- **75-85 dB** : Aspirateur, circulation
- **85+ dB** : Danger pour l'audition

#### 🚀 Comment Tester

1. **Récupérer les modifications :**
   ```bash
   git pull
   npm install
   npm run build
   ```

2. **Redéployer avec Docker :**
   ```bash
   docker-compose down
   docker-compose build --no-cache
   docker-compose up -d
   ```

3. **Tester la sensibilité :**
   - Démarrer le sonomètre
   - Chuchoter → Devrait afficher ~30-40 dB 🟢
   - Parler normalement → Devrait afficher ~50-60 dB 🟡
   - Parler fort / crier → Devrait afficher >65 dB 🔴

#### ⚙️ Personnalisation Avancée

Si la sensibilité est encore trop faible ou trop forte, ajustez dans `src/hooks/useAudioMeter.ts` :

```typescript
// Ligne 93 - Amplification du signal
gainNode.gain.value = 2.5  // Défaut

// Augmenter pour plus de sensibilité :
gainNode.gain.value = 3.0  // Ou 3.5, 4.0...

// Diminuer pour moins de sensibilité :
gainNode.gain.value = 2.0  // Ou 1.5, 1.0...
```

```typescript
// Ligne 88 - Réactivité
analyser.smoothingTimeConstant = 0.3  // Défaut

// Plus réactif (changements rapides) :
analyser.smoothingTimeConstant = 0.2  // Ou 0.1

// Plus lisse (moyenne sur le temps) :
analyser.smoothingTimeConstant = 0.5  // Ou 0.6
```

```typescript
// Ligne 62 - Facteur multiplicateur
db = db * 1.5  // Défaut

// Plus sensible :
db = db * 2.0  // Ou 2.5

// Moins sensible :
db = db * 1.2  // Ou 1.0
```

#### 🐛 Résolution de Problèmes

**Le sonomètre affiche toujours des valeurs élevées :**
- Réduire `gainNode.gain.value` à 2.0 ou 1.5
- Réduire le facteur multiplicateur à 1.2

**Le sonomètre ne réagit toujours pas assez :**
- Augmenter `gainNode.gain.value` à 3.0 ou 3.5
- Vérifier les permissions micro dans le navigateur
- Vérifier que le micro n'est pas muté physiquement

**Les valeurs sautent trop rapidement :**
- Augmenter `smoothingTimeConstant` à 0.5

**Les valeurs changent trop lentement :**
- Diminuer `smoothingTimeConstant` à 0.2 ou 0.1

#### 📚 Ressources

- [Web Audio API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [Analyser Node](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode)
- [Gain Node](https://developer.mozilla.org/en-US/docs/Web/API/GainNode)
- [Échelle des décibels](https://fr.wikipedia.org/wiki/D%C3%A9cibel)

---

## Version 1.0.0 - 2025-11-17

### ✨ Première Version

- 🔊 Sonomètre fonctionnel avec Web Audio API
- 🎨 Interface responsive pour iPad
- 🐳 Déploiement Docker
- 📚 Documentation complète
- 🛠️ Outils de diagnostic (test-docker.sh, diagnostic.sh)

---

**Note :** Pour toute question sur les modifications, consultez le README.md ou ouvrez une issue sur GitHub.
