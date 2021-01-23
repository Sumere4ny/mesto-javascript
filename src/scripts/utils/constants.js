
// Определяем объект с конфигурацией для валидатора
const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

const requestParams = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-19',
  headers: {
      authorization: 'd9b0d4bd-9467-4294-aae9-066f4b6515ac',
      'Content-Type': 'application/json'
  }
};

const profileSelectors = {
  nameSelector: '.profile__name',
  profSelector: '.profile__profession',
  avatarSelector: '.profile__avatar'
}

// Основные селекторы, вынесенные из основного скрипта
const popupProfileEdit = document.querySelector('.popup_type_edit-profile');
const formProfileEdit = popupProfileEdit.querySelector('.popup__form');
const popupAvatarImage = document.querySelector('.popup_type_edit-avatar');
const formAvatarImage = popupAvatarImage.querySelector('.popup__form');
const popupNameField = formProfileEdit.querySelector('.popup__input_name-field');
const popupProfession = formProfileEdit.querySelector('.popup__input_profession');
const popupAddNewCard = document.querySelector('.popup_type_add-new-card');
const formAddNewCard = popupAddNewCard.querySelector('.popup__form');

export {
  validationConfig,
  requestParams,
  profileSelectors,
  formProfileEdit,
  formAvatarImage,
  popupNameField,
  popupProfession,
  formAddNewCard
}
