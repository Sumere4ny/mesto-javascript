export class Card {
  constructor(item, cardSelector, viewImage) {
    this._item = item;
    this._cardSelector = cardSelector;
    this._viewImage = viewImage;
  }

  _getTemplate() {
    const newCard = document.querySelector(this._cardSelector)
      .content
      .cloneNode(true);
    return newCard;
  }

  _handleLike(evt) {
    evt.target.classList.toggle('cards__like-button_active');
  }

  _deleteCard(evt) {
    evt.target.parentNode.remove();
  }

  _setEventListeners() {
    this._element.querySelector('.cards__image').addEventListener('click', () => {
      this._viewImage(this._item);
    });

    this._element.querySelector('.cards__like-button').addEventListener('click', this._handleLike);
    this._element.querySelector('.cards__remove-button').addEventListener('click', this._deleteCard);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._cardImage = this._element.querySelector('.cards__image');
    this._element.querySelector('.cards__title').textContent = this._item.name;
    this._cardImage.src = this._item.link;
    this._cardImage.alt = this._item.name;
    return this._element;
  }
}
