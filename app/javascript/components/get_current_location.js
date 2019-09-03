const currentPositionSuccess = (position) => {
  console.log('latitude', position.coords.latitude,'longitude', position.coords.longitude);
}

const currentPositionError = () => {
  console.error('An error occured whilst retrieving location');
}

const getCurrentPosition = () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(currentPositionSuccess, currentPositionError)
  } else {
    alert('geolocation is not enabled on this browser');
  }
};

export { getCurrentPosition };
