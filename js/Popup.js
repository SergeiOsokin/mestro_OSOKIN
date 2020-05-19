export default class Popup {
	constructor(element) {
		this.element = element.querySelector('.popup');
    }
    open(event) {
        if (event.target.classList.contains('user-info__button')) {
            return this.element.classList.add('popup_is-opened');
        }
    }
    close(event) {
        if (event.target.classList.contains('popup__close')) {
            this.element.classList.remove('popup_is-opened');
            this.element.querySelector('form').reset();
            for (let i of this.element.querySelectorAll(`.error`)) {
                i.textContent = '';
            }
            return;
        } else if (event.type === 'submit') {
            this.element.classList.remove('popup_is-opened');
            this.element.querySelector('.popup__button').classList.remove('button-active');
            this.element.querySelector('form').reset();//
			return;
        }
    }
}
