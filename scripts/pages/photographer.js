window.addEventListener('load', async () => {
    const params = new URL(document.location).searchParams;
    const id = parseInt(params.get('id'));
    await getPhotographer(id)
        .then(async (data) => {
            const photosOfUser = await getPhotographerGallery(id);
            const totalLikes = getTotalLikes(photosOfUser);
            const { price } = photographerFactory(data);
            displayPhotographerData(data);
            displayPhotographerGallery(photosOfUser);
            showVideosControls();
            showTotalLikesAndPriceFactory({ totalLikes, price });
        })
        .catch((err) => console.log(err));
});

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
    medias.photosOfUser.map((item) => {
        const mediaDOM = mediaFactory(item);
        const userMediaDOM = mediaDOM.getMediaTypeDOM();
        photographerGallerySection.append(userMediaDOM);
    });
}

function showVideosControls() {
    const video = document.querySelectorAll('.video');
    video.forEach((item) => {
        item.addEventListener('mouseover', () => {
            item.setAttribute('controls', 'true');
        });
        item.addEventListener('mouseleave', () => {
            item.removeAttribute('controls');
        });
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
    const elementDOM = showPhotographerTotalLikesAndPriceFactory();
    const priceAndLikeElement = elementDOM.getTotalLikesAndPriceDOM(data);
    mainElement.appendChild(priceAndLikeElement);
}
