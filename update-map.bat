@echo off
echo Mise a jour de la carte interactive...

cd /d %USERPROFILE%\Documents\world-political-map

:: Creer le dossier components/Map s'il n'existe pas
echo Creation du dossier Map...
mkdir src\components\Map 2>nul

:: Creer le composant WorldMap
echo Creation du composant WorldMap...
(
echo import React, { useEffect, useState } from 'react';
echo import 'leaflet/dist/leaflet.css';
echo.
echo const WorldMap: React.FC = () => {
echo   const [map, setMap] = useState^<L.Map ^| null^>(null);
echo.
echo   useEffect(() => {
echo     if (typeof window !== 'undefined' ^&^& !map ^&^& window.L) {
echo       const mapInstance = window.L.map('map', {
echo         center: [48.8566, 2.3522],
echo         zoom: 4,
echo         minZoom: 3,
echo         maxBounds: [[-90, -180], [90, 180]]
echo       });
echo.
echo       window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
echo         attribution: '© OpenStreetMap contributors',
echo         maxZoom: 18
echo       }).addTo(mapInstance);
echo.
echo       setMap(mapInstance);
echo.
echo       return () => {
echo         mapInstance.remove();
echo       };
echo     }
echo   }, []);
echo.
echo   return ^<div id="map" style={{ width: '100%%', height: '100%%' }} /^>;
echo };
echo.
echo export default WorldMap;
) > src\components\Map\WorldMap.tsx

:: Mettre a jour App.tsx
echo Creation d'App.tsx...
(
echo import React from 'react';
echo import WorldMap from './components/Map/WorldMap';
echo import './App.css';
echo.
echo const App: React.FC = () => {
echo   return (
echo     ^<div className="App"^>
echo       ^<WorldMap /^>
echo     ^</div^>
echo   );
echo };
echo.
echo export default App;
) > src\App.tsx

:: Mettre a jour index.html pour inclure Leaflet
echo Mise a jour de index.html pour Leaflet...
(
echo ^<!DOCTYPE html^>
echo ^<html lang="en"^>
echo ^<head^>
echo   ^<meta charset="utf-8" /^>
echo   ^<link rel="icon" href="%%PUBLIC_URL%%/favicon.ico" /^>
echo   ^<meta name="viewport" content="width=device-width, initial-scale=1" /^>
echo   ^<meta name="theme-color" content="#000000" /^>
echo   ^<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" /^>
echo   ^<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""^>^</script^>
echo   ^<title^>World Political Map^</title^>
echo ^</head^>
echo ^<body^>
echo   ^<div id="root"^>^</div^>
echo ^</body^>
echo ^</html^>
) > public\index.html

:: Installer les dependances de Leaflet
echo Installation des types Leaflet...
call npm install --save-dev @types/leaflet

:: Redemarrer l'application
echo Redemarrage de l'application...
npm start

pause