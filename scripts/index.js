import Card from './Card.js';
import UserInfo from './UserInfo.js';
import FormValidator from './FormValidator.js';
import {initialCards, validationConfig, profileSelectors} from './constants.js'

// Определяем и присваеваем значок редактирования профиля и скрытый попап
const profileEditButton = document.querySelector('.profile__edit-button');
const popupProfileEdit = document.querySelector('.popup_type_edit-profile');

// Определяем и присваеваем форму и значок закрытия попапа
const formProfileEdit = popupProfileEdit.querySelector('.popup__form');
const popupCloseButton = popupProfileEdit.querySelector('.popup__close-button');

// Находим поля формы в DOM
const popupNameField = formProfileEdit.querySelector('.popup__input_name-field');
const popupProfession = formProfileEdit.querySelector('.popup__input_profession');

const userInfo = new UserInfo(profileSelectors);

// Определяем основные элементы добавления новой карточки
const addNewcardButton = document.querySelector('.profile__add-button');
const popupAddNewCard = document.querySelector('.popup_type_add-new-card');

// Определяем и присваеваем форму и значок закрытия попапа
const formAddNewCard = popupAddNewCard.querySelector('.popup__form');
const closeCardButton = popupAddNewCard.querySelector('.popup__close-button');

// Находим поля формы в DOM
const popupPlaceName = formAddNewCard.querySelector('.popup__input_place-name');
const popupPlaceLink = formAddNewCard.querySelector('.popup__input_place-link');

// Подключаем логику заполнения карточек из массива исходных объектов
const cardsSection = document.querySelector('.cards');

//Экземпляры класса для валидации каждой формы
const profileEditValidator = new FormValidator(validationConfig, formProfileEdit);
profileEditValidator.enableValidation();

const addNewPlaceValidator = new FormValidator(validationConfig, formAddNewCard);
addNewPlaceValidator.enableValidation();

// Назначаем константу для лайтбокса в DOM для переключения открывающего класса
const popupTypeLightbox = document.querySelector('.popup_type_lightbox');

// Также отбираем элемент самого лайтбокса для удобства работы
const lightbox = popupTypeLightbox.querySelector('.lightbox');

const cardSelector = '#card-template';
const keyEscape = 'Escape';

// Составляем функцию на открытие попапа
function openPopup(popup) {
  if (popup === popupProfileEdit) {
  const profileInfo = userInfo.getUserInfo();
  // Подставляем textContent элементов профиля в значения полей формы
    popupNameField.value = profileInfo.name;
    popupProfession.value = profileInfo.profession;
  }

  popup.classList.add('popup_opened');
  popup.addEventListener('click', closePopupByOverlay);
  document.addEventListener('keydown', closePopupByEscape);
}

// Составляем фуекцию на закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  clearFormState(popup);
  popup.removeEventListener('click', closePopupByOverlay);
  document.removeEventListener('keydown', closePopupByEscape);
}

// Определяем коллбэк на закрытие попапа по нажатию на 'Overlay'
function closePopupByOverlay(evt) {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.target === evt.currentTarget) {
    closePopup(popupOpened);
  }
}

// Определяем коллбэк на закрытие попапа по нажатию на 'Escape'
function closePopupByEscape(evt) {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.key === keyEscape) {
    closePopup(popupOpened);
  };
}

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleFormSubmit (evt) {

    evt.preventDefault(); // Предотвращаем логику по умолчанию
    const newProfileInfo = {
      name: popupNameField.value,
      profession: popupProfession.value
    }
    // Вставляем новые значения с помощью textContent
    userInfo.setUserInfo(newProfileInfo);

    // Закрываем попап
    closePopup(popupProfileEdit);
}

// Функция добавления новой карточки
function addNewCard(item) {
  const newCard = new Card(item, cardSelector, viewImage);
  cardsSection.prepend(newCard.generateCard());
}

// Создаем элементарный обработчик формы при отправке нового места
function handlePlaceSubmit(evt) {
  evt.preventDefault(); // Предотвращаем логику по умолчанию
  // Создаем новый объект для карточки на основе данных из формы
  const item = {
    name: popupPlaceName.value,
    link: popupPlaceLink.value
  };
  // Вызываем функцию добавления новой карточки
  addNewCard(item);
  closePopup(popupAddNewCard); // Закрываем отправленную форму
}

function clearFormState(popup) {
  if (popup === popupProfileEdit) {
    profileEditValidator.clearFormOnClose();
  } else if (popup === popupAddNewCard) {
    addNewPlaceValidator.clearFormOnClose();
  }
}

// И заранее определяем функцию для открытия попапа с изображениями, она понадобится при сборке карточек
function viewImage(item) {
  openPopup(popupTypeLightbox);
  lightbox.querySelector('.lightbox__image').src = item.link;
  lightbox.querySelector('.lightbox__image-title').textContent = item.name;
}

// Вешаем обработчики событий для кнопок профиля и попапа
profileEditButton.addEventListener('click', () => openPopup(popupProfileEdit));
popupCloseButton.addEventListener('click', () => closePopup(popupProfileEdit));

// Прикрепляем обработчик к форме, работающий на отправку
formProfileEdit.addEventListener('submit', handleFormSubmit);

// Навешиваем листенер на иконку закрытия попапа, в данном случае нашего лайтбокса
lightbox.querySelector('.popup__close-button').addEventListener('click', () => {
  closePopup(popupTypeLightbox);
});

// Вешаем основные слушатели на открытие/закрытие попапа добавления нового места
addNewcardButton.addEventListener('click', () => openPopup(popupAddNewCard));
closeCardButton.addEventListener('click', () => closePopup(popupAddNewCard));

// Вешаем обработчик формы добавления нового места на сабмит при ее отправке
formAddNewCard.addEventListener('submit', handlePlaceSubmit);

initialCards.forEach(addNewCard);
