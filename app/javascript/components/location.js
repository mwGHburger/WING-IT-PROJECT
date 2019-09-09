const initLocation = () => {
  const currentPositionSuccess = (position) => {
    localStorage.setItem("lat", position.coords.latitude)
    localStorage.setItem("lon", position.coords.longitude)
  }

  const currentPositionError = () => {
    console.log('Sorry we don\'t have a location');
  }

  // Bail early if we're on a page that doesn't have a lat or lon input.
  // return;
  // When the page loads, give us the users rough position so we have something.
  navigator.geolocation.getCurrentPosition(currentPositionSuccess, currentPositionError, {
    enableHighAccuracy: false,
  });

  // Whilst they're hanging out on the page, and typing things, grab a better position.
  navigator.geolocation.getCurrentPosition(currentPositionSuccess, currentPositionError, {
    enableHighAccuracy: true,
  });

  // If they go for a walk or their position changes for some reason, make sure we get the latest.
  navigator.geolocation.watchPosition(currentPositionSuccess, currentPositionError, {
    enableHighAccuracy: true,
  });
}

export { initLocation };
