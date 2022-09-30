function photographerFactory(data) {
    const { id, city, country, name, portrait, price, tagline } = data;
    console.log(data);

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        article.dataset.id = id;
        article.setAttribute('aria-label', `Carte de présentation du photographe ${name}.`);
        const img = document.createElement('img');
        img.setAttribute('src', picture);
        img.setAttribute('alt', `${name}, photographe à ${city}, ${country}.`);
        img.setAttribute('aria-label', `Photo de ${name}, photographe à ${city}, ${country}.`);
        const h2 = document.createElement('h2');
        h2.textContent = name;
        h2.setAttribute('aria-label', 'Nom du photographe.');
        const p = document.createElement('p');
        p.textContent = `${city}, ${country}`;
        p.setAttribute('aria-label', 'Situation géographique du photographe.');
        const phrase = document.createElement('p');
        phrase.textContent = tagline;
        phrase.setAttribute('aria-label', 'Phrase de présentation du photographe.');
        const priceText = document.createElement('p');
        priceText.classList.add('price-info');
        priceText.textContent = `${price}€/jour`;
        priceText.setAttribute('aria-label', `Prix par jour de travail: ${price} euros.`);
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(p);
        article.appendChild(phrase);
        article.appendChild(priceText);
        return article;
    }
    return { name, picture, getUserCardDOM };
}
