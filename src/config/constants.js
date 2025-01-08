export const ideologyColors = {
  liberal: '#3498db',
  communist: '#e74c3c',
  green: '#2ecc71',
  conservative: '#2c3e50',
  socialist: '#e67e22',
  nationalist: '#8e44ad',
  centrist: '#95a5a6'
};

export const mapConfig = {
  defaultCenter: [20, 0],
  defaultZoom: 2,
  minZoom: 2,
  maxZoom: 18,
  tileLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '© OpenStreetMap contributors'
};

export const clusterConfig = {
  chunkSize: 500,
  chunkDelay: 10,
  maxClusterRadius: (zoom) => zoom <= 4 ? 80 : zoom <= 6 ? 60 : zoom <= 8 ? 40 : 20,
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: false,
  zoomToBoundsOnClick: true,
  disableClusteringAtZoom: 19
};