import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
      super(popupSelector);
      this._handleFormSubmit = handleFormSubmit;
  }

  close() {
      this._popup.removeEventListener("submit", this.handleSubmit);
      this._popup.querySelector('.popup__form').reset();
      super.close();
  }

  _getInputValues() {
      this._formValues = {};
      this._popup.querySelectorAll('.popup__input').forEach((item) => {
          this._formValues[item.name] = item.value;
      })
      return this._formValues;
  }

  setEventListeners() {
      this.handleSubmit = (evt) => {
          evt.preventDefault();
          this._handleFormSubmit(this._getInputValues());
      }
      this._popup.addEventListener("submit", this.handleSubmit);
      super.setEventListeners();
  }
}

export default PopupWithForm;
