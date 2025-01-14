import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';

const WorldMap: React.FC = () => {
  const [map, setMap] = useState<L.Map | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && !map && window.L) {
      const mapInstance = window.L.map('map', {
        center: [48.8566, 2.3522],
        zoom: 4,
        minZoom: 3,
        maxBounds: [[-90, -180], [90, 180]]
      });

      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18
      }).addTo(mapInstance);

      setMap(mapInstance);

      return () => {
        mapInstance.remove();
      };
    }
  }, []);

  return <div id="map" style={{ width: '100%', height: '100%' }} />;
};

export default WorldMap;