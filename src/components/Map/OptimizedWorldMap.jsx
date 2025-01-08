import React, { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';

const OptimizedWorldMap = () => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && !map) {
      const L = window.L;
      if (!L) return;

      const mapInstance = L.map('map').setView([48.8566, 2.3522], 5);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstance);

      setMap(mapInstance);

      return () => {
        mapInstance.remove();
      };
    }
  }, [map]);

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <div id="map" style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
};

export default OptimizedWorldMap;