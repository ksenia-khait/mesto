class FormValidator {
  constructor(formSelector, validationConfig) {
    this._form = document.querySelector(formSelector);
    this._inputs = Array.from(this._form.querySelectorAll(validationConfig.inputSelector));
    this._submitButton = this._form.querySelector(validationConfig.submitButtonSelector);
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorClass = validationConfig.errorClass;

  }

  _showError(input, errorMessageText) {
    const errorMessage = this._form.querySelector(`#${input.id}-error`);

    errorMessage.textContent = errorMessageText;
    errorMessage.classList.add(this._errorClass);

    input.classList.add(this._inputErrorClass);
  }

  _hideError(input) {
    const errorMessage = this._form.querySelector(`#${input.id}-error`);

    errorMessage.textContent = '';
    errorMessage.classList.remove(this._errorClass);

    input.classList.remove(this._inputErrorClass);
  }

  _checkIfInputValid(input) {
    if (!input.validity.valid) {
      this._showError(input, input.validationMessage);
    } else {
      this._hideError(input);
    }
  }

  _hasInvalidInput = () => {
    return this._inputs.some((e) => e.validity.valid === false);
  }

  _disableFormButton(button) {
    button.classList.add(this._inactiveButtonClass);
    button.disabled = true;
  }

  _toggleButtonError = () => {
    if (this._hasInvalidInput(this._inputs)) {
      this._disableFormButton(this._submitButton, this._inactiveButtonClass)
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  _setEventListeners() {
    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {

        this._checkIfInputValid(input);
        this._toggleButtonError();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
    });

    this._setEventListeners();
  }
}

export default FormValidator;

