import "./style.css";

import Card from './js/Card.js';
import CardList from './js/CardList.js';
import Popup from './js/Popup.js';
import PopupImage from './js/PopupImage.js';
import PopupEdit from './js/PopupEdit.js';
import PopupAvatar from './js/PopupAvatar.js';
import UserInfo from './js/UserInfo.js';
import FormValidator from './js/FormValidator.js';
import Api from './js/Api.js';
import Avatar from './js/Avatar.js';
// константы
const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort8' : 'https://praktikum.tk/cohort8';
const api = new Api({
    baseUrl: serverUrl,
    headers: {
        authorization: '44df0b31-b1b2-4c2f-8004-9e32bc2204a3',
        'Content-Type': 'application/json'
    }
});
const myId = "42cd123a5b2a7d443e2e2c37";
const wordsError = {
    tooShort: 'Должно быть от 2 до 30 символов',
    valueMissing: 'Это обязательное поле',
    patternMismatch: 'Тут должна быть ссылка на картинку',
}

const mainContainer = document.querySelector('.root');
const cardsBlock = mainContainer.querySelector('.places-list');
// 
const buttonNewCard = mainContainer.querySelector('.user-info__button');
const buttonEditProfile = mainContainer.querySelector('.user-info__button-edit');
const editProfilePopup = mainContainer.querySelector('.popup-edit');
const avatarButton = mainContainer.querySelector('.user-info__photo');
// блоки 
const newCardBlockPopup = mainContainer.querySelector('.popup');
const imageBlock = mainContainer.querySelector('.popup-image');
const avatarPopup = mainContainer.querySelector('.popup-avatar');
// формы добавления
const profileForm = document.forms.newEdit;
const newCardForm = document.forms.new;
const newProfileAvatar = document.forms.newavatar;

// экземпляры классов
const cardClass = new Card(cardsBlock);
const cardList = new CardList(cardsBlock);
const popupContainers = new Popup(mainContainer);
const popupImage = new PopupImage(mainContainer);
const popupEdit = new PopupEdit(mainContainer);
const popupAvatar = new PopupAvatar(mainContainer);
const profileDataForm = new UserInfo(mainContainer);
const formValidationEdit = new FormValidator(profileForm);
const formValidationCard = new FormValidator(newCardForm);
const formValidationAvatar = new FormValidator(newProfileAvatar);
const formAvatar = new Avatar(mainContainer);
// функции
function addCard() {
    newCardForm.elements[2].textContent = 'Загрузка...';
    api.sendCard(newCardForm.elements.name.value, newCardForm.elements.link.value)
        .then((result) => {
            cardList.addCard(result, cardClass);
            newCardForm.elements[2].textContent = '+';
        })
    popupContainers.close(event);
}
function openEdit() {
    profileDataForm.setUserInfo();
    popupEdit.open(event);
    formValidationEdit.setValidate(wordsError);
}
function openNewCard() {
    popupContainers.open(event);
    formValidationCard.setValidate(wordsError);
}
function openAvatarEdit() {
    popupAvatar.open(event);
    formValidationAvatar.setValidate();
}
// слушатели
buttonNewCard.addEventListener('click', openNewCard)// открытие блока для добавления карточки
buttonEditProfile.addEventListener('click', openEdit);// открытие блока для редактирования профиля
cardsBlock.addEventListener('click', popupImage.open.bind(popupImage));// открытие картинки
avatarButton.addEventListener('click', openAvatarEdit);// открытие блока для редактирования аватара

newCardBlockPopup.addEventListener('click', popupContainers.close.bind(popupContainers))// для закрытия блока добавления карточки
editProfilePopup.addEventListener('click', popupEdit.close.bind(popupEdit))// для закрытия блока редактирования профиля
imageBlock.addEventListener('click', popupImage.close.bind(popupImage));// для закрытия блока c картинкой
avatarPopup.addEventListener('click', popupAvatar.close.bind(popupAvatar));// для закрытия блока с аватаром
//слушатель на кнопку создания карточки
newCardForm.addEventListener('submit', () => {
    event.preventDefault();
    addCard();
});
// отправим новые данные о пользователе и установим новые значения, которые вернулись с сервера
profileForm.addEventListener('submit', () => {
    profileForm.elements[2].textContent = 'Загрузка...';
    event.preventDefault();
    api.sendUserData(profileForm.nameEdit.value, profileForm.aboutSelfEdit.value)
        .then((newProfile) => {
            profileDataForm.updateUserInfo(newProfile.name, newProfile.about, newProfile.avatar);
            profileForm.elements[2].textContent = 'Сохранить';
        });
});
//изменение аватара
newProfileAvatar.addEventListener('submit', () => {
    newProfileAvatar.elements[1].textContent = 'Загрузка...';
    event.preventDefault();
    api.sendAvatar(newProfileAvatar.nameavatar.value)
        .then(newAvatar => {
            formAvatar.updateAvatar(newAvatar.avatar);
            newProfileAvatar.elements[1].textContent = 'Сохранить';
        })
});
//удаление карточки
cardsBlock.addEventListener('click', () => {
    let cardId = cardClass.remove(myId);
    if (cardId) {
        api.deleteCard(cardId);
    }
})
// постановка лайка и удаление лайка 
cardsBlock.addEventListener('click', (event) => {
    let cardId;
    if (event.target.classList.contains('place-card__like-icon_liked')) {
        cardId = cardClass.like();
        return api.deleteLike(cardId)
            .then((newJSON) => event.target.nextElementSibling.textContent = newJSON.likes.length);
    } 
    if (event.target.classList.contains('place-card__like-icon')) {
        cardId = cardClass.like();
        return api.putLike(cardId)
            .then((newJSON) => event.target.nextElementSibling.textContent = newJSON.likes.length);
    }
})
//грузим картинки с сервера, информацию о пользователе, аватар
window.addEventListener('load', () => {
    Promise.all([api.getStarterCards(), api.getUserData()])
        .then(([cards, user]) => {
            cardList.render(cards, cardClass, myId);
            profileDataForm.setUserInfo(user.name, user.about, user.avatar);
        })
});

export { wordsError };