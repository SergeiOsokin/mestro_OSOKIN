export default class CardList {
    constructor(container, arrCards = '') {//принимаем контейнер куда добавим карточки и массив с карточками
        this.container = container;//контейнер, где храним все добавленные карточки
        this.arrCards = arrCards;//передаем принятый массив в метод, который создаст карточки
    }

    addCard(name, link, container/*, api*/) {//добавляем карточки на страницу "руками".
        const card = container.create(name, link);//создадим разметку карточки
        this.container.appendChild(card);//добавляем созданную карточку в общий DOM
    }

    render(cardArr, elementCard, tmp) {//отрисовываем картинки при загрузке
        for (const element of cardArr) {
            if (element.owner._id === tmp) {
                let cardArr = elementCard.create(element.name, element.link, element.likes.length);//создаем элемент карточки
                this.container.appendChild(cardArr);//добавляем созданную карточку в общий DOM
            }
        }
        
    }
}