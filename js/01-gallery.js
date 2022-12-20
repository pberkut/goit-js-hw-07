import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryRef = document.querySelector('.gallery');

const markup = galleryMarkup();

galleryRef.insertAdjacentHTML('beforeend', markup);

galleryRef.addEventListener('click', onPictureClick);

function galleryMarkup() {
  return galleryItems
    .map(({ original, preview, description }) => {
      return `
    <div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>
        `;
    })
    .join('');
}

function onPictureClick(evt) {
  evt.preventDefault();
  const isImg = evt.target.nodeName === 'IMG';
  if (!isImg) {
    return;
  }

  const pictureBigLink = evt.target.dataset.source;

  openPictureInModalWindow(pictureBigLink);
}

function openPictureInModalWindow(src) {
  const instanceWindowModal = basicLightbox.create(
    `
        <img src="${src}" width="800" height="600">
    `,
    {
      onShow: () => window.addEventListener('keydown', onPressEsc.bind(instanceWindowModal)),
      onClose: () => window.removeEventListener('keydown', onPressEsc.bind(instanceWindowModal)),
    },
  );

  instanceWindowModal.show();
}

function onPressEsc(evt) {
  if (evt.code === 'Escape') {
    this.close();
  }
}
