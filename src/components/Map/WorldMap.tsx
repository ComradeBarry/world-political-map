import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import { LatLngTuple } from 'leaflet';
import 'leaflet.markercluster';

// Couleurs par idéologie
const ideologyColors = {
  liberal: '#3498db',     // Bleu
  communist: '#e74c3c',   // Rouge
  green: '#2ecc71',      // Vert
  conservative: '#34495e', // Bleu foncé
  socialist: '#e67e22',   // Orange
  nationalist: '#9b59b6', // Violet
  centrist: '#7f8c8d'    // Gris
};

// Interface pour les partis politiques
interface PoliticalParty {
  id: string;
  name: string;
  country: string;
  coordinates: LatLngTuple;
  ideology: keyof typeof ideologyColors;
  yearFounded: number;
  status: 'active' | 'dissolved';
  description?: string;
}

// Données de test avec le bon typage
const sampleParties: PoliticalParty[] = [
  {
    id: 'fr-ps',
    name: "Parti Socialiste",
    country: "France",
    coordinates: [48.8566, 2.3522] as LatLngTuple,
    ideology: "socialist",
    yearFounded: 1969,
    status: "active",
    description: "Principal parti de gauche en France"
  },
  {
    id: 'de-grunen',
    name: "Die Grünen",
    country: "Germany",
    coordinates: [52.5200, 13.4050] as LatLngTuple,
    ideology: "green",
    yearFounded: 1980,
    status: "active",
    description: "Parti écologiste allemand"
  },
  {
    id: 'it-pd',
    name: "Partito Democratico",
    country: "Italy",
    coordinates: [41.9028, 12.4964] as LatLngTuple,
    ideology: "socialist",
    yearFounded: 2007,
    status: "active",
    description: "Principal parti de centre-gauche italien"
  },
  {
    id: 'uk-labour',
    name: "Labour Party",
    country: "United Kingdom",
    coordinates: [51.5074, -0.1278] as LatLngTuple,
    ideology: "socialist",
    yearFounded: 1900,
    status: "active",
    description: "Principal parti travailliste britannique"
  }
];

const WorldMap: React.FC = () => {
  const [map, setMap] = useState<L.Map | null>(null);
  const [selectedParty, setSelectedParty] = useState<PoliticalParty | null>(null);
  const [markerClusterGroup, setMarkerClusterGroup] = useState<L.MarkerClusterGroup | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && !map && window.L) {
      const mapInstance = window.L.map('map', {
        center: [48.8566, 2.3522] as LatLngTuple,
        zoom: 4,
        minZoom: 3,
        maxBounds: [[-90, -180], [90, 180]]
      });

      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18
      }).addTo(mapInstance);

      // Créer un groupe de marqueurs
      const clusterGroup = window.L.markerClusterGroup({
        iconCreateFunction: function(cluster) {
          const markers = cluster.getAllChildMarkers();
          const ideologyCounts: Record<string, number> = {};
          
          // Compter les idéologies dans le cluster
          markers.forEach(marker => {
            const party = (marker as any).party;
            if (party) {
              ideologyCounts[party.ideology] = (ideologyCounts[party.ideology] || 0) + 1;
            }
          });

          // Trouver l'idéologie dominante
          let dominantIdeology = Object.entries(ideologyCounts)
            .sort(([,a], [,b]) => b - a)[0]?.[0] || 'centrist';

          // Créer l'icône du cluster
          return window.L.divIcon({
            html: `<div style="
              background-color: ${ideologyColors[dominantIdeology as keyof typeof ideologyColors]};
              color: white;
              width: 30px;
              height: 30px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              border: 2px solid white;
              box-shadow: 0 0 4px rgba(0,0,0,0.3);
            ">${cluster.getChildCount()}</div>`,
            className: 'custom-cluster-icon',
            iconSize: window.L.point(30, 30)
          });
        }
      });

      // Ajouter les marqueurs au groupe
      sampleParties.forEach(party => {
        const icon = window.L.divIcon({
          className: 'custom-marker',
          html: `<div style="
            background-color: ${ideologyColors[party.ideology]};
            width: 12px;
            height: 12px;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 0 4px rgba(0,0,0,0.3);
          "></div>`,
          iconSize: [16, 16]
        });

        const marker = window.L.marker(party.coordinates, { icon });
        (marker as any).party = party;  // Stocker les données du parti dans le marqueur
        
        marker.bindPopup(`
          <div style="min-width: 200px;">
            <h3 style="margin: 0; font-size: 16px; color: ${ideologyColors[party.ideology]};">
              ${party.name}
            </h3>
            <p style="margin: 5px 0;"><strong>Pays:</strong> ${party.country}</p>
            <p style="margin: 5px 0;"><strong>Idéologie:</strong> ${party.ideology}</p>
            <p style="margin: 5px 0;"><strong>Fondé en:</strong> ${party.yearFounded}</p>
            ${party.description ? `<p style="margin: 5px 0;">${party.description}</p>` : ''}
          </div>
        `);

        marker.on('click', () => {
          setSelectedParty(party);
        });

        clusterGroup.addLayer(marker);
      });

      mapInstance.addLayer(clusterGroup);
      setMarkerClusterGroup(clusterGroup);
      setMap(mapInstance);

      return () => {
        mapInstance.remove();
      };
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div id="map" style={{ width: '100%', height: '100%' }} />
      {selectedParty && (
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'white',
          padding: '15px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          maxWidth: '300px'
        }}>
          <h2 style={{ marginTop: 0, color: ideologyColors[selectedParty.ideology] }}>
            {selectedParty.name}
          </h2>
          <p><strong>Pays:</strong> {selectedParty.country}</p>
          <p><strong>Idéologie:</strong> {selectedParty.ideology}</p>
          <p><strong>Fondé en:</strong> {selectedParty.yearFounded}</p>
          {selectedParty.description && <p>{selectedParty.description}</p>}
          <button
            onClick={() => setSelectedParty(null)}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              fontSize: '20px'
            }}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default WorldMap;