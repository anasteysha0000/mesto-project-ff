
  const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input_type_error-active');
  };
  
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.textContent = "";
    errorElement.classList.remove('popup__input_type_error-active');
  };
  
  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button');
      toggleButtonState(inputList, buttonElement);
      inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          isValid(formElement, inputElement)})
        });
    }

  const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
      setEventListeners(formElement);
    });
  };
  function clearValidation(formElement){
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    inputList.forEach((inputElement) => {
      const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
      errorElement.textContent = "";
      inputElement.classList.remove('popup__input_type_error');
      inputElement.classList.remove('popup__input_type_error-active');
  });
  }
  
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
      
    });
  };
  const toggleButtonState = (inputList, buttonElement) => {
    // Если есть хотя бы один невалидный инпут

    if (hasInvalidInput(inputList)) {
     
      // сделай кнопку неактивной
      buttonElement.disabled = true;
      buttonElement.classList.add('form__submit_inactive');
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove('form__submit_inactive');
    }
  }; 
  const isValid = (formElement, inputElement) => {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}; 
  export{enableValidation,clearValidation}