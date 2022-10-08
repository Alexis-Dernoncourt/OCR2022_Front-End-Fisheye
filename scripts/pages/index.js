async function getPhotographers() {
    try {
        const data = await fetch('./data/photographers.json');
        if (!data.ok) {
            throw new Error(`code ${data.status}: ${data.statusText}`);
        }
        const response = await data.json();
        return response.photographers;
    } catch (error) {
        console.log(error);
    }
}

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

async function init() {
    // Récupère les datas des photographes
    const photographers = await getPhotographers();
    await displayData(photographers);
}

init();
