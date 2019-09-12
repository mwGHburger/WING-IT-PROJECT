const storeCurrentPosition = (position) => {
  localStorage.setItem("lat", position.coords.latitude)
  localStorage.setItem("lon", position.coords.longitude)
}

const getCurrentPosition = () => ({
  lat: localStorage.getItem('lat'),
  lon: localStorage.getItem('lon'),
});

export { storeCurrentPosition, getCurrentPosition };
