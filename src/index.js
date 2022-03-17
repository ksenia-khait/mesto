import './styles/index.css';

import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import {initialCards} from './utils/constants.js';
import Section from "./components/Section.js";
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from "./components/UserInfo.js";

const validationConfig = {
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__error_visible'
};

const editProfileButton = document.querySelector('.intro__edit');
const addButton = document.querySelector('.intro__add-button');

const editFormValidator = new FormValidator('.profile-form', validationConfig);
const cardFormValidator = new FormValidator('.new-item-form', validationConfig);
const userInfo = new UserInfo({userNameSelector: '.intro__name', userInfoSelector: '.intro__capture'});
const popupWithImage = new PopupWithImage('.popup-image');
const cardList = new Section({
        items: initialCards.reverse(),
        renderer
    },
    '.grid'
);
const popupWithProfileForm = new PopupWithForm('.profile-popup', profileSubmitHandler);

editProfileButton.addEventListener('click', () => {
    const info = userInfo.getUserInfo();
    const titleInputValue = document.querySelector('.profile-form__name');
    const captureInputValue = document.querySelector('.profile-form__capture');
    titleInputValue.value = info.title;
    captureInputValue.value = info.capture;

    popupWithProfileForm.open();

});
const popupWithNewItemForm = new PopupWithForm('.new-item', newItemSubmitHandler);
addButton.addEventListener('click', () => {
    popupWithNewItemForm.open();
})

editFormValidator.enableValidation();
cardFormValidator.enableValidation();
cardList.renderItems();

function profileSubmitHandler({name, capture}) {
    userInfo.setUserInfo(name, capture);
}

function newItemSubmitHandler({name, src}) {
    renderer({
        title: name,
        link: src,
        alt: name
    });
}

function renderer({title, link, alt}) {
    const card = createCard(title, link, alt, () => popupWithImage.open(title, link, alt));
    const cardElement = card.getElement();
    cardList.addItem(cardElement);
}

function createCard(title, link, alt, callback) {
    return new Card('.template', '.popup-image', '.popup-image__close',
        title, link, alt, callback);
}
