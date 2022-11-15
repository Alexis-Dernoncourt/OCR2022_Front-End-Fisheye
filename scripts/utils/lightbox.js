function init() {
  console.log('init');
  showGalleryModal();
}

function displayGallery(e) {
  console.log('element02=>', e.target);
  const gallery = document.getElementById('lightbox_modal');
  const closeBtn = document.getElementById('lightbox-icon-close');
  const mainElement = document.querySelector('#main');
  document.querySelector('body').style.overflowY = 'hidden';
  // showGallery(); => afficher l'élément cliqué et rendre possible la navigtion (prev / next)

  mainElement.setAttribute('aria-hidden', 'true');
  gallery.setAttribute('aria-hidden', 'false');
  gallery.style.display = 'flex';
  closeBtn.focus();
  closeBtn.addEventListener('click', closeGallery);
}

function showGalleryModal() {
  setTimeout(() => {
    const galleryContent = document.querySelectorAll('.media-gallery-item');
    galleryContent.forEach((e) => {
      e.addEventListener('click', displayGallery);
    });
  }, 500);
}

function closeGallery() {
  const gallery = document.getElementById('lightbox_modal');
  const mainElement = document.querySelector('#main');
  // récupérer le dernier élément visité pour focus
  document.querySelector('body').style.overflowY = '';
  mainElement.setAttribute('aria-hidden', 'false');
  mainElement.setAttribute('aria-hidden', 'true');
  gallery.style.display = 'none';
  // dernier-élément-visité.focus();
}

// function hideGalleryModal() {
//   const galleryContent = document.getElementById('lightbox-icon-close');
//   galleryContent.addEventListener('click', closeGallery);
// }

init();
