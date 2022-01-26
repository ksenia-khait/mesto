class Card {
  constructor(templateSelector, popupSelector, popupCloseSelector, title, link, alt) {
    this._selector = templateSelector;
    this._title = title;
    this._link = link;
    this._alt = alt;
    this._popup = document.querySelector(popupSelector);
    this._closeImg = document.querySelector(popupCloseSelector);

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
    this._element = this._getTemplate();
    this._element.querySelector('.grid__text').textContent = this._title;
    this._element.querySelector('.grid__image').src = this._link;
    this._element.querySelector('.grid__image').alt = this._alt;
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
    const image = this._popup.querySelector('.popup-image__image');
    const capture = this._popup.querySelector('.popup-image__capture')

    image.src = this._link;
    image.alt = this._alt;

    capture.textContent = this._title;

    this._popup.classList.add('popup_opened')
  }

  _handleClosePopup() {
    this._popup.classList.remove('popup_opened')
  }

  _setEventListeners() {
    this._element.querySelector('.grid__image').addEventListener('click', () => {
      this._handleOpenPopup();
    });

    this._closeImg.addEventListener('click', () => {
      this._handleClosePopup();
    });

    this._popup.addEventListener('click', (event) => {
      if (!event.target.closest('.popup-image__container')) {
        this._handleClosePopup();
      }
      this._popup.removeEventListener('click', this._handleClosePopup)
    })

    this._element.querySelector('.grid__heart').addEventListener('click', () => {
      this._handleLike();
    })

    document.addEventListener('keyup', (event) => {
      if (event.key === 'Escape') {
        this._handleClosePopup();
      }
      document.removeEventListener('keyup', this._handleClosePopup);
    })

    this._element.querySelector('.grid__trash').addEventListener('click', () => {
      this._handleRemove();
    })
  }
}

export default Card;