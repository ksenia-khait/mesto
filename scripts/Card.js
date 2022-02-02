import { openPopup, imagePopup, capture, image } from './index.js';


export default class Card {
  constructor(templateSelector, popupSelector, popupCloseSelector, title, link, alt) {
    this._selector = templateSelector;
    this._title = title;
    this._link = link;
    this._alt = alt;
    // this._popup = document.querySelector(popupSelector);
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.grid__image');

    this._createElement();
    this._setEventListeners();
  }

  _getTemplate() {
    return document.querySelector(this._selector)
      .content
      .querySelector('.grid__item')
      .cloneNode(true)
  }

  _createElement() {
    this._element.querySelector('.grid__text').textContent = this._title;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._alt;
  }

  getElement() {
    return this._element;
  }

  _handleRemove() {
    this._element.remove();
  }

  _handleLike() {
    this._element.querySelector('.grid__heart').classList.toggle('grid__heart_active')
  }

  _handleOpenPopup() {
    image.src = this._link;
    image.alt = this._alt;
    capture.textContent = this._title;

    openPopup(imagePopup);
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleOpenPopup()
    });

    this._element.querySelector('.grid__heart').addEventListener('click', () => {
      this._handleLike();
    });

    this._element.querySelector('.grid__trash').addEventListener('click', () => {
      this._handleRemove();
    });
  }
}