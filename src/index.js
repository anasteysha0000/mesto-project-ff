import './styles/index.css';
import { initialCards } from './scripts/cards.js';
const placesElement = document.querySelector('.places__list');

const deleteCardButton = (cardElement)=>{
    return cardElement.remove();
  }

function getTemp(element){
    return [element.name, element.link, element.name];
}
function getCard(initialCard, deleteCardButton) {
    const card = document.querySelector('#card-template').content;

    const cardElement = card.querySelector('.places__item').cloneNode(true);
    const [cardName, cardLink, cardTitle] = getTemp(initialCard);
    cardElement.querySelector('.card__image').src = cardLink;
    cardElement.querySelector('.card__image').alt = cardName;
    cardElement.querySelector('.card__title').textContent = cardTitle;

    const buttonDelete = cardElement.querySelector('.card__delete-button');
    buttonDelete.addEventListener('click', ()=> {
        deleteCardButton(cardElement);
        })

    return cardElement
  }

initialCards.forEach((element) =>{
    placesElement.append(getCard(element, deleteCardButton))
  });

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
