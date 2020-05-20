export default class UserInfo {
    constructor(element) {
        this.element = element;//ловим блок
        this.form = element.querySelector('.popup-edit__form');//ловим форму
    }
    setUserInfo(name, about, avatar) {
        // заполняем данные при загрузке страницы
        if (arguments.length != 0) {
            this.element.querySelector('.user-info__name').textContent = name;
            this.element.querySelector('.user-info__job').textContent = about;
            this.element.querySelector('.user-info__photo').style.backgroundImage = `url('${avatar}')`;
            return;
        }
        // заполняем форму редактирования профиля при открытии
        this.form.elements.nameEdit.value = this.element.querySelector('.user-info__name').textContent;//тут нужно поймать имя которое уже есть
        this.form.elements.aboutSelfEdit.value = this.element.querySelector('.user-info__job').textContent;//тут нужно поймать профессию которая уже есть
    }
    updateUserInfo(name, about, avatar) {//отображаем данные на странице.
        this.element.querySelector('.user-info__name').textContent = name;
        this.element.querySelector('.user-info__job').textContent = about;
        this.element.querySelector('.user-info__photo').style.backgroundImage = `url('${avatar}')`;
        this.element.querySelector('.popup-edit').classList.remove('popup_is-opened');//закроем блок.
    }  
}