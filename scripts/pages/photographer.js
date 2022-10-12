window.addEventListener("load", async () => {
  const params = new URL(document.location).searchParams;
  const id = parseInt(params.get("id"));
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
  return photosOfUser;
}

async function displayPhotographerData(photographer) {
  const photographerHeaderSection = document.querySelector(".photograph-header");
  const photographerModel = photographerFactory(photographer);
  const userByIdCardDOM = photographerModel.getUserByIdCardDOM();
  const userByIdImg = photographerModel.getUserPictureDOM();
  photographerHeaderSection.prepend(userByIdCardDOM);
  photographerHeaderSection.appendChild(userByIdImg);
}

async function displayPhotographerGallery(medias) {
  console.log(medias);
  const photographerHeaderSection = document.querySelector("main");
  // const photographerModel = photographerFactory(photographer);
  // const userByIdCardDOM = photographerModel.getUserByIdCardDOM();
  // const userByIdImg = photographerModel.getUserPictureDOM();
  // photographerHeaderSection.prepend(userByIdCardDOM);
  // photographerHeaderSection.appendChild(userByIdImg);
}
