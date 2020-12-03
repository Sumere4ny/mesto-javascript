export default class UserInfo {
  constructor({ nameSelector, profSelector }) {
    this._userName = document.querySelector(nameSelector);
    this._userProfession = document.querySelector(profSelector);

  }

  getUserInfo() {
    const userData = {
      name: this._userName.textContent,
      profession: this._userProfession.textContent
    }

    return userData;
  }

  setUserInfo({ name, profession }) {
    this._userName.textContent =  name;
    this._userProfession.textContent = profession;
  }
}

