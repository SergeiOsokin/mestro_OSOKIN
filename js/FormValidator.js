import {wordsError} from '../index.js';
export default class FormValidator {
    constructor(popup) {//функция для установки обработчиков на форму.принимаем открывшийся элемент
        this.form = popup;//ловим форму, которая есть в открышейся форме
        this.button = this.form.querySelector('.button');//ловим кнопку, которая есть в открышейся форме
    }
    setValidate() {
 
        this.form.addEventListener('input', this.setSubmitButtonState.bind(this, this.form, this.button));
        this.form.addEventListener('input', this.checkInputValidity.bind(event));
    }

    checkInputValidity(event) {//проверка валидации
        // const wordsError = {
        //     tooShort: 'Должно быть от 2 до 30 символов',
        //     valueMissing: 'Это обязательное поле',
        //     patternMismatch: 'Тут должна быть ссылка на картинку',
        // }
        if(event.target.validity.tooShort){
            return event.target.closest('div').querySelector(`.error`).textContent = 'Должно быть от 2 до 30 символов';
        } if(event.target.validity.valueMissing){
            return event.target.closest('div').querySelector(`.error`).textContent = 'Это обязательное поле';
        } if(event.target.validity.patternMismatch){
            return event.target.closest('div').querySelector(`.error`).textContent = 'Тут должна быть ссылка на картинку';
        }
        event.target.closest('div').querySelector(`.error`).textContent = '';
    //     for (let key in wordsError) {
    //         if (event.target.validity[key]) {
    //             return event.target.closest('div').querySelector(`.error`).textContent = key;
    //         }
    //     }
    // event.target.closest('div').querySelector(`.error`).textContent = '';
     }

    setSubmitButtonState(form, button) {//фунция для блокировки кнопки отправки
        if (!form.checkValidity()) {//если наш блок не прошел проверку
            button.setAttribute('disabled', true);
            button.classList.remove('button-active');
            return;//иначе кнопка не будет менять свое состояние
        } else {
            button.removeAttribute('disabled', false);
            button.classList.add('button-active');
            return;//иначе кнопка не будет менять свое состояние
        }
    }
};