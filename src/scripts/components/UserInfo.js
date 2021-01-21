export default class UserInfo {
  constructor({ nameSelector, profSelector, avatarSelector }) {
    this._userName = document.querySelector(nameSelector);
    this._userProfession = document.querySelector(profSelector);
    this._avatarSelector = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const userData = {
      name: this._userName.textContent,
      about: this._userProfession.textContent,
      avatar: this._avatarSelector.src
    }

    return userData;
  }

  setUserInfo({ name, about }) {
    this._userName.textContent =  name;
    this._userProfession.textContent = about;
  }

  setNewAvatar(avatar) {
    this._avatarSelector.src = avatar;
  }
}

