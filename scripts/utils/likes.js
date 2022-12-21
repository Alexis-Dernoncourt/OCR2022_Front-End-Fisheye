function likeHandler(array) {
  const likeBtn = document.querySelectorAll('.media-gallery-item-like-icon');
  likeBtn.forEach((e) => {
    if (!e.dataset.liked && sessionStorage.getItem('liked')?.includes(e.dataset.id)) {
      displayLikesWhenFilter();
    }
    e.addEventListener('click', (e) => addLike(e, array));
  });
}

function displayLikesWhenFilter() {
  const galleryImages = document.querySelectorAll('.photograph-gallery article .media-gallery-item-like-icon');
  const likedItems = JSON.parse(sessionStorage.getItem('liked'));

  galleryImages.forEach((el, key) => {
    if (likedItems.includes(el.dataset.id)) {
      el.dataset.liked = 'true';
    }
  });
}

function addLike(e, array) {
  const photoId = e.target.dataset.id;
  const liked = e.target.dataset.liked;
  const photosOfUser = array.photosOfUser ? array.photosOfUser : array;
  const likedItems = sessionStorage.getItem('liked')?.includes(photoId);

  if (photoId && !liked && !likedItems) {
    likeActionManager(photoId, photosOfUser, e.target, 'add', 'true');
  }
  if (photoId && liked && likedItems) {
    likeActionManager(photoId, photosOfUser, e.target, 'del', '');
  }
  return;
}

function findAndUpdateItemToLike(id, array, action) {
  let itemToUpdate;
  const indexInArray = array.findIndex((el) => el.id == id);
  const item = array.find((el) => el.id == id);

  if (action === 'add') {
    storeLikedItems(id, action);
    itemToUpdate = { ...item, likes: item.likes + 1 };
  }
  if (action === 'del') {
    storeLikedItems(id, action);
    itemToUpdate = { ...item, likes: item.likes - 1 };
  }

  photosArrayState.photosOfUser.splice(indexInArray, 1, itemToUpdate);
  return item;
}

function storeLikedItems(id, action) {
  const getLikedItems = sessionStorage.getItem('liked');
  if (getLikedItems) {
    const oldArray = JSON.parse(getLikedItems);
    const indexOfStoredLike = oldArray.findIndex((el) => el === id);
    if (action === 'add') {
      const newItemsToStore = [...oldArray, id];
      sessionStorage.setItem('liked', JSON.stringify(newItemsToStore));
    }
    if (action === 'del' && indexOfStoredLike >= 0) {
      oldArray.splice(indexOfStoredLike, 1);
      if (oldArray.length >= 1) {
        const newItemsToStore = [...oldArray];
        sessionStorage.setItem('liked', JSON.stringify(newItemsToStore));
      }

      if (oldArray.length < 1) {
        sessionStorage.removeItem('liked');
      }
    }
  } else {
    sessionStorage.setItem('liked', JSON.stringify([id]));
  }
}

function likeActionManager(photoId, photosOfUser, targetElement, action, datasetValue) {
  const element = findAndUpdateItemToLike(photoId, photosOfUser, action);
  const photoTotalLikes = element.likes;
  targetElement.dataset.liked = datasetValue;
  if (action === 'add') {
    targetElement.previousSibling.textContent = photoTotalLikes + 1;
  }
  if (action === 'del') {
    targetElement.previousSibling.textContent = photoTotalLikes - 1;
  }
  updateTotalLikes(action);
}

function updateTotalLikes(action) {
  const totalLikesElement = document.querySelector('.photographer-total-likes-and-price > div');
  const totalLikesContent = parseInt(totalLikesElement.textContent);
  if (action === 'add') {
    totalLikesElement.firstChild.textContent = totalLikesContent + 1;
  } else if (action === 'del') {
    totalLikesElement.firstChild.textContent = totalLikesContent - 1;
  }
}
