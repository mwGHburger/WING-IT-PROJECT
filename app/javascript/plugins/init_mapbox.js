import mapboxgl from 'mapbox-gl';
import fetch from 'cross-fetch'; // required for fetch json file from browser

const mapElement = document.getElementById('map');
const postCardPhotoEl = document.querySelector('.js-post-photo');
const postCardUsernameEl = document.querySelector('.js-username');
const postCardContentEl = document.querySelector('.js-post-content');
const postCardAvatarEl = document.querySelector('.js-user-avatar');
const postCardUrlEl = document.querySelector('.js-post-link');
const currentMarkers = {};

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
    //bearing: -60,
  });
};

// Add Markers to Map
const addPostsToMap = (map, posts) => {
  Object.keys(currentMarkers).forEach(postId => {
    currentMarkers[postId].remove();
    // When adding posts to map, remove all acurrent marker, not optimal
    delete currentMarkers[postId];
  });

  posts.forEach((post) => {
    // stops loading markers on top of each other
    //if (!currentMarkers[post.id]) {
      const popup = new mapboxgl.Popup().setHTML()//`<img src="${post.photo.url}">`; // Need to revisit this for customising windows

      const markerEl = document.createElement("div");
      markerEl.classList.add("map-marker")
      markerEl.innerHTML = `<img src=${post.user.photo.url}>`
      markerEl.addEventListener('click', () => {
        console.log(post)
        postCardPhotoEl.setAttribute("src", post.post_photo)
        postCardUrlEl.setAttribute("href", post.url)
        postCardAvatarEl.setAttribute("src", post.user.photo.url)
        postCardUsernameEl.innerHTML = post.user.name
        postCardContentEl.innerHTML = post.content

      });

      currentMarkers[post.id] = new mapboxgl.Marker({
        element:markerEl
      })
        .setLngLat([ post.longitude, post.latitude ])
        .addTo(map);
    //}
  });
};

// Fit maps to Markers
// const fitMapToMarkers = (map, markers) => {
//   const bounds = new mapboxgl.LngLatBounds();
//   markers.forEach(marker => bounds.extend([ marker.longitude, marker.latitude ]));
//   map.fitBounds(bounds, { duration: 0, padding: 70, maxZoom: 30 });
// };

const initMapbox = () => {
  if (mapElement) {
    const map = buildMap();
    // const markers = JSON.parse(mapElement.dataset.markers);
    // fitMapToMarkers(map, markers);
    // Add Current Location via GeoLocate Control
    map.addControl(geolocateControl);
    // subscribe to event
    map.on('load', (e) => {
      geolocateControl.trigger();
      console.log("ok")
    });

    // Mapbox listens to the event where the map boundaries shift
    map.on('moveend', (e) => {
      var bounds = map.getBounds();
      // Get Max Lat and Lng
      let northEast = bounds.getNorthEast()
      // Get Min Lat and Lng
      let southWest = bounds.getSouthWest()
      // define url params
      fetch(`/posts?latMin=${southWest.lat}&latMax=${northEast.lat}&lngMin=${southWest.lng}&lngMax=${northEast.lng}`, {
        headers: {
          'Accept': 'application/json' // Asking for a json response from browser
        }
      })
        .then(res => res.json()) // Receive JSON response and converting it into usable format
        .then(postsResponse => {
          addPostsToMap(map, postsResponse); // Add posts to map
          console.log(postsResponse);
        });
  });
  }
};

export { initMapbox };
