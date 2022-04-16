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


Promise.all([api.getProfile(), api.getInitialCards()])
    .then(([userData, cards]) => {
        // установка данных пользователя
           userInfo.setUserInfo(userData.name, userData.about, userData.avatar)
           userId = userData._id

        // отрисовка карточек
        section.renderItems(cards)

    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`)
    });

const editProfileButton = document.querySelector('.intro__edit');
const editAvatarButton = document.querySelector('.intro__image-hovered');
const addButton = document.querySelector('.intro__add-button');
const titleInputValue = document.querySelector('.profile-form__name');
const captureInputValue = document.querySelector('.profile-form__capture');


const editFormValidator = new FormValidator('.profile-form', validationConfig);
const cardFormValidator = new FormValidator('.new-item-form', validationConfig);
const validateAvatarEdit = new FormValidator('.avatar-popup-form', validationConfig)
const userInfo = new UserInfo({
    userNameSelector: '.intro__name',
    userInfoSelector: '.intro__capture',
    avatarSelector: '.intro__image'
});
const popupWithImage = new PopupWithImage('.popup-image');
const popupWithProfileForm = new PopupWithForm('.profile-popup', handleProfileSubmit);
const popupRemove = new PopupWithForm('.popup-remove');


editProfileButton.addEventListener('click', () => {
    const info = userInfo.getUserInfo();

    titleInputValue.value = info.title;
    captureInputValue.value = info.capture;

    popupWithProfileForm.open();
});

function handleProfileSubmit({name, capture}) {
    popupWithProfileForm.renderLoading(true);

    api.editProfile(name, capture)
        .then(res => {
            userInfo.setUserInfo(res.name, res.about, res.avatar);
            popupWithProfileForm.close()
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`)
        })
        .finally(() => {
            popupWithProfileForm.renderLoading(false)
        });
}

editFormValidator.enableValidation();
cardFormValidator.enableValidation();
validateAvatarEdit.enableValidation();

const popupWithNewItemForm = new PopupWithForm('.new-item', handleNewItemSubmit);
addButton.addEventListener('click', () => {
    popupWithNewItemForm.open();
})

// все по карточкам
function handleNewItemSubmit({name, src}) {
    popupWithNewItemForm.renderLoading(true);
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
            popupWithNewItemForm.close()
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`)
        })
        .finally(() => {
            popupWithNewItemForm.renderLoading(false)
        });
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
                    .catch((err) => {
                        console.log(`Ошибка: ${err}`)
                    })
            })
        },
        (id) => {
            if (card.isLiked()) {
                api.deleteLike(id)
                    .then(res => {
                        card.setLikes(res.likes)
                    })
                    .catch((err) => {
                        console.log(`Ошибка: ${err}`)
                    })
            } else {
                api.addLike(id)
                    .then(res => {
                        card.setLikes(res.likes)
                    })
                    .catch((err) => {
                        console.log(`Ошибка: ${err}`)
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

//Редактируем Аватар
const avatarPopup = new PopupWithForm('.popup-avatar', handleEditAvatar);

function handleEditAvatar(avatar) {
    avatarPopup.renderLoading(true);

    api.editAvatar(avatar)
        .then(res => {
            userInfo.setUserInfo(res.name, res.about, res.avatar)
            avatarPopup.close()
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`)
        })
        .finally(() => {
            avatarPopup.renderLoading(false)
        });
}

editAvatarButton.addEventListener('click', () => {
    avatarPopup.open();
})
