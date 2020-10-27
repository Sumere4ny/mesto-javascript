const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass}) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, {inputErrorClass}) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, {...rest}) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, rest);
  } else {
    hideInputError(formElement, inputElement, rest);
  }
};
function toggleButtonState (inputList, buttonElement, {inactiveButtonClass}){
  const hasNotValidInput = inputList.some((inputElement) => !inputElement.validity.valid);
  if (hasNotValidInput){
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled', true);
  }
};

const setEventListeners = (formElement, {inputSelector, submitButtonSelector, ...rest}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, rest);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, rest);
      toggleButtonState(inputList, buttonElement, rest);
    });
  });
};

function enableValidation({formSelector, ...rest}){
  const formList = Array.from(document.forms);
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, rest);
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
});
