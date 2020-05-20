export default class Avatar {
    constructor(element) {
        this.element = element;//ловим блок
        this.form = element.querySelector('.popup-avatar__form');//ловим форму
    }
    updateAvatar(avatarUrl) {//отображаем данные на странице.
        this.element.querySelector('.user-info__photo').style.backgroundImage = `url('${avatarUrl}')`;
        this.element.querySelector('.popup-avatar__button').classList.remove('button-active');
        this.form.reset();
        this.element.querySelector('.popup-avatar').classList.remove('popup_is-opened');//закроем блок.   
    }
}