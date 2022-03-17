import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popup.querySelector('.popup-image__image');
        this._capture = this._popup.querySelector('.popup-image__capture');
        this.setEventListeners();
    }

    open(title, link, alt) {
        this._capture.textContent = title;
        this._image.src = link;
        this._image.alt = alt;

        super.open();
    }
}