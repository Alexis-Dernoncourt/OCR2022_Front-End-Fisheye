/* eslint-disable no-undef */

/**
 * Fonction utilitaire pour la gestion de l'affichage de la modale gallerie d'images.
 * @param {Event} e 
 * @param {Array} photosArrayState 
 * @returns 
 */
async function displayGallery(e, photosArrayState) {
  if (e.nodeName === 'OPTION') {
    return;
  }
  const params = new URL(document.location).searchParams;
  const id = parseInt(params.get('id'));
  const gallery = document.getElementById('lightbox_modal');
  const closeBtn = document.getElementById('lightbox-icon-close');
  const mainElement = document.querySelector('#main');
  const videoSubItem = document.querySelector('.media-gallery-item.video');
  videoSubItem.setAttribute('tabindex', '-1');

  let photosOfUserGallery;
  if (!photosArrayState) {
    const { photosOfUser } = await getPhotographerGallery(id);
    photosOfUserGallery = photosOfUser;
  } else {
    photosOfUserGallery = photosArrayState;
  }
  const photoId = e.target ? e.target.dataset.id : e.dataset.id;

  document.querySelector('body').style.overflowY = 'hidden';
  mainElement.setAttribute('aria-hidden', 'true');
  gallery.setAttribute('aria-hidden', 'false');
  gallery.style.display = 'flex';
  getMediasGallery(photosOfUserGallery, photoId);
  closeBtn.focus();
  closeBtn.addEventListener('click', closeGallery);
  document.addEventListener('keydown', (e) => keepFocusOnGallery(e));
}

/**
 * Fonction utilitaire de gestion de l'évènement pour affichage de la modale gallerie d'images.
 * @param {?Array} arr 
 */
// eslint-disable-next-line no-unused-vars
function showGalleryModal(arr = null) {
  const galleryContent = document.querySelectorAll('.media-gallery-item');
  document.addEventListener('keydown', async (e) => {
    if ((e.key === ' ' || e.key === 'Enter') && e.target.parentElement.nodeName === 'DIV' && e.target.parentElement.classList.contains('photograph-gallery')) {
      if (e.target.nodeName === 'VIDEO') {
        return;
      } else {
        try {
          await displayGallery(e.target.firstChild, arr);
        } catch (error) {
          console.info(error);
        }
      }
    }
  });
  galleryContent.forEach((item) => {
    item.addEventListener('click', (e) => displayGallery(e, arr));
  });
}

/**
 * Fonction utilitaire de gestion de l'évènement pour fermer la modale gallerie d'images.
 */
function closeGallery() {
  const domElement = document.getElementById('lightbox-medias-content');
  const currentId = document.querySelector('.galery-content-container')?.dataset?.imageId;
  const gallery = document.getElementById('lightbox_modal');
  const mainElement = document.querySelector('#main');
  document.querySelector('body').style.overflowY = '';
  mainElement.setAttribute('aria-hidden', 'false');
  mainElement.setAttribute('aria-hidden', 'true');
  gallery.style.display = 'none';
  domElement.innerHTML = '';

  // récupère le dernier élément visité pour focus
  const elementsId = document.querySelectorAll('.photograph-gallery article .media-gallery-item');
  elementsId.forEach((e) => {
    if (currentId && e.dataset.id === currentId) {
      e.parentElement.focus();
    }
  });
}

/**
 * Fonction de récupération des médias de la gallerie. 
 * @param {Array} photos 
 * @param {number} photoId 
 */
function getMediasGallery(photos, photoId) {
  const photoIdInGallery = photos.findIndex((el) => el.id == photoId);
  getContainerDOMGallery(photos, photoIdInGallery, photoId);
  getMediaToShowInGallery(photos, photoIdInGallery);
}

/**
 * Fonction utilitaire de récupération du dom d'une image.
 * @param {Array} arrayOfUserPhotos 
 * @param {number} selectedId 
 * @returns Object
 */
function findImageById(arrayOfUserPhotos, selectedId) {
  const srcToShow = arrayOfUserPhotos.find((_, i) => i == selectedId);
  const galleryDOM = galleryFactory(srcToShow);
  const galleryContent = galleryDOM.getGalleryDOM();
  return { galleryContent };
}

/**
 * Fonction utilitaire de récupération du dom de la gallerie d'images et de gestion des évènements sur les boutton de navigation suivant et précédent de la gallerie.
 * @param {Array} arrayOfUserPhotos 
 * @param {number} selectedId 
 * @param {number} photoId 
 */
