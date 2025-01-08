export const mapConfig = {
  defaultCenter: [48.8566, 2.3522],
  defaultZoom: 4,
  minZoom: 3,
  maxZoom: 18,
  maxBounds: [[-90, -180], [90, 180]],
  tileLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '© OpenStreetMap contributors'
};

export const markerConfig = {
  size: 16,
  borderWidth: 2,
  borderColor: 'white',
  shadowColor: 'rgba(0,0,0,0.3)'
};