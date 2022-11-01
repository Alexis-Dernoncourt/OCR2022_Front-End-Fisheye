function displayModal() {
  const modal = document.getElementById('contact_modal');
  const firstInputOfForm = document.getElementById('last');
  const modalChildren = document.querySelector('.modal');
  const mainElement = document.querySelector('#main');
  document.querySelector('body').style.overflowY = 'hidden';
  getPhotographerName();

  mainElement.setAttribute('aria-hidden', 'true');
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

function closeModalRequest() {
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
      closeModalRequest();
    }

    if (e.key === 'Enter' && e.target.outerHTML === firstElement.outerHTML) {
      e.preventDefault();
      closeModalRequest();
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

function checkValidationFormOnSubmit(e) {
  e.preventDefault();
  // REGEX RULES
  const regex = {
    noSpecialChars: /^[a-zA-Z'\-àäâéèêëçùüû]{2,}$/i,
    mailCheck: /.+@.+\.[a-zA-Z]{2,}$/i,
  };
  const modalDiv = document.querySelector('.modal');
  const modalFormElements = modalDiv.querySelectorAll('input, textarea');
  const lastName = modalFormElements[0];
  const firstName = modalFormElements[1];
  const email = modalFormElements[2];
  const message = modalFormElements[3];
  const errorElement = document.createElement('p');
  errorElement.classList.add('form-error');
  let formIsValid = {};

  if (lastName.value && firstName.value && email.value && message.value) {
    // ### A REFACTORISER ### //
    if (!regex.noSpecialChars.test(lastName.value)) {
      const error = document.querySelector('#lastname-error');

      if (error === null) {
        errorElement.setAttribute('id', 'lastname-error');
        errorElement.textContent = 'Champs incorrect. Les caractères spéciaux ne sont pas autorisés. Corrigez votre saisie puis réessayez.';
        lastName.classList.add('form-border-error');
        lastName.after(errorElement);
        formIsValid.lastNameIsValid = false;
      }
    } else {
      const error = document.querySelector('#lastname-error');
      error?.remove();
      lastName.classList.remove('form-border-error');
      formIsValid.lastNameIsValid = true;
    }
    if (!regex.noSpecialChars.test(firstName.value)) {
      const error = document.querySelector('#firstname-error');

      if (error === null) {
        errorElement.setAttribute('id', 'firstname-error');
        errorElement.textContent = 'Champs incorrect. Les caractères spéciaux ne sont pas autorisés. Corrigez votre saisie puis réessayez.';
        firstName.classList.add('form-border-error');
        firstName.after(errorElement);
        formIsValid.firstNameIsValid = false;
      }
    } else {
      const error = document.querySelector('#firstname-error');
      error?.remove();
      firstName.classList.remove('form-border-error');
      formIsValid.firstNameIsValid = true;
    }
    if (!regex.mailCheck.test(email.value)) {
      const error = document.querySelector('#email-error');

      if (error === null) {
        errorElement.setAttribute('id', 'email-error');
        errorElement.textContent = 'Champs incorrect. Entrez une adresse mail valide (ex: john@mail.com). Corrigez votre saisie puis réessayez.';
        email.classList.add('form-border-error');
        email.after(errorElement);
        formIsValid.emailIsValid = false;
      }
    } else {
      const error = document.querySelector('#email-error');
      error?.remove();
      email.classList.remove('form-border-error');
      formIsValid.emailIsValid = true;
    }
    if (!regex.noSpecialChars.test(message.value)) {
      const error = document.querySelector('#message-error');
      if (error === null) {
        errorElement.setAttribute('id', 'message-error');
        errorElement.textContent = 'Champs incorrect. Les caractères spéciaux ne sont pas autorisés. Corrigez votre saisie puis réessayez.';
        message.classList.add('form-border-error');
        message.after(errorElement);
        formIsValid.messageIsValid = false;
      }
    } else {
      const error = document.querySelector('#message-error');
      error?.remove();
      message.classList.remove('form-border-error');
      formIsValid.messageIsValid = true;
    }
  }

  if (formIsValid.lastNameIsValid && formIsValid.firstNameIsValid && formIsValid.emailIsValid && formIsValid.messageIsValid) {
    console.table({ LASTNAME: lastName.value, FIRSTNAME: firstName.value, EMAIL: email.value, MESSAGE: message.value });
    document.querySelector('#contact-form').reset();
    closeModalRequest();
    alert('Merci, votre message a bien été envoyé !');
  }
}

function init() {
  showContactModal();
  hideContactModal();
  keepFocusOnModal();
  document.addEventListener('submit', checkValidationFormOnSubmit);
}

init();
