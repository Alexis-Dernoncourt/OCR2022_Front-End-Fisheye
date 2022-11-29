function likeHandler(array) {
    const likeBtn = document.querySelectorAll('.media-gallery-item-like-icon');
    likeBtn.forEach((e) => {
        e.addEventListener('click', (e) => addLike(e, array));
    });
}

function addLike(e, array) {
    const photoId = e.target.dataset.id;
    const liked = e.target.dataset.liked;
    const photosOfUser = array.photosOfUser ? array.photosOfUser : array;

    if (photoId && !liked) {
        const element = findItemToLike(photoId, photosOfUser);
        const photoTotalLikes = element.likes;

        e.target.dataset.liked = 'true';
        e.target.previousSibling.textContent = photoTotalLikes + 1;
        updateTotalLikes();
    }
    return;
}

function findItemToLike(id, array) {
    const item = array.find((el) => el.id == id);
    return item;
}

function updateTotalLikes() {
    const totalLikesElement = document.querySelector('.photographer-total-likes-and-price > div');
    const totalLikesContent = parseInt(totalLikesElement.textContent);
    totalLikesElement.firstChild.textContent = totalLikesContent + 1;
}
