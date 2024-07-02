const placesElement = document.querySelector(".places__list");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupOpenEditButton = document.querySelector(".profile__edit-button");
const popupAddButton = document.querySelector(".profile__add-button");
const popupTypeImage = document.querySelector(".popup_type_image");
const popups = [popupTypeEdit, popupTypeNewCard, popupTypeImage];
const formElement = document.querySelector(".popup__form");
const formInput = document.querySelector(".popup__input")
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");
const formElementTypeNewCard = popupTypeNewCard.querySelector(".popup__form");
const cardName = formElementTypeNewCard.querySelector(".popup__input_type_card-name");
const cardLink = formElementTypeNewCard.querySelector(".popup__input_type_url");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

 export{placesElement,popupTypeEdit,popupTypeNewCard,popupOpenEditButton,popupAddButton,popupTypeImage,popups,formElement,nameInput,jobInput,
formElementTypeNewCard,cardName,cardLink,profileName,profileDescription,formInput}