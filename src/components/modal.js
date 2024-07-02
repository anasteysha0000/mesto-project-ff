export { openPopup, closePopup, makePopupAnimated };
import { clearValidation } from "./validation";

function openPopup(popup){
  popup.classList.add("popup_is-opened");
  document.addEventListener('keydown', closeOnEsc);
}
function closePopup(popup){
  popup.classList.remove("popup_is-opened");
  document.removeEventListener('keydown', closeOnEsc)
}
function makePopupAnimated(popup) {
  popup.classList.add("popup_is-animated");
}
function closeOnEsc(event) {
  const openedPopup = document.querySelector(".popup_is-opened");
  if (event.key === 'Escape') {
      closePopup(openedPopup);
      clearValidation(openedPopup,{
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__input_type_error-active'
      })
  }
}