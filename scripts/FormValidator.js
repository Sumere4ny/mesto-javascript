export class FormValidator {

  constructor(validationConfig, formElement) {
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorClass = validationConfig.errorClass;
    this._formElement = formElement;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
    inputElement.classList.add(this._inputErrorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
    inputElement.classList.remove(this._inputErrorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      const errorMessage = inputElement.validationMessage;
      this._showInputError(inputElement, errorMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleSubmitButtonState() {
    const allInputFieldsValid = this._formInputFields.every((field) => field.validity.valid);
    if (!allInputFieldsValid) {
      this._disableSubmitButton();
    } else {
      this._submit.classList.remove(this._inactiveButtonClass);
      this._submit.removeAttribute('disabled');
    }
  }

  _disableSubmitButton() {
    this._submit.classList.add(this._inactiveButtonClass);
    this._submit.setAttribute('disabled', true);
  }

  _setEventListeners() {
    this._formInputFields = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._submit = this._formElement.querySelector(this._submitButtonSelector);
    // Подключаем основную логику обработчика для слушателей
    this._toggleSubmitButtonState();
    this._formInputFields.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleSubmitButtonState();
      });
    });
  }

  clearFormOnClose() {
    this._formElement.reset()
    this._formInputFields.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._disableSubmitButton();
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    // Вешаем слушатели инпутов на все поля
    this._setEventListeners();
  }
}
