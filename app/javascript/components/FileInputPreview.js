const defaultOptions = {
  postImageInputSelector: '',
  postImageWrapperSelector: '',
  uploadPreviewSelector: '',
  postFormEl: null,
}

export default class FileInputPreview {
  constructor(options = {}) {
    this.settings = {
      ...defaultOptions,
      ...options,
    };

    this.init();
  }

  init() {
    const postImageInput = document.querySelector(this.settings.postImageInputSelector);
    this.postImageWrapperEl = document.querySelector(this.settings.postImageWrapperSelector);
    postImageInput.addEventListener('change', () => {
      var oFReader = new FileReader();
      oFReader.readAsDataURL(postImageInput.files[0]);

      oFReader.onload = this.onImageSelected;
    });
  }

  onImageSelected = (oFREvent) => {
    const uploadPreviewEl = document.querySelector(this.settings.uploadPreviewSelector);
    uploadPreviewEl.classList.remove('d-none');
    uploadPreviewEl.src = oFREvent.target.result;

    this.settings.postFormEl.classList.add('create-post-form--has-image');
    this.postImageWrapperEl.classList.add('d-none');

    this.settings.postFormEl.querySelector('textarea').focus();
  }
}
