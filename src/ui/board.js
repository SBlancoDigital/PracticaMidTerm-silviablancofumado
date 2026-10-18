import { getBoardShape } from "../game/boardShape.js";

export function renderBoard(boardElement, deck) {
  boardElement.replaceChildren();      // vacía el tablero anterior

deck.forEach((pokemon) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "card";
    card.textContent = "?";
    card.dataset.id = pokemon.id;
    card.dataset.name = pokemon.name;
    card.dataset.img = pokemon.img;
    boardElement.appendChild(card);
  });
}
const GAP_PX = 10;
const BOTTOM_MARGIN_PX = 16;

export function fitBoard(boardElement, cardCount) {
  const width = boardElement.clientWidth;
  const height =
    window.innerHeight -
    boardElement.getBoundingClientRect().top -
    BOTTOM_MARGIN_PX;
  const shape = getBoardShape(cardCount, width, height, GAP_PX);

  boardElement.style.setProperty("--gap", `${GAP_PX}px`);
  boardElement.style.setProperty("--cols", shape.columns);
  boardElement.style.setProperty("--card-size", `${shape.cardSize}px`);
}