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
      source.setAttribute('src', `/assets/medias/${name}/${imageObject.video}`);
      source.setAttribute('type', `video/${imageObject.video.split('.')[1]}`);
      video.setAttribute('alt', `${imageObject.title}`);
      video.setAttribute('aria-label', imageObject.title);
      video.setAttribute('controls', 'true');
      video.appendChild(source);
    } else {
      image.classList.add('gallery-image');
      image.setAttribute('src', `/assets/medias/${name}/${imageObject.image}`);
      image.setAttribute('alt', imageObject.title);
    }
    title.textContent = imageObject.title;

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

  getMediasGallery(photosOfUserGallery, photoId);
  document.querySelector('body').style.overflowY = 'hidden';
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

  //fonction qui récupère le tableau des médias et l'index à afficher dans la lightbox
  getMediasToShowInGallery(photosOfUser, photoIdInGallery);
}

function getMediasToShowInGallery(arrayOfUserPhotos, selectedId) {
  const domElement = document.getElementById('lightbox-medias-content');
  domElement.classList.add('lightbox-content');
  const srcToShow = arrayOfUserPhotos.find((_, i) => i == selectedId);
  const galleryDOM = galleryFactory(srcToShow);
  const galleryContent = galleryDOM.getGalleryDOM();

  const divContentContainer = document.createElement('div');
  const divImageContainer = document.createElement('div');
  divContentContainer.classList.add('galery-content-container');
  divImageContainer.classList.add('galery-image-container');
  divContentContainer.append(galleryContent.prevBtn);
  divContentContainer.append(galleryContent.nextBtn);
  if (galleryContent.isVideo) {
    divImageContainer.append(galleryContent.video);
    // divImageContainer.append(galleryContent.videoTitle);
  } else {
    divImageContainer.append(galleryContent.image);
  }
  divImageContainer.append(galleryContent.title);
  divContentContainer.append(divImageContainer);
  domElement.append(divContentContainer);

  const prevBtn = document.querySelector('.gallery-prev-btn');
  const nextBtn = document.querySelector('.gallery-next-btn');
  prevBtn.addEventListener('click', (e) => navigateToNextOrPrevImage(e, arrayOfUserPhotos, selectedId));
  nextBtn.addEventListener('click', (e) => navigateToNextOrPrevImage(e, arrayOfUserPhotos, selectedId));
}

function navigateToNextOrPrevImage(event, arrayOfUserPhotos, currentImageID) {
  event.preventDefault();
  const btnIdentifier = event.target.dataset.goto;
  const lastIndexOfArray = arrayOfUserPhotos.length - 1;

  function cleanHTML() {
    const container = document.querySelector('#lightbox-medias-content');
    container.innerHTML = '';
  }

  if (btnIdentifier === 'next') {
    const targetIndex = currentImageID < lastIndexOfArray ? currentImageID + 1 : 0;
    cleanHTML();
    getMediasToShowInGallery(arrayOfUserPhotos, targetIndex);
  } else if (btnIdentifier === 'prev') {
    const targetIndex = currentImageID > 0 ? currentImageID - 1 : lastIndexOfArray;
    cleanHTML();
    getMediasToShowInGallery(arrayOfUserPhotos, targetIndex);
  }
}

init();
