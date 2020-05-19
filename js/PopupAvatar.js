export default class PopupAvatar {
	constructor(element) {
		this.element = element.querySelector('.popup-avatar');//ловим блок
    }
    open(event) {
        if (event.target.classList.contains('user-info__photo')) {
            this.element.classList.add('popup_is-opened');
            return;
        }
    }
    close(event) {
        if (event.target.classList.contains('popup-avatar__close')) {
            this.element.classList.remove('popup_is-opened');
            this.element.querySelector('.popup-avatar__button').classList.remove('button-active');
            this.element.querySelector('.popup-avatar__form').reset();
            this.element.querySelector(`.error`).textContent = '';
            return;
        } 
    }
}
