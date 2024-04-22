export { openClosePopup, makePopupAnimated };

function openClosePopup(popup) {
  popup.classList.toggle("popup_is-opened");
}
function makePopupAnimated(popup) {
  popup.classList.add("popup_is-animated");
}
