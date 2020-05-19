export default class PopupImage {
	constructor(element) {
		this.element = element.querySelector('.popup-image');//ловим блок
    }
    open(event) {
        if (event.target.classList.contains('place-card__image')) {
            this.element.classList.add('popup_is-opened');
            this.element.querySelector('.popup-image__content').setAttribute('style', `${event.target.getAttribute('style')}`);
            return;
        }

    }
    close(event) {
        if (event.target.classList.contains('popup-image__close')) {
            this.element.classList.remove('popup_is-opened');
            return;
        }
    }
}