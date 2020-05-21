export default class Card {
    constructor(container) {
        this.containerCards = container;//поймаем контейнер с карточками и используя делегирование повесим обпаботчики лайка/удаления
        // this.containerCards.addEventListener('click', this.like);//слушатель для лайка
        // this.containerCards.addEventListener('click', this.remove);;//слушатель для удаления
    }
    create(name, place, like, cardId, ownerCard) {//метод создания DOM-элемента карточки
        const cardBlock = document.createElement('div');
        const cardImageBlock = document.createElement('div');
        const buttonDelete = document.createElement('button');
        const cardDesription = document.createElement('div');
        const cardName = document.createElement('h3');
        const buttonLike = document.createElement('button');
        const likeCount = document.createElement('div');
        const likeBlock = document.createElement('div');

        cardBlock.classList.add('place-card');
        cardImageBlock.classList.add('place-card__image');
        cardImageBlock.style.backgroundImage = `url(${place})`;
        buttonDelete.classList.add('place-card__delete-icon');
        cardDesription.classList.add('place-card__description');
        cardName.classList.add('place-card__name');
        buttonLike.classList.add('place-card__like-icon');
        likeCount.classList.add('place-card__like-count');

        cardBlock.appendChild(cardImageBlock);
        cardImageBlock.appendChild(buttonDelete);
        cardBlock.appendChild(cardDesription);
        cardDesription.appendChild(cardName);

        likeBlock.appendChild(buttonLike);
        likeBlock.appendChild(likeCount);
        cardDesription.appendChild(likeBlock);

        cardBlock.setAttribute('cardId', cardId);
        cardBlock.setAttribute('ownerCard', ownerCard);

        cardName.textContent = name;
        likeCount.textContent = like;

        return cardBlock;
    }
    like() {
        if (event.target.classList.contains('place-card__like-icon')) {
            event.target.classList.toggle('place-card__like-icon_liked');
            return event.target.closest(".place-card").getAttribute("cardId");
        }
        return false;
    }
    dislike() {
        if (event.target.classList.contains('place-card__like-icon') && event.target.classList.contains('place-card__like-icon_liked')){
        	event.target.classList.toggle('place-card__like-icon_liked');			
            return event.target.closest(".place-card").getAttribute("cardId");
        }
        return false;
    }
    remove(myId) {
        const e = event.target.classList.contains('place-card__delete-icon');
        if (e && (event.target.closest(".place-card").getAttribute("ownerCard") === myId)) {
            document.querySelector('.places-list').removeChild(event.target.closest('.place-card'));//а тут поднимаемся до родителя элемента у которого класс .place-card, чтобы удалить именно эту карточку
            return event.target.closest(".place-card").getAttribute("cardId");
        }
        return false;
    }
}