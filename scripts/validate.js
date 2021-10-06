const settingsForm = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

// Показать ошибку
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
    inputElement.classList.add(settingsForm.inputErrorClass)
    errorElement.textContent = errorMessage
    errorElement.classList.add(settingsForm.errorClass)
};

// Cкрыть ошибку
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
    inputElement.classList.remove(settingForm.inputErrorClass)
    errorElement.textContent = ''
    errorElement.classList.remove(settingsForm.errorClass)
};

// Проверить валидность формы
const checkInputValidity = (formElement, inputElement, ) => {
    const inputIsNotValid = !inputElement.validity.valid;
    if(inputIsNotValid) {
        const buttonElement = inputElement.validationMessage;
        showInputError(inputElement, formElement, errorMessage)
    } else {
        hideInputError(inputElement, formElement)
    };
};

// Переключение кнопки
//const toggleButtonState = (formElement, inputElement) => {
//    const isInputNotValid = !inputElement.validity.valid;
//};

//Функция для навешивания событий на все формы
const setEventListeners = (formElement) => {
    formElement.addEventListener('submit', (event) => {
        evt.preventDefault();
    });

    const inputList = Array.form(formElement.querySelectorAll(settingsForm.inputSelector))

    const buttonElement = formElement.querySelector(settingsForm.submitButtonSelector)

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement)
            toggleButtonState(inputList, buttonElement)
        });
    });
};

// Валидация
const enableValidation = () => {
    const formList = Array.form(document.querySelectorAll(settingsForm.formSelector));
    formList.forEach(setEventListeners);
};

enableValidation(settingsForm);