export { toggleLikeButton, deleteCardButton, getTemp, getCard };
function toggleLikeButton (buttonLike){
  buttonLike.classList.toggle("card__like-button_is-active");
};
function deleteCardButton(cardElement) {
  return cardElement.remove();
}
function getTemp(element) {
  return [element.name, element.link, element.name];
}
function getCard(initialCard, deleteCardButton, toggleLikeButton, openImage) {
  const card = document.querySelector("#card-template").content;
  const cardElement = card.querySelector(".places__item").cloneNode(true);
  const [cardName, cardLink, cardTitle] = getTemp(initialCard);
  cardElement.querySelector(".card__image").src = cardLink;
  cardElement.querySelector(".card__image").alt = cardName;
  cardElement.querySelector(".card__title").textContent = cardTitle;

  const buttonDelete = cardElement.querySelector(".card__delete-button");
  buttonDelete.addEventListener("click", () => {
    deleteCardButton(cardElement);
  });

  const buttonLike = cardElement.querySelector(".card__like-button");
  buttonLike.addEventListener("click", () => {
    toggleLikeButton(buttonLike);
  });

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.addEventListener("click", () => {
    openImage(cardLink, cardName, cardTitle);
  });

  return cardElement;
}
