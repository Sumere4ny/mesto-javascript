import Card from '../components/Card.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import {
  initialCards, 
  validationConfig, 
  profileSelectors, 
  formProfileEdit,
  popupNameField,
  popupProfession,
  formAddNewCard
} from '../utils/constants.js';

// Задаем экземпляр класса при открытии просмотра изображения
const popapImage = new PopupWithImage('.popup_type_lightbox');

// Рендерим наш первоначальный массив карточек мест по России
const defaultCardList = new Section(
  { items: initialCards,
    renderer: ((item) => {
      const card = new Card(item,
        '#card-template',
        { handleCardClick: () => {
          popapImage.open(item.name, item.link)
        }});
      const cardElement = card.generateCard();
      defaultCardList.addItem(cardElement);
    })
  },
  '.cards');
defaultCardList.renderItems();

//Экземпляры класса для валидации каждой формы
const profileEditValidator = new FormValidator(validationConfig, formProfileEdit);
profileEditValidator.enableValidation();

const addNewPlaceValidator = new FormValidator(validationConfig, formAddNewCard);
addNewPlaceValidator.enableValidation();

const editPopup = new PopupWithForm('.popup_type_edit-profile', handleProfileSubmit);

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
document.querySelector('.profile__add-button').addEventListener('click', () => {
  addNewPlaceValidator.clearFormOnOpen();
  cardPopup.open();  
});

function handlePlaceSubmit(item) {
  console.log(item);
  const card = new Card(item,
    '#card-template',
    { handleCardClick: () => {
      popapImage.open(item.name, item.link)
    }});
  const cardElement = card.generateCard();
  defaultCardList.addItem(cardElement);
  cardPopup.close();
}