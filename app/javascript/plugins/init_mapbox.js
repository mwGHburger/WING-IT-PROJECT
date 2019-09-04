import mapboxgl from 'mapbox-gl';

const mapElement = document.getElementById('map');

const geolocateControl = new mapboxgl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true
  },
  trackUserLocation: true,
  fitBoundsOptions: {
    maxZoom: 15 // Zoom adjustment
  }
});

// Create Map
const buildMap = () => {
  mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
  return new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v10',
    pitch: 60,
    bearing: -60,
  });
};

// Add Markers to Map
const addMarkersToMap = (map, markers) => {
  markers.forEach((marker) => {
    const popup = new mapboxgl.Popup().setHTML(marker.infoWindow); // For popups
    new mapboxgl.Marker()
      .setLngLat([ marker.lng, marker.lat ])
      .setPopup(popup) // For popup windows
      .addTo(map);
  });
};

// Fit maps to Markers
const fitMapToMarkers = (map, markers) => {
  const bounds = new mapboxgl.LngLatBounds();
  markers.forEach(marker => bounds.extend([ marker.lng, marker.lat ]));
  map.fitBounds(bounds, { duration: 0, padding: 70, maxZoom: 30 });
};

const initMapbox = () => {
  if (mapElement) {
    const map = buildMap();
    const markers = JSON.parse(mapElement.dataset.markers);
    addMarkersToMap(map, markers);
    fitMapToMarkers(map, markers);
    // Add Current Location via GeoLocate Control
    map.addControl(geolocateControl);
    // subscribe to event
    map.on('load', (e) => {
      geolocateControl.trigger();
      console.log("ok")
    });

    // Test
    // Listens when current user position is available
    geolocateControl.on('geolocate',(e) => {
      console.log("wow")
    });
    // Listens if current user position is not avaiable
    geolocateControl.on('error',(e) => {
      alert("Sorry your Geolocation is not available!")
    });
    //Test

  }
};

export { initMapbox };
