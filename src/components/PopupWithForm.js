import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmitCallback) {
        super(popupSelector);
        this._formSubmitCallback = formSubmitCallback;
        this._form = this._popup.querySelector('.form');
        this._inputs = this._form.querySelectorAll('.form__input');
        this._inputValues = {};
        this._submitButton = this._form.querySelector('.form__button');
        this._isLoadingText = this._submitButton.textContent;

        this.setEventListeners();
    }

    _getInputValues() {
        this._inputs.forEach(input => this._inputValues[input.name] = input.value);
    }

    handleChangeSubmit(handleNewSubmit) {
        this._formSubmitCallback = handleNewSubmit;
    }


    close() {
        this._form.reset();
        super.close();
    }

    setEventListeners() {
        this._form.addEventListener('submit', (e) => {
            e.preventDefault()
            this._getInputValues();
            this._formSubmitCallback(this._inputValues);
            this.close()
        });

        super.setEventListeners();
    }

    renderLoading(isLoading) {
        if (isLoading) {
            this._submitButton.textContent = 'Сохранение...';
        } else {
            this._submitButton.textContent = this._isLoadingText;
        }
    }

}