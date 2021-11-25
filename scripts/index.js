import FormValidator from './FormValidator.js';
import {settingsForm} from './settingsForm.js';
import Card from './Card.js';

// Переменные редактирования профиля
const popupEditWrap = document.querySelector('.popup_type_edit');
const popupButton = document.querySelector('.profile__edit-button');
const popupButtonClose = document.querySelector('.popup__button-close');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__information');
const popupForm = popup.querySelector('.popup__form');
const popupName = document.querySelector('.popup__input_name_name');
const popupJob = document.querySelector('.popup__input_name_profession');

// Переменные добавляния карточки
const popupAdd = document.querySelector('.popup_type_add');
const popupAddButton = document.querySelector('.profile__add-button');
const popupAddButtonClose = popupAdd.querySelector('.popup__button-close');
const popupAddForm = popupAdd.querySelector('.popup__form');

// Попап картинки при нажатии 
const popupFullImage = document.querySelector('.popup_type_image');
const popupFullImageImage = popupFullImage.querySelector('.popup__image');
const popupFullImageTitle = popupFullImage.querySelector('.popup__title-image');
const popupFullImageClose = popupFullImage.querySelector('.popup__button-close');

// Переменные картинки( на доработке ) <<---  
//const popupImage = document.querySelector('.popup_type_image');

//переменные инпутов 
const titleCardInput = popupAdd.querySelector('.popup__input_name_title-card');
const linkCardInput = popupAdd.querySelector('.popup__input_name_link-card');

// переменная объекта под фотки 
const photoCard = document.querySelector('.grid-places');

// Обработчик изначального заполнения значений полей формы / открытие попапа редактирования
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  popup.parentNode.addEventListener('keydown', closePopupEscKey);
}

// Функция закрытия попапа по нажатию ESC
function closePopupEscKey(evt) {
  if (evt.key === "Escape") {
    // document.querySelector('.popup_opened').parentNode.removeEventListener('keydown', closePopupEscKey);
    // closePopup(popup);
    const openedPopup = document.querySelector('.popup_opened');
    openedPopup.parentNode.removeEventListener('keydown', closePopupEscKey);
    closePopup(openedPopup);
  }
}

// Событие зыкрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

// Обработчики открытия и закрытия
popupButton.addEventListener('click', () => {
  openPopup(popupEditWrap)
});
popupAddButton.addEventListener('click', () => {
  openPopup(popupAdd)
});

popupButtonClose.addEventListener('click', () => {
  closePopup(popupEditWrap)
});
popupAddButtonClose.addEventListener('click', () => {
  closePopup(popupAdd);
});
popupFullImageClose.addEventListener('click', () => {
  closePopup(popupFullImage)
});

// Закрытие попапа по клике на оверлей
const closePopupOverlay = popup => event => {
  if (event.target !== event.currentTarget) return;
  closePopup(popup);
}

popupEditWrap.addEventListener('click', closePopupOverlay(popupEditWrap));
popupAdd.addEventListener('click', closePopupOverlay(popupAdd));


//При открытии заполняем форму редактирования профиля текущими значениями
popupButton.addEventListener('click', function() {
  openPopup(popupEditWrap);
  popupName.value = profileName.textContent;
  popupJob.value = profileJob.textContent;
});

// Обработчик формы / автоматическое заполнение формы
function formSubmitHandler(event) {
    event.preventDefault();
    profileName.textContent = popupName.value;
    profileJob.textContent = popupJob.value;
    closePopup(popup);
}

// Кнопка сохранить, закрывающий попап
popupForm.addEventListener('submit', formSubmitHandler);

// Генерация первых 6 карточек
const initialCards = [
  {
    name: 'Карачевск',
    link: './images/karachev.png'
  },
  {
    name: 'Гора Эльбрус',
    link: './images/elbrys.png'
  },
  {
    name: 'Домбай',
    link: './images/dombai.png'
  },
  {
    name: 'Карачевск',
    link: './images/karachev.png'
  },
  {
    name: 'Гора Эльбрус',
    link: './images/elbrys.png'
  },
  {
    name: 'Домбай',
    link: './images/dombai.png'
  },
];

// submit на создание card  
const formSubmitAddHandler = (event) => {
  event.preventDefault();
  const card = new Card({name: titleCardInput.value, link: titleCardInput.value}, '#grid-template')
  renderCard(card.getCard());
  closePopup(popupAdd);
  popupAddForm.reset(); // очищение поля формы для след. добавления
}

  // рендеринг
  function renderCard(card) {
    photoCard.prepend(card);
  }

  // Обработчик формы добавления карточки
  popupAddForm.addEventListener('submit', formSubmitAddHandler);
  
  // Генерация
  initialCards.forEach(item => {
    const card = new Card(item, '#grid-template');
    renderCard((card.getCard()));
  });

  //Включаем валидацию формы редактирование профиля
  const editFormValidator = new FormValidator(settingsForm, popupForm);
  editFormValidator.enableValidation();

  //Включаем валидацию формы редактирование профиля
  const addFormValidator = new FormValidator(settingsForm, popupAddForm);
  addFormValidator.enableValidation();

export {
  openPopup,
  popupFullImage,
  popupFullImageImage,
  popupFullImageTitle,
}