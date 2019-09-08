const latInputEl = document.querySelector('.js-lat');
const lonInputEl = document.querySelector('.js-lon');
const locationLoadingEl = document.querySelector('.js-create-post-loading');
const submitButton = document.querySelector('.js-create-post-button');
// const locationMessageEl = document.querySelector('.js-location-message');

const currentPositionSuccess = (position) => {
  latInputEl.value = position.coords.latitude;
  lonInputEl.value = position.coords.longitude;
  console.log('latitude', position.coords.latitude,'longitude', position.coords.longitude);

  locationLoadingEl.classList.add('d-none');
  submitButton.classList.remove('d-none');
  // locationMessageEl.innerText = 'Yay we got a location';

}

const currentPositionError = () => {
  locationLoadingEl.innerText = 'Sorry we don\'t have a location';
}

if (latInputEl || lonInputEl) {
  // Bail early if we're on a page that doesn't have a lat or lon input.
  // return;

  // When the page loads, give us the users rough position so we have something.
  navigator.geolocation.getCurrentPosition(currentPositionSuccess, currentPositionError, {
    enableHighAccuracy: false,
  });

  // Whilst they're hanging out on the page, and typing things, grab a better position.
  navigator.geolocation.getCurrentPosition(currentPositionSuccess, currentPositionError, {
    enableHighAccuracy: true
  });

  // If they go for a walk or their position changes for some reason, make sure we get the latest.
  navigator.geolocation.watchPosition(currentPositionSuccess, currentPositionError, {
    enableHighAccuracy: true,
  });
}
