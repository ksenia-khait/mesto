import Card from './Card.js';
import FormValidator from './FormValidator.js';

const initialCards = [
  {
    title: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: 'Архыз',
  },
  {
    title: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt: 'Челябинск',
  },
  {
    title: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt: 'Иваново',
  },
  {
    title: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt: 'Камчатка',
  },
  {
    title: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt: 'Холмогорский район',
  },
  {
    title: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt: 'Байкал',
  },
];

//start Card
const cardsSection = document.querySelector('.grid');

const cards = initialCards.map(({title, link, alt}) => {
  return createCard(title, link, alt);
});

const cardElements = cards.map(card => card.getElement())

cardsSection.append(...cardElements);
//end Card

//start Validation
const validationConfig = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
};

const editFormValidator = new FormValidator('.profile-form', validationConfig);
const cardFormValidator = new FormValidator('.new-item-form', validationConfig);

cardFormValidator.enableValidation();

//end Validation

const editProfileButton = document.querySelector('.intro__edit');
const addButton = document.querySelector('.intro__add-button');

// openImagePopup.addEventListener('click', handleOpenImagePopup);

const profilePopup = document.querySelector('.profile-popup');
const newItemPopup = document.querySelector('.new-item');
export const imagePopup = document.querySelector('.popup-image');

export const image = imagePopup.querySelector('.popup-image__image');
export const capture = imagePopup.querySelector('.popup-image__capture');

const closePopupButton = document.querySelector('.popup__close');
const closeNewItemButton = document.querySelector('.new-item__close');
const closeImageButton = document.querySelector('.popup-image__close');

const profileForm = document.querySelector('.profile-form');
const nameInput = document.querySelector('.profile-form__name');
const jobInput = document.querySelector('.profile-form__capture');

const newItemForm = document.querySelector('.new-item-form');
const inputEl = document.querySelector('.new-item-form__name');
const inputElLink = document.querySelector('.new-item-form__capture');

const userName = document.querySelector('.intro__name');
const userCapture = document.querySelector('.intro__capture');

const listContainerEl = document.querySelector('.grid');

newItemForm.addEventListener('submit', handleAddCard);
editProfileButton.addEventListener('click', handleEditProfileButtonClick);

closePopupButton.addEventListener('click', e => closePopup(profilePopup));
closeNewItemButton.addEventListener('click', e => closePopup(newItemPopup));
closeImageButton.addEventListener('click', e => closePopup(imagePopup));

profileForm.addEventListener('submit', handleProfileFormSubmit);
addButton.addEventListener('click', function () {
  openPopup(newItemPopup);
});

profilePopup.addEventListener('click', e => closeByClickOnOverlay(e, '.popup__container'));
newItemPopup.addEventListener('click', e => closeByClickOnOverlay(e, '.new-item__container'));
imagePopup.addEventListener('click', e => closeByClickOnOverlay(e, '.popup-image__container'))

function createCard(title, link, alt) {
  return new Card('.template', '.popup-image', '.popup-image__close',
    title, link, alt);
}

// function handleOpenImagePopup() {
//   const image = document.querySelector('.popup-image__image');
//   const capture = document.querySelector('.popup-image__capture');
//
//   image.src = this._link;
//   image.alt = this._alt;
//
//   capture.textContent = this._title;
//
//   this._popup.classList.add('popup_opened')
//
//   document.addEventListener('keyup', closePopupByEsc);
// }

function handleAddCard(event) {
  event.preventDefault();
  const title = inputEl.value;
  const link = inputElLink.value;
  const card = createCard(title, link, title);
  listContainerEl.prepend(card.getElement());
  inputEl.value = '';
  inputElLink.value = '';

  closePopup(newItemPopup);
}

function handleEditProfileButtonClick() {
  nameInput.value = userName.textContent;
  jobInput.value = userCapture.textContent;
  editFormValidator.enableValidation();
  openPopup(profilePopup);
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  userName.textContent = nameInput.value;
  userCapture.textContent = jobInput.value;
  closePopup(profilePopup);
}

function closePopupByEsc(event) {
  if(event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', closePopupByEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', closePopupByEsc);
}

function closeByClickOnOverlay(event, className) {
  if (!event.target.closest(className)) {
    closePopup(event.target.closest('.popup'));
  }
}
