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
const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort8' : 'https://praktikum.tk/cohort8';
const api = new Api({
    baseUrl: serverUrl,
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
const cardClass = new Card(cardsBlock, api);
const cardList = new CardList(cardsBlock);
const popupContainers = new Popup(mainContainer);
const popupImage = new PopupImage(mainContainer);
const popupEdit = new PopupEdit(mainContainer);
const popupAvatar = new PopupAvatar(mainContainer);
const profileDataForm = new UserInfo(mainContainer);
const formValidationEdit = new FormValidator(newProfileCardForm);
const formValidationCard = new FormValidator(newCardForm);
const formValidationAvatar = new FormValidator(newProfileAvatar);
const formAvatar = new Avatar(mainContainer);

function addCard() {//функция для добавления карточек руками
    api.sendCard(newCardForm.elements.name.value, newCardForm.elements.link.value, cardList, cardClass);
    popupContainers.close(event);//закроем форму добавления обратившись к экземпляру класса Popup
}
function openEdit() {//функция для открытия редактирования профиля
    profileDataForm.setUserInfo();//установим имя и профессию "по умолчанию" на открывшейся форме
    popupEdit.open(event);//открытие блока с формой для профиля
    formValidationEdit.setValidate(wordsError);//повесим слушатели для валидации
}

function openNewCard() {//функция для открытия блока новой карточки
    popupContainers.open(event);//открытие блока с формой для карточки
    formValidationCard.setValidate(wordsError);//повесим слушатели для валидации
}

function openAvatarEdit() {
    popupAvatar.open(event);//открытие блока с формой для аватара
    formValidationAvatar.setValidate();//повесим слушатели для валидации
}

buttonNewCard.addEventListener('click', openNewCard)// блока добаления карточки
buttonEditProfile.addEventListener('click', openEdit);// блока редактирования профиля
cardsBlock.addEventListener('click', popupImage.open.bind(popupImage));// блока c картинкой
avatarButton.addEventListener('click', openAvatarEdit);

newCardBlockPopup.addEventListener('click', popupContainers.close.bind(popupContainers))// для закрытия блока добавления карточки
editProfilePopup.addEventListener('click', popupEdit.close.bind(popupEdit))// для закрытия блока редактирования профиля
imageBlock.addEventListener('click', popupImage.close.bind(popupImage));// для закрытия блока c картинкой
avatarPopup.addEventListener('click', popupAvatar.close.bind(popupAvatar));// для закрытия блока с аватаром

newProfileCardForm.addEventListener('submit', 
    profileDataForm.updateUserInfo.bind(profileDataForm, api, profileDataForm));//обновим профиль
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

// api.deleteCard('5e8b359c69fae7001f72ad8c')

//42cd123a5b2a7d443e2e2c37 мой id