function getContainerDOMGallery(arrayOfUserPhotos, selectedId, photoId) {
  const domElement = document.getElementById('lightbox-medias-content');
  domElement.innerHTML = '';
  const { galleryContent } = findImageById(arrayOfUserPhotos, selectedId);
  const divContentContainer = document.createElement('div');
  const divImageContainer = document.createElement('div');
  divContentContainer.classList.add('galery-content-container');
  divContentContainer.dataset.imageId = photoId;
  divImageContainer.classList.add('galery-image-container');
  divContentContainer.append(galleryContent.prevBtn);
  divContentContainer.append(galleryContent.nextBtn);
  divContentContainer.append(divImageContainer);
  domElement.append(divContentContainer);

  const prevBtn = document.querySelector('.gallery-prev-btn');
  const nextBtn = document.querySelector('.gallery-next-btn');
  prevBtn.addEventListener('click', (e) => navigateToNextOrPrevImage(e, arrayOfUserPhotos));
  nextBtn.addEventListener('click', (e) => navigateToNextOrPrevImage(e, arrayOfUserPhotos));
  document.addEventListener('keyup', (e) => navigateToNextOrPrevImage(e, arrayOfUserPhotos));
}

/**
 * Fonction de gestion de l'affichage du média attendu (vidéo ou image) au sein du dom.
 * @param {Array} arrayOfUserPhotos 
 * @param {number} selectedId 
 */
function getMediaToShowInGallery(arrayOfUserPhotos, selectedId) {
  const divContainer = document.createElement('div');
  const imageContainer = document.querySelector('.galery-image-container');
  const { galleryContent } = findImageById(arrayOfUserPhotos, selectedId);
  const currentImageID = arrayOfUserPhotos.findIndex((_, i) => i == selectedId);
  imageContainer.dataset.id = currentImageID;

  if (galleryContent.isVideo) {
    imageContainer.append(galleryContent.video);
  } else {
    divContainer.classList.add('galery-image-div');
    divContainer.appendChild(galleryContent.image);
    imageContainer.append(divContainer);
  }

  imageContainer.append(galleryContent.title);
}

/**
 * Fonction utilitaire de gestion des évènements de navigation dans la gallerie d'images.
 * @param {Event} event 
 * @param {Array} arrayOfUserPhotos 
 */
function navigateToNextOrPrevImage(event, arrayOfUserPhotos) {
  const btnIdentifier = event.target.dataset.goto;
  const lastIndexOfArray = arrayOfUserPhotos.length - 1;
  const container = document.querySelector('.galery-image-container');
  const currentID = container ? parseInt(container.dataset.id) : null;
  const keyEvents = ['ArrowLeft', 'ArrowRight', 'Escape'];

  if (event.type === 'keyup') {
    if (keyEvents.includes(event.key)) {
      event.key === keyEvents[0] && navigate(container, 'prev', currentID, lastIndexOfArray, arrayOfUserPhotos);
      event.key === keyEvents[1] && navigate(container, 'next', currentID, lastIndexOfArray, arrayOfUserPhotos);
      event.key === keyEvents[2] && closeGallery();
    }
  }

  if (event.type !== 'keyup') {
    btnIdentifier === 'prev' && navigate(container, 'prev', currentID, lastIndexOfArray, arrayOfUserPhotos);
    btnIdentifier === 'next' && navigate(container, 'next', currentID, lastIndexOfArray, arrayOfUserPhotos);
  }
}

/**
 * Fonction utilitaire liée à la navigation au sein de la gallerie d'images.
 * @param {HTMLElement} container 
 * @param {'prev' | 'next'} target 
 * @param {?number} currentId 
 * @param {number} lastIndex 
 * @param {Array} arrayOfData 
 */
function navigate(container, target, currentId, lastIndex, arrayOfData) {
  let targetIndex;
  container.innerHTML = '';

  if (target === 'prev') {
    targetIndex = currentId > 0 ? currentId - 1 : lastIndex;
  } else if (target === 'next') {
    targetIndex = currentId < lastIndex ? currentId + 1 : 0;
  }

  container.dataset.id = targetIndex;
  getMediaToShowInGallery(arrayOfData, targetIndex);
}

/**
 * Fonction de la gestion du focus au sein de la modale.
 * @param {Event} e 
 * @returns 
 */
function keepFocusOnGallery(e) {
  if (e.key === 'Tab') {
    const galleryDOMElements = document.querySelectorAll(
      '.lightbox-container #lightbox-icon-close, .lightbox-container .gallery-prev-btn, .lightbox-container .gallery-next-btn, .lightbox-container video'
    );
    const firstElement = galleryDOMElements[0];
    const lastElement = galleryDOMElements[galleryDOMElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  }
  return;
}
