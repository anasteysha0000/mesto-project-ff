// @todo: Темплейт карточки
const placesElement = document.querySelector('.places__list');

const cardDeleteButton = (cardElement)=>{
    return cardElement.remove();
  }

function getTemp(element){
    return [element.name, element.link, element.name];
}
function getCard(initialCard, cardDeleteButton) {
    const card = document.querySelector('#card-template').content;

    const cardElement = card.querySelector('.places__item').cloneNode(true);
    const [cardName, cardLink, cardTitle] = getTemp(initialCard);
    cardElement.querySelector('.card__image').src = cardLink;
    cardElement.querySelector('.card__image').alt = cardName;
    cardElement.querySelector('.card__title').textContent = cardTitle;

    const buttonDelete = cardElement.querySelector('.card__delete-button');
    buttonDelete.addEventListener('click', ()=> {
        cardDeleteButton(cardElement);
        })

    return cardElement
  }

initialCards.forEach((element) =>{
    placesElement.append(getCard(element, cardDeleteButton))
  });

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
