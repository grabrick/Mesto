import { openPopup, popupFullImage, popupFullImageImage, popupFullImageTitle} from './index.js';
export default class Card {
    constructor({name, link}, cardTemplateSelector) {
        this._text = name;
        this._link = link;
        this._cardTemplateSelector = cardTemplateSelector;
    } 

    //слушатель на переключение активного лайка
    _handleLikeSubmit() {
        this.classList.toggle('grid-item__like_liked');
    }

    //слушатель на удаление карточки
    _handleDeleteSubmit() {
        this.closest('.grid-item').remove();
    }

    //метод открытия полной картинки с названием карточки 
    _handlePreviewPictur() {
        openPopup(popupFullImage);
        popupFullImageImage.src = this.src;
        popupFullImageTitle.textContent = this.alt;
    }
    //все события связанные с картачками 
    _allEventsImage() {
        this._likeButton.addEventListener('click', this._handleLikeSubmit);
        this._deleteIcon.addEventListener('click', this._handleDeleteSubmit);
        this._image.addEventListener('click', this._handlePreviewPictur);
    }

    // метод с иходными переменными для карточки 
    getCard() {
        this._template = document.querySelector(this._cardTemplateSelector).content;
        // this._places = document.querySelector('#grid-template').content.querySelector('.grid-item');
        this._view = this._template.cloneNode(true);
        this._image = this._view.querySelector('.grid-item__photo')
        this._likeButton = this._view.querySelector('.grid-item__like');
        this._deleteIcon = this._view.querySelector('.grid-item__delete-icon');
        this._image.src = this._link;
        this._image.alt = this._text;
        this._view.querySelector('.grid-item__name').textContent = this._text;
        this._allEventsImage();

        return this._view;
    }


}