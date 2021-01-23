export default class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    // Общий обработчик запросов
    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

    // Получаем массив существующих карточек
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
            method: 'GET'
        })
        .then(this._getResponseData);
    }

    // Получаем основные данные текущего профиля
    getProfileData() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
            method: 'GET'
        })
        .then(this._getResponseData);
    }

    // Отправляем обновленную информацию профиля
    setProfileData({ name, about }) {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                name: name,
                about: about
            })

        })
        .then(this._getResponseData)
    }

    // Создание и удаление карточки
    createCard({ name, link }) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({ name: name, link: link })
        }).then(this._getResponseData)

    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: "DELETE",
            headers: this._headers,
        }).then(this._getResponseData)

    }

    // Установка и снятие лайка для карточки
    putLike(id) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
            method: "PUT",
            headers: this._headers,
        }).then(this._getResponseData)

    }

    deleteLike(id) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
            method: "DELETE",
            headers: this._headers,
        }).then(this._getResponseData)

    }

    // Обновление аватара
    editAvatar(avatarUrl) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({ avatar: avatarUrl })
        }).then(this._getResponseData)
    }
}
