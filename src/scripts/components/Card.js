export default class Card {
  constructor(item, cardSelector, myId, deletePopup, { handleCardClick, handleCardLikes }) {
    this._item = item;
    this._myId = myId;
    this._cardId = item._id;
    this._ownerId = item.owner._id;
    this._likes = item.likes.length;
    this._deletePopup = deletePopup;
    this._cardSelector = cardSelector;
    this._likesList = item.likes;
    this._handleCardClick = handleCardClick;
    this._handleCardLikes = handleCardLikes;
    this._deleteCard = this._deleteCard.bind(this);
  }

  _getTemplate() {
    const newCard = document.querySelector(this._cardSelector)
      .content
      .cloneNode(true);
    return newCard;
  }

  _checkLike(likes) {
    this._chekLike = false;
    likes.forEach(like => {
      if (like._id === this._myId) {
        this._chekLike = true;
      }
    })
    return this._chekLike;;
  }

  _deleteCard(evt) {
    const cardElement = evt.target.closest('.cards__item');
    this._deletePopup.open(this._cardId);
    document.querySelector('.popup__submit-confirm').addEventListener('click', () => cardElement.remove());
  }

  _setEventListeners() {
    this._element.querySelector('.cards__image').addEventListener('click', () => this._handleCardClick(this._item));
    this._element.querySelector('.cards__like-button').addEventListener('click', this._handleCardLikes);
    this._element.querySelector('.cards__remove-button').addEventListener('click', this._deleteCard);
  }

  // Публичный метод, возвращающий ID карточки
  getCardId() {
    return this._cardId;
  }

  // Проверка того, есть ли среди лайкнувших конкретный юзверь
  isItLiked() {
    return this._likesList.some(like => like._id === this._myId);
  }

  // Отрисовываем
  renderLikes() {
    this._cardLikes.textContent = this._likes;
    this.showLikes(this._myId)
  }

  // Показ и скрытие лайков
  showLikes() {
    if (this.isItLiked(this._myId)) {
      this._likeIcon.classList.add('cards__like-button_active');
    } else {
      this._likeIcon.classList.remove('cards__like-button_active');
    }
  }

  // Функция установки лайков
  setLikes(listLikes) {
    this._likesList = listLikes;
    this._likes = this._likesList.length;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._cardImage = this._element.querySelector('.cards__image');
    this._cardLikes = this._element.querySelector('.cards__like-number');
    this._likeIcon = this._element.querySelector('.cards__like-button');
    if (this._myId === this._ownerId) {
      this._element.querySelector('.cards__remove-button').style.display = 'block';
    }
    this._element.querySelector('.cards__title').textContent = this._item.name;
    this._cardImage.src = this._item.link;
    this._cardImage.alt = this._item.name;
    this.renderLikes();
    return this._element;
  }
}
