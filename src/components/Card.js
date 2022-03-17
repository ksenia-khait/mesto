export default class Card {
    constructor(templateSelector, popupSelector, popupCloseSelector, title, link, alt, handleCardClick) {
        this._selector = templateSelector;
        this._title = title;
        this._link = link;
        this._alt = alt;
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.grid__image');
        this._handleCardClick = handleCardClick;

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

    _setEventListeners() {

        this._element.querySelector('.grid__heart').addEventListener('click', () => {
            this._handleLike();
        });

        this._element.querySelector('.grid__trash').addEventListener('click', () => {
            this._handleRemove();
        });

        this._cardImage.addEventListener('click', () =>  this._handleCardClick())
    }
}
