
// Определяем объект с конфигурацией для валидатора
const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

export {
  validationConfig, 
  profileSelectors, 
  formProfileEdit,
  popupNameField,
  popupProfession,
  formAddNewCard
}
