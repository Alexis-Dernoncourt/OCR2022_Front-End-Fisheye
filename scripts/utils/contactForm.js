/**
 * Fonction utilitaire de gestion de l'affichage de la modale formulaire de contact
 */
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

/**
 * Fonction utilitaire de gestion de la fermeture de la modale formulaire de contact
 */
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

/**
 * Fonction utilitaire de gestion de l'évènement click pour l'affichage de la modale formulaire de contact
 */
function showContactModal() {
  const modalHeaderBtn = document.getElementById('modal-contact-btn-page');
  modalHeaderBtn.addEventListener('click', displayModal);
}

/**
 * Fonction utilitaire de gestion de l'évènement click pour la fermeture de la modale formulaire de contact
 */
function hideContactModal() {
  const modalHeaderBtn = document.getElementById('modal-contact-btn');
  modalHeaderBtn.addEventListener('click', closeModal);
}

/**
 * Fonction utilitaire pour l'affichage du nom d'un photographe.
 */
function getPhotographerName() {
  const name = document.querySelector('.photograph-header-infos > h2').textContent;
  const modalTitle = document.querySelector('.modal > header > h2');
  const indexOfName = modalTitle.outerText.search(name);
  if (indexOfName == -1) modalTitle.append(name);
}

/**
 * Fonction utilitaire liée à la fermeture de la modale formulaire de contact
 */
function closeModalRequest() {
  const modal = document.getElementById('contact_modal');
  if (modal.style.display === 'flex') {
    closeModal();
  }
  return;
}

/**
 * Fonction utilitaire liée à la gestion du focus au sein de la modale formulaire de contact
 */
function keepFocusOnModal() {
  document.addEventListener('keydown', (e) => {
    const modalDiv = document.querySelector('.modal');
    const modalFocusableElements = modalDiv.querySelectorAll('button:not([disabled]), input, textarea');
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
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  });
}

// GESTION DES VALIDATIONS ET ERREURS DU FORMULAIRE DE CONTACT - MODALE
let formIsValid = {};

/**
 * Fonction utilitaire liée à la gestion de la validation des champs de la modale formulaire de contact
 */
function checkValidationOfModalForm() {
  // REGEX RULES
  const regex = {
    noSpecialChars: /^[a-zA-Z' \-.,;àäâéèêëçùüû]{2,}$/i,
    mailCheck: /.+@.+\.[a-zA-Z]{2,}$/i,
  };
  const modalDiv = document.querySelector('.modal');
  const modalFormElements = modalDiv.querySelectorAll('input, textarea');
  const errorElement = document.createElement('p');
  errorElement.classList.add('form-error');

  function errorFormManager(regexElement, formElement, selector, idAttribute, textContent, nameInObject) {
    if (!regex[regexElement].test(formElement.value)) {
      const error = document.querySelector(selector);

      if (error === null) {
        errorElement.setAttribute('id', idAttribute);
        errorElement.setAttribute('aria-invalid', 'true');
        errorElement.textContent = textContent;
        formElement.classList.add('form-border-error');
        formElement.after(errorElement);
        formIsValid[nameInObject] = false;
      }
    } else {
      const error = document.querySelector(selector);
      error?.remove();
      formElement.classList.remove('form-border-error');
      formIsValid[nameInObject] = true;
    }
  }

  modalFormElements.forEach((e) => {
    if (e.value) {
      errorFormManager(
        e.name === 'email' ? 'mailCheck' : 'noSpecialChars',
        e,
        `#${e.name.toLowerCase()}-error`,
        `${e.name.toLowerCase()}-error`,
        e.name === 'email'
          ? 'Champs incorrect. Entrez une adresse mail valide (ex: john@mail.com). Corrigez votre saisie puis réessayez.'
          : 'Champs incorrect. Les caractères spéciaux ne sont pas autorisés. Corrigez votre saisie puis réessayez.',
        `${e.name}IsValid`
      );
    }
  });
}

/**
 * Fonction utilitaire liée à la gestion de la validation du formulaire de contact: désactive le bouton d'envoi si le formulaire est invalide. 
 */
function disableSubmitIfInvalidModalForm() {
  const submitBtn = document.querySelector('#modal-form-btn');
  if (!formIsValid || !formIsValid.lastNameIsValid || !formIsValid.firstNameIsValid || !formIsValid.emailIsValid || !formIsValid.messageIsValid) {
    submitBtn.setAttribute('disabled', 'true');
  }
  if (formIsValid.lastNameIsValid && formIsValid.firstNameIsValid && formIsValid.emailIsValid && formIsValid.messageIsValid) {
    submitBtn.removeAttribute('disabled');
  }
}

/**
 * Fonction utilitaire liée à la validation du formulaire de contact.
 * Vérifie si tous les champs sont bien valides au moment de l'envoi.
 */
function checkValidationFormOnSubmit(e) {
  e.preventDefault();
  const modalDiv = document.querySelector('.modal');
  const modalFormElements = modalDiv.querySelectorAll('input, textarea');
  const lastName = modalFormElements[0];
  const firstName = modalFormElements[1];
  const email = modalFormElements[2];
  const message = modalFormElements[3];

  if (lastName.value && firstName.value && email.value && message.value) {
    if (formIsValid.lastNameIsValid && formIsValid.firstNameIsValid && formIsValid.emailIsValid && formIsValid.messageIsValid) {
      console.table({ LASTNAME: lastName.value, FIRSTNAME: firstName.value, EMAIL: email.value, MESSAGE: message.value });
      const firstNameValue = firstName.value;
      document.querySelector('#contact-form').reset();
      closeModalRequest();
      alert(`Merci ${firstNameValue}, votre message a bien été envoyé !`);
    }
  }
}

/**
 * Fonction init
 */
function init() {
  const submitBtn = document.querySelector('#modal-form-btn');
  showContactModal();
  hideContactModal();
  keepFocusOnModal();
  submitBtn.addEventListener('mouseover', disableSubmitIfInvalidModalForm);
  document.addEventListener('keydown', disableSubmitIfInvalidModalForm);
  document.addEventListener('change', checkValidationOfModalForm);
  document.addEventListener('submit', checkValidationFormOnSubmit);
}

init();
