function displayModal() {
  const modal = document.getElementById('contact_modal');
  const firstInputOfForm = document.getElementById('last');
  const modalChildren = document.querySelector('.modal');
  const mainElement = document.querySelector('#main');
  document.querySelector('body').style.overflowY = 'hidden';
  getPhotographerName();

  mainElement.setAttribute('aria-hidden', 'true');
  mainElement.setAttribute('tabindex', '-1');
  modal.setAttribute('aria-hidden', 'false');
  modal.style.display = 'flex';
  modalChildren.style.display = 'flex';
  firstInputOfForm.focus();
}

function closeModal() {
  const modal = document.getElementById('contact_modal');
  const modalChildren = document.querySelector('.modal');
  const mainElement = document.querySelector('#main');
  const modalHeaderBtn = document.getElementById('modal-contact-btn-page');
  document.querySelector('body').style.overflowY = '';

  mainElement.setAttribute('aria-hidden', 'false');
  mainElement.setAttribute('aria-hidden', 'true');
  modal.style.display = 'none';
  modalChildren.style.display = 'none';
  modalHeaderBtn.focus();
}

function showContactModal() {
  const modalHeaderBtn = document.getElementById('modal-contact-btn-page');
  modalHeaderBtn.addEventListener('click', displayModal);
}
function hideContactModal() {
  const modalHeaderBtn = document.getElementById('modal-contact-btn');
  modalHeaderBtn.addEventListener('click', closeModal);
}

function getPhotographerName() {
  const name = document.querySelector('.photograph-header-infos > h2').textContent;
  const modalTitle = document.querySelector('.modal > header > h2');
  const indexOfName = modalTitle.outerText.search(name);
  if (indexOfName == -1) modalTitle.append(name);
}

function closeModalOnEscapeKeypress() {
  const modal = document.getElementById('contact_modal');
  if (modal.style.display === 'flex') {
    closeModal();
  }
  return;
}

function keepFocusOnModal() {
  document.addEventListener('keydown', (e) => {
    const modalDiv = document.querySelector('.modal');
    const modalFocusableElements = modalDiv.querySelectorAll('button, input, textarea');
    const firstElement = modalFocusableElements[0];
    const lastElement = modalFocusableElements[modalFocusableElements.length - 1];

    if (e.key === 'Escape') {
      closeModalOnEscapeKeypress();
    }

    if (e.key === 'Tab') {
      if (e.target.outerHTML === firstElement.outerHTML && document.activeElement.outerHTML === firstElement.outerHTML) {
        modalFocusableElements[1].focus();
        e.preventDefault();
      } else if (e.target.outerHTML === lastElement.outerHTML) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  });
}

function init() {
  showContactModal();
  hideContactModal();
  keepFocusOnModal();
}

init();
