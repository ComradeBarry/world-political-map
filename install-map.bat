@echo off
echo Installation de World Political Map...

:: Aller dans le dossier Documents
cd /d %USERPROFILE%\Documents

:: Supprimer l'ancien dossier s'il existe
echo Nettoyage de l'installation precedente...
if exist world-political-map (
    rd /s /q world-political-map
)

:: Créer le dossier du projet
echo Creation du dossier du projet...
mkdir world-political-map
cd world-political-map

:: Initialiser un projet React
echo Initialisation du projet React...
call npx create-react-app .

:: Installer les dépendances
echo Installation des dependances...
call npm install web-vitals --save
call npm install leaflet recharts lucide-react --save
call npm install -D tailwindcss postcss autoprefixer

:: Créer la structure des fichiers
echo Creation de la structure des fichiers...
mkdir src\components\Map

:: Créer OptimizedWorldMap.jsx
echo import React, { useEffect } from 'react';> src\components\Map\OptimizedWorldMap.jsx
echo import 'leaflet/dist/leaflet.css';>> src\components\Map\OptimizedWorldMap.jsx
echo import './Map.css';>> src\components\Map\OptimizedWorldMap.jsx
echo.>> src\components\Map\OptimizedWorldMap.jsx
echo const OptimizedWorldMap = () =^> {>> src\components\Map\OptimizedWorldMap.jsx
echo   useEffect(() =^> {>> src\components\Map\OptimizedWorldMap.jsx
echo     const map = window.L.map('map', {>> src\components\Map\OptimizedWorldMap.jsx
echo       center: [20, 0],>> src\components\Map\OptimizedWorldMap.jsx
echo       zoom: 3>> src\components\Map\OptimizedWorldMap.jsx
echo     });>> src\components\Map\OptimizedWorldMap.jsx
echo.>> src\components\Map\OptimizedWorldMap.jsx
echo     window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {>> src\components\Map\OptimizedWorldMap.jsx
echo       attribution: '© OpenStreetMap contributors',>> src\components\Map\OptimizedWorldMap.jsx
echo       maxZoom: 18>> src\components\Map\OptimizedWorldMap.jsx
echo     }).addTo(map);>> src\components\Map\OptimizedWorldMap.jsx
echo.>> src\components\Map\OptimizedWorldMap.jsx
echo     return () =^> {>> src\components\Map\OptimizedWorldMap.jsx
echo       map.remove();>> src\components\Map\OptimizedWorldMap.jsx
echo     };>> src\components\Map\OptimizedWorldMap.jsx
echo   }, []);>> src\components\Map\OptimizedWorldMap.jsx
echo.>> src\components\Map\OptimizedWorldMap.jsx
echo   return (>> src\components\Map\OptimizedWorldMap.jsx
echo     ^<div className="map-container"^>>> src\components\Map\OptimizedWorldMap.jsx
echo       ^<div id="map"^>^</div^>>> src\components\Map\OptimizedWorldMap.jsx
echo     ^</div^>>> src\components\Map\OptimizedWorldMap.jsx
echo   );>> src\components\Map\OptimizedWorldMap.jsx
echo };>> src\components\Map\OptimizedWorldMap.jsx
echo.>> src\components\Map\OptimizedWorldMap.jsx
echo export default OptimizedWorldMap;>> src\components\Map\OptimizedWorldMap.jsx

:: Créer Map.css
echo .map-container {> src\components\Map\Map.css
echo   width: 100%%;>> src\components\Map\Map.css
echo   height: 100vh;>> src\components\Map\Map.css
echo   position: relative;>> src\components\Map\Map.css
echo }>> src\components\Map\Map.css
echo.>> src\components\Map\Map.css
echo #map {>> src\components\Map\Map.css
echo   width: 100%%;>> src\components\Map\Map.css
echo   height: 100%%;>> src\components\Map\Map.css
echo   position: absolute;>> src\components\Map\Map.css
echo   top: 0;>> src\components\Map\Map.css
echo   left: 0;>> src\components\Map\Map.css
echo   right: 0;>> src\components\Map\Map.css
echo   bottom: 0;>> src\components\Map\Map.css
echo   z-index: 1;>> src\components\Map\Map.css
echo }>> src\components\Map\Map.css
echo.>> src\components\Map\Map.css
echo .leaflet-container {>> src\components\Map\Map.css
echo   width: 100%%;>> src\components\Map\Map.css
echo   height: 100%%;>> src\components\Map\Map.css
echo }>> src\components\Map\Map.css

:: Créer App.js
echo import React from 'react';> src\App.js
echo import OptimizedWorldMap from './components/Map/OptimizedWorldMap';>> src\App.js
echo import './App.css';>> src\App.js
echo.>> src\App.js
echo function App() {>> src\App.js
echo   return (>> src\App.js
echo     ^<div className="App"^>>> src\App.js
echo       ^<OptimizedWorldMap /^>>> src\App.js
echo     ^</div^>>> src\App.js
echo   );>> src\App.js
echo }>> src\App.js
echo.>> src\App.js
echo export default App;>> src\App.js

:: Créer App.css
echo .App {> src\App.css
echo   width: 100vw;>> src\App.css
echo   height: 100vh;>> src\App.css
echo   margin: 0;>> src\App.css
echo   padding: 0;>> src\App.css
echo }>> src\App.css

:: Modifier index.html
echo ^<!DOCTYPE html^>> public\index.html
echo ^<html lang="en"^>>> public\index.html
echo ^<head^>>> public\index.html
echo   ^<meta charset="utf-8" /^>>> public\index.html
echo   ^<meta name="viewport" content="width=device-width, initial-scale=1" /^>>> public\index.html
echo   ^<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" /^>>> public\index.html
echo   ^<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""^>^</script^>>> public\index.html
echo   ^<style^>body { margin: 0; padding: 0; }^</style^>>> public\index.html
echo   ^<title^>World Political Map^</title^>>> public\index.html
echo ^</head^>>> public\index.html
echo ^<body^>>> public\index.html
echo   ^<div id="root"^>^</div^>>> public\index.html
echo ^</body^>>> public\index.html
echo ^</html^>>> public\index.html

:: Lancer l'application
echo Demarrage de l'application...
call npm start

pause