/* eslint-disable no-unused-vars */

/**
 * Factory function pour la gestion des datas d'un photographe. 
 * @param {object} data 
 * @returns 
 */
function photographerFactory(data) {
  const { id, city, country, name, portrait, price, tagline } = data;
  const picture = `assets/photographers/${portrait}`;

  /**
   * Fonction générale utilitaire pour créer les éléments dom et récupérer les informations d'un photographe.
   * @returns 
   */
  function getUserCardDOM() {
    const article = document.createElement('article');
    article.setAttribute('aria-label', `Carte de présentation du photographe ${name}.`);
    const cardLink = document.createElement('a');
    cardLink.setAttribute('href', `photographer.html?id=${id}`);
    cardLink.classList.add('home-card-link-photographer');
    cardLink.setAttribute('aria-label', `Cliquer pour visiter la page dédiée au photographe ${name}.`);
    cardLink.setAttribute('tabindex', '0');
    const img = document.createElement('img');
    img.setAttribute('src', picture);
    img.setAttribute('alt', `${name}, photographe à ${city}, ${country}.`);
    const h2 = document.createElement('h2');
    h2.textContent = name;
    const p = document.createElement('p');
    p.textContent = `${city}, ${country}`;
    const phrase = document.createElement('p');
    phrase.textContent = tagline;
    const priceText = document.createElement('p');
    priceText.classList.add('price-info');
    priceText.textContent = `${price}€/jour`;
    article.appendChild(cardLink);
    cardLink.appendChild(img);
    cardLink.appendChild(h2);
    cardLink.appendChild(p);
    cardLink.appendChild(phrase);
    cardLink.appendChild(priceText);
    return article;
  }

  /**
   * Fonction utilisée pour créer les éléments dom et récupérer les informations d'un photographe en fonction de son id.
   * @returns 
   */
  function getUserByIdCardDOM() {
    const div = document.createElement('div');
    div.setAttribute('aria-label', `Informations du photographe: ${name}`);
    div.classList.add('photograph-header-infos');
    div.dataset.firstname = name.split(' ')[0];
    const h2 = document.createElement('h2');
    h2.textContent = name;
    const p = document.createElement('p');
    p.textContent = `${city}, ${country}`;
    const phrase = document.createElement('p');
    phrase.textContent = tagline;

    div.appendChild(h2);
    div.appendChild(p);
    div.appendChild(phrase);
    return div;
  }

  /**
   * Créé et retourne l'élément dom pour affichage de la photo du profil d'un photographe.
   * @returns 
   */
  function getUserPictureDOM() {
    const img = document.createElement('img');
    img.setAttribute('src', picture);
    img.setAttribute('alt', `${name}`);
    return img;
  }

  return { name, picture, price, getUserCardDOM, getUserByIdCardDOM, getUserPictureDOM };
}

/**
 * Factory function liée à la gestion des médias d'un photographe.
 * @param {object} data 
 * @returns 
 */
