import React, { useState, useEffect, useMemo } from 'react';
import { MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { clusterCache } from '../../services/cacheService';
import { createProgressiveLoader } from '../../services/progressiveLoadingService';
import { createMarkerManager } from '../../services/markerService';

const OptimizedWorldMap = ({ parties = [] }) => {
  const [map, setMap] = useState(null);
  const [loader, setLoader] = useState(null);
  const [markerManager, setMarkerManager] = useState(null);

  // Initialisation de la carte
  useEffect(() => {
    if (typeof window === 'undefined' || !window.L) return;

    const mapInstance = window.L.map('map', {
      center: [20, 0],
      zoom: 2,
      minZoom: 2,
      maxZoom: 18
    });

    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapInstance);

    setMap(mapInstance);
    setLoader(createProgressiveLoader(mapInstance));
    setMarkerManager(createMarkerManager(mapInstance));

    return () => mapInstance.remove();
  }, []);

  // Gestion des markers
  useEffect(() => {
    if (!map || !loader || !markerManager) return;

    // Configuration du cache
    clusterCache.initializeQuadTree(map.getBounds());

    // Création et ajout des markers
    const markers = parties.map(party => markerManager.createMarker(party));
    loader.addToQueue(markers);

    // Gestion des événements de carte
    const handleMapMove = () => {
      loader.handleMapMovement();
    };

    map.on('moveend', handleMapMove);
    map.on('zoomend', handleMapMove);

    return () => {
      map.off('moveend', handleMapMove);
      map.off('zoomend', handleMapMove);
      loader.clearQueue();
      clusterCache.clear();
    };
  }, [map, loader, markerManager, parties]);

  return (
    <Card className="w-full h-[600px] relative">
      <div id="map" className="w-full h-full rounded-lg overflow-hidden" />
    </Card>
  );
};

export default OptimizedWorldMap;