import * as L from 'leaflet'; // adds all of leaflet bounds in a varible for us to use.
import MiniMap from 'leaflet-minimap';
import homicides from '../_data/harvard_park_homicides.json';

const map = L.map('map', {
  scrollWheelZoom: false,
});

const satelliteLayer = L.tileLayer(
  'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGF0aW1lcyIsImEiOiJjanJmNjg4ZzYweGtvNDNxa2ZpZ2lma3Z4In0.g0lYVIEs9Y5QcUOhXactHA',
  {
    minZoom: 13,
  }
); // brings in a new map layer from map box. minZoom sets a limit for how far you can zoom out
satelliteLayer.addTo(map); // this connects the layer to our map. up to here we would have a blank map.
map.setView([33.983265, -118.306799], 18); //this sets the map's view to coordinates. the 15 refers to the zoom level. this is set to nearly street level. max is to 22.

homicides.forEach((obj) => {
  //another for loop, such as on the homepage
  L.circleMarker([obj.latitude, obj.longitude])
    .addTo(map)
    .bindTooltip(obj.first_name + ' ' + obj.last_name, { permanent: true });
});

// minimap layer
const satelliteLayer2 = L.tileLayer(
  'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGF0aW1lcyIsImEiOiJjanJmNjg4ZzYweGtvNDNxa2ZpZ2lma3Z4In0.g0lYVIEs9Y5QcUOhXactHA',
  {
    maxZoom: 11, // sets zoom
  }
);
const miniMap = new MiniMap(satelliteLayer2); // minimap layer attached to map
miniMap.addTo(map);
