import PopupWithForm from "./PopupWithForm.js";

class PopupConfirm extends PopupWithForm {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._handleSubmit = this._handleSubmit.bind(this)
  }

  open(id) {
    super.open();
    this._renderLoading('Да');
    this._id = id;

  }

  close() {
    this._popup.querySelector('.popup__form').reset();
    super.close();
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._id);
    this._renderLoading('Удаление...');
  }

  setEventListeners() {
    this._popup.addEventListener("submit", this._handleSubmit);
    super.setEventListeners();
  }
}

export default PopupConfirm;
