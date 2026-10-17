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