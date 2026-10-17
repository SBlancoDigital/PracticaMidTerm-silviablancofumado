export function renderBoard(boardElement, deck) {
  boardElement.replaceChildren();      // vacía el tablero anterior

 deck.forEach((value) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "card";
    card.textContent = "?";
    card.dataset.value = value;
    boardElement.appendChild(card);
  });
}