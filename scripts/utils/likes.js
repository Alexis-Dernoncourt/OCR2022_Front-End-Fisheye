function likeHandler(array) {
  const likeBtn = document.querySelectorAll('.media-gallery-item-like-icon');
  likeBtn.forEach((e) => {
    if (!e.dataset.liked && sessionStorage.getItem('liked')?.includes(e.dataset.id)) {
      sessionStorage.removeItem('liked');
    }
    e.addEventListener('click', (e) => addLike(e, array));
  });
}

function addLike(e, array) {
  const photoId = e.target.dataset.id;
  const liked = e.target.dataset.liked;
  const photosOfUser = array.photosOfUser ? array.photosOfUser : array;
  const likedItems = sessionStorage.getItem('liked')?.includes(photoId);

  if (photoId && !liked && !likedItems) {
    const element = findAndUpdateItemToLike(photoId, photosOfUser);
    const photoTotalLikes = element.likes;
    e.target.dataset.liked = 'true';
    e.target.previousSibling.textContent = photoTotalLikes + 1;
    updateTotalLikes();
  }
  return;
}

function findAndUpdateItemToLike(id, array) {
  storeLikedItems(id);
  const indexInArray = array.findIndex((el) => el.id == id);
  let itemToUpdate;
  const item = array.find((el) => el.id == id);
  itemToUpdate = { ...item, likes: item.likes + 1 };
  photosArrayState.photosOfUser.splice(indexInArray, 1, itemToUpdate);
  return item;
}

function storeLikedItems(id) {
  const getLikedItems = sessionStorage.getItem('liked');
  if (getLikedItems) {
    const oldArray = JSON.parse(getLikedItems);
    const newItemsToStore = [...oldArray, id];
    sessionStorage.setItem('liked', JSON.stringify(newItemsToStore));
  } else {
    sessionStorage.setItem('liked', JSON.stringify([id]));
  }
}

function updateTotalLikes() {
  const totalLikesElement = document.querySelector('.photographer-total-likes-and-price > div');
  const totalLikesContent = parseInt(totalLikesElement.textContent);
  totalLikesElement.firstChild.textContent = totalLikesContent + 1;
}
