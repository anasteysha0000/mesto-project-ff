export { toggleLikeButton, deleteCardButton, getCard };
import { deleteCard, likeCard, unlikeCard, counterLike } from "./api.js";
import { openPopup, closePopup } from "./modal.js";
import { popupConfirmation, formEditProfile, formConfirmation, cardTemplate } from "./constants.js";
function deleteCardButton(evt, cardElement) {
  const cardDelete = evt.target.closest(".card");
  deleteCard(cardElement._id)
    .then(() => {
      cardDelete.remove();
    })
    .catch((error) => {
      console.log(`Ошибка при удалении карточки: ${error.status}`);
    });
}

function getCard(
  initialCard,
  deleteCardButton,
  toggleLikeButton,
  openImage,
  owner
) {
  const card = cardTemplate.content;
  const cardElement = card.querySelector(".places__item").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = initialCard.link;
  cardImage.alt = initialCard.name;
  cardElement.querySelector(".card__title").textContent = initialCard.name;

  const buttonDelete = cardElement.querySelector(".card__delete-button");

  if (initialCard.owner._id !== owner) {
    buttonDelete.remove();
  } else {
    buttonDelete.addEventListener("click", (event) => {
      event.preventDefault();
      openPopup(popupConfirmation);

      const confirmDeleteHandler = (submitEvent) => {
        submitEvent.preventDefault();
        deleteCardButton(event, initialCard); // Передаем оригинальный event
        closePopup(popupConfirmation);
        formConfirmation.removeEventListener("submit", confirmDeleteHandler); // Удаляем обработчик после выполнения
      };

      formConfirmation.addEventListener("submit", confirmDeleteHandler);
    });
  }

  const buttonLike = cardElement.querySelector(".card__like-button");
  buttonLike.addEventListener("click", (evt) => {
    toggleLikeButton(evt, initialCard);
  });
  initialCard.likes.some((like) => like._id === owner)
  ? buttonLike.classList.add("card__like-button_is-active")
  : buttonLike.classList.remove("card__like-button_is-active");
  
  cardElement.querySelector(".likes-counter").textContent =
    initialCard.likes.length;

  cardImage.addEventListener("click", () => {
    openImage(initialCard.link, initialCard.name, initialCard.name);
  });

  return cardElement;
}

function toggleLikeButton(evt, cardElement) {
  const isLiked = evt.target.classList.contains("card__like-button_is-active");
  const action = isLiked
    ? unlikeCard(cardElement._id)
    : likeCard(cardElement._id);
  action
    .then((res) => {
      evt.target.classList.toggle("card__like-button_is-active", !isLiked);
      evt.target
        .closest(".places__item")
        .querySelector(".likes-counter").textContent = res.likes.length;
    })
    .catch((error) => {
      console.log(`Ошибка при лайке или анлайке карточки: ${error.status}`);
    });
}
