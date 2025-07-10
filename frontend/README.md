# ROBI - Frontend

Application frontend pour la gestion de robots autonomes pour le maraîchage.

## 🚀 Description

ROBI est une solution complète de robots autonomes pour le maraîchage qui permet aux exploitants de réduire jusqu'à 60% du temps consacré aux tâches manuelles tout en améliorant la qualité et le rendement de leurs cultures.

## 🛠️ Technologies utilisées

- **React 18** - Framework JavaScript pour l'interface utilisateur
- **TypeScript** - Typage statique pour JavaScript
- **Vite** - Outil de build rapide
- **Tailwind CSS** - Framework CSS utilitaire
- **React Router** - Routage côté client
- **Axios** - Client HTTP
- **Heroicons** - Icônes SVG

## 📁 Structure du projet

```
src/
├── components/          # Composants réutilisables
│   └── Navigation.tsx   # Barre de navigation principale
├── pages/              # Pages de l'application
│   └── Dashboard.tsx   # Page d'accueil avec tableau de bord
├── services/           # Services API
│   ├── api.ts          # Configuration axios et fonctions utilitaires
│   ├── authService.ts  # Service d'authentification
│   ├── robotService.ts # Service pour les robots
│   └── farmService.ts  # Service pour les fermes
├── types/              # Types TypeScript
│   └── index.ts        # Définitions des interfaces
├── utils/              # Fonctions utilitaires
├── hooks/              # Hooks React personnalisés
├── App.tsx             # Composant principal
└── index.css           # Styles globaux avec Tailwind
```

## 🚀 Installation et démarrage

### Prérequis

- Node.js (version 18 ou supérieure)
- npm ou yarn

### Installation

1. Cloner le repository
```bash
git clone <repository-url>
cd frontend
```

2. Installer les dépendances
```bash
npm install
```

3. Démarrer le serveur de développement
```bash
npm run dev
```

L'application sera accessible à l'adresse `http://localhost:5173`

### Scripts disponibles

- `npm run dev` - Démarre le serveur de développement
- `npm run build` - Construit l'application pour la production
- `npm run preview` - Prévisualise la build de production
- `npm run lint` - Lance le linter ESLint

## 🎨 Design System

### Couleurs

- **Primary** : Vert (#22c55e) - Couleur principale de l'application
- **Secondary** : Gris (#64748b) - Couleur secondaire
- **Success** : Vert (#16a34a) - États de succès
- **Warning** : Jaune (#ca8a04) - États d'avertissement
- **Error** : Rouge (#dc2626) - États d'erreur

### Composants

L'application utilise des classes Tailwind CSS personnalisées :

- `.btn-primary` - Bouton principal
- `.btn-secondary` - Bouton secondaire
- `.card` - Conteneur de carte
- `.input-field` - Champ de saisie

## 🔐 Authentification

L'application utilise un système d'authentification basé sur les tokens JWT stockés dans le localStorage.

### Services d'authentification

- `authService.login()` - Connexion utilisateur
- `authService.register()` - Inscription utilisateur
- `authService.logout()` - Déconnexion
- `authService.getCurrentUser()` - Récupération de l'utilisateur actuel

## 📊 Fonctionnalités

### Tableau de bord
- Vue d'ensemble des fermes et robots
- Statistiques en temps réel
- État des robots (actif, maintenance, hors ligne, en charge)
- Tâches récentes
- Alertes système

### Gestion des fermes
- Liste des fermes
- Détails d'une ferme
- Création et modification de fermes
- Statistiques par ferme

### Gestion des robots
- Liste des robots
- Contrôle des robots (démarrer, arrêter, pause)
- Monitoring en temps réel
- Historique des tâches
- Niveau de batterie

### Rapports
- Rapports de performance
- Statistiques détaillées
- Export de données

## 🔧 Configuration

### Variables d'environnement

Créer un fichier `.env.local` à la racine du projet :

```env
VITE_API_URL=http://localhost:3001/api
```

### Configuration Tailwind

Le fichier `tailwind.config.js` contient la configuration personnalisée avec :
- Couleurs personnalisées (primary, secondary)
- Police Inter
- Plugin forms

## 📱 Responsive Design

L'application est entièrement responsive et s'adapte aux différentes tailles d'écran :
- Mobile (< 640px)
- Tablet (640px - 1024px)
- Desktop (> 1024px)

## 🧪 Tests

Les tests sont configurés avec Vitest et Testing Library.

```bash
npm run test
```

## 📦 Build de production

```bash
npm run build
```

Les fichiers de production seront générés dans le dossier `dist/`.

## 🚀 Déploiement

L'application est configurée pour être déployée sur Azure App Service.

### Configuration Azure

- **Hébergement** : Azure App Service
- **CDN** : Azure CDN
- **DNS** : Azure DNS

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.

## 📞 Support

Pour toute question ou problème, contactez l'équipe de développement.
