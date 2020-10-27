// Готовим функцию для показа стандартных браузерных сообщений об ошибках валидации
const showInputError = (form, inputField, errorMessage, {inputErrorClass}) => {
  const errorElement = form.querySelector(`#${inputField.id}-error`);
  inputField.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
};
// Готовим функцию для скрытия стандартных браузерных сообщений об ошибках валидации
const hideInputError = (form, inputField, {inputErrorClass}) => {
  const errorElement = form.querySelector(`#${inputField.id}-error`);
  inputField.classList.remove(inputErrorClass);
  errorElement.textContent = '';
};
// Включаем их в собственную проверку валидности полей ввода
function checkInputValidity(form, inputField, { ...rest }) {
  if (!inputField.validity.valid) {
    showInputError(form, inputField, inputField.validationMessage, rest);
  } else {
    hideInputError(form, inputField, rest);
  }
}
// Определяем условия для доступности кнопки сабмита в формах и создаем переключатель
function toggleSubmitButtonState (formInputFields, submit, {inactiveButtonClass}){
  const allInputFieldsValid = formInputFields.every((field) => field.validity.valid);
  if (!allInputFieldsValid) {
    submit.classList.add(inactiveButtonClass);
    submit.setAttribute('disabled', true);
  } else {
    submit.classList.remove(inactiveButtonClass);
    submit.removeAttribute('disabled', true);
  }
};
// Определяем логику добавления слушателей для инпутов, для этого формируем массив
function setEventListeners(form, {inputSelector, submitButtonSelector, ...rest}) {
  const formInputFields = Array.from(form.querySelectorAll(inputSelector));
  // Подключаем основную логику обработчика для слушателей
  const submit = form.querySelector(submitButtonSelector);
  toggleSubmitButtonState(formInputFields, submit, rest);
  formInputFields.forEach((field) => {
    field.addEventListener('input', () => {
        checkInputValidity(form, field, rest);
        toggleSubmitButtonState(formInputFields, submit, rest);
    });
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
