import { ideologyColors } from '../config/constants';

class MarkerManager {
  constructor(map) {
    this.map = map;
    this.markers = new Map();
    this.visibleMarkers = new Set();
  }

  createMarker(party) {
    const marker = window.L.marker(party.coordinates, {
      icon: this.createCustomIcon(party.ideology)
    });

    marker.partyData = party;
    this.markers.set(party.id, marker);

    marker.bindPopup(this.createPopupContent(party));
    return marker;
  }

  createCustomIcon(ideology) {
    return window.L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          background-color: ${ideologyColors[ideology]};
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 0 4px rgba(0,0,0,0.3);
        "></div>
      `,
      iconSize: [12, 12],
      iconAnchor: [6, 6]
    });
  }

  createPopupContent(party) {
    return `
      <div class="party-popup">
        <h3 class="font-bold">${party.name}</h3>
        <p class="text-gray-600">${party.country}</p>
        <p><span class="font-medium">Idéologie:</span> ${party.ideology}</p>
        <p><span class="font-medium">Fondé en:</span> ${party.yearFounded}</p>
        ${party.yearDissolved ? 
          `<p><span class="font-medium">Dissous en:</span> ${party.yearDissolved}</p>` : 
          ''}
        ${party.description ? 
          `<p class="mt-2 text-sm">${party.description}</p>` : 
          ''}
      </div>
    `;
  }

  showMarker(marker) {
    if (!this.visibleMarkers.has(marker)) {
      marker.addTo(this.map);
      this.visibleMarkers.add(marker);
    }
  }

  hideMarker(marker) {
    if (this.visibleMarkers.has(marker)) {
      marker.remove();
      this.visibleMarkers.delete(marker);
    }
  }

  cleanup() {
    this.visibleMarkers.forEach(marker => marker.remove());
    this.visibleMarkers.clear();
    this.markers.clear();
  }
}

export const createMarkerManager = (map) => new MarkerManager(map);