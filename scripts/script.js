const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: 'Архыз',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt: 'Челябинск',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt: 'Иваново',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt: 'Камчатка',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt: 'Холмогорский район',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt: 'Байкал',
  },
];

const editProfileButton = document.querySelector('.intro__edit');

const profilePopup = document.querySelector('.profile-popup');
const imagePopup = document.querySelector('.popup-image');
const newItemPopup = document.querySelector('.new-item');

const imgImage = document.querySelector('.popup-image__image');
const imageCapture = document.querySelector('.popup-image__capture');

const addButton = document.querySelector('.intro__add-button');

const closePopupButton = document.querySelector('.popup__close');
const closeNewItemButton = document.querySelector('.new-item__close');
const closePopupImageButton = document.querySelector('.popup-image__close');

const profileForm = document.querySelector('.profile-form');
const nameInput = document.querySelector('.profile-form__name');
const jobInput = document.querySelector('.profile-form__capture');

const newItemForm = document.querySelector('.new-item-form');
const inputEl = document.querySelector('.new-item-form__name');
const inputElLink = document.querySelector('.new-item-form__capture');

const userName = document.querySelector('.intro__name');
const userCapture = document.querySelector('.intro__capture');

const listContainerEl = document.querySelector('.grid');
const templateEl = document.querySelector('.template');

render();

newItemForm.addEventListener('submit', handleAddCard);

editProfileButton.addEventListener('click', handleEditProfileButtonClick);

closePopupButton.addEventListener('click', function () {
  closePopup(profilePopup);
});
closeNewItemButton.addEventListener('click', function () {
  closePopup(newItemPopup);
})
closePopupImageButton.addEventListener('click', function () {
  closePopup(imagePopup);
})


profileForm.addEventListener('submit', handleProfileFormSubmit);

addButton.addEventListener('click', function () {
  openPopup(newItemPopup);
});

function handleImageClick(gridImg, gridText) {
  imgImage.src = gridImg.src;
  imgImage.alt = gridText.textContent;
  imageCapture.textContent = gridText.textContent;

  openPopup(imagePopup);
}

function handleAddCard(event) {
  event.preventDefault();
  const name = inputEl.value;
  const link = inputElLink.value;
  const card = getItem({name, link});
  listContainerEl.prepend(card);
  inputEl.value = '';
  inputElLink.value = '';

  closePopup(newItemPopup);
}

function handleRemoveCard(event) {
  const targetEl = event.target;
  const listItem = targetEl.closest('.grid__item');
  listItem.remove();
}

function handleEditProfileButtonClick() {
  nameInput.value = userName.textContent;
  jobInput.value = userCapture.textContent;
  openPopup(profilePopup);
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  userName.textContent = nameInput.value;
  userCapture.textContent = jobInput.value;
  closePopup(profilePopup);
}

function handleLikeClick(likeButton) {
  likeButton.classList.toggle('grid__heart_active');
}

function render() {
  const html = initialCards.map((item) => {
    return getItem(item);
  });

  listContainerEl.append(...html);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');

  document.addEventListener('keyup', function(evt) {
    if (evt.key === 'Escape') {
      closePopup(popup);
    }
  });
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', function (evt) {
  })
}

function getItem(item) {
  const newItemEl = templateEl.content.cloneNode(true);
  const gridText = newItemEl.querySelector('.grid__text');
  const gridImg = newItemEl.querySelector('.grid__image');
  const removeCard = newItemEl.querySelector('.grid__trash');
  const likeButton = newItemEl.querySelector('.grid__heart');

  gridImg.src = item.link;
  gridImg.alt = item.alt;
  gridText.textContent = item.name;

  removeCard.addEventListener('click', handleRemoveCard);

  gridImg.addEventListener('click', () => {
    handleImageClick(gridImg, gridText);
  });

  likeButton.addEventListener('click', () => {
    handleLikeClick(likeButton);
  });

  return newItemEl;
}

const showError = (form, input, errorMessageText, errorMessageClass, inputErrorClass) => {
  const errorMessage = form.querySelector(`#${input.id}-error`);

  errorMessage.textContent = errorMessageText;
  errorMessage.classList.add(errorMessageClass);

  input.classList.add(inputErrorClass);
}

const hideError = (form, input, errorMessageClass, inputErrorClass) => {
  const errorMessage = form.querySelector(`#${input.id}-error`);

  errorMessage.textContent = '';
  errorMessage.classList.add(errorMessageClass);

  input.classList.add(inputErrorClass);
}

const checkIfInputValid = (form, input, { inputErrorClass, errorClass }) => {
  if (!input.validity.valid) {
    showError(form, input, input.validationMessage, errorClass, inputErrorClass);
  } else {
    hideError(form, input, errorClass, inputErrorClass);
  }
}

const setInputListeners = (form, { inputSelector, submitButtonSelector, inactiveButtonClass, ...rest }) => {
  const inputs = form.querySelectorAll(inputSelector);
  const submitButton = form.querySelector(submitButtonSelector);
  inputs.forEach((input) => {
    input.addEventListener('input', () => {

      checkIfInputValid(form, input, rest);
      toggleButtonError(inputs, submitButton, inactiveButtonClass);
    });
  });
}

const toggleButtonError = (inputs, submitButtonSelector, inactiveButtonClass) => {
  if (hasInvalidInput(inputs)) {
    submitButtonSelector.classList.add(inactiveButtonClass);
    submitButtonSelector.disabled = true;
  } else {
    submitButtonSelector.classList.remove(inactiveButtonClass);
    submitButtonSelector.disabled = false;
  }
};

// ЗАКРЫТИЕ ПО КЛИКУ НА OVERLAY

const closeByClickOnOverlay = (event, className) => {
  if (!event.target.closest(className)) {
    closePopup(event.target.closest('.popup'));
  }
}

profilePopup.addEventListener('click', e => closeByClickOnOverlay(e, '.popup__container'));
imagePopup.addEventListener('click', e => closeByClickOnOverlay(e, '.popup-image__container'));
newItemPopup.addEventListener('click', e => closeByClickOnOverlay(e, '.new-item__container'));



