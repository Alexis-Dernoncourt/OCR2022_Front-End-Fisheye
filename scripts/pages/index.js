/* eslint-disable no-undef */

/**
 * Fonction utilitaire principale de gestion de l'affichage des médias d'un photographe.
 * @param {Array} photographers
 */
async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');

  if (!photographers) {
    // show error message on screen
    const mainSection = document.querySelector('#main');
    const p = document.createElement('p');
    p.textContent = 'Il y a eu une erreur...';
    p.classList.add('error-message');
    mainSection.appendChild(p);
  }

  photographers?.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

/**
 * Fonction init.
 */
async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  await displayData(photographers);
}

init();
