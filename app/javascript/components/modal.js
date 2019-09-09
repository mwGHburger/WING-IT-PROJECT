const modalInitializers = (event) => {
  const modal = event.currentTarget;

  initPostLocation(modal);
}

const initModal = () => {
  $(document).ready(function() {
    window.generalModal = $("#general-modal").on("shown.bs.modal", modalInitializers);
  });

};

export { initModal };
