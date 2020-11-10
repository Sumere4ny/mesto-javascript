import {FormValidator} from './FormValidator.js';
import {initialCards, validationConfig} from './constants.js'

// Определяем и присваеваем значок редактирования профиля и скрытый попап
const profileEditButton = document.querySelector('.profile__edit-button');
const popupProfileEdit = document.querySelector('.popup_type_edit-profile');

// Определяем и присваеваем форму и значок закрытия попапа
const formProfileEdit = popupProfileEdit.querySelector('.popup__form');
const popupCloseButton = popupProfileEdit.querySelector('.popup__close-button');

// Находим поля формы в DOM
const popupNameField = formProfileEdit.querySelector('.popup__input_name-field');
const popupProfession = formProfileEdit.querySelector('.popup__input_profession');

// Выбераем элементы, куда должны быть вставлены значения полей
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

const keyEscape = 'Escape';

// Определяем функцию для показа/скрытия
function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
  if (popup.classList.contains('popup_opened')) {
    popup.addEventListener('click', closePopupByOverlay);
  } else {
    clearFormState(popup);
  }
}

// Определяем коллбэк на закрытие попапа по нажатию на 'Overlay'
function closePopupByOverlay(evt) {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.target === evt.currentTarget) {
    togglePopup(popupOpened);
  }
}

// Определяем функцию на закрытие попапа по нажатию на 'Escape'
function closePopupByEscape(evt) {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.key === keyEscape) {
    togglePopup(popupOpened);
  };
}

// И сразу вешаем слушатель для 'Escape' на весь документ
document.addEventListener('keydown', closePopupByEscape);

// Составляем функцию на открытие попапа
function openPopup() {
  // Подставляем textContent элементов профиля в значения полей формы
  popupNameField.value = profileName.textContent;
  popupProfession.value = profileProfession.textContent;
  togglePopup(popupProfileEdit);
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {

    evt.preventDefault(); // Предотвращаем логику по умолчанию

    // Вставьте новые значения с помощью textContent
    profileName.textContent = popupNameField.value;
    profileProfession.textContent = popupProfession.value;

    // Закрываем попап
    togglePopup(popupProfileEdit);
}

// Вешаем обработчики событий для кнопок профиля и попапа
profileEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', () => {
  togglePopup(popupProfileEdit);
});

// Прикрепляем обработчик к форме, работающий на отправку
formProfileEdit.addEventListener('submit', handleFormSubmit);

// --------------------------------------------------------------------------------------------------------

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

function createCard(item) {
    const cardTemplate = document.querySelector('#card-template').content;
    const newCard = cardTemplate.cloneNode(true);
    const imageArea = newCard.querySelector('.cards__image');

    imageArea.src = item.link;
    newCard.querySelector('.cards__title').textContent = item.name;

    const likeButton = newCard.querySelector('.cards__like-button');

    likeButton.addEventListener('click', (evt) => {
        evt.target.classList.toggle('cards__like-button_active');
    });

    imageArea.addEventListener('click', () => {
      viewImage(item);
    });

    const removeButton = newCard.querySelector('.cards__remove-button');

    removeButton.addEventListener('click', () => {
        const post = removeButton.closest('.cards__item');
        post.remove();
    });

    return newCard;
}

function addNewCard(item) {
  cardsSection.prepend(createCard(item));
}

// Создаем элементарный обработчик формы при отправке созданной карточки нового места
function handlePlaceSubmit(evt) {
  evt.preventDefault(); // Предотвращаем логику по умолчанию
  // Создаем новый объект для карточки на основе данных из формы
  const item = {
    name: popupPlaceName.value,
    link: popupPlaceLink.value
  };
  // Вызываем функцию добавления новой карточки
  addNewCard(item);
  togglePopup(popupAddNewCard); // Закрываем отправленную форму
  // Очищаем значения полей в закрытом попапе
  popupPlaceName.value = '';
  popupPlaceLink.value = '';
}

// Назначаем константу для последнего попапа в DOM для переключения открывающего класса
const popupTypeLightbox = document.querySelector('.popup_type_lightbox');

// Также отбираем элемент самого лайтбокса для удобства работы
const lightbox = popupTypeLightbox.querySelector('.lightbox');

// Навешиваем листенер на иконку закрытия попапа, в данном случае нашего лайтбокса
lightbox.querySelector('.popup__close-button').addEventListener('click', () => {
  togglePopup(popupTypeLightbox);
});

// И заранее определяем функцию для открытия попапа с изображениями, она понадобится при сборке карточек
function viewImage(item) {
  togglePopup(popupTypeLightbox);
  lightbox.querySelector('.lightbox__image').src = item.link;
  lightbox.querySelector('.lightbox__image-title').textContent = item.name;
}

initialCards.forEach(addNewCard);

// Вешаем основные слушатели на открытие/закрытие попапа добавления нового места
addNewcardButton.addEventListener('click', () => { togglePopup(popupAddNewCard); });

closeCardButton.addEventListener('click', () => { togglePopup(popupAddNewCard); });

// Вешаем обработчик формы добавления нового места на сабмит при ее отправке
formAddNewCard.addEventListener('submit', handlePlaceSubmit);

//Экземпляры класса для валидации каждой формы
const profileEditValidator = new FormValidator(validationConfig, formProfileEdit);
profileEditValidator.enableValidation();

const addNewPlaceValidator = new FormValidator(validationConfig, formAddNewCard);
addNewPlaceValidator.enableValidation();

function clearFormState(popup) {
  if (popup === popupProfileEdit) {
    profileEditValidator.clearFormOnClose();
  } else if (popup === popupAddNewCard) {
    addNewPlaceValidator.clearFormOnClose();
  }
}
