const showInputError = (
  formEditProfile,
  inputElement,
  errorMessage,
  validationSettings
) => {
  const errorElement = formEditProfile.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationSettings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationSettings.errorClass);
};

const hideInputError = (formEditProfile, inputElement, validationSettings) => {
  const errorElement = formEditProfile.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationSettings.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(validationSettings.errorClass);
};

const setEventListeners = (formEditProfile, validationSettings) => {
  const inputList = Array.from(
    formEditProfile.querySelectorAll(validationSettings.inputSelector)
  );
  const buttonElement = formEditProfile.querySelector(
    validationSettings.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, validationSettings);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formEditProfile, inputElement, validationSettings);
      toggleButtonState(inputList, buttonElement, validationSettings);
    });
  });
};

const enableValidation = (validationSettings) => {
  const formList = Array.from(
    document.querySelectorAll(validationSettings.formSelector)
  );
  formList.forEach((formEditProfile) => {
    setEventListeners(formEditProfile, validationSettings);
  });
};

function clearValidation(formEditProfile, validationSettings) {
  const inputList = Array.from(
    formEditProfile.querySelectorAll(validationSettings.inputSelector)
  );
  inputList.forEach((inputElement) => {
    const errorElement = formEditProfile.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = "";
    inputElement.classList.remove(validationSettings.inputErrorClass);
    inputElement.classList.remove(validationSettings.errorClass);
  });
  formEditProfile.reset();
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, validationSettings) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationSettings.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationSettings.inactiveButtonClass);
  }
};

const isValid = (formEditProfile, inputElement, validationSettings) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(
      formEditProfile,
      inputElement,
      inputElement.validationMessage,
      validationSettings
    );
  } else {
    hideInputError(formEditProfile, inputElement, validationSettings);
  }
};
export { enableValidation, clearValidation };
