export default class PopupEdit {
    constructor(element) {
        this.element = element.querySelector('.popup-edit');//ловим блок
    }
    open(event) {//открытие блоков добавления.
        if (event.target.classList.contains('user-info__button-edit')) {
            this.element.classList.add('popup_is-opened');
            this.element.querySelector('.popup-edit__button').classList.add('button-active');
            return;
        }
    }
    close(event) {//закрытие блоков
        if (event.target.classList.contains('popup-edit__close')) {//закрываем блок редактирвоания профиля
            this.element.classList.remove('popup_is-opened');
            this.element.querySelector('form').reset();
            this.element.querySelector('form').reset();
            for (let i of this.element.querySelectorAll(`.error`)) {
                i.textContent = '';
            }
            return;
        } if (event.type === 'submit') {
            this.element.querySelector('.popup').classList.remove('popup_is-opened');
            this.element.querySelector('.popup__button').classList.remove('button-active');
            this.element.querySelector('form').reset();//
            return;
        }
    }
}
