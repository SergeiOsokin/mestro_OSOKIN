export default class UserInfo {
    constructor(element) {
        this.element = element;//ловим блок
        this.form = element.querySelector('.popup-edit__form');//ловим форму
    }

    setUserInfo(name, about, avatar) {//обновляем данные внутри экземпляра класса
        //заполняем данные при загрузке страницы
        if (arguments.length != 0) {
            this.element.querySelector('.user-info__name').textContent = name;
            this.element.querySelector('.user-info__job').textContent = about;
            this.element.querySelector('.user-info__photo').style.backgroundImage = `url('${avatar}')`;
            return;
        }
        //заполняем форму редактирования профиля при открытии
        this.form.elements.nameEdit.value = this.element.querySelector('.user-info__name').textContent;//тут нужно поймать имя которое уже есть
        this.form.elements.aboutSelfEdit.value = this.element.querySelector('.user-info__job').textContent;//тут нужно поймать профессию которая уже есть
    }

    updateUserInfo(api, profileDataForm) {//отображаем данные на странице.
        api.sendUserData(this.form.nameEdit.value, this.form.aboutSelfEdit.value);//отправляем имя/работа на сервер из формы
        api.getUserData(profileDataForm);//получим обновленные данные с сервера, а не заполним из полей.
        event.preventDefault();//сбрасываем штатное поведение кнопки на форме
        this.element.querySelector('.popup-edit').classList.remove('popup_is-opened');//закроем блок.
    }
}