function mediaFactory(data) {
  const firstNameDiv = document.querySelector('.photograph-header-infos');
  const firstName = firstNameDiv.dataset.firstname;

  /**
   * Fonction utilitaire liée à la récupération du type de média à afficher (image ou vidéo).
   * @returns 
   */
  function getMediaTypeDOM() {
    const article = document.createElement('article');
    article.setAttribute('tabindex', '0');
    const div = document.createElement('div');
    div.classList.add('media-gallery-item-infos-container');
    const title = document.createElement('h2');
    const p = document.createElement('p');
    const icon = document.createElement('img');
    icon.setAttribute('src', 'assets/icons/heart-like.svg');
    icon.setAttribute('alt', 'likes');
    icon.classList.add('media-gallery-item-like-icon');
    icon.setAttribute('role', 'icon');
    icon.setAttribute('aria-label', 'Likes icon');
    icon.setAttribute('aria-hidden', 'true');
    icon.setAttribute('tabindex', '0');
    if (data.image) {
      title.textContent = data.title;
      icon.dataset.id = data.id;
      p.textContent = `${data.likes}`;
      p.append(icon);
      div.append(title, p);
      const img = document.createElement('img');
      img.setAttribute('src', `assets/medias/${firstName}/${data.image}`);
      img.setAttribute('alt', `${data.title}`);
      img.setAttribute('loading', 'lazy');
      img.classList.add('media-gallery-item');
      img.setAttribute('aria-label', `${data.title}`);
      img.setAttribute('tabindex', '-1');
      img.dataset.id = data.id;
      article.appendChild(img);
      article.appendChild(div);

      return article;
    }
    if (data.video) {
      title.textContent = data.title;
      icon.dataset.id = data.id;
      p.textContent = `${data.likes}`;
      p.append(icon);
      div.append(title, p);
      const video = document.createElement('video');
      const source = document.createElement('source');
      source.setAttribute('src', `assets/medias/${firstName}/${data.video}`);
      source.setAttribute('type', `video/${data.video.split('.')[1]}`);
      video.setAttribute('alt', `${data.title}`);
      video.classList.add('media-gallery-item', 'video');
      video.setAttribute('aria-label', data.title);
      video.setAttribute('tabindex', '-1');
      video.dataset.id = data.id;
      video.appendChild(source);
      article.appendChild(video);
      article.appendChild(div);

      return article;
    }
  }

  return { getMediaTypeDOM };
}

/**
 * Factory function pour récupérer des informations supplémentaires d'un photographe en vue de les afficher au sein du dom.
 * @returns 
 */
function showPhotographerExtraInfosFactory() {
  /**
   * Gestion de la création de l'élément select pour tri de la gallerie.
   * @returns 
   */
  function getSelectItemDOM() {
    const section = document.createElement('section');
    const form = document.createElement('form');
    form.classList.add('sort-gallery-input-container');
    const labelInput = document.createElement('label');
    labelInput.textContent = 'Trier par';
    labelInput.setAttribute('name', 'label-select-input');
    labelInput.setAttribute('for', 'select-input');
    labelInput.setAttribute('id', 'label-select-input');

    const selectInput = document.createElement('select');
    selectInput.setAttribute('name', 'select-input');
    selectInput.setAttribute('id', 'select-input');
    selectInput.setAttribute('tabindex', '0');
    const selectOption1 = document.createElement('option');
    const selectOption2 = document.createElement('option');
    const selectOption3 = document.createElement('option');

    selectOption1.setAttribute('value', 'Popularité');
    selectOption2.setAttribute('value', 'Date');
    selectOption3.setAttribute('value', 'Titre');
    selectOption1.textContent = 'Popularité';
    selectOption2.textContent = 'Date';
    selectOption3.textContent = 'Titre';

    form.append(labelInput);
    form.append(selectInput);
    selectInput.append(selectOption1, selectOption2, selectOption3);
    selectInput.classList.add('sort-gallery-input');
    section.appendChild(form);

    return section;
  }

  /**
   * Récupère le total des likes et le prix afin de créer le dom associé aux éléments.
   * @param {*} data 
   * @returns 
   */
  function getTotalLikesAndPriceDOM(data) {
    const { totalLikes, price } = data;

    const aside = document.createElement('aside');
    aside.classList.add('photographer-total-likes-and-price');
    const div1 = document.createElement('div');
    const icon = document.createElement('img');
    icon.setAttribute('src', 'assets/icons/heart-like-black.svg');
    icon.classList.add('media-gallery-item-like-icon');
    icon.setAttribute('role', 'icon');
    icon.setAttribute('aria-label', 'Likes icon');
    icon.setAttribute('aria-hidden', 'true');
    div1.textContent = totalLikes;
    div1.appendChild(icon);
    const div2 = document.createElement('div');
    div2.textContent = `${price}€ / jour`;
    aside.appendChild(div1);
    aside.appendChild(div2);

    return aside;
  }

  return { getSelectItemDOM, getTotalLikesAndPriceDOM };
}
