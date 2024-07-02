import "../styles/index.css";

import { openPopup, closePopup, makePopupAnimated } from "./modal.js";
import {toggleLikeButton,deleteCardButton,getCard} from "./card.js";
import{enableValidation,clearValidation} from "./validation.js"
import {placesElement,popupTypeEdit,popupTypeNewCard,popupOpenEditButton,popupAddButton,popupTypeImage,popups,formElement,nameInput,jobInput,
  formElementTypeNewCard,cardName,cardLink,profileName,profileDescription} from './constants.js'
import { cardsInfo, userInfo,editProfile, newCard,deleteCard} from "./api.js";
 
function openImage(cardLink, cardName, cardTitle) {
  popupTypeImage.querySelector(".popup__image").src = cardLink;
  popupTypeImage.querySelector(".popup__image").alt = cardName;
  popupTypeImage.querySelector(".popup__caption").textContent = cardTitle;
  openPopup(popupTypeImage)
}

function handleCardSubmit(evt) {
  evt.preventDefault();
  const card = {
    name: cardName.value,
    link: cardLink.value,
  };
  newCard(card.name,card.link)
  placesElement.prepend(getCard(card, deleteCardButton, toggleLikeButton, openImage))
  closePopup(popupTypeNewCard);
  formElementTypeNewCard.reset();
}
function handleFormSubmit(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;
  profileName.textContent = name;
  profileDescription.textContent = job;
  editProfile(name,job)
  closePopup(popupTypeEdit);
}
function formEdit() {
  const profileName = document.querySelector(".profile__title").textContent;
  const profileDescription = document.querySelector(
    ".profile__description"
  ).textContent;
  nameInput.value = profileName;
  jobInput.value = profileDescription;
}
function popupCloseHandler(popup) {
  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      closePopup(popup)
      clearValidation(popup,{
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__input_type_error-active'
      })

    }
  });
  popup.querySelector(".popup__close").addEventListener("click", (event) => {
    closePopup(popup);
    clearValidation(popup,{
      formSelector: '.popup__form',
      inputSelector: '.popup__input',
      submitButtonSelector: '.popup__button',
      inactiveButtonClass: 'popup__button_disabled',
      inputErrorClass: 'popup__input_type_error',
      errorClass: 'popup__input_type_error-active'
    })
    
  });
}


Promise.all([userInfo(),cardsInfo()])
  .then(([name, card]) => {
  //= name._id
  profileName.textContent = name.name
  profileDescription.textContent=name.about
  console.log(card)
  const owner= name._id
  card.forEach((element) => {
    const counterLikes=element.likes.length
      placesElement.append(
        getCard(element, deleteCardButton, toggleLikeButton, openImage,counterLikes,owner))
  });
  });
 
popups.forEach((element) => {
  popupCloseHandler(element);
  makePopupAnimated(element);
 });


formElement.addEventListener("submit", handleFormSubmit);
formElementTypeNewCard.addEventListener("submit", handleCardSubmit);
popupOpenEditButton.addEventListener("click", formEdit);
popupOpenEditButton.addEventListener("click", function () {
  openPopup(popupTypeEdit);
});
popupAddButton.addEventListener("click", function () {
  openPopup(popupTypeNewCard);
});


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input_type_error-active'});