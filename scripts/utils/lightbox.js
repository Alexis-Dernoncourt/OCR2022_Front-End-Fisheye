function init() {
  showGalleryModal();
}

function galleryFactory(imageObject) {
  function getGalleryDOM() {
    const name = document.querySelector('.photograph-header-infos').dataset.firstname;
    const prevBtn = document.createElement('button');
    const nextBtn = document.createElement('button');
    const image = document.createElement('img');
    const title = document.createElement('p');
    const isVideo = imageObject.video ? true : false;
    const video = document.createElement('video');
    const source = document.createElement('source');

    prevBtn.classList.add('gallery-btn', 'gallery-prev-btn');
    nextBtn.classList.add('gallery-btn', 'gallery-next-btn');
    prevBtn.setAttribute('role', 'link');
    prevBtn.setAttribute('aria-label', 'Previous image');
    nextBtn.setAttribute('role', 'link');
    nextBtn.setAttribute('aria-label', 'Next image');
    prevBtn.dataset.goto = 'prev';
    nextBtn.dataset.goto = 'next';
    prevBtn.textContent = '<';
    nextBtn.textContent = '>';
    if (isVideo) {
      video.classList.add('gallery-image');
      source.setAttribute('src', `assets/medias/${name}/${imageObject.video}`);
      source.setAttribute('type', `video/${imageObject.video.split('.')[1]}`);
      video.setAttribute('alt', `${imageObject.title}`);
      video.setAttribute('aria-label', imageObject.title);
      video.setAttribute('controls', 'true');
      video.appendChild(source);
    } else {
      image.classList.add('gallery-image');
      image.setAttribute('src', `assets/medias/${name}/${imageObject.image}`);
      image.setAttribute('alt', imageObject.title);
    }
    title.textContent = imageObject.title;
    title.classList.add('galery-item-title');

    return { prevBtn, nextBtn, image, isVideo, video, title, imageObject };
  }

  return { getGalleryDOM };
}

async function displayGallery(e) {
  const params = new URL(document.location).searchParams;
  const id = parseInt(params.get('id'));
  const gallery = document.getElementById('lightbox_modal');
  const closeBtn = document.getElementById('lightbox-icon-close');
  const mainElement = document.querySelector('#main');
  const photosOfUserGallery = await getPhotographerGallery(id);
  const photoId = e.target.dataset.id;

  document.querySelector('body').style.overflowY = 'hidden';
  mainElement.setAttribute('aria-hidden', 'true');
  gallery.setAttribute('aria-hidden', 'false');
  gallery.style.display = 'flex';
  getMediasGallery(photosOfUserGallery, photoId);
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

// function hideGalleryModal() {
//   const galleryContent = document.getElementById('lightbox-icon-close');
//   galleryContent.addEventListener('click', closeGallery);
// }

function getMediasGallery(photos, photoId) {
  const { photosOfUser } = photos;
  const photoIdInGallery = photosOfUser.findIndex((el) => el.id == photoId);
  getContainerDOMGallery(photosOfUser, photoIdInGallery);
  getMediaToShowInGallery(photosOfUser, photoIdInGallery);
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
  const currentID = parseInt(container.dataset.id);
  const keyEvents = ['ArrowLeft', 'ArrowRight', 'Escape'];

  function navigate(target) {
    let targetIndex;
    container.innerHTML = '';

    if (target === 'prev') {
      targetIndex = currentID > 0 ? currentID - 1 : lastIndexOfArray;
    } else if (target === 'next') {
      targetIndex = currentID < lastIndexOfArray ? currentID + 1 : 0;
    }
    container.dataset.id = targetIndex;
    getMediaToShowInGallery(arrayOfUserPhotos, targetIndex);
  }

  if (event.key && keyEvents.includes(event.key)) {
    if (event.key === keyEvents[0]) {
      navigate('prev');
    }
    if (event.key === keyEvents[1]) {
      navigate('next');
    }
    if (event.key === keyEvents[2]) {
      closeGallery();
    }
  }

  if (btnIdentifier === 'prev') {
    navigate('prev');
  }
  if (btnIdentifier === 'next') {
    navigate('next');
  }
}

init();
