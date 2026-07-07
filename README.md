# 🎵 Plateforme Musicale

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Statut](https://img.shields.io/badge/statut-en%20développement-yellow)
![Licence](https://img.shields.io/badge/licence-MIT-green)

## 📖 Description

**Plateforme Musicale** est une application web complète permettant aux utilisateurs de découvrir, écouter, partager et gérer leurs morceaux préférés. Inspirée des grands services de streaming, elle offre une expérience fluide et intuitive, avec des fonctionnalités sociales et de recommandation.

Que vous soyez auditeur ou créateur, notre plateforme vous donne les outils pour :

- Explorer une vaste bibliothèque musicale.
- Créer des playlists personnalisées.
- Suivre vos artistes favoris.
- Interagir avec la communauté via des commentaires et des likes.

---

## ✨ Fonctionnalités

- **Lecture audio** : lecteur intégré avec contrôles (lecture/pause, saut, volume, progression).
- **Recherche avancée** : par titre, artiste, album ou genre.
- **Playlists** : création, modification, suppression et partage.
- **Système de recommandation** : basé sur vos écoutes et vos goûts.
- **Authentification** : inscription / connexion sécurisée (JWT).
- **Profil utilisateur** : avatar, biographie, statistiques d'écoute.
- **Administration** : gestion des contenus (ajout/suppression de morceaux, albums, artistes).
- **API RESTful** : exposée pour une éventuelle intégration mobile.
- **Responsive** : adapté aux mobiles, tablettes et desktop.

---

## 🛠️ Technologies utilisées

### Frontend
- [React](https://reactjs.org/) - Bibliothèque UI
- [Redux Toolkit](https://redux-toolkit.js.org/) - Gestion d'état
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Axios](https://axios-http.com/) - Requêtes HTTP
- [React Router](https://reactrouter.com/) - Navigation

### Backend
- [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/) - Serveur
- [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/) - Base de données
- [JSON Web Tokens](https://jwt.io/) - Authentification
- [Multer](https://github.com/expressjs/multer) - Gestion des fichiers audio/images
- [Spotify Web API](https://developer.spotify.com/) - Intégration des métadonnées (optionnel)

### Outils
- [Git](https://git-scm.com/) - Contrôle de version
- [Docker](https://www.docker.com/) - Conteneurisation (optionnel)
- [ESLint](https://eslint.org/) / [Prettier](https://prettier.io/) - Qualité de code

---

## 🚀 Installation

### Prérequis
- Node.js (v16 ou supérieur)
- npm ou yarn
- MongoDB (local ou Atlas)

### Étapes

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/votre-utilisateur/plateforme-musicale.git
   cd plateforme-musicale
