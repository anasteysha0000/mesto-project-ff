import "../styles/index.css";

import { openPopup, closePopup, makePopupAnimated } from "./modal.js";
import { toggleLikeButton, deleteCardButton, getCard } from "./card.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  placesElement,
  popupTypeEdit,
  popupTypeNewCard,
  popupOpenEditButton,
  popupAddButton,
  popupTypeImage,
  popupTypeAvatar,
  popups,
  formElement,
  nameInput,
  jobInput,
  formElementTypeNewCard,
  cardName,
  cardLink,
  profileName,
  profileDescription,
  profileAvatar,
  formElementTypeAvatar,
  inputUrl,
  validationSettings,
} from "./constants.js";
import {
  cardsInfo,
  userInfo,
  editProfile,
  newCard,
  editAvatar,
} from "./api.js";

function openImage(cardLink, cardName, cardTitle) {
  popupTypeImage.querySelector(".popup__image").src = cardLink;
  popupTypeImage.querySelector(".popup__image").alt = cardName;
  popupTypeImage.querySelector(".popup__caption").textContent = cardTitle;
  openPopup(popupTypeImage);
}

function handleCardSubmit(evt) {
  evt.preventDefault();
  evt.submitter.textContent = "Сохранение...";
  const card = {
    name: cardName.value,
    link: cardLink.value,
  };
  newCard(card)
    .then((card) => {
      placesElement.prepend(
        getCard(
          card,
          deleteCardButton,
          toggleLikeButton,
          openImage,
          card.owner._id
        )
      );
      closePopup(popupTypeNewCard);
    })
    .catch((error) => {
      console.log(`Ошибка при заполнении новой карточки: ${error}`);
    })
    .finally(() => {
      evt.submitter.textContent = "Сохранить";
    });
  formElementTypeNewCard.reset();
}
function handleProfileSubmit(evt) {
  evt.preventDefault();
  evt.submitter.textContent = "Сохранение...";
  editAvatar(inputUrl.value)
    .then((url) => {
      profileAvatar.style.backgroundImage = `url(${url})`;
      closePopup(popupTypeAvatar);
    })
    .catch((error) => {
      console.log(`Ошибка при изменении аватара: ${error}`);
    })
    .finally(() => {
      evt.submitter.textContent = "Сохранить";
    });

  formElementTypeAvatar.reset();
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  evt.submitter.textContent = "Сохранение...";
  editProfile(nameInput.value, jobInput.value)
    .then((res) => {
      profileName.textContent = res.name;
      profileDescription.textContent = res.about;
      closePopup(popupTypeEdit);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => (evt.submitter.textContent = "Сохранение"));
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
      closePopup(popup);
      clearValidation(popup, validationSettings);
    }
  });
  popup.querySelector(".popup__close").addEventListener("click", () => {
    closePopup(popup);
    clearValidation(popup, validationSettings);
  });
}

Promise.all([userInfo(), cardsInfo()]).then(([name, card]) => {
  const owner = name._id;
  profileName.textContent = name.name;
  profileDescription.textContent = name.about;
  profileAvatar.style.backgroundImage = `url(${name.avatar})`;
  card.forEach((element) => {
    const cardAdd = getCard(
      element,
      deleteCardButton,
      toggleLikeButton,
      openImage,
      owner
    );
    placesElement.append(cardAdd);
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
profileAvatar.addEventListener("click", function () {
  openPopup(popupTypeAvatar);
  clearValidation(formElementTypeAvatar, validationSettings);
});
formElementTypeAvatar.addEventListener("submit", handleProfileSubmit);

enableValidation(validationSettings);
