const showError = (form, input, errorMessageText, errorMessageClass, inputErrorClass) => {
  const errorMessage = form.querySelector(`#${input.id}-error`);

  errorMessage.textContent = errorMessageText;
  errorMessage.classList.add(errorMessageClass);

  input.classList.add(inputErrorClass);
}

const hideError = (form, input, errorMessageClass, inputErrorClass) => {
  const errorMessage = form.querySelector(`#${input.id}-error`);

  errorMessage.textContent = '';
  errorMessage.classList.add(errorMessageClass);

  input.classList.add(inputErrorClass);
}

const checkIfInputValid = (form, input, { inputErrorClass, errorClass }) => {
  if (!input.validity.valid) {
    showError(form, input, input.validationMessage, errorClass, inputErrorClass);
  } else {
    hideError(form, input, errorClass, inputErrorClass);
  }
}

const setInputListeners = (form, { inputSelector, submitButtonSelector, inactiveButtonClass, ...rest }) => {
  const inputs = form.querySelectorAll(inputSelector);
  const submitButton = form.querySelector(submitButtonSelector);
  inputs.forEach((input) => {
    input.addEventListener('input', () => {

      checkIfInputValid(form, input, rest);
      toggleButtonError(inputs, submitButton, inactiveButtonClass);
    });
  });
}

function disableFormButton(button, inactiveButtonClass) {
  button.classList.add(inactiveButtonClass);
  button.disabled = true;
}

const toggleButtonError = (inputs, submitButtonSelector, inactiveButtonClass) => {
  if (hasInvalidInput(inputs)) {
    disableFormButton(submitButtonSelector, inactiveButtonClass)
  } else {
    submitButtonSelector.classList.remove(inactiveButtonClass);
    submitButtonSelector.disabled = false;
  }

  const enableValidation = ({formSelector, ...rest}) => {
    const forms = document.querySelectorAll(formSelector);

    forms.forEach((form) => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
      });

      setInputListeners(form, rest);
    });
  }

  const hasInvalidInput = (inputs) => {
    return Array.from(inputs).some((e) => e.validity.valid === false);
  }

  enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__error_visible'
  });
}