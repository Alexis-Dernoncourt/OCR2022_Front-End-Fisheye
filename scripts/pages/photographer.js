let photosArrayState = [];

async function init() {
  const params = new URL(document.location).searchParams;
  const id = parseInt(params.get('id'));
  if (isNaN(id)) {
    window.location = '/';
  }
  await getPhotographer(id)
    .then(async (data) => {
      const photosOfUser = await getPhotographerGallery(id);
      photosArrayState = photosOfUser;
      const totalLikes = getTotalLikes(photosArrayState);
      const { price } = photographerFactory(data);
      displayPhotographerData(data);
      const filteredGalleryToDisplay = sortPhotographerGallery('Popularité', photosArrayState);
      displayPhotographerGallery(filteredGalleryToDisplay);
      showTotalLikesAndPriceFactory({ totalLikes, price });
      showSelectInputForm();
      getSelectFilter();
      showGalleryModal(photosArrayState.photosOfUser);
      likeHandler(photosArrayState);
    })
    .catch((err) => {
      console.log(err);
      window.location = '/'; //redirect to home if error and/or id is unknown
    });
}

async function getPhotographer(id) {
  const { photographers } = await getPhotographers();
  const p = photographers.find((el) => el.id === id);
  return p;
}

async function getPhotographerGallery(id) {
  const { media } = await getPhotographers();
  let photosOfUser = [];
  media.map((el) => {
    if (el.photographerId === id) {
      photosOfUser.push(el);
    }
    return;
  });
  return { photosOfUser };
}

function displayPhotographerData(photographer) {
  const photographerHeaderSection = document.querySelector('.photograph-header');
  const photographerModel = photographerFactory(photographer);
  const userByIdCardDOM = photographerModel.getUserByIdCardDOM();
  const userByIdImg = photographerModel.getUserPictureDOM();
  photographerHeaderSection.prepend(userByIdCardDOM);
  photographerHeaderSection.appendChild(userByIdImg);
}

function displayPhotographerGallery(medias) {
  const photographerGallerySection = document.querySelector('.photograph-gallery');
  const photos = medias.photosOfUser ? medias.photosOfUser : medias;
  photos.map((item) => {
    const mediaDOM = mediaFactory(item);
    const userMediaDOM = mediaDOM.getMediaTypeDOM();
    photographerGallerySection.append(userMediaDOM);
  });
}

function getTotalLikes(photographer) {
  let totalLikes = [];
  photographer.photosOfUser.forEach((el) => totalLikes.push(el.likes));
  const totalLikesOfUser = totalLikes.reduce((acc, el) => acc + el, 0);
  return totalLikesOfUser;
}

function showTotalLikesAndPriceFactory(data) {
  const mainElement = document.querySelector('main');
  const elementDOM = showPhotographerExtraInfosFactory();
  const priceAndLikeElement = elementDOM.getTotalLikesAndPriceDOM(data);
  mainElement.appendChild(priceAndLikeElement);
}

function showSelectInputForm() {
  const photographerGallerySection = document.querySelector('.photograph-gallery');
  const extraInfos = showPhotographerExtraInfosFactory();
  const selectElementDOM = extraInfos.getSelectItemDOM();
  photographerGallerySection.before(selectElementDOM);
}

function sortPhotographerGallery(filter, medias) {
  const photographerGallerySection = document.querySelector('.photograph-gallery');
  photographerGallerySection.innerHTML = '';

  if (filter === 'Popularité') {
    const items = medias.photosOfUser.sort((a, b) => a.likes < b.likes);
    return items;
  }
  if (filter === 'Date') {
    const items = medias.photosOfUser.sort((a, b) => new Date(b.date) - new Date(a.date));
    return items;
  }
  if (filter === 'Titre') {
    const items = medias.photosOfUser.sort((a, b) => a.title > b.title);
    return items;
  }
}

function getSelectFilter() {
  const selectInput = document.querySelector('#select-input');
  selectInput.addEventListener('change', async (e) => {
    const params = new URL(document.location).searchParams;
    const id = parseInt(params.get('id'));

    try {
      const filteredGallery = sortPhotographerGallery(e.target.value, photosArrayState);
      displayPhotographerGallery(filteredGallery);
      showGalleryModal(filteredGallery);
      likeHandler(filteredGallery);
    } catch (error) {
      console.log(error);
    }
  });
}

init();
