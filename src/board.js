export function renderBoard(boardElement, cardCount) {
  boardElement.replaceChildren();      // vacía el tablero anterior

  for (let i = 0; i < cardCount; i++) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "card";
    card.textContent = "?";
    boardElement.appendChild(card);
  }
}