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
        cardLink.setAttribute('tabindex', '1');
        const img = document.createElement('img');
        img.setAttribute('src', picture);
        img.setAttribute('alt', `${name}, photographe à ${city}, ${country}.`);
        img.setAttribute('aria-label', `Photo de ${name}, photographe à ${city}, ${country}.`);
        img.setAttribute('tabindex', '1');
        const h2 = document.createElement('h2');
        h2.textContent = name;
        h2.setAttribute('aria-label', `Nom du photographe: ${name}`);
        h2.setAttribute('tabindex', '1');
        const p = document.createElement('p');
        p.textContent = `${city}, ${country}`;
        const phrase = document.createElement('p');
        phrase.textContent = tagline;
        phrase.setAttribute('aria-label', `Phrase de présentation du photographe: ${tagline}`);
        phrase.setAttribute('tabindex', '1');
        const priceText = document.createElement('p');
        priceText.classList.add('price-info');
        priceText.textContent = `${price}€/jour`;
        priceText.setAttribute('aria-label', `Prix par jour de travail: ${price} euros.`);
        priceText.setAttribute('tabindex', '1');
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
        div.dataset.firstname = name.split(' ')[0];
        const h2 = document.createElement('h2');
        h2.textContent = name;
        h2.setAttribute('aria-label', 'Nom du photographe.');
        h2.setAttribute('tabindex', '1');
        const p = document.createElement('p');
        p.textContent = `${city}, ${country}`;
        p.setAttribute('aria-label', `Localisation photographe ${name}: ${city}, ${country}`);
        p.setAttribute('tabindex', '1');
        const phrase = document.createElement('p');
        phrase.textContent = tagline;
        phrase.setAttribute('aria-label', `Phrase de présentation du photographe: ${tagline}`);
        phrase.setAttribute('tabindex', '1');

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
        img.setAttribute('tabindex', '1');
        return img;
    }

    return { name, picture, price, getUserCardDOM, getUserByIdCardDOM, getUserPictureDOM };
}

function mediaFactory(data) {
    const firstNameDiv = document.querySelector('.photograph-header-infos');
    const firstName = firstNameDiv.dataset.firstname;

    function getMediaTypeDOM() {
        if (data.image) {
            const article = document.createElement('article');
            const div = document.createElement('div');
            div.classList.add('media-gallery-item-infos-container');
            const p1 = document.createElement('p');
            p1.textContent = data.title;
            const p2 = document.createElement('p');
            p2.textContent = `${data.likes} ♥`;
            div.append(p1, p2);
            const img = document.createElement('img');
            img.setAttribute('src', `assets/medias/${firstName}/${data.image}`);
            img.setAttribute('alt', `${data.title}`);
            img.classList.add('media-gallery-item');
            img.setAttribute('aria-label', `${data.title}`);
            img.setAttribute('tabindex', 1);
            article.appendChild(img);
            article.appendChild(div);

            return article;
        }
        if (data.video) {
            const article = document.createElement('article');
            const div = document.createElement('div');
            div.classList.add('media-gallery-item-infos-container');
            const p1 = document.createElement('p');
            p1.textContent = data.title;
            const p2 = document.createElement('p');
            p2.textContent = `${data.likes} ♥`;
            div.append(p1, p2);
            const video = document.createElement('video');
            const source = document.createElement('source');
            source.setAttribute('src', `assets/medias/${firstName}/${data.video}`);
            source.setAttribute('type', `video/${data.video.split('.')[1]}`);
            video.setAttribute('alt', `assets/medias/${firstName}/${data.title}`);
            video.classList.add('media-gallery-item', 'video');
            video.setAttribute('aria-label', data.title);
            video.appendChild(source);
            article.appendChild(video);
            article.appendChild(div);

            return article;
        }
    }

    return { getMediaTypeDOM };
}

function showPhotographerTotalLikesAndPriceFactory() {
    function getTotalLikesAndPriceDOM(data) {
        const { totalLikes, price } = data;

        const aside = document.createElement('aside');
        aside.classList.add('photographer-total-likes-and-price');
        const div1 = document.createElement('div');
        const span = document.createElement('span');
        div1.textContent = totalLikes;
        div1.appendChild(span);
        span.textContent = ' ♥';
        const div2 = document.createElement('div');
        div2.textContent = `${price}€ / jour`;
        aside.appendChild(div1);
        aside.appendChild(div2);

        return aside;
    }

    return { getTotalLikesAndPriceDOM };
}
