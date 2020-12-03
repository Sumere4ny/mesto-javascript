import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, closeButtonSelector, handleFormSubmit) {
    super(popupSelector, closeButtonSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
  }

  close() {
    this._popupForm.reset();
    this._popupForm.removeEventListener("submit", this._sabmitForm);
    super.close();
  }

  _getInputValues() {
    this._inputValuesList = {};
    this._popupForm.querySelectorAll('.popup__input').forEach(item => {
      this._inputValuesList[item.name] = item.value;
    })
    return this._inputValuesList;
  }

  _submitForm(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  }

  setEventListeners() {
    this._popupForm.addEventListener('submit', this._submitForm);
    super.setEventListeners();
  }

}

export default PopupWithForm;
