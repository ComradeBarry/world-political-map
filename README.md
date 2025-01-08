# World Political Map

Une carte interactive mondiale des partis politiques avec visualisation avancée et filtres.

## Installation

### Méthode Simple (Recommandée)
1. Téléchargez le script d'installation automatique : `install-map-fixed2.bat`
2. Exécutez le script en tant qu'administrateur
3. L'application devrait s'ouvrir automatiquement dans votre navigateur

### Installation Manuelle
1. Assurez-vous d'avoir installé :
   - [Node.js](https://nodejs.org/) (version LTS recommandée)
   - [Git](https://git-scm.com/)

2. Clonez le dépôt :
```bash
git clone https://github.com/ComradeBarry/world-political-map.git
cd world-political-map
```

3. Installez les dépendances :
```bash
npm install
```

4. Lancez l'application :
```bash
npm start
```

L'application s'ouvrira automatiquement dans votre navigateur à l'adresse http://localhost:3000

## Structure du Projet
```
world-political-map/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── Map/
│   │       ├── OptimizedWorldMap.jsx
│   │       └── Map.css
│   ├── App.js
│   └── App.css
└── package.json
```

## Fonctionnalités
- ✅ Carte interactive mondiale
- ✅ Zoom et navigation fluides
- 🚧 Marqueurs pour les partis politiques (à venir)
- 🚧 Système de filtrage (à venir)
- 🚧 Visualisations statistiques (à venir)

## Technologies Utilisées
- React
- Leaflet
- OpenStreetMap
