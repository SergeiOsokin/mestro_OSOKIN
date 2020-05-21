export default class Api {
    constructor(option) {
        this.option = option;
    }

    _getResponseData(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка получения данных с сервера: ` + res.status);
    }
    getStarterCards() {//карточки при загрузке
        return (
            fetch(`${this.option.baseUrl}/cards`, {
                method: 'GET',
                headers: this.option.headers,
            })
                .then(res => this._getResponseData(res))
                .catch((err) => alert(err))
        )
    }
    getUserData(profileDataForm) {//получаем данные с сервера при загрузке
        return (fetch(`${this.option.baseUrl}/users/me`, {
            method: 'GET',
            headers: this.option.headers,
        })
            .then(res => this._getResponseData(res))
            .catch((err) => alert(err))
        )
    }
    sendUserData(newName, newJob) {//отправка новых имя и работа на сервер
        return (fetch(`${this.option.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.option.headers,
            body: JSON.stringify({
                name: newName,
                about: newJob,
            })
        })
            .then((res) => this._getResponseData(res))
            .catch((err) => alert(err))
        )
    }
    sendCard(nameCard, linkCard) {//отправка карточки
        return (fetch(`${this.option.baseUrl}/cards`, {
            method: 'POST',
            headers: this.option.headers,
            body: JSON.stringify({
                name: nameCard,
                link: linkCard,
            })
        })
            .then((res) => this._getResponseData(res))
            .catch((err) => alert(err))
        )
    }
    sendAvatar(URL) {//отправка avatar
        return (fetch(`${this.option.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.option.headers,
            body: JSON.stringify({
                avatar: URL,
            })
        })
            .then((res) => this._getResponseData(res))
            .catch((err) => alert(err))
        )
    }
    deleteCard(cardId) {//удаление карточки
        return (fetch(`${this.option.baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.option.headers,
        })
            .then((res) => this._getResponseData(res))
            .catch((err) => alert(err))
        )
    }
    putLike(cardId) {//ставим лайк карточке
        fetch(`${this.option.baseUrl}/cards/like/${cardId}`, {
            method: 'PUT',
            headers: this.option.headers,
        })
            .then((res) => this._getResponseData(res))
            .catch((err) => alert(err))
    }
    deleteLike(cardId) {//снимаем лайк с карточки
        fetch(`${this.option.baseUrl}/cards/like/${cardId}`, {
            method: 'DELETE',
            headers: this.option.headers,
        })
            .then((res) => this._getResponseData(res))
            .catch((err) => alert(err))
    }
}