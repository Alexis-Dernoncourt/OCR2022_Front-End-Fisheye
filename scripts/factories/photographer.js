function photographerFactory(data) {
    const { id, city, country, name, portrait, price, tagline } = data;
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        article.setAttribute('aria-label', `Carte de présentation du photographe ${name}.`);
        const cardLink = document.createElement('a');
        cardLink.setAttribute('href', `photographer.html?id=${id}`);
        cardLink.classList.add('home-card-link-photographer');
        cardLink.setAttribute('aria-label', `Cliquer pour visiter la page dédiée au photographe ${name}.`);
        cardLink.setAttribute('tabindex', 1);
        const img = document.createElement('img');
        img.setAttribute('src', picture);
        img.setAttribute('alt', `${name}, photographe à ${city}, ${country}.`);
        img.setAttribute('aria-label', `Photo de ${name}, photographe à ${city}, ${country}.`);
        img.setAttribute('tabindex', 1);
        const h2 = document.createElement('h2');
        h2.textContent = name;
        h2.setAttribute('aria-label', `Nom du photographe: ${name}`);
        h2.setAttribute('tabindex', 1);
        const p = document.createElement('p');
        p.textContent = `${city}, ${country}`;
        const phrase = document.createElement('p');
        phrase.textContent = tagline;
        phrase.setAttribute('aria-label', `Phrase de présentation du photographe: ${tagline}`);
        phrase.setAttribute('tabindex', 1);
        const priceText = document.createElement('p');
        priceText.classList.add('price-info');
        priceText.textContent = `${price}€/jour`;
        priceText.setAttribute('aria-label', `Prix par jour de travail: ${price} euros.`);
        priceText.setAttribute('tabindex', 1);
        article.appendChild(cardLink);
        cardLink.appendChild(img);
        cardLink.appendChild(h2);
        cardLink.appendChild(p);
        cardLink.appendChild(phrase);
        cardLink.appendChild(priceText);
        return article;
    }

    function getUserByIdCardDOM() {
        const div = document.createElement('div');
        div.setAttribute('aria-label', `Informations du photographe: ${name}`);
        div.setAttribute('tabindex', 1);
        div.classList.add('photograph-header-infos');
        const h2 = document.createElement('h2');
        h2.textContent = name;
        h2.setAttribute('aria-label', 'Nom du photographe.');
        h2.setAttribute('tabindex', 1);
        const p = document.createElement('p');
        p.textContent = `${city}, ${country}`;
        p.setAttribute('aria-label', `Localisation photographe ${name}: ${city}, ${country}`);
        p.setAttribute('tabindex', 1);
        const phrase = document.createElement('p');
        phrase.textContent = tagline;
        phrase.setAttribute('aria-label', `Phrase de présentation du photographe: ${tagline}`);
        phrase.setAttribute('tabindex', 1);

        div.appendChild(h2);
        div.appendChild(p);
        div.appendChild(phrase);
        return div;
    }

    function getUserPictureDOM() {
        const img = document.createElement('img');
        img.setAttribute('src', picture);
        img.setAttribute('alt', `${name}, photographe à ${city}, ${country}.`);
        img.setAttribute('aria-label', `Photo de ${name}, photographe à ${city}, ${country}.`);
        img.setAttribute('tabindex', 1);
        return img;
    }
    return { name, picture, getUserCardDOM, getUserByIdCardDOM, getUserPictureDOM };
}
