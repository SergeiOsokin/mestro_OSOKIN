class Api {
    constructor(option) {
        this.option = option;
    }

    getStarterCards(cardList, cardClass, tmp) {//карточки при загрузке
        fetch(`${this.option.baseUrl}/cards`, {
            method: 'GET',
            headers: this.option.headers,
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка получения данных с сервера: ` + res.status);
            })
            .then((res) => {
                cardList.render(res, cardClass, tmp);
                
            })
            .catch((err) => {
                alert(err);
                console.log('1')
            })
    }

    getUserData(profileDataForm) {//получаем данные с сервера при загрузке
        fetch(`${this.option.baseUrl}/users/me`, {
            method: 'GET',
            headers: this.option.headers,
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка получения данных с сервера: ` + res.status);
            })
            .then((data) => {
                profileDataForm.setUserInfo(data.name, data.about, data.avatar);
                console.log(data)
            })
            .catch((err) => {
                alert(err);
                console.log('2')
            })
    }
    sendUserData(newName, newJob) {//отправка новых имя и работа на сервер
        fetch(`${this.option.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.option.headers,
            body: JSON.stringify({
                name: newName,
                about: newJob,
            })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка отправки данных на сервер: ` + res.status);
            })
            .then((res) => {
                return res;
            })
            .catch((err) => {
                alert(err);
                console.log('3')
            })
    }
    sendCard(nameCard, linkCard, cardList, cardClass) {//отправка карточки
        fetch(`${this.option.baseUrl}/cards`, {
            method: 'POST',
            headers: this.option.headers,
            body: JSON.stringify({
                name: nameCard,
                link: linkCard,
            })
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка отправки данных на сервер: ` + res.status);
        })
        .then((data) => {
            cardList.addCard(nameCard, linkCard, cardClass);
            console.log(data);
        })
        .catch((err) => {
            alert(err);
        })
    }
    deleteCard(cardId) {//удаление карточки
        fetch(`${this.option.baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.option.headers,
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка отправки данных на сервер: ` + res.status);
        })
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            alert(err);
        })
    }
    putLike(cardId) {//ставим лайк карточке
        fetch(`${this.option.baseUrl}/cards/like/${cardId}`, {
            method: 'PUT',
            headers: this.option.headers,
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка отправки данных на сервер: ` + res.status);
        })
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            alert(err);
        })
    }
    deleteLike(cardId) {//снимаем лайк с карточки
        fetch(`${this.option.baseUrl}/cards/like/${cardId}`, {
            method: 'DELETE',
            headers: this.option.headers,
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка отправки данных на сервер: ` + res.status);
        })
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            alert(err);
        })
    }
}