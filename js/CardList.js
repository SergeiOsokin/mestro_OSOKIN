export default class CardList {
    constructor(container) {//принимаем контейнер куда добавим карточки и массив с карточками
        this.container = container;//контейнер, где храним все добавленные карточки
    }

    addCard({name, link, likes, _id, owner }, cardClass) {//добавляем карточки на страницу "руками".
        const card = cardClass.create(name, link, likes.length, _id, owner);//создадим разметку карточки
        this.container.appendChild(card);//добавляем созданную карточку в общий DOM
    }

    render(cardArr, cardClass, tmp) {//отрисовываем картинки при загрузке
        for (const element of cardArr) {
            if (element.owner._id === tmp) {
                let cardArr = cardClass
                .create(element.name, element.link, element.likes.length, element._id, element.owner._id);
                this.container.appendChild(cardArr);//добавляем созданную карточку в общий DOM
            }
        }
    }
}