export default class Card {
    constructor(data, cardTemplateSelector, handleCardClick, handleDeleteClick, handleLikeClick ) {
        this._cardTemplate = document.querySelector(cardTemplateSelector)
            .content.querySelector('.grid__item');
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._id = data.id;
        this._userId = data.userId;
        this._ownerId = data.ownerId;

        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeClick = handleLikeClick;
    }

    getCardElement() {
        this._cardElement = this._cardTemplate.cloneNode(true);
        this._likeButton = this._cardElement.querySelector('.grid__heart');
        this._cardImage = this._cardElement.querySelector('.grid__image');
        this._trash = this._cardElement.querySelector('.grid__trash');
        this._likeCountElement = this._cardElement.querySelector('.grid__heart_counter');

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardElement.querySelector('.grid__text').textContent = this._name;
        this.setLikes(this._likes)

        this._setEventListeners();

        if(this._ownerId !== this._userId) {
            this._trash.style.display = 'none'
        }

        return this._cardElement;
    }

    isLiked() {
        const userHasLikedCard = this._likes.find(user => user._id === this._userId)

        return userHasLikedCard
    }

    setLikes(newLikes) {
        this._likes = newLikes;
        this._likeCountElement.textContent = this._likes.length

        if(this.isLiked()) {
            this._handleAddLike()
        } else {
            this._handleRemoveLike()
        }
    }

    _handleAddLike() {
        this._likeButton.classList.add('grid__heart_active')
    };

    _handleRemoveLike() {
        this._likeButton.classList.remove('grid__heart_active')
    };

    removeCard() {
        this._cardElement.remove();
    };

    _setEventListeners() {
        this._likeButton.addEventListener('click', () => {
            this._handleLikeClick(this._id);
        });

        this._trash.addEventListener('click', () => {
            this._handleDeleteClick(this._id);
        });

        this._cardImage.addEventListener('click', () =>  this._handleCardClick())
    }
}
