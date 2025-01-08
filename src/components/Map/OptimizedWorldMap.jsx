import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import './Map.css';

const OptimizedWorldMap = () => {
  useEffect(() => {
    // Créer la carte seulement au premier rendu
    const map = window.L.map('map', {
      center: [20, 0],
      zoom: 3
    });

    // Ajouter la couche de tuiles
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18
    }).addTo(map);

    // Nettoyage à la destruction du composant
    return () => {
      map.remove();
    };
  }, []); // Tableau de dépendances vide = exécution unique

  return (
    <div className="map-container">
      <div id="map"></div>
    </div>
  );
};

export default OptimizedWorldMap;