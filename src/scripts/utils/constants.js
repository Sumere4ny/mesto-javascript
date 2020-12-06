
// Определяем объект с конфигурацией для валидатора
const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

// Определяем массив исхоного набора объектов с изображениями и подписями для карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const profileSelectors = {
  nameSelector: '.profile__name',
  profSelector: '.profile__profession',
}

// Основные селекторы, вынесенные из основного скрипта
const popupProfileEdit = document.querySelector('.popup_type_edit-profile');
const formProfileEdit = popupProfileEdit.querySelector('.popup__form');
const popupNameField = formProfileEdit.querySelector('.popup__input_name-field');
const popupProfession = formProfileEdit.querySelector('.popup__input_profession');
const popupAddNewCard = document.querySelector('.popup_type_add-new-card');
const formAddNewCard = popupAddNewCard.querySelector('.popup__form');

export {
  initialCards, 
  validationConfig, 
  profileSelectors, 
  formProfileEdit,
  popupNameField,
  popupProfession,
  formAddNewCard
}
