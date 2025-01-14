@echo off
echo Mise a jour de la carte interactive...

cd /d %USERPROFILE%\Documents\world-political-map

:: Creer le dossier components/Map s'il n'existe pas
echo Creation du dossier Map...
mkdir src\components\Map 2>nul

:: Creer le composant WorldMap
echo Creation du composant WorldMap...
echo import React, { useEffect, useState } from 'react';> src\components\Map\WorldMap.tsx
echo import 'leaflet/dist/leaflet.css';>> src\components\Map\WorldMap.tsx
echo.>> src\components\Map\WorldMap.tsx
echo const WorldMap: React.FC = () => {>> src\components\Map\WorldMap.tsx
echo   const [map, setMap] = useState^<L.Map ^| null^>(null);>> src\components\Map\WorldMap.tsx
echo.>> src\components\Map\WorldMap.tsx
echo   useEffect(() => {>> src\components\Map\WorldMap.tsx
echo     if (typeof window !== 'undefined' ^&^& !map ^&^& window.L) {>> src\components\Map\WorldMap.tsx
echo       const mapInstance = window.L.map('map', {>> src\components\Map\WorldMap.tsx
echo         center: [48.8566, 2.3522],>> src\components\Map\WorldMap.tsx
echo         zoom: 4,>> src\components\Map\WorldMap.tsx
echo         minZoom: 3,>> src\components\Map\WorldMap.tsx
echo         maxBounds: [[-90, -180], [90, 180]]>> src\components\Map\WorldMap.tsx
echo       });>> src\components\Map\WorldMap.tsx
echo.>> src\components\Map\WorldMap.tsx
echo       window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {>> src\components\Map\WorldMap.tsx
echo         attribution: '© OpenStreetMap contributors',>> src\components\Map\WorldMap.tsx
echo         maxZoom: 18>> src\components\Map\WorldMap.tsx
echo       }).addTo(mapInstance);>> src\components\Map\WorldMap.tsx
echo.>> src\components\Map\WorldMap.tsx
echo       setMap(mapInstance);>> src\components\Map\WorldMap.tsx
echo.>> src\components\Map\WorldMap.tsx
echo       return () => {>> src\components\Map\WorldMap.tsx
echo         mapInstance.remove();>> src\components\Map\WorldMap.tsx
echo       };>> src\components\Map\WorldMap.tsx
echo     }>> src\components\Map\WorldMap.tsx
echo   }, []);>> src\components\Map\WorldMap.tsx
echo.>> src\components\Map\WorldMap.tsx
echo   return ^<div id="map" style={{ width: '100%%', height: '100%%' }} /^>;>> src\components\Map\WorldMap.tsx
echo };>> src\components\Map\WorldMap.tsx
echo.>> src\components\Map\WorldMap.tsx
echo export default WorldMap;>> src\components\Map\WorldMap.tsx

:: Mettre a jour App.tsx
echo import React from 'react';> src\App.tsx
echo import WorldMap from './components/Map/WorldMap';>> src\App.tsx
echo import './App.css';>> src\App.tsx
echo.>> src\App.tsx
echo const App: React.FC = () => {>> src\App.tsx
echo   return (>> src\App.tsx
echo     ^<div className="App"^>>> src\App.tsx
echo       ^<WorldMap /^>>> src\App.tsx
echo     ^</div^>>> src\App.tsx
echo   );>> src\App.tsx
echo };>> src\App.tsx
echo.>> src\App.tsx
echo export default App;>> src\App.tsx

:: Mettre a jour index.html pour inclure Leaflet
echo Mise a jour de index.html pour Leaflet...
echo ^<!DOCTYPE html^>> public\index.html
echo ^<html lang="en"^>>> public\index.html
echo ^<head^>>> public\index.html
echo   ^<meta charset="utf-8" /^>>> public\index.html
echo   ^<link rel="icon" href="%%PUBLIC_URL%%/favicon.ico" /^>>> public\index.html
echo   ^<meta name="viewport" content="width=device-width, initial-scale=1" /^>>> public\index.html
echo   ^<meta name="theme-color" content="#000000" /^>>> public\index.html
echo   ^<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" /^>>> public\index.html
echo   ^<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""^>^</script^>>> public\index.html
echo   ^<title^>World Political Map^</title^>>> public\index.html
echo ^</head^>>> public\index.html
echo ^<body^>>> public\index.html
echo   ^<div id="root"^>^</div^>>> public\index.html
echo ^</body^>>> public\index.html
echo ^</html^>>> public\index.html

:: Installer les dépendances de Leaflet
echo Installation des types Leaflet...
call npm install --save-dev @types/leaflet

:: Redémarrer l'application
echo Redemarrage de l'application...
npm start

pause