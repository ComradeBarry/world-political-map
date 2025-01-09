import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

// Couleurs par idéologie
const ideologyColors = {
  liberal: '#3498db',
  communist: '#e74c3c',
  green: '#2ecc71',
  conservative: '#34495e',
  socialist: '#e67e22',
  nationalist: '#9b59b6',
  centrist: '#7f8c8d'
};

// Données de test
const politicalParties = [
  {
    id: 'fr-ps',
    name: "Parti Socialiste",
    country: "France",
    coordinates: [48.8566, 2.3522],
    ideology: "socialist",
    yearFounded: 1969,
    yearDissolved: null,
    status: "active",
    description: "Parti majeur de la gauche française"
  },
  {
    id: 'fr-lr',
    name: "Les Républicains",
    country: "France",
    coordinates: [48.8566, 2.3522],
    ideology: "conservative",
    yearFounded: 2015,
    yearDissolved: null,
    status: "active",
    description: "Principal parti de droite français"
  },
  {
    id: 'de-spd',
    name: "SPD",
    country: "Germany",
    coordinates: [52.5200, 13.4050],
    ideology: "socialist",
    yearFounded: 1863,
    yearDissolved: null,
    status: "active",
    description: "Parti social-démocrate d'Allemagne"
  }
];

const FilterableMap = () => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedParty, setSelectedParty] = useState(null);
  const [filters, setFilters] = useState({
    country: 'all',
    ideology: 'all',
    period: 'all'
  });

  // Options pour les filtres
  const countries = [...new Set(politicalParties.map(p => p.country))];
  const ideologies = [...new Set(politicalParties.map(p => p.ideology))];

  // Filtrer les partis
  const filteredParties = politicalParties.filter(party => {
    if (filters.country !== 'all' && party.country !== filters.country) return false;
    if (filters.ideology !== 'all' && party.ideology !== filters.ideology) return false;
    if (filters.period === 'active' && party.yearDissolved) return false;
    if (filters.period === 'historical' && !party.yearDissolved) return false;
    return true;
  });

  // Stats pour les graphiques
  const ideologyStats = Object.entries(
    filteredParties.reduce((acc, party) => {
      acc[party.ideology] = (acc[party.ideology] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

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
    }
  }, []);

  useEffect(() => {
    if (!map) return;
    
    markers.forEach(marker => marker.remove());
    
    const newMarkers = filteredParties.map(party => {
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
        .addTo(map)
        .bindPopup(`
          <div style="min-width: 200px;">
            <h3 style="margin: 0; font-size: 16px;">${party.name}</h3>
            <p style="margin: 5px 0;"><strong>Pays:</strong> ${party.country}</p>
            <p style="margin: 5px 0;"><strong>Idéologie:</strong> ${party.ideology}</p>
            <p style="margin: 5px 0;"><strong>Fondé en:</strong> ${party.yearFounded}</p>
            ${party.yearDissolved ? 
              `<p style="margin: 5px 0;"><strong>Dissous en:</strong> ${party.yearDissolved}</p>` : ''}
            <p style="margin: 5px 0;">${party.description}</p>
          </div>
        `);

      marker.on('click', () => {
        setSelectedParty(party);
        map.panTo(party.coordinates);
      });

      return marker;
    });

    setMarkers(newMarkers);
  }, [map, filters]);

  return (
    <div className="h-screen flex">
      <div className="flex-1 relative">
        <div id="map" className="w-full h-full"></div>
        
        {/* Filtres */}
        <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-lg z-[1000]">
          <h3 className="text-lg font-bold mb-2">Filtres</h3>
          
          <div className="grid gap-4">
            <Select 
              value={filters.country}
              onValueChange={(value) => setFilters(f => ({ ...f, country: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pays" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les pays</SelectItem>
                {countries.map(country => (
                  <SelectItem key={country} value={country}>{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.ideology}
              onValueChange={(value) => setFilters(f => ({ ...f, ideology: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Idéologie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les idéologies</SelectItem>
                {ideologies.map(ideology => (
                  <SelectItem key={ideology} value={ideology}>{ideology}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.period}
              onValueChange={(value) => setFilters(f => ({ ...f, period: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les périodes</SelectItem>
                <SelectItem value="active">Partis actifs</SelectItem>
                <SelectItem value="historical">Partis historiques</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="w-80 bg-white p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Statistiques</h2>
        
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Distribution par idéologie</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart width={300} height={200}>
              <Pie
                data={ideologyStats}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {ideologyStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={ideologyColors[entry.name]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </CardContent>
        </Card>

        {selectedParty && (
          <Card>
            <CardHeader>
              <CardTitle>{selectedParty.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Pays:</strong> {selectedParty.country}</p>
              <p>
                <strong>Idéologie: </strong>
                <span style={{ color: ideologyColors[selectedParty.ideology] }}>
                  {selectedParty.ideology}
                </span>
              </p>
              <p><strong>Fondé en:</strong> {selectedParty.yearFounded}</p>
              {selectedParty.yearDissolved && (
                <p><strong>Dissous en:</strong> {selectedParty.yearDissolved}</p>
              )}
              <p className="mt-2">{selectedParty.description}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FilterableMap;