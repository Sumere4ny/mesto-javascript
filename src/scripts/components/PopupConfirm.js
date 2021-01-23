import Popup from "./Popup.js";

class PopupConfirm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._handleSubmit = this._handleSubmit.bind(this)
  }

  open(id) {
    this._popup.querySelector('.popup__submit').textContent = 'Да';
    this._id = id;
    super.open();
  }

  close() {
    this._popup.querySelector('.popup__form').reset();
    super.close();
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._id);
    const buttonSubmit = evt.target.querySelector('.popup__submit');
    buttonSubmit.textContent = 'Удаление...';
  }

  setEventListeners() {
    this._popup.addEventListener("submit", this._handleSubmit);
    super.setEventListeners();
  }
}

export default PopupConfirm;
