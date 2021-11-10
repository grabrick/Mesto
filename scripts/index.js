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

  // Переменные картинки
const popupImage = document.querySelector('.popup_type_image');


const titleCardInput = popupAdd.querySelector('.popup__input_name_title-card');
const linkCardInput = popupAdd.querySelector('.popup__input_name_link-card');

const photoCard = document.querySelector('.grid-places');

const formSubmitAddHandler = (event) => {
  event.preventDefault();
  const titleCardSubmit = titleCardInput.value;
  const linkCardSubmit = linkCardInput.value;
  renderCard(createCard(titleCardSubmit, linkCardSubmit));
  closePopup(popupAdd);
  popupAddForm.reset(); // очищение поля формы для след. добавления
  }
  
  // Рендеринг
  function createCard(titleCardSubmit, linkCardSubmit) {
  const templateCard = document.querySelector('#grid-template').content.querySelector('.grid-item');
  const templateCardElement = templateCard.cloneNode(true);
  const templateCardTitle = templateCardElement.querySelector('.grid-item__name');
  const templateCardImage = templateCardElement.querySelector('.grid-item__photo');
  const AddlikeButton = templateCardElement.querySelector('.grid-item__like');
  const AddImage = templateCardElement.querySelector('.grid-item__photo');
  const AddDeleteIcon = templateCardElement.querySelector('.grid-item__delete-icon');

  //Слушатели
    AddlikeButton.addEventListener('click', function() {
      AddlikeButton.classList.toggle('grid-item__like_liked');
    })

    AddDeleteIcon.addEventListener('click', function() {
      AddDeleteIcon.closest('.grid-item').remove();
    })

    AddImage.addEventListener('click', function () {
      openPopup(popupFullImage);
      popupFullImageImage.src = linkCardSubmit;
      popupFullImageTitle.textContent = titleCardSubmit;
    });
    templateCardTitle.textContent = titleCardSubmit;
    templateCardImage.src = linkCardSubmit;
    templateCardImage.alt = linkCardSubmit;
    return templateCardElement;
  }

  // Рендеринг
  function renderCard(card) {
    photoCard.prepend(card);
  }

  // Обработчик формы добавления карточки
  popupAddForm.addEventListener('submit', formSubmitAddHandler);
  
  // Генерация
  const initialTemplate = initialCards.forEach(item => {
  renderCard(createCard(item.name, item.link));
  });