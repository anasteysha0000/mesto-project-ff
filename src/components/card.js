export { toggleLikeButton, deleteCardButton, getCard};
import { deleteCard, likeCard,unlikeCard} from "./api.js";
function deleteCardButton(evt, cardElement) {
  const cardDelete = evt.target.closest('.card');
  deleteCard(cardElement._id)
    .then(() => {
      cardDelete.remove();
    })
    .catch((error) => {
      console.log(`Ошибка при удалении карточки: ${error}`);
    });
}

function getCard(initialCard, deleteCardButton, toggleLikeButton, openImage, counter, owner) {
  const card = document.querySelector("#card-template").content;
  const cardElement = card.querySelector(".places__item").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = initialCard.link;
  cardImage.alt = initialCard.name;
  cardElement.querySelector(".card__title").textContent = initialCard.name;

  const buttonDelete = cardElement.querySelector(".card__delete-button");
  if (initialCard.owner._id !== owner) {
    buttonDelete.remove();
  } else {
    buttonDelete.addEventListener("click", (evt) => {
      deleteCardButton(evt, initialCard);
    });
  }

  const buttonLike = cardElement.querySelector(".card__like-button");

  if (initialCard.likes.some(like => like._id === owner)) {
    buttonLike.classList.add("card__like-button_is-active");
  }

  buttonLike.addEventListener("click", (evt) => {
    toggleLikeButton(evt, initialCard._id);
  });

  cardElement.querySelector(".likes-counter").textContent = initialCard.likes.length;

  cardImage.addEventListener("click", () => {
    openImage(initialCard.link, initialCard.name, initialCard.name);
  });

  return cardElement;
}

function toggleLikeButton(evt, cardId) {
  const isLiked = evt.target.classList.contains("card__like-button_is-active");
  const action = isLiked ? unlikeCard(cardId) : likeCard(cardId);
  action
    .then((res) => {
      evt.target.classList.toggle("card__like-button_is-active", !isLiked);
      evt.target.closest('.places__item').querySelector(".likes-counter").textContent = res.likes.length;
    })
    .catch((error) => {
      console.log(`Ошибка при лайке или анлайке карточки: ${error}`);
    });
}