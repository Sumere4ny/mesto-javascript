import './index.css'
import Api from '../scripts/components/Api.js';
import Card from '../scripts/components/Card.js';
import UserInfo from '../scripts/components/UserInfo.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupConfirm from '../scripts/components/PopupConfirm.js';
import Section from '../scripts/components/Section.js';
import {
  validationConfig,
  requestParams,
  profileSelectors,
  formProfileEdit,
  formAvatarImage,
  popupNameField,
  popupProfession,
  formAddNewCard
} from '../scripts/utils/constants.js';

// Задаем экземпляр класса при открытии просмотра изображения
const popupImage = new PopupWithImage('.popup_type_lightbox');
popupImage.setEventListeners();

// Создаем экземпляр класса информации в профиле
const userInfo = new UserInfo(profileSelectors);

// Подключаем логику для работы с удал. сервером
const api = new Api(requestParams);

// Получаем от сервера начальные данные профиля
api.getProfileData()
  .then((profile) => {
    userInfo.setUserInfo(profile);
    userInfo.setNewAvatar(profile.avatar);
  })
  .catch(err => console.log(err));

// Готовим глобальную область под экземпляр секции
let defaultCardList;

// И сразу запрашиваем стартовый набор карточек
api.getInitialCards()
  .then(cards => generateInitialCards(cards))
  .catch(err => console.log(err));

const renderElement = function(item) {
  const myId = userInfo.getUserInfo().id;
  const card = new Card(item,
    '#card-template',
    myId,
    deletePopup,
    {
      handleCardClick: () => popupImage.open(item.name, item.link),
      handleCardLikes: () => {
        const isCardLiked = card.isItLiked();
        const resultApi = isCardLiked ? api.deleteLike(card.getCardId()) : api.putLike(card.getCardId());
        resultApi
          .then(data => {
            card.setLikes(data.likes) // обновляем список
            card.renderLikes(); // отрисовываем на клиенте
          })
          .catch(err => console.log(err));
      }
    });
    const cardElement = card.generateCard();
    defaultCardList.addItem(cardElement);
}

const generateInitialCards = (cards) => {
// Рендерим наш первоначальный массив карточек мест по России
  defaultCardList = new Section(
    { items: cards,
      renderer: ((item) => {
        renderElement(item);
      })
    },
    '.cards');
  defaultCardList.renderItems();
}

//Экземпляры класса для валидации каждой формы
const profileEditValidator = new FormValidator(validationConfig, formProfileEdit);
profileEditValidator.enableValidation();

const avatarImageValidator = new FormValidator(validationConfig, formAvatarImage);
avatarImageValidator.enableValidation();

const addNewPlaceValidator = new FormValidator(validationConfig, formAddNewCard);
addNewPlaceValidator.enableValidation();

// Создаем попап подтверждения удаления карточки
const deletePopup = new PopupConfirm('.popup_type_delete-card', handleConfirmSubmit);
deletePopup.setEventListeners();

function handleConfirmSubmit(cardId) {
  api.deleteCard(cardId)
    .then(data => console.log(data))
    .catch(err => console.log(err));
  deletePopup.close();
};

// Создаем наши попапы и подключаем в конструктор каждого обработчики отправки формы
const editPopup = new PopupWithForm('.popup_type_edit-profile', handleProfileSubmit);
editPopup.setEventListeners();

document.querySelector('.profile__edit-button').addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  popupNameField.value = userData.name;
  popupProfession.value = userData.about;
  profileEditValidator.clearFormOnOpen();
  editPopup.open();
});

// Обработчки формы редактирования профиля
function handleProfileSubmit(formInputValues) {
  // Отправляем новые значения на сервер и меняем
  api.setProfileData(formInputValues)
    .then(profile => userInfo.setUserInfo(profile))
    .catch(err => console.log(err));
  // Закрываем попап
  editPopup.close();
}

// Создаем попап для формы имзенения аватара
const avatarPopup = new PopupWithForm('.popup_type_edit-avatar', handleAvatarSubmit);
avatarPopup.setEventListeners();

document.querySelector('.profile__avatar-container').addEventListener('click', () => {
  avatarImageValidator.clearFormOnOpen();
  avatarPopup.open();
});

// Обработчки формы редактирования аватара
function handleAvatarSubmit({ link }) {
  // Отправляем новый адрес на сервер
  api.editAvatar(link)
    .then(data => console.log(data))
    .catch(err => console.log(err));
  // Обновляем аватар на странице
  userInfo.setNewAvatar(link);
  // Закрываем попап
  avatarPopup.close();
}

// Наконец добиваем необходимый попап добавления новой карточки места и обработчик
const cardPopup = new PopupWithForm('.popup_type_add-new-card', handlePlaceSubmit);
cardPopup.setEventListeners();
document.querySelector('.profile__add-button').addEventListener('click', () => {
  addNewPlaceValidator.clearFormOnOpen();
  cardPopup.open();
});

function handlePlaceSubmit(item) {
  api.createCard(item)
    .then(newCard => renderElement(newCard))
    .catch(err => console.log(err));
  cardPopup.close();
}
