const placesElement = document.querySelector(".places__list");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupOpenEditButton = document.querySelector(".profile__edit-button");
const popupAddButton = document.querySelector(".profile__add-button");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupTypeAvatar = document.querySelector(".popup_type_avatar");
const deletePopup = document.querySelector(".popup_type_delete");
const popups = [
  popupTypeEdit,
  popupTypeNewCard,
  popupTypeImage,
  popupTypeAvatar,
  deletePopup,
];
const formElement = popupTypeEdit.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");
const formElementTypeNewCard = popupTypeNewCard.querySelector(".popup__form");
const cardName = formElementTypeNewCard.querySelector(
  ".popup__input_type_card-name"
);
const cardLink = formElementTypeNewCard.querySelector(".popup__input_type_url");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");
const formElementTypeAvatar = popupTypeAvatar.querySelector(".popup__form");
const inputUrl = formElementTypeAvatar.querySelector(
  ".popup__input_type_url_img"
);
const popupForm = deletePopup.querySelector(".popup__form");
const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input_type_error-active",
};
const config = {
  baseUrl: "https://nomoreparties.co/v1/pwff-cohort-1",
  headers: {
    authorization: "77907589-9e72-4481-9b6a-63164258805a",
    "Content-Type": "application/json",
  },
};
export {
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
  deletePopup,
  popupForm,
  validationSettings,
  config
};
