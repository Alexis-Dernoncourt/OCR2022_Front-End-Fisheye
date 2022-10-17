window.addEventListener('DOMContentLoaded', async () => {
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
            showSelectInputForm();
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
    const photos = medias.photosOfUser ? medias.photosOfUser : medias;
    photos.map((item) => {
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
        const item = medias.photosOfUser.sort((a, b) => a.likes < b.likes);
        return item;
    }
    if (filter === 'Date') {
    }
    if (filter === 'Titre') {
    }
}

window.addEventListener('load', async () => {
    document.querySelector('.photograph-header').addEventListener('click', async () => {
        const params = new URL(document.location).searchParams;
        const id = parseInt(params.get('id'));

        try {
            const photosOfUser = await getPhotographerGallery(id);
            const filteredGallery = sortPhotographerGallery('Popularité', photosOfUser);
            displayPhotographerGallery(filteredGallery);
        } catch (error) {
            console.log(error);
        }
        showVideosControls();
    });
});
