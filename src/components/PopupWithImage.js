import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popup.querySelector('.popup-image__image');
        this._capture = this._popup.querySelector('.popup-image__capture');
        this.setEventListeners();
    }

    open(data) {
        this._image.src = data.link;
        this._image.alt = `Изображение ${data.name}`;

        this._capture.textContent = data.name;

        super.open();
    }
}