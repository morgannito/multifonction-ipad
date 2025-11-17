# 🚀 Guide de Démarrage Rapide

Guide ultra-simplifié pour lancer l'application en 5 minutes !

## ⚡ Démarrage Express

### Pour les Enseignants (Première utilisation)

```bash
# 1. Installer Docker (une seule fois)
# Télécharger depuis https://www.docker.com/products/docker-desktop

# 2. Cloner ou télécharger le projet
git clone <url-du-repo>
cd multifonction-ipad

# 3. Lancer l'application
docker-compose up -d

# 4. Trouver votre adresse IP locale
# Sur Mac/Linux :
ifconfig | grep "inet " | grep -v 127.0.0.1

# Sur Windows :
ipconfig | findstr IPv4

# 5. Partager l'URL avec vos élèves
# Format : http://[VOTRE-IP]:3000
# Exemple : http://192.168.1.50:3000
```

C'est tout ! L'application est accessible depuis tous les iPads connectés au même WiFi.

### Pour les Élèves

1. Ouvrir Safari sur l'iPad
2. Aller sur l'URL fournie par l'enseignant
3. Cliquer sur "Sonomètre"
4. Autoriser le microphone
5. Appuyer sur "Démarrer"

## 📱 Ajouter à l'Écran d'Accueil (Optionnel)

Pour un accès plus rapide :

1. Dans Safari, appuyer sur le bouton "Partager" (icône carré avec flèche)
2. Sélectionner "Sur l'écran d'accueil"
3. Confirmer
4. L'application apparaît comme une vraie app native !

## 🛑 Arrêter l'Application

```bash
docker-compose down
```

## 🔄 Redémarrer l'Application

```bash
docker-compose restart
```

## 📊 Vérifier que ça Marche

### Test local (sur le serveur)
```bash
# Ouvrir un navigateur et aller sur :
http://localhost:3000

# Si ça marche, l'application fonctionne !
```

### Test depuis un iPad
1. Être sur le même WiFi que le serveur
2. Ouvrir Safari
3. Aller sur `http://[IP-du-serveur]:3000`
4. L'application devrait s'afficher

## 🐛 Problèmes Courants

### "Cannot connect" sur l'iPad
✅ **Solution :** Vérifier que l'iPad et le serveur sont sur le même WiFi

### Le microphone ne marche pas
✅ **Solution :**
- Appuyer sur "Démarrer"
- Autoriser l'accès au microphone dans la popup
- Si ça ne marche toujours pas : Réglages > Safari > Microphone > Autoriser

### "docker: command not found"
✅ **Solution :** Installer Docker Desktop depuis https://www.docker.com/

### Le port 3000 est déjà utilisé
✅ **Solution :** Changer le port dans `docker-compose.yml`
```yaml
ports:
  - "8080:80"  # Utiliser le port 8080 au lieu de 3000
```

## 💡 Astuces

### Utiliser sur un Raspberry Pi
L'application fonctionne parfaitement sur un Raspberry Pi pour créer un serveur permanent dans la classe !

```bash
# Sur Raspberry Pi OS
sudo apt-get update
sudo apt-get install docker.io docker-compose
sudo docker-compose up -d
```

### Mode Développement
Si vous voulez modifier l'application :

```bash
# Sans Docker (plus rapide pour développer)
npm install
npm run dev
# Accès sur http://localhost:3000
```

### Créer un QR Code
Utilisez un générateur de QR code en ligne (comme qr-code-generator.com) avec votre URL pour que les élèves puissent scanner et accéder rapidement !

## 📞 Besoin d'Aide ?

1. Consulter le [README.md](README.md) complet
2. Vérifier la section Dépannage
3. Ouvrir une issue sur GitHub

## 🎯 Prochaines Étapes

Une fois que le sonomètre fonctionne, vous pouvez :

1. **Personnaliser les seuils** : Voir [README.md - Personnalisation](README.md#-personnalisation)
2. **Ajouter d'autres mini-apps** : Voir [README.md - Ajouter une Mini-App](README.md#-ajouter-une-nouvelle-mini-application)
3. **Configurer HTTPS** : Pour un accès depuis Internet

---

**Temps d'installation estimé** : 5-10 minutes
**Niveau technique requis** : Débutant
**Une question ?** Consultez le README ou ouvrez une issue !
