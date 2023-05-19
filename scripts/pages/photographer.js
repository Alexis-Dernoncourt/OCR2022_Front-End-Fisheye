/* eslint-disable no-undef */

/**
 * Global variable @photosArrayState
 */
let photosArrayState = [];

/**
 * Fonction init.
 */
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

/**
 * Fonction qui récupère les datas d'un photographe en fonction de son id passé en paramètre.
 * @param {number} id
 * @returns
 */
async function getPhotographer(id) {
  const { photographers } = await getPhotographers();
  const p = photographers.find((el) => el.id === id);
  return p;
}

/**
 * Fonction qui récupère et retourne les photos (et vidéos s'il y en a) d'un photographe en fonction de son id passé en paramètre.
 * @param {number} id
 * @returns
 */
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

/**
 * Fonction qui récupère les données d'un photographe pour l'affichage (géré via une factory function) de ses informations sur sa page personnelle.
 * @param {Array} photographer
 */
function displayPhotographerData(photographer) {
  const photographerHeaderSection = document.querySelector('.photograph-header');
  const photographerModel = photographerFactory(photographer);
  const userByIdCardDOM = photographerModel.getUserByIdCardDOM();
  const userByIdImg = photographerModel.getUserPictureDOM();
  photographerHeaderSection.prepend(userByIdCardDOM);
  photographerHeaderSection.appendChild(userByIdImg);
}

/**
 * Fonction qui gère l'affichage de la gallerie d'un photographe.
 * @param {Array} medias
 */
function displayPhotographerGallery(medias) {
  const photographerGallerySection = document.querySelector('.photograph-gallery');
  const photos = medias.photosOfUser ? medias.photosOfUser : medias;
  photos.map((item) => {
    const mediaDOM = mediaFactory(item);
    const userMediaDOM = mediaDOM.getMediaTypeDOM();
    photographerGallerySection.append(userMediaDOM);
  });
}

/**
 * Fonction utilitaire qui calcule et retourne le total des likes pour un photographe.
 * @param {Array} photographer
 * @returns
 */
function getTotalLikes(photographer) {
  let totalLikes = [];
  photographer.photosOfUser.forEach((el) => totalLikes.push(el.likes));
  const totalLikesOfUser = totalLikes.reduce((acc, el) => acc + el, 0);
  return totalLikesOfUser;
}

/**
 * Fonction qui gère l'affichage du total des likes et du prix d'un photographe.
 * @param {Array} data
 */
function showTotalLikesAndPriceFactory(data) {
  const mainElement = document.querySelector('main');
  const elementDOM = showPhotographerExtraInfosFactory();
  const priceAndLikeElement = elementDOM.getTotalLikesAndPriceDOM(data);
  mainElement.appendChild(priceAndLikeElement);
}

/**
 * Fonction qui gère l'affichage du champ select pour les filtres des médias.
 */
function showSelectInputForm() {
  const photographerGallerySection = document.querySelector('.photograph-gallery');
  const extraInfos = showPhotographerExtraInfosFactory();
  const selectElementDOM = extraInfos.getSelectItemDOM();
  photographerGallerySection.before(selectElementDOM);
}

/**
 * Fonction utilitaire qui filtre les médias d'un photographe en fonction d'un paramètre @filter .
 * Retourne un tableau des éléments triés.
 * @param {'Popularité' | 'Date' | 'Titre'} filter
 * @param {Array} medias
 * @returns
 */
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

/**
 * Fonction utilitaire qui mets à jour l'affichage de la gallerie d'un photographe sur l'évènement 'change' du champ select.
 */
function getSelectFilter() {
  const selectInput = document.querySelector('#select-input');
  selectInput.addEventListener('change', async (e) => {
    try {
      const filteredGallery = sortPhotographerGallery(e.target.value, photosArrayState);
      displayPhotographerGallery(filteredGallery);
      likeHandler(filteredGallery);
      showGalleryModal(filteredGallery);
    } catch (error) {
      console.log(error);
    }
  });
}

init();
