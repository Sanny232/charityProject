import * as L from 'leaflet';
import 'leaflet-css';

export function addMap() {
  const mymap = L.map('map');
  const location = new L.LatLng(49.7727071, 30.130049999999997);
  const markerIcon = {
    icon: L.icon({
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      iconUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png',
    }),
  };
  mymap.setView(location, 13);
  L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
  }).addTo(mymap);
  const marker = L.marker(location, markerIcon);
  marker.addTo(mymap);
}
