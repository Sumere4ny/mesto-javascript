export default class Popup {
  constructor(selectorPopup, closeButtonSelector) {
    this._selectorPopup = selectorPopup
    this._popup = document.querySelector(this._selectorPopup);
    this._closeButton = this._popup.querySelector(closeButtonSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this)
  }

  open() {
    this.setEventListeners();
    this._popup.addEventListener("click", this._handleOverlayClose);
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.removeEventListener("click", this._handleOverlayClose);
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.classList.remove('popup_opened');
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handlerOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    };
  }

  setEventListeners() {
    this._closeButton.addEventListener('click', () => {
      this.close();
    })
  }

}
