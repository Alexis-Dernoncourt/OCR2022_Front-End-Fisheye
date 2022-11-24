function galleryFactory(imageObject) {
  function getGalleryDOM() {
    const name = document.querySelector('.photograph-header-infos').dataset.firstname;
    const prevBtn = document.createElement('button');
    const nextBtn = document.createElement('button');
    const image = document.createElement('img');
    const title = document.createElement('p');
    const isVideo = imageObject.video ? true : false;
    const video = document.createElement('video');
    const source = document.createElement('source');

    prevBtn.classList.add('gallery-btn', 'gallery-prev-btn');
    nextBtn.classList.add('gallery-btn', 'gallery-next-btn');
    prevBtn.setAttribute('role', 'link');
    prevBtn.setAttribute('aria-label', 'Previous image');
    nextBtn.setAttribute('role', 'link');
    nextBtn.setAttribute('aria-label', 'Next image');
    prevBtn.dataset.goto = 'prev';
    nextBtn.dataset.goto = 'next';
    prevBtn.textContent = '<';
    nextBtn.textContent = '>';
    if (isVideo) {
      video.classList.add('gallery-image');
      source.setAttribute('src', `assets/medias/${name}/${imageObject.video}`);
      source.setAttribute('type', `video/${imageObject.video.split('.')[1]}`);
      video.setAttribute('alt', `${imageObject.title}`);
      video.setAttribute('aria-label', imageObject.title);
      video.setAttribute('controls', 'true');
      video.appendChild(source);
    } else {
      image.classList.add('gallery-image');
      image.setAttribute('src', `assets/medias/${name}/${imageObject.image}`);
      image.setAttribute('alt', imageObject.title);
    }
    title.textContent = imageObject.title;
    title.classList.add('galery-item-title');

    return { prevBtn, nextBtn, image, isVideo, video, title, imageObject };
  }

  return { getGalleryDOM };
}
