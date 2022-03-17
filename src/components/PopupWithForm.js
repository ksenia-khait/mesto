import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmitCallback) {
        super(popupSelector);
        this._formSubmitCallback = formSubmitCallback;
        this._form = this._popup.querySelector('.form');
        this._inputs = this._form.querySelectorAll('.form__input');
        this._inputValues = {};
        this._submitButton = this._form.querySelector('.form__button');
        this.setEventListeners();
    }

    _getInputValues() {
        this._inputs.forEach(input => this._inputValues[input.name] = input.value);
    }

    close() {
        this._form.reset();
        super.close();
    }

    setEventListeners() {
        this._form.addEventListener('submit', () => {
            this._getInputValues();
            this._formSubmitCallback(this._inputValues);
            this.close()
        });

        super.setEventListeners();
    }

}