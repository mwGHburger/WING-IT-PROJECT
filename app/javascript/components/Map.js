import mapboxgl from 'mapbox-gl';
import fetch from 'cross-fetch';
import FileInputPreview from './FileInputPreview';

const CREATE_MODE = 'create';
const EXPLORE_MODE = 'explore';
const CARD_WIDTH = 180;
const SCREEN_WIDTH = window.outerWidth; // Assuming this doesn't change during session.

export default class Map {
  constructor(mapSelector, postCardContainerSelector) {
    this.mapEl = document.querySelector(mapSelector);
    this.postCardContainerEl = document.querySelector(postCardContainerSelector);

    this.currentMarkers = {};
    this.currentPosts = {};
    this.map = null;
    this.mapMode = EXPLORE_MODE;
    this.geolocateControl = null;
    this.activePost = null;
    this.initialLocationLoaded = false;


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
    // subscribe to event
    this.map.on('load', (e) => {
      this.map.addControl(this.geolocateControl); // #2
      this.geolocateControl.trigger();
    });

    // Mapbox listens to the event where the map boundaries shift
    this.map.on('moveend', this.onMapMoveEnd);

    this.geolocateControl.on('geolocate', () => {
      this.removeLoading();
      this.initialLocationLoaded = true;
    });

    this.geolocateControl.on('error', () => {
      if (this.initialLocationLoaded === false) {
        this.removeLoading();
        this.map.flyTo({
          center: [144.9890714,-37.8238087],
          zoom: 15,
          animate: false
        })
        this.initialLocationLoaded = true;
      }
    })

    setTimeout(() => {
      this.removeLoading();
    }, 5000);
  }

  removeLoading() {
    document.querySelector('.js-map-loading').classList.add('d-none');
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

  addPost(post, options) {
    options = options || {}
    const popup = new mapboxgl.Popup().setHTML() //`<img src='${post.photo.url}'>`; // Need to revisit this for customising windows

    const teaserCardEl = this.renderCardEl(post); //renderCardEl function creates small card based on post
    this.postCardContainerEl.appendChild(teaserCardEl); // Add cards to container

    teaserCardEl.addEventListener('click', () => {
      Rails.ajax({
        type: 'GET',
        url: post.url + '.js'
      });
      this.setPostActive(post);
    })
    this.currentPosts[post.id] = teaserCardEl;

    // style map marker
    const markerEl = document.createElement('div');
    markerEl.classList.add('map-marker');
    markerEl.innerHTML = `
                          <img src=${post.user.photo.url}>
                          <div class="speech-bubble" id="wave">
                            <div class="dot-alignment">
                            <span class="dot"></span>
                            <span class="dot"></span>
                            <span class="dot"></span>
                            </div>
                          </div>
                          `;

    markerEl.addEventListener('click', () => {
      this.setPostActive(post);
    });
    // create markers from current post
    this.currentMarkers[post.id] = new mapboxgl.Marker({
      element: markerEl,
    })
      .setLngLat([ post.longitude, post.latitude ])
      .addTo(this.map);

    this.syncMapMode();

    if(options.highlight) {
      console.log("highlight post")
      markerEl.classList.add('map-marker-animation');
    }
  }

  addPostsToMap(posts) {

    // Remove any marker and post that's currently on the map but not in our
    // new result.
    const newResultPostIds = posts.map(post => post.id);

    Object.keys(this.currentMarkers).forEach(postId => {
      // When adding posts to map, remove anything that doesn't overlap with the
      // current result set.
      if (!newResultPostIds.includes(parseInt(postId, 10))) {
        this.currentMarkers[postId].remove();
        delete this.currentMarkers[postId];

        this.currentPosts[postId].remove();
        delete this.currentPosts[postId];
      }
    });

    posts.forEach((post) => {
      if (!this.currentMarkers[post.id.toString()]) {
        this.addPost(post);
      }
    });

    this.syncActivePost();
  }

  addCreateFormToMap = (createFormHtml) => {
    const userLat = localStorage.getItem('lat');
    const userLon = localStorage.getItem('lon');

    const userCoords = [ userLon, userLat ];

    const popup = this.addPopupToMap(createFormHtml, userCoords, 'create-post-popup');
    this.mainPopup = popup;
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

    const postSubmitButton = postFormEl.querySelector(".js-create-post-button");
    postSubmitButton.addEventListener("click", (event) => {
      // Add loading behavior to the form
      // Disable button
      console.log("Sending stuff"); // happens imediatelly
      setTimeout(()=>{
        postSubmitButton.value = "Sending..."
      }, 1) // Defferred to wait for Rails Ajax to finish manipulating the form.
    });

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

  setPostActive(post) {
    this.activePost = post;

    this.syncActivePost();
  }

  syncMapMode() {
    Object.values(this.currentMarkers).forEach(marker => {
      const markerEl = marker.getElement();
      markerEl.classList.toggle('map-marker--disabled', this.mapMode === CREATE_MODE);
    });

    document.body.classList.toggle('is--post-mode', this.mapMode === CREATE_MODE);
  }

  syncActivePost() {
    Object.values(this.currentPosts).forEach(element => {
      element.classList.remove('card-small--active');
    });
    Object.values(this.currentMarkers).forEach(mapboxMarker => {
      const element = mapboxMarker.getElement();
      element.classList.remove('map-marker--active');
    });

    if (this.activePost) {
      const teaserCardEl = this.currentPosts[this.activePost.id];

      teaserCardEl.classList.add('card-small--active');
      this.currentMarkers[this.activePost.id].getElement().classList.add('map-marker--active');

      const extraXToMakeSureCardGoesToMiddle = (SCREEN_WIDTH - CARD_WIDTH) / 2;
      this.postCardContainerEl.scrollLeft = teaserCardEl.offsetLeft - extraXToMakeSureCardGoesToMiddle;
    }
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

    const uniquePhotoId = `post-teaser-photo-${post.id}`;

    cardEl.innerHTML = `
      <img async class='js-post-photo' src='${post.post_photo}' id="${uniquePhotoId}" onerror="window.onMapPhotoError('${uniquePhotoId}')" />
      <img async class='js-user-avatar' src='${post.user.photo.url}' />
      <h2 class='card-small-title'>${post.content}
      <p class='card-small-time'>${post.time}</p></h2>
    `;

    return cardEl;
  }
}

// Rails notifies action cable before images are uploaded to cloudinary which
// causes 404 errors to happen, so if the image doesn't load, keep retrying
// every second.
window.onMapPhotoError = function(uniquePhotoId) {
  setTimeout(() => {
    const photoEl = document.getElementById(uniquePhotoId);
    photoEl.src = `${photoEl.src}?t=${new Date().getTime()}`;
  }, 1000);
}

