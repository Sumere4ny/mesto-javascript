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

// Определяем функцию для показа/скрытия
const popupToggle = (popup) => {
  popup.classList.toggle('popup_opened');
};

// Составляем функцию на открытие попапа
function popupOpen() {
  // Подставляем textContent элементов профиля в значения полей формы
  popupNameField.value = profileName.textContent;
  popupProfession.value = profileProfession.textContent;
  popupToggle(popupProfileEdit);
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {

    evt.preventDefault(); // Предотвращаем логику по умолчанию

    // Вставьте новые значения с помощью textContent
    profileName.textContent = popupNameField.value;
    profileProfession.textContent = popupProfession.value;

    // Закрываем попап
    popupToggle(popupProfileEdit);
}

// Вешаем обработчики событий для кнопок профиля и попапа
profileEditButton.addEventListener('click', popupOpen);
popupCloseButton.addEventListener('click', () => {
  popupToggle(popupProfileEdit);
});

// Прикрепляем обработчик к форме, работающий на отправку
formProfileEdit.addEventListener('submit', formSubmitHandler);

// Определяем основные элементы добавления новой карточки
const addNewcardButton = document.querySelector('.profile__add-button');
const popupAddNewCard = document.querySelector('.popup_type_add-new-card');

// Определяем и присваеваем форму и значок закрытия попапа
const formAddNewCard = popupAddNewCard.querySelector('.popup__form');
const closeCardButton = popupAddNewCard.querySelector('.popup__close-button');

// Находим поля формы в DOM
const popupPlaceName = formAddNewCard.querySelector('.popup__input_place-name');
const popupPlaceLink = formAddNewCard.querySelector('.popup__input_place-link');

// Создаем элементарный обработчик формы при отправке созданной карточки нового места
function newCardSubmitHandler(evt) {
  evt.preventDefault(); // Предотвращаем логику по умолчанию
  // Создаем новый объект для карточки на основе данных из формы
  const item = {
    name: popupPlaceName.value,
    link: popupPlaceLink.value
  }
  // Вызываем функцию добавления новой карточки
  addNewCard(item);
  popupToggle(popupAddNewCard); // Закрываем отправленную форму
  // Очищаем значения полей в закрытом попапе
  popupPlaceName.value = '';
  popupPlaceLink.value = '';
}

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

// Подключаем логику запонения карточек из массива исходных объектов
const cardsSection = document.querySelector('.cards');

initialCards.forEach(addNewCard);

function addNewCard(item) {
  cardsSection.prepend(createCard(item));
}

function createCard(item) {
    const cardTemplate = document.querySelector('#card-template').content;
    const newCard = cardTemplate.cloneNode(true);

    newCard.querySelector('.cards__image').src = item.link;
    newCard.querySelector('.cards__title').textContent = item.name;

    const likeButton = newCard.querySelector('.cards__like-button');

    likeButton.addEventListener('click', function(evt) {
        evt.target.classList.toggle('cards__like-button_active');
    });

    const removeButton = newCard.querySelector('.cards__remove-button');

    removeButton.addEventListener('click', function() {
        const post = removeButton.closest('.cards__item');

        post.remove();
    });

    return newCard;
}

// Вешаем основные слушатели на открытие/закрытие попапа добавления нового места
addNewcardButton.addEventListener('click', () => { popupToggle(popupAddNewCard); });

closeCardButton.addEventListener('click', () => { popupToggle(popupAddNewCard); });

// Вешаем обработчик формы добавления нового места на сабмит при ее отправке
formAddNewCard.addEventListener('submit', newCardSubmitHandler);
