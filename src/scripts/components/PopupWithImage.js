import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.lightbox__image');
    this._title = this._popup.querySelector('.lightbox__image-title');
  }

  open(name, link) {
    this._image.alt = name;
    this._image.src = link;
    this._title.textContent = name;
    super.open();
  }
}

export default PopupWithImage;
