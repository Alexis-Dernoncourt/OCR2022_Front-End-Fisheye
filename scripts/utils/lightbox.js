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

function showGalleryModal(arr = null) {
  const galleryContent = document.querySelectorAll('.media-gallery-item');
  document.addEventListener('keydown', async (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      try {
        await displayGallery(e.target.firstChild, arr);
      } catch (error) {
        console.info(error);
      }
    }
  });
  galleryContent.forEach((item) => {
    item.addEventListener('click', (e) => displayGallery(e, arr));
  });
}

function closeGallery() {
  const domElement = document.getElementById('lightbox-medias-content');
  const gallery = document.getElementById('lightbox_modal');
  const mainElement = document.querySelector('#main');
  // récupérer le dernier élément visité pour focus
  document.querySelector('body').style.overflowY = '';
  mainElement.setAttribute('aria-hidden', 'false');
  mainElement.setAttribute('aria-hidden', 'true');
  gallery.style.display = 'none';
  domElement.innerHTML = '';
  // dernier-élément-visité.focus();
}

function getMediasGallery(photos, photoId) {
  const photoIdInGallery = photos.findIndex((el) => el.id == photoId);
  getContainerDOMGallery(photos, photoIdInGallery);
  getMediaToShowInGallery(photos, photoIdInGallery);
}

function findImageById(arrayOfUserPhotos, selectedId) {
  const srcToShow = arrayOfUserPhotos.find((_, i) => i == selectedId);
  const galleryDOM = galleryFactory(srcToShow);
  const galleryContent = galleryDOM.getGalleryDOM();
  return { galleryContent };
}

function getContainerDOMGallery(arrayOfUserPhotos, selectedId) {
  const domElement = document.getElementById('lightbox-medias-content');
  domElement.classList.add('lightbox-content');
  const { galleryContent } = findImageById(arrayOfUserPhotos, selectedId);
  const divContentContainer = document.createElement('div');
  const divImageContainer = document.createElement('div');
  divContentContainer.classList.add('galery-content-container');
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

function getMediaToShowInGallery(arrayOfUserPhotos, selectedId) {
  const imageContainer = document.querySelector('.galery-image-container');
  const { galleryContent } = findImageById(arrayOfUserPhotos, selectedId);
  const currentImageID = arrayOfUserPhotos.findIndex((_, i) => i == selectedId);
  imageContainer.dataset.id = currentImageID;

  if (galleryContent.isVideo) {
    imageContainer.append(galleryContent.video);
  } else {
    imageContainer.append(galleryContent.image);
  }

  imageContainer.append(galleryContent.title);
}

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
