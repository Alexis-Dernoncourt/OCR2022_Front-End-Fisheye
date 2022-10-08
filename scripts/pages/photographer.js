window.addEventListener('load', async () => {
    const params = new URL(document.location).searchParams;
    const id = parseInt(params.get('id'));
    await getPhotographer(id)
        .then(async (data) => {
            await displayPhotographerData(data);
        })
        .then(async () => {
            const photosOfUser = await getPhotographerGallery(id);
            await displayPhotographerGallery(photosOfUser);
        })
        .catch((err) => console.log(err));
});

async function getPhotographer(id) {
    try {
        const data = await fetch(`${LOCAL_URL}/data/photographers.json`);
        if (!data.ok) {
            throw new Error(`code ${data.status}: ${data.statusText}`);
        }
        const response = await data.json();
        const p = response.photographers.find((el) => el.id === id);
        return p;
    } catch (error) {
        console.log(error);
    }
}

async function getPhotographerGallery(id) {
    try {
        const data = await fetch(`${LOCAL_URL}/data/photographers.json`);
        if (!data.ok) {
            throw new Error(`code ${data.status}: ${data.statusText}`);
        }
        const response = await data.json();
        let photosOfUser = [];
        response.media.map((el) => {
            if (el.photographerId === id) {
                photosOfUser.push(el);
            }
            return;
        });
        return photosOfUser;
    } catch (error) {
        console.log(error);
    }
}

async function displayPhotographerData(photographer) {
    const photographerHeaderSection = document.querySelector('.photograph-header');
    const photographerModel = photographerFactory(photographer);
    const userByIdCardDOM = photographerModel.getUserByIdCardDOM();
    const userByIdImg = photographerModel.getUserPictureDOM();
    photographerHeaderSection.prepend(userByIdCardDOM);
    photographerHeaderSection.appendChild(userByIdImg);
}

async function displayPhotographerGallery(medias) {
    console.log(medias);
    const photographerHeaderSection = document.querySelector('main');
    // const photographerModel = photographerFactory(photographer);
    // const userByIdCardDOM = photographerModel.getUserByIdCardDOM();
    // const userByIdImg = photographerModel.getUserPictureDOM();
    // photographerHeaderSection.prepend(userByIdCardDOM);
    // photographerHeaderSection.appendChild(userByIdImg);
}
