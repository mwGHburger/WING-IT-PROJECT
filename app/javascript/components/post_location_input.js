const initPostLocation = (scope) => {
  scope = scope || document;

  const latInputEl = scope.querySelector('.js-lat');
  const lonInputEl = scope.querySelector('.js-lon');
  const locationLoadingEl = scope.querySelector('.js-create-post-loading');
  const submitButton = scope.querySelector('.js-create-post-button');

  if (latInputEl || lonInputEl) {
    latInputEl.value = localStorage.getItem("lat");
    lonInputEl.value = localStorage.getItem("lon");
    locationLoadingEl.classList.add('d-none');
    submitButton.classList.remove('d-none');
  }
}

window.initPostLocation = initPostLocation;

export { initPostLocation };
