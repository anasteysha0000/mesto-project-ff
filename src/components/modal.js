export { openPopup, closePopup, makePopupAnimated };
import { validationSettings } from "./constants";
import { clearValidation } from "./validation";

function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeOnEsc);
}
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeOnEsc);
}
function makePopupAnimated(popup) {
  popup.classList.add("popup_is-animated");
}
function closeOnEsc(event) {
  const openedPopup = document.querySelector(".popup_is-opened");
  if (event.key === "Escape") {
    closePopup(openedPopup);
    clearValidation(openedPopup, validationSettings);
  }
}
