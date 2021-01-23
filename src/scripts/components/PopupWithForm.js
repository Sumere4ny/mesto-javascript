import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._popupSubmit = this._popup.querySelector('.popup__submit');
    this._handleFormSubmit = handleFormSubmit;
    this._handleSubmit = this._handleSubmit.bind(this)
  }

  open() {
    this._renderLoading('Сохранить');
    super.open();
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  _getInputValues() {
    this._formValues = {};
    this._popup.querySelectorAll('.popup__input').forEach((item) => {
      this._formValues[item.name] = item.value;
    })
    return this._formValues;
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
    this._renderLoading('Сохранение...')
  }

  _renderLoading(someText) {
    this._popupSubmit.textContent = someText;
  }

  setEventListeners() {
    this._popup.addEventListener("submit", this._handleSubmit);
    super.setEventListeners();
  }
}

export default PopupWithForm;
