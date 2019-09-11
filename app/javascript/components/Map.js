import mapboxgl from 'mapbox-gl';
import fetch from 'cross-fetch';
import FileInputPreview from './FileInputPreview';

const CREATE_MODE = 'create';
const EXPLORE_MODE = 'explore';

export default class Map {
  constructor(mapSelector, postCardContainerSelector) {
    this.mapEl = document.querySelector(mapSelector);
    this.postCardContainerEl = document.querySelector(postCardContainerSelector);

    this.currentMarkers = {};
    this.map = null;
    this.mapMode = EXPLORE_MODE;
    this.geolocateControl = null;


    if (this.mapEl && this.postCardContainerEl) {
      this.init();
    }
    else {
      console.warn('Map element or postcard container element not found on this page');
    }
  }

  init() {
    this.map = this.buildMap(); // #1
    this.geolocateControl = this.buildGeoControl();


    // Add Current Location via GeoLocate Control
    this.map.addControl(this.geolocateControl); // #2
    // subscribe to event
    this.map.on('load', (e) => {
      this.geolocateControl.trigger();
    });

    // Mapbox listens to the event where the map boundaries shift
    this.map.on('moveend', this.onMapMoveEnd);
    this.geolocateControl.on('geolocate', () => {
      document.querySelector('.js-map-loading').classList.add('d-none');
    });
  }

  buildGeoControl() {
    return new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
      fitBoundsOptions: {
        maxZoom: 15,  // Zoom adjustment
        linear: false,
        animate: false,
      },
    });
  }

  buildMap() {
    mapboxgl.accessToken = this.mapEl.dataset.mapboxApiKey;
    return new mapboxgl.Map({
      container: this.mapEl,
      style: 'mapbox://styles/mapbox/light-v10',
      duration: 0.5,
      pitch: 60,
      zoom: 14
      //bearing: -60,
    });
  }

  addPostsToMap(posts) {
    Object.keys(this.currentMarkers).forEach(postId => {
      this.currentMarkers[postId].remove();
      // When adding posts to map, remove all current markers, not optimal
      delete this.currentMarkers[postId];
    });

    this.postCardContainerEl.innerHTML = '';

    posts.forEach((post) => {
      // stops loading markers on top of each other
      //if (!currentMarkers[post.id]) {
        const popup = new mapboxgl.Popup().setHTML() //`<img src='${post.photo.url}'>`; // Need to revisit this for customising windows

        const teaserCardEl = this.renderCardEl(post); //renderCardEl function creates small card based on post
        this.postCardContainerEl.appendChild(teaserCardEl); // Add cards to container

        teaserCardEl.addEventListener('click', () => {
          Rails.ajax({
            type: 'GET',
            url: post.url + '.js'
          })
        })

        const markerEl = document.createElement('div');
        markerEl.classList.add('map-marker');
        markerEl.innerHTML = `<img src=${post.user.photo.url}>`;

        markerEl.addEventListener('click', () => {
          this.postCardContainerEl.scrollLeft = teaserCardEl.offsetLeft;
        });
        // create markers from current post
        this.currentMarkers[post.id] = new mapboxgl.Marker({
          element: markerEl,
        })
          .setLngLat([ post.longitude, post.latitude ])
          .addTo(this.map);

        this.syncMapMode();
      //}
    });
  }

  addCreateFormToMap = (createFormHtml) => {
    const userLat = localStorage.getItem('lat');
    const userLon = localStorage.getItem('lon');

    const userCoords = [ userLon, userLat ];

    const popup = this.addPopupToMap(createFormHtml, userCoords, 'create-post-popup');
    popup.on('close', () => {
      this.mapMode = EXPLORE_MODE;
      this.syncMapMode();
    });


    this.map.flyTo({ center: userCoords, zoom: 18 });
    this.mapMode = CREATE_MODE;

    const popupEl = popup.getElement();
    const postFormEl = popupEl.querySelector('.js-create-post-form');
    popupEl.querySelector('.js-create-post-lon').value = userLon;
    popupEl.querySelector('.js-create-post-lat').value = userLat;

    this.syncMapMode();

    // File preview input.
    const fileInputPreview = new FileInputPreview({
      postImageInputSelector: '.js-post-form-image-field',
      postImageWrapperSelector: '.js-post-form-image-wrapper',
      uploadPreviewSelector: '.js-post-form-upload-preview',
      postFormEl,
    });
  }

  addPopupToMap(popupHtml, coords, className = '') {
    return new mapboxgl.Popup({
      anchor: 'bottom',
      className,
    })
      .setHTML(popupHtml)
      .setLngLat(coords)
      .addTo(this.map);
  }

  syncMapMode() {
    Object.values(this.currentMarkers).forEach(marker => {
      const markerEl = marker.getElement();
      markerEl.classList.toggle('map-marker--disabled', this.mapMode === CREATE_MODE);
    });

    document.body.classList.toggle('is--post-mode', this.mapMode === CREATE_MODE);
  }

  getLatestPostsForMapBounds() {
    const bounds = this.map.getBounds();
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
        this.addPostsToMap(postsResponse); // #3 Add posts to map
      });
  }

  onMapMoveEnd = () => {
    this.getLatestPostsForMapBounds();
  }

  renderCardEl = (post) => {
    const cardEl = document.createElement('div');
    cardEl.classList.add('card-small');

    cardEl.innerHTML = `
      <img class='js-post-photo' src='${post.post_photo}'/>
      <img class='js-user-avatar' src='${post.user.photo.url}' />
      <h2 class='card-small-title'>${post.content}
      <p class='card-small-time'>${post.time}</p></h2>
    `;

    return cardEl;
  }
}

