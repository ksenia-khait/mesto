const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    alt: "Картинка",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    alt: "Картинка",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    alt: "Картинка",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    alt: "Картинка",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    alt: "Картинка",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    alt: "Картинка",
  },
];

/* 
  POPUP
*/

const editProfileButton = document.querySelector("#pen");
const closePopupButton = document.querySelector("#cross");
const popup = document.querySelector("#popup");

const formElement = document.querySelector(".form");
const nameInput = document.querySelector(".form__name");
const jobInput = document.querySelector(".form__capture");
const userName = document.querySelector(".intro__name");
const userCapture = document.querySelector(".intro__capture");

editProfileButton.addEventListener("click", function (mouseEvent) {
  nameInput.value = userName.textContent;
  jobInput.value = userCapture.textContent;
  popup.classList.add("popup_opened");
});

closePopupButton.addEventListener("click", function (mouseEvent) {
  popup.classList.remove("popup_opened");
});

function formSubmitHandler(event) {
  event.preventDefault();
  userName.textContent = nameInput.value;
  userCapture.textContent = jobInput.value;
  popup.classList.remove("popup_opened");
}

formElement.addEventListener("submit", formSubmitHandler);

/* 
  ADD NEW ITEM
*/

const addButton = document.querySelector(".intro__add-button");

const newItem = document.querySelector(".new-item");
const itemNameInput = document.querySelector(".new-item-form__name");
const itemLinkInput = document.querySelector(".new-item-form__capture");
const userItemName = document.querySelector(".grid__text");
const userItemLink = document.querySelector(".grid__image");

addButton.addEventListener("click", function (mouseEvent) {
  newItem.classList.add("new-item_opened");
});

const listContainerEl = document.querySelector(".grid");
const templateEl = document.querySelector(".template");

const createButton = document.querySelector(".new-item-form__button");
const inputEl = document.querySelector(".new-item-form__name");
const inputElLink = document.querySelector(".new-item-form__capture");
const closeNewItemButton = document.querySelector(".new-item__svg");

function render() {
  const html = initialCards.map((item) => {
    return getItem(item);
  });

  listContainerEl.append(...html);
}

function getItem(item) {
  const newItemEl = templateEl.content.cloneNode(true);
  const gridText = newItemEl.querySelector(".grid__text");
  const gridImg = newItemEl.querySelector(".grid__image");
  const closePopupButton = document.querySelector(".popup-image__svg");
  const removeCard = newItemEl.querySelector(".grid__trash");
  const likeButton = newItemEl.querySelector(".grid__heart");

  gridImg.src = item.link;
  gridText.textContent = item.name;

  removeCard.addEventListener("click", handleDelete);

  gridImg.addEventListener("click", () => {
    imageClickHandler(gridImg, gridText);
  });

  closePopupButton.addEventListener("click", closePopupImage);

  likeButton.addEventListener("click", () => {
    likeClickHandler(likeButton);
  });

  return newItemEl;
}

render();

function handleAddEl(event) {
  event.preventDefault();
  const name = inputEl.value;
  const link = inputElLink.value;
  const card = getItem({ name, link });
  listContainerEl.prepend(card);
  inputEl.value = "";
  inputElLink.value = "";
}

function handleDelete(event) {
  const targetEl = event.target;
  const listItem = targetEl.closest(".grid__item");
  listItem.remove();
}

createButton.addEventListener("click", handleAddEl);
createButton.addEventListener("click", function (mouseEvent) {
  newItem.classList.remove("new-item_opened");
});

closeNewItemButton.addEventListener("click", function (mouseEvent) {
  newItem.classList.remove("new-item_opened");
});

/* 
  POPUP IMAGE
*/

function imageClickHandler(gridImg, gridText) {
  const popupImage = document.querySelector(".popup-image");
  const imgImage = document.querySelector(".popup-image__image");
  const imageCapture = document.querySelector(".popup-image__capture");

  imgImage.src = gridImg.src;
  imageCapture.textContent = gridText.textContent;

  popupImage.classList.add("popup-image_opened");
}

function closePopupImage() {
  const popupImage = document.querySelector(".popup-image");
  popupImage.classList.remove("popup-image_opened");
}

/*
Like
*/

function likeClickHandler(likeButton) {
  likeButton.classList.toggle("grid__heart_active");
}
