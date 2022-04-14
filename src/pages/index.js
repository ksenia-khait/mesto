import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {validationConfig} from '../utils/constants.js';
import Section from "../components/Section.js";
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from "../components/UserInfo.js";
import {api} from "../components/Api.js";


let userId;


api.getProfile()
    .then(res => {
        userInfo.setUserInfo(res.name, res.about)
        userId = res._id
    })

api.getInitialCards()
    .then(cardList => {
        cardList.reverse().forEach(data => {
            const card = createCard({
                name: data.name,
                link: data.link,
                likes: data.likes,
                id: data._id,
                userId: userId,
                ownerId: data.owner._id,
            })

            section.addItem(card.getCardElement())
        })
    })


const editProfileButton = document.querySelector('.intro__edit');
const editAvatarButton = document.querySelector('.intro__image_hovered');
const addButton = document.querySelector('.intro__add-button');
const titleInputValue = document.querySelector('.profile-form__name');
const captureInputValue = document.querySelector('.profile-form__capture');
const avatarInputValue = document.querySelector('.new-item-form__capture');

const editFormValidator = new FormValidator('.profile-form', validationConfig);
const cardFormValidator = new FormValidator('.new-item-form', validationConfig);
const userInfo = new UserInfo({
    userNameSelector: '.intro__name',
    userInfoSelector: '.intro__capture',
    avatarSelector: '.intro__image'
});
const popupWithImage = new PopupWithImage('.popup-image');
const popupWithProfileForm = new PopupWithForm('.profile-popup', handleProfileSubmit);
const popupRemove = new PopupWithForm('.popup-remove');
popupRemove.setEventListeners()

editProfileButton.addEventListener('click', () => {
    const info = userInfo.getUserInfo();

    titleInputValue.value = info.title;
    captureInputValue.value = info.capture;

    popupWithProfileForm.open();
});


function handleProfileSubmit({name, capture}) {
    api.editProfile(name, capture)
        .then(res => {
            userInfo.setUserInfo(name, capture);
        })
}


editFormValidator.enableValidation();
cardFormValidator.enableValidation();

const popupWithNewItemForm = new PopupWithForm('.new-item', handleNewItemSubmit);
addButton.addEventListener('click', () => {
    popupWithNewItemForm.open();
})

// все по карточкам
function handleNewItemSubmit({name, src}) {
    api.addCard(name, src)
        .then(res => {
            renderCard({
                name: res.name,
                link: res.link,
                likes: res.likes,
                id: res._id,
                userId: userId,
                ownerId: res.owner._id
            });
        })
}


function createCard(data) {
    const card = new Card(
        data,
        '.template',
        () => popupWithImage.open(data),
        (id) => {
            popupRemove.open()
            popupRemove.handleChangeSubmit(() => {
                api.deleteCard(id)
                    .then(res => {
                        card.removeCard()
                        popupRemove.close()
                    })
            })
        },
        (id) => {
            if (card.isLiked()) {
                api.deleteLike(id)
                    .then(res => {
                        card.setLikes(res.likes)
                    })
            } else {
                api.addLike(id)
                    .then(res => {
                        card.setLikes(res.likes)
                    })
            }
        }
    );
    return card
}

function renderCard(data) {
    const card = createCard(data);
    const cardElement = card.getCardElement();
    section.addItem(cardElement);
}

const section = new Section({
        items: [],
        renderer: renderCard
    },
    '.grid'
);

section.renderItems();

//Редактируем Аватар

const avatarPopup = new PopupWithForm('.popup-avatar');

avatarPopup.handleChangeSubmit((avatar) => {
    avatarPopup.renderLoading(true);

    api.editAvatar(avatar.avatar)
        .then(res => {
            console.log('в IndexJs', res)
            userInfo.setAvatar(avatar)
            avatarPopup.close()
        })
        .catch(console.log)
        .finally(() => {
            avatarPopup.renderLoading(false)
        });

})

editAvatarButton.addEventListener('click', () => {
    const avatarInfo = userInfo.getUserInfo();
    avatarInputValue.src = avatarInfo.avatar;

    avatarPopup.open();
})

avatarPopup.setEventListeners()


