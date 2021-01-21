import './index.css'
import Api from '../scripts/components/Api.js';
import Card from '../scripts/components/Card.js';
import UserInfo from '../scripts/components/UserInfo.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
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

const api = new Api(requestParams);

let defaultCardList;

api.getInitialCards().then((cards) => {
  generateInitialCards(cards);
});

const generateInitialCards = (cards) => {
// Рендерим наш первоначальный массив карточек мест по России
  defaultCardList = new Section(
    { items: cards,
      renderer: ((item) => {
        const card = new Card(item,
          '#card-template',
          { handleCardClick: () => {
            popupImage.open(item.name, item.link)
          }});
        const cardElement = card.generateCard();
        defaultCardList.addItem(cardElement);
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

const editPopup = new PopupWithForm('.popup_type_edit-profile', handleProfileSubmit);
editPopup.setEventListeners();

const userInfo = new UserInfo(profileSelectors);

document.querySelector('.profile__edit-button').addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  popupNameField.value = userData.name;
  popupProfession.value = userData.profession;
  profileEditValidator.clearFormOnOpen();
  editPopup.open();
});

// Обработчки формы редактирования профиля
function handleProfileSubmit(formInputValues) {
  // Вставляем новые значения из формы
  userInfo.setUserInfo(formInputValues);
  // Закрываем попап
  editPopup.close();
}

const cardPopup = new PopupWithForm('.popup_type_add-new-card', handlePlaceSubmit);
cardPopup.setEventListeners();
document.querySelector('.profile__add-button').addEventListener('click', () => {
  addNewPlaceValidator.clearFormOnOpen();
  cardPopup.open();
});

function handlePlaceSubmit(item) {
  console.log(defaultCardList);
  const card = new Card(item,
    '#card-template',
    { handleCardClick: () => {
      popupImage.open(item.name, item.link)
    }});
  const cardElement = card.generateCard();
  defaultCardList.addItem(cardElement);
  cardPopup.close();
}
