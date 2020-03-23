class Card {
    constructor(container, api) {
        this.containerCards = container;//поймаем контейнер с карточками и используя делегирование повесим обпаботчики лайка/удаления
		this.containerCards.addEventListener('click', this.like);//слушатель для лайка
        this.containerCards.addEventListener('click', this.remove);;//слушатель для удаления
        this.api = api;
    }
    create(name, place, like=0) {//метод создания DOM-элемента карточки
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

        cardName.textContent = name;
        likeCount.textContent = like;

        return cardBlock;
    }
    like(event, cardId) {//метод лайка карточки
		if (event.target.classList.contains('place-card__like-icon')){
            api.putLike('5e4959db69fae7001f72643a');
        	event.target.classList.toggle('place-card__like-icon_liked');//лайкаем или убираем лайк переключением класса			
            return;
        }
        if (event.target.classList.contains('place-card__like-icon') && event.target.classList.contains('place-card__like-icon_liked')){
            api.deleteLike('5e4959db69fae7001f72643a');
        	event.target.classList.toggle('place-card__like-icon_liked');//лайкаем или убираем лайк переключением класса			
            return;
        }
    }
    remove(event) {//метод удаления карточки
		if (event.target.classList.contains('place-card__delete-icon')){
            api.deleteCard(cardId);
        	document.querySelector('.places-list').removeChild(event.target.closest('.place-card'));//а тут поднимаемся до родителя элемента у которого класс .place-card, чтобы удалить именно эту карточку
        }
	}
}