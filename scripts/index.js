// Определяем и присваеваем значок редактирования профиля и скрытый попап
const profileEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');

// Определяем и присваеваем форму и значок закрытия попапа
const formElement = popup.querySelector('.popup__form');
const popupCloseButton = popup.querySelector('.popup__close-button');

// Находим поля формы в DOM
const popupNameField = formElement.querySelector('.popup__name-field');
const popupProfession = formElement.querySelector('.popup__profession');

// Выбераем элементы, куда должны быть вставлены значения полей
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

// Подставляем textContent элементов профиля в значения полей формы
popupNameField.value = profileName.textContent;
popupProfession.value = profileProfession.textContent;

// Определяем функцию для показа/скрытия
const popupToggle = () => {
  popup.classList.toggle('popup_opened');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {

    evt.preventDefault(); // Предотвращаем логику по умолчанию

    // Вставьте новые значения с помощью textContent
    profileName.textContent = popupNameField.value;
    profileProfession.textContent = popupProfession.value;

    // Закрываем попап
    popupToggle();
}

// Вешаем обработчики событий для кнопок профиля и попапа
profileEditButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
