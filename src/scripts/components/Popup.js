export default class Popup {
  constructor(selectorPopup) {
    this._selectorPopup = selectorPopup
    this._popup = document.querySelector(this._selectorPopup);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this)
  }
  
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target === this._popup) {
      this.close();
    };
  }

  open() {     
    this._popup.classList.add('popup_opened');
    this.setEventListeners();
  }

  close() {
    this._popup.removeEventListener("click", this._handleOverlayClose);
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.classList.remove('popup_opened');
  }
  
  setEventListeners() {
    this._popup.addEventListener("click", this._handleOverlayClose);
    document.addEventListener('keydown', this._handleEscClose);
    const closeButton = this._popup.querySelector('.popup__close-button');
    closeButton.addEventListener("click", () => this.close());
  }

}
