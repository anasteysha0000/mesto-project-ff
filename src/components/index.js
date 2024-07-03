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
  formEditProfile,
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
  popupTypeImageDescription,
  popupTypeImageTitle,
} from "./constants.js";
import {
  getInitialCards,
  getIUserInfo,
  editProfile,
  createNewCard,
  editAvatar,
} from "./api.js";

function openImage(cardLink, cardName, cardTitle) {
  popupTypeImageDescription.src = cardLink;
  popupTypeImageDescription.alt = cardName;
  popupTypeImageTitle.textContent = cardTitle;
  openPopup(popupTypeImage);
}

function handleCardSubmit(evt) {
  evt.preventDefault();
  evt.submitter.textContent = "Сохранение...";
  const card = {
    name: cardName.value,
    link: cardLink.value,
  };
  createNewCard(card)
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
      clearValidation(formElementTypeNewCard, validationSettings);
    })
    .catch((error) => {
      console.log(`Ошибка при заполнении новой карточки: ${error}`);
    })
    .finally(() => {
      evt.submitter.textContent = "Сохранить";
    });
}
function submitAvatarForm(evt) {
  evt.preventDefault();
  evt.submitter.textContent = "Сохранение...";
  editAvatar(inputUrl.value)
    .then((url) => {
      profileAvatar.style.backgroundImage = `url(${url})`;
      closePopup(popupTypeAvatar);
      clearValidation(formElementTypeAvatar, validationSettings);
    })
    .catch((error) => {
      console.log(`Ошибка при изменении аватара: ${error}`);
    })
    .finally(() => {
      evt.submitter.textContent = "Сохранить";
    });
}

function submitEditProfileForm(evt) {
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
  const profileDescription = document.querySelector(".profile__description").textContent; 
  nameInput.value = profileName;
  jobInput.value = profileDescription;
}
function popupCloseHandler(popup) {
  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      closePopup(popup);
    }
  });
  popup.querySelector(".popup__close").addEventListener("click", () => {
    closePopup(popup);
  });
}

Promise.all([getIUserInfo(), getInitialCards()])
.then(([name, card]) => {
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
})
.catch((error)=>{
  console.log(`Ошибка: ${error}`);
})


popups.forEach((element) => {
  popupCloseHandler(element);
  makePopupAnimated(element);
});

formEditProfile.addEventListener("submit", submitEditProfileForm);
formElementTypeNewCard.addEventListener("submit", handleCardSubmit);
popupOpenEditButton.addEventListener("click", function () {
  formEdit();
  openPopup(popupTypeEdit);
  
});
popupAddButton.addEventListener("click", function () {
  openPopup(popupTypeNewCard);
});
profileAvatar.addEventListener("click", function () {
  openPopup(popupTypeAvatar);
});
formElementTypeAvatar.addEventListener("submit", submitAvatarForm);

enableValidation(validationSettings);
