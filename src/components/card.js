export { toggleLikeButton, deleteCardButton, getCard};
import { deleteCard } from "./api";
function toggleLikeButton (buttonLike){
  buttonLike.classList.toggle("card__like-button_is-active");
};
function deleteCardButton(cardElement) {
   deleteCard(cardElement._id)
   .then((res)=>{
      res.remove()
   })
   .catch((err) => {
    console.log(`Ошибка, не выполенено: ${err.status}`);
})
}

function getCard(initialCard, deleteCardButton, toggleLikeButton, openImage,counter,owner) {
  const card = document.querySelector("#card-template").content;
  const cardElement = card.querySelector(".places__item").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = initialCard.link;
  cardImage.alt = initialCard.name;
  cardElement.querySelector(".card__title").textContent = initialCard.name;
  const buttonDelete = cardElement.querySelector(".card__delete-button");
  if((initialCard.owner._id)!=owner){
    buttonDelete.remove()
  }
  buttonDelete.addEventListener("click", () => {
    deleteCardButton(initialCard);
  });


  const buttonLike = cardElement.querySelector(".card__like-button");
  cardElement.querySelector(".likes-counter").textContent = counter;
  buttonLike.addEventListener("click", () => {
    toggleLikeButton(buttonLike);
  });
  
  
  cardImage.addEventListener("click", () => {
    openImage(initialCard.link, initialCard.name, initialCard.name)
  });

  return cardElement;
}
