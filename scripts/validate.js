const enableValidation = ({ formSelector, ...rest }) => {
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
