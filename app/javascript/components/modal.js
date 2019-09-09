const getModal = (params) => {
  return $("#general-modal").modal(params);
}

const initModal = () => {
  window.generalModal = getModal;
};

export { initModal };
