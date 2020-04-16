import "./style.css";

import Card from './js/Card.js';
import CardList from './js/CardList.js';
import Popup from './js/Popup.js';
import UserInfo from './js/UserInfo.js';
import FormValidator from './js/FormValidator.js';
import Api from './js/Api.js';
import Avatar from './js/Avatar.js';
const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort8' : 'https://praktikum.tk/cohort8';
const api = new Api({
    baseUrl: serverUrl,
    //baseUrl: 'https://praktikum.tk/cohort8',
    headers: {
        authorization: '44df0b31-b1b2-4c2f-8004-9e32bc2204a3',
        'Content-Type': 'application/json'
    }
});
const mainContainer = document.querySelector('.root');//ловим общий блок для всего и из него будем вытаскивать полченные элементы\поля
const cardsBlock = mainContainer.querySelector('.places-list');//ловим общий блок с карточками
const buttonNewCard = mainContainer.querySelector('.user-info__button');//кнопка для вызова общего блока для добавления карточки
const newCardBlockPopup = mainContainer.querySelector('.popup');//общий блок для добавления карточки
const newCardForm = document.forms.new;//определение формы для добавления карточки
const buttonEditProfile = mainContainer.querySelector('.user-info__button-edit');//кнопка для редактирования профиля
const editProfilePopup = mainContainer.querySelector('.popup-edit');//общий блок для редактирования профиля
const newProfileCardForm = document.forms.newEdit;//форма редактирования профиля
const imageBlock = mainContainer.querySelector('.popup-image');

const avatarPopup = mainContainer.querySelector('.popup-avatar');//общий блок для chenges avatar
const avatarButton = mainContainer.querySelector('.user-info__photo');// блок foto профиля
const newProfileAvatar = document.forms.newavatar;//форма редактирования avatar

const tmp = 'de23ac6cd6c1cde773f69969';
const wordsError = {
    tooShort: 'Должно быть от 2 до 30 символов',
    valueMissing: 'Это обязательное поле',
    patternMismatch: 'Тут должна быть ссылка на картинку',
}
const cardClass = new Card(cardsBlock, api);//создадим экземляр класса и установим слушатели
const cardList = new CardList(cardsBlock);//создадим экземляр класса 
const popupContainers = new Popup(mainContainer);//создаем экземляр класса, чтобы обращаться к нему
const profileDataForm = new UserInfo(mainContainer);//создаем класс объекта, чтобы обращаться к нему
const formValidationEdit = new FormValidator(newProfileCardForm);//для валидации
const formValidationCard = new FormValidator(newCardForm);//для валидации
const formValidationAvatar = new FormValidator(newProfileAvatar);//для валидации
const formAvatar = new Avatar(mainContainer);

function addCard() {//функция для добавления карточек руками
    api.sendCard(newCardForm.elements.name.value, newCardForm.elements.link.value, cardList, cardClass);
    popupContainers.close(event);//закроем форму добавления обратившись к экземпляру класса Popup
}
function openEdit() {//функция для открытия редактирования профиля
    profileDataForm.setUserInfo();//установим имя и профессию "по умолчанию" на открывшейся форме
    popupContainers.open(event);//откроем блок с формой
    formValidationEdit.setValidate(wordsError);//повесим слушатели для валидации
}

function openNewCard() {//функция для открытия блока новой карточки
    popupContainers.open(event);//откроем блок с формой
    formValidationCard.setValidate(wordsError);//повесим слушатели для валидации
}

function openAvatarEdit() {
    popupContainers.open(event);//откроем блок с формой
    formValidationAvatar.setValidate();//повесим слушатели для валидации
}

buttonNewCard.addEventListener('click', openNewCard)// блока добаления карточки
buttonEditProfile.addEventListener('click', openEdit);// блока редактирования профиля
cardsBlock.addEventListener('click', popupContainers.open.bind(popupContainers));// блока c картинкой
avatarButton.addEventListener('click', openAvatarEdit);

newCardBlockPopup.addEventListener('click', popupContainers.close.bind(popupContainers))// для закрытия блока добавления карточки
editProfilePopup.addEventListener('click', popupContainers.close.bind(popupContainers))// для закрытия блока редактирования профиля
imageBlock.addEventListener('click', popupContainers.close.bind(popupContainers));// для закрытия блока c картинкой
avatarPopup.addEventListener('click', popupContainers.close.bind(popupContainers));// для закрытия блока c картинкой

newProfileCardForm.addEventListener('submit', profileDataForm.updateUserInfo.bind(profileDataForm, api, profileDataForm));//обновим профиль
newCardForm.addEventListener('submit', () => {
    event.preventDefault();
    addCard()
});//слушатель на кнопку создания карточки

newProfileAvatar.addEventListener('submit', () => {
    event.preventDefault();
    formAvatar.updateAvatar(api);
});

api.getUserData(profileDataForm);//загрузим данные при загрузке страницы
api.getStarterCards(cardList, cardClass, "42cd123a5b2a7d443e2e2c37");//создадим карточки при загрузке

export { wordsError };

//42cd123a5b2a7d443e2e2c37 мой id