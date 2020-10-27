const showInputError = (form, inputField, errorMessage, {inputErrorClass}) => {
  const errorElement = form.querySelector(`#${inputField.id}-error`);
  inputField.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (form, inputField, {inputErrorClass}) => {
  const errorElement = form.querySelector(`#${inputField.id}-error`);
  inputField.classList.remove(inputErrorClass);
  errorElement.textContent = '';
};

function checkInputValidity(form, inputField, { ...rest }) {
  if (!inputField.validity.valid) {
    showInputError(form, inputField, inputField.validationMessage, rest);
  } else {
    hideInputError(form, inputField, rest);
  }
}

function toggleSubmitButtonState (formInputFields, submit, {inactiveButtonClass}){
  const allInputFieldsValid = formInputFields.every((input) => input.validity.valid);
  if (allInputFieldsValid){
    submit.classList.remove(inactiveButtonClass);
    submit.removeAttribute('disabled', true);
  } else {
    submit.classList.add(inactiveButtonClass);
    submit.setAttribute('disabled', true);
  }
};

function setEventListeners(form, {inputSelector, submitButtonSelector, ...rest}) {
  const formInputFields = Array.from(form.querySelectorAll(inputSelector));

  const submit = form.querySelector(submitButtonSelector);
  toggleSubmitButtonState(formInputFields, submit, rest);
  formInputFields.forEach((inputField) => {
    inputField.addEventListener('input', () => {
        checkInputValidity(form, inputField, rest);
        toggleSubmitButtonState(formInputFields, submit, rest);
    });
    console.log(inputField);
  });
}

function enableValidation({formSelector, ...rest}) {
  Array.from(document.querySelectorAll(formSelector)).forEach((form) => {
    // Вешаем слушатели на сабмит с обеих форм
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    // Вешаем слушатели инпутов на все поля форм
    setEventListeners(form, rest);
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
});
