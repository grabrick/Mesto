const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
    inputElement.classList.remove('form__input_type_error')
    errorElement.classList.remove('form__input-error_active')
    errorElement.textContent = ''
};

const showInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
    inputElement.classList.add('form__input_type_error')
    errorElement.textContent = inputElement.validationMessage
    errorElement.classList.add('form__input-error_active')
};

const checkInputValidity = (formElement, inputElement) => {
    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement)
    } else {
        showInputError(formElement, inputElement)
    }
};

const hazInvalidInput = (inputList) => {
   return inputList.some(inputElement => !inputElement.validity.valid);
};

const toggleButtonState = (buttonElement, inputList) => {
    console.log(hazInvalidInput(inputList))
};

const setEventListeners = (formElement) => {
    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    });

    const inputList = Array.form(formElement.querySelectorAll('.form__input'))

    const buttonElement = formElement.querySelector('.popup__button-close')

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement)
            toggleButtonState(buttonElement, inputList)
        });
    });
};

const enableValidation = () => {
    const formList = Array.form(document.querySelectorAll('.form'))

    formList.forEach((formElement) => {
        setEventListeners(formElement)
    });
};