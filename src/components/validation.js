import { validationSettings } from "./constants";
  const showInputError = (formElement, inputElement, errorMessage, validationSettings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationSettings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationSettings.errorClass);
  };
 
  const hideInputError = (formElement, inputElement,validationSettings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationSettings.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(validationSettings.errorClass);
  };

  const setEventListeners = (formElement,validationSettings) => {
    const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
    const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);
      toggleButtonState(inputList, buttonElement,validationSettings);
      inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          isValid(formElement, inputElement, validationSettings)
          toggleButtonState(inputList, buttonElement,validationSettings);})
        });
    }

 

  const enableValidation = (validationSettings) => {
    const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
    formList.forEach((formElement) => {
      setEventListeners(formElement,validationSettings);
    });
  };
 
  function clearValidation(formElement,validationSettings){
    const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
    inputList.forEach((inputElement) => {
      const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
      errorElement.textContent = "";
      inputElement.classList.remove(validationSettings.inputErrorClass);
      inputElement.classList.remove(validationSettings.errorClass);
  });
  }
  
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
      
    });
  };

  const toggleButtonState = (inputList, buttonElement,validationSettings) => {
    // Если есть хотя бы один невалидный инпут

    if (hasInvalidInput(inputList)) {
     
      // сделай кнопку неактивной
      buttonElement.disabled = true;
      buttonElement.classList.add(validationSettings.inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(validationSettings.inactiveButtonClass);
    }
  }; 

  const isValid = (formElement, inputElement, validationSettings) => {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage,validationSettings);
  } else {
    hideInputError(formElement, inputElement,validationSettings);
  }
}; 
  export{enableValidation,clearValidation}