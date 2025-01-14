import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { LatLngTuple } from 'leaflet';

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
  }
];

const WorldMap: React.FC = () => {
  const [map, setMap] = useState<L.Map | null>(null);
  const [selectedParty, setSelectedParty] = useState<PoliticalParty | null>(null);

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

      setMap(mapInstance);

      // Créer les marqueurs avec popups
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

        const marker = window.L.marker(party.coordinates, { icon })
          .bindPopup(`
            <div style="min-width: 200px;">
              <h3 style="margin: 0; font-size: 16px; color: ${ideologyColors[party.ideology]};">
                ${party.name}
              </h3>
              <p style="margin: 5px 0;"><strong>Pays:</strong> ${party.country}</p>
              <p style="margin: 5px 0;"><strong>Idéologie:</strong> ${party.ideology}</p>
              <p style="margin: 5px 0;"><strong>Fondé en:</strong> ${party.yearFounded}</p>
              ${party.description ? `<p style="margin: 5px 0;">${party.description}</p>` : ''}
            </div>
          `)
          .addTo(mapInstance);

        marker.on('click', () => {
          setSelectedParty(party);
        });
      });

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