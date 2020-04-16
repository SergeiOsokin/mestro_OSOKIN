export default class Avatar {
    constructor(element) {
        this.element = element;//ловим блок
        this.form = element.querySelector('.popup-avatar__form');//ловим форму
    }

    updateAvatar(api) {//отображаем данные на странице.
        api.sendAvatar(this.form.nameavatar.value);//отправляем URL Avatar на сервер из формы
        this.element.querySelector('.user-info__photo').style.backgroundImage = `url('${this.form.nameavatar.value}')`;
        this.element.querySelector('.popup-avatar').classList.remove('popup_is-opened');//закроем блок.
    }
}