import "../styles/index.css";
import { initialCards } from "./cards.js";
import { openClosePopup, makePopupAnimated } from "./modal.js";
import {
  toggleLikeButton,
  deleteCardButton,
  getTemp,
  getCard,
} from "./card.js";

const placesElement = document.querySelector(".places__list");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupOpenEditButton = document.querySelector(".profile__edit-button");
const popupAddButton = document.querySelector(".profile__add-button");
const popupTypeImage = document.querySelector(".popup_type_image");
const popups = [popupTypeEdit, popupTypeNewCard, popupTypeImage];
const formElement = document.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");
const formElementTypeNewCard = popupTypeNewCard.querySelector(".popup__form");
const cardName = formElementTypeNewCard.querySelector(".popup__input_type_card-name");
const cardLink = formElementTypeNewCard.querySelector(".popup__input_type_url");

function openImage(cardLink, cardName, cardTitle) {
  popupTypeImage.querySelector(".popup__image").src = cardLink;
  popupTypeImage.querySelector(".popup__image").alt = cardName;
  popupTypeImage.querySelector(".popup__caption").textContent = cardTitle;
  openClosePopup(popupTypeImage);
}

function handleCardSubmit(evt) {
  evt.preventDefault();
  const card = {
    name: cardName.value,
    link: cardLink.value,
  };
  placesElement.insertBefore(
    getCard(card, deleteCardButton,toggleLikeButton,openImage),
    placesElement.firstChild
  );
  openClosePopup(popupTypeNewCard);
  cardName.value = "";
  cardLink.value = "";
}
function handleFormSubmit(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;
  const profileName = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");
  profileName.textContent = name;
  profileDescription.textContent = job;
  openClosePopup(popupTypeEdit);
}
function formEdit() {
  const profileName = document.querySelector(".profile__title").textContent;
  const profileDescription = document.querySelector(
    ".profile__description"
  ).textContent;
  document.querySelector(".popup__input_type_name").value = profileName;
  document.querySelector(".popup__input_type_description").value =
    profileDescription;

  popupDeleteButton.addEventListener("click", function () {
    document.querySelector(".popup__input_type_name").value = profileName;
    document.querySelector(".popup__input_type_description").value =
      profileDescription;
  });
}

function popupCloseHandler(popup) {
  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      openClosePopup(popup);
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (popup.classList.contains("popup_is-opened")) {
        openClosePopup(popup);
      }
    }
  });
  popup.querySelector(".popup__close").addEventListener("click", (event) => {
    openClosePopup(popup);
  });
}

initialCards.forEach((element) => {
  placesElement.append(
    getCard(element, deleteCardButton, toggleLikeButton, openImage)
  );
});
popups.forEach((element) => {
  popupCloseHandler(element);
  makePopupAnimated(element);
});

formElement.addEventListener("submit", handleFormSubmit);
formElementTypeNewCard.addEventListener("submit", handleCardSubmit);
popupOpenEditButton.addEventListener("click", formEdit);
popupOpenEditButton.addEventListener("click", function () {
  openClosePopup(popupTypeEdit);
});
popupAddButton.addEventListener("click", function () {
  openClosePopup(popupTypeNewCard);
